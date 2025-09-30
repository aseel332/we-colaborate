import { apiRequest } from "../../../api";
import { useState } from "react";
import ReactDom from "react-dom";

export default function CreateFolderModal({ isOpen, onClose, onCreate }) {
  const [folderName, setFolderName] = useState("");
  const [creating, setCreating] = useState(false);
  const [message, setMessage] = useState("");
  const branchId = JSON.parse(localStorage.getItem("currentBranch"));
  const token = JSON.parse(localStorage.getItem("token")).token;
  if (!isOpen) return null;

  const handleCreate = async () => {
    if (folderName.trim() === "") {
      setMessage("Folder name cannot be empty.");
      return;
    }
    setCreating(true);
    setMessage("");
    try {
      const response = await apiRequest(
        `/api/files/${branchId}/folder`,
        "POST",
        { folderName },
        token
      );
      setMessage("Folder created successfully ✅");
      setFolderName("");
      onCreate();
      setTimeout(() => {
        onClose();
      }, 1000);
    } catch (err) {
      console.error("Error creating folder:", err);
      setMessage(`Error creating folder ❌: ${err.message}`);
    } finally {
      setCreating(false);
    }
  };

  return ReactDom.createPortal(
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div
        className="bg-white p-6 rounded-2xl w-80 shadow-lg"
      >
        <h2 className="text-xl font-semibold mb-4">Create Folder</h2>
        {message && <p className="mb-4">{message}</p>}
        <input
          type="text"
          placeholder="Folder Name"
          value={folderName}
          onChange={(e) => setFolderName(e.target.value)}
          className="border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-600 mb-4"
        />
        <div className="flex justify-end">
          <button
            className="bg-blue-600 text-white px-4 py-2 rounded-2xl hover:bg-blue-700 transition"
            onClick={handleCreate}
            disabled={creating}
          >
            {creating ? "Creating..." : "Create"}
          </button>
        </div>
      </div>
    </div>,
    document.getElementById("portal")
  );
}