import { useState } from "react";
import ReactDom from "react-dom";
import { apiRequest } from "../../../api";
import { useProject } from "../../customHooks/project";
import MemberSelect from "../ProjectComponents/MemberSelect";

export default function MembersModify( {task, onClose} ) {
  const members = task?.assignedTo || [];
  const projectId = JSON.parse(localStorage.getItem("currentProject"));
  const branchId = JSON.parse(localStorage.getItem("currentBranch"));
  const taskId = task?._id;
  const {project, loading, error} = useProject(projectId);
  const [selectedMembers, setSelectedMembers] = useState([]);

  if (loading) {
    return ReactDom.createPortal(<div>Loading...</div>, document.getElementById('portal'));
  }

  async function handleAddMember() {
    const response = await apiRequest(`/api/projects/${projectId}/branches/${branchId}/tasks/${taskId}/add-members`, 'POST', {
      memberIds: selectedMembers
    }, JSON.parse(localStorage.getItem('token')).token);
   console.log(response);
  }

  async function handleRemoveMember(memberId) {
    const response = await apiRequest(`/api/projects/${projectId}/branches/${branchId}/tasks/${taskId}/remove-member`, 'POST', {
      memberId
    }, JSON.parse(localStorage.getItem('token')).token);
   console.log(response);
  }

  return ReactDom.createPortal(
    <div className="fixed inset-0 bg-white bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg shadow-lg p-6 h-[400px] w-[400px] overflow-y-auto">
      <h2 className="text-2xl font-semibold mb-4">Modify Members</h2>
      <ul className="mb-4">
        {members.map(member => (
          <li key={member._id} className="flex justify-between items-center mb-2">
            <span>{member.name}</span>
            <button className="bg-red-600 text-white px-2 py-1 rounded hover:bg-red-700 transition" onClick={() => handleRemoveMember(member._id)}>Remove</button>
          </li>
        ))}
      </ul>
      <MemberSelect project={project} selectedMembers={selectedMembers} setSelectedMembers={setSelectedMembers}/>
      <button className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition" onClick={handleAddMember}>Add Member</button>
      <div className="flex justify-end mt-4">
        <button className="bg-gray-600 text-white px-4 py-2 rounded hover:bg-gray-700 transition" onClick={onClose}>Close</button>
      </div>

    </div>
    </div>,
    document.getElementById("portal")
  );
}