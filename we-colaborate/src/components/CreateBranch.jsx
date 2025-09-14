import { useState } from "react"
import { apiRequest } from "../../api"
import ReactDom from "react-dom"
import { useProject } from "../customHooks/project"
import MemberSelect from "./MemberSelect"
export default  function CreateBranch(){
  // Modal for creating a branch. Components: Name, Description, leader (select from the memebrs and admins of the project), members (multi select from the members and admins of the project) and a create button
  const [name, setName] = useState("")
  const [description, setDescription] = useState("")
  const [leader, setLeader] = useState("")
  const [members, setMembers] = useState([])
  const [isLoading, setIsLoading] = useState(false)

  const projectId = JSON.parse(localStorage.getItem("currentProject"));
 

  const {project, loading} = useProject(projectId);


  async function handleCreateBranch(){
    setIsLoading(true)
    await apiRequest(`/api/projects/${projectId}/branches`, 'POST', {
      name,
      description,
      leader,
      members
    }, JSON.parse(localStorage.getItem('token')).token);
    setIsLoading(false)
    window.location.reload();
  }
  return ReactDom.createPortal(
    <>
    {/* transparent background with opacity */}
    <div className="fixed inset-0 bg-white bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white p-6 rounded-2xl w-96 shadow-lg" onClick={(e) => e.stopPropagation()}>
        <h2 className="text-2xl font-semibold mb-4">Create New Branch</h2>
        <input type="text" placeholder="Branch Name" className="w-full mb-4 p-2 border border-gray-300 rounded-2xl" value={name} onChange={(e) => setName(e.target.value)}/>
        <textarea placeholder="Branch Description" className="w-full mb-4 p-2 border border-gray-300 rounded-2xl" value={description} onChange={(e) => setDescription(e.target.value)}></textarea>
        <select className="w-full mb-4 p-2 border border-gray-300 rounded-2xl" value={leader} onChange={(e) => setLeader(e.target.value)}>
          <option value="">Select Leader</option>
          {project && project.members.map((member) => (
            <option key={member._id} value={member._id}>{member.name}</option>
          ))} 
          {project && project.admin.map((admin) => (
            <option key={admin._id} value={admin._id}>{admin.name}</option>
          ))}
        </select>
        
        <MemberSelect project={project} selectedMembers={members} setSelectedMembers={setMembers}/>
        <button className="bg-blue-600 text-white px-4 py-2 rounded-2xl hover:bg-blue-700 transition" onClick={handleCreateBranch} disabled={isLoading}>
          {isLoading ? "Creating..." : "Create Branch"}
        </button>
      </div>
    </div>
    </>
    
    , document.getElementById('portal')
  )
  
}