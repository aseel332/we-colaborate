import ReactDOM from 'react-dom';
import { apiRequest } from '../../api';
import { useState } from 'react';

export default function FileUploadModal({ isOpen, onClose, branchId = null, folderId = null, taskId = null }) {
  const [selectedFiles, setSelectedFiles] = useState([]);
  const [uploading, setUploading] = useState(false);
  const [message, setMessage] = useState("");
  // const branchId = JSON.parse(localStorage.getItem("currentBranch"));
  console.log(branchId);
  const token = JSON.parse(localStorage.getItem("token")).token;

  function buildUrl() {
    let url = `/api/files/upload/`;
    if (branchId) url += `branch/${branchId}/`;
    if (folderId) url += `folder/${folderId}/`;
    if (taskId) url += `task/${taskId}/`;
    return url;
  }

  if (!isOpen) return null;

  const handleUpload = async () => {
    if (selectedFiles.length === 0) {
      setMessage("Please select at least one file.");
      return;
    }

    setUploading(true);
    setMessage("");

    try {
      for (const file of selectedFiles) {
        const formData = new FormData();
        console.log(file)
        formData.append("file", file);

        
        if (folderId) formData.append("folderId", folderId);

        const response = await fetch(`${import.meta.env.VITE_BACKEND_URL || 'http://localhost:5000'}${buildUrl()}`, {
          method: "POST",
          headers: {
            "Authorization": `${token}`
          },
          body: formData
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Upload failed');
      }
      }

      setMessage("Files uploaded successfully ✅");
      setSelectedFiles([]);
      setTimeout(() => {
        onClose();
      }, 1000);
    } catch (err) {
      console.error("Upload error:", err);
      setMessage(`Upload failed ❌: ${err.message}`);
    } finally {
      setUploading(false);
    }

  

  };

  return ReactDOM.createPortal(
    <>
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
        <div className="bg-white rounded-lg p-6 w-96">
          <h2 className="text-2xl font-semibold mb-4">Upload Files</h2>

          <div className="flex flex-col items-center justify-center border-2 border-dashed border-gray-300 rounded-2xl p-6 bg-gray-50 shadow-md hover:shadow-lg transition w-full h-48">
            <svg
              className="w-12 h-12 text-gray-400 mb-3"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"
              ></path>
            </svg>
            <p className="text-gray-600 mb-3">
              Drag and drop files here or click to upload
            </p>
            <button
              className="bg-blue-600 text-white px-4 py-2 rounded-2xl hover:bg-blue-700 transition"
              onClick={() => {
                const fileInput = document.createElement("input");
                fileInput.type = "file";
                fileInput.multiple = true;
                fileInput.onchange = () => {
                  const files = fileInput.files;
                  setSelectedFiles(Array.from(files));
                };
                fileInput.click();
              }}
            >
              Select Files
            </button>
          </div>

          {selectedFiles.length > 0 && (
            <ul className="mt-3 text-sm text-gray-700">
              {selectedFiles.map((file, idx) => (
                <li key={idx}>📄 {file.name}</li>
              ))}
            </ul>
          )}

          {message && (
            <p className="mt-3 text-center text-sm text-gray-600">{message}</p>
          )}

          <div className="mt-6 flex justify-between">
            <button
              className="bg-gray-300 px-4 py-2 rounded-2xl hover:bg-gray-400 transition"
              onClick={onClose}
              disabled={uploading}
            >
              Close
            </button>
            <button
              className="bg-green-600 text-white px-4 py-2 rounded-2xl hover:bg-green-700 transition disabled:opacity-50"
              onClick={handleUpload}
              disabled={uploading || selectedFiles.length === 0}
            >
              {uploading ? "Uploading..." : "Upload"}
            </button>
          </div>
        </div>
      </div>
    </>,
    document.getElementById("portal")
  );
}
