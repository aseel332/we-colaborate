import { useState } from "react";
import MembersModify from "../TaskComponents/MembersModify";
import { apiRequest } from "../../../api";

export default function BranchSettings({ Branch}) {

  const [isMembersModalOpen, setMembersModalOpen] = useState(false);
  const [loading, setLoading] = useState(false);

  const projectId = JSON.parse(localStorage.getItem("currentProject"));
  const branchId = JSON.parse(localStorage.getItem("currentBranch"));
  const token = JSON.parse(localStorage.getItem("token")).token;

  async function handleSaveChanges(e) {
    setLoading(true);
    const name = document.getElementById("branchName").value;
    const description = document.getElementById("branchDescription").value;
    e.preventDefault();
    const response = await apiRequest(`/api/projects/${projectId}/branches/${branchId}`, 'PUT', {
      name,
      description
    }, token);
    console.log(response);
    setLoading(false);
    window.location.reload();
  }

  async function handleDeleteBranch() {
    if (!window.confirm("Are you sure you want to delete this branch? This action cannot be undone.")) {
      return;
    }
    const response = await apiRequest(`/api/projects/${projectId}/branches/${branchId}`, 'DELETE', {}, token);
    console.log(response);
  }

  return (

    <>
    {isMembersModalOpen && <MembersModify branch={Branch} onClose={() => setMembersModalOpen(false)} />}
      <h1 className="text-3xl font-bold">Settings for {Branch.name}</h1>
      <div className="mt-6 p-4 border border-gray-300 rounded-lg bg-white shadow-sm">
        <div className="flex justify-between items-center mb-4">
        <h2 className="text-2xl font-semibold mb-4">Branch Settings</h2>
        <div className="flex space-x-4">
          <button className="bg-gray-600 text-white px-4 py-2 rounded-2xl hover:bg-gray-700 transition" onClick={() => setMembersModalOpen(true)}>Members</button>
          <button className="bg-red-600 text-white px-4 py-2 rounded-2xl hover:bg-red-700 transition" onClick={handleDeleteBranch}>Delete Branch</button>
        </div>
        </div>
        <form>
          <div className="mb-4">
            <label className="block text-gray-700 font-semibold mb-2" htmlFor="branchName">Branch Name</label>
            <input className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-600" type="text" id="branchName" defaultValue={Branch.name} />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 font-semibold mb-2" htmlFor="branchDescription">Description</label>
            <textarea className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-600" id="branchDescription" rows="4" defaultValue={Branch.description}></textarea>
          </div>
          <button className="bg-blue-600 text-white px-4 py-2 rounded-2xl hover:bg-blue-700 transition" type="submit" onClick={handleSaveChanges}>Save Changes</button>
        </form>
      </div>
    </>
  );
}
