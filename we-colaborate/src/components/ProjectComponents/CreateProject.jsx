import ReactDom from "react-dom";
import { useState } from "react";
import { apiRequest } from "../../../api";





export default function CreateProject({show, onClose}) {
const [created, setCreated] = useState(false);
const [title, setTitle] = useState("");
const [description, setDescription] = useState("");
const [project, setProject] = useState(null);

async function  handleCreate(){
  console.log(JSON.parse(localStorage.getItem('token')).token);
  const newProject = await apiRequest('/api/projects/', 'POST', {
    name: title,
    description: description,
  }, JSON.parse(localStorage.getItem('token')).token);
  setProject(newProject);
  setCreated(true);
} 

   
  // Modal for creating a new project
return  ReactDom.createPortal(<>{created ? (<>
  <div onClick={onClose} className="fixed inset-0 bg-white flex items-center justify-center ">
    <div className="bg-white p-6 rounded-2xl w-96 shadow-lg z-auto" onClick={(e) => e.stopPropagation()}>
      <h2 className="text-2xl font-semibold mb-4">Project Created Successfully!</h2>  
      {/*Two boxes for the linke to be coopied to share project one to admin and other to users */}
      <div className="mb-4">
        <label className="block mb-2 text-sm font-medium text-gray-700">Admin Link</label>
        <input type="text" readOnly value={project.adminLink} className="w-full p-2 border border-gray-300 rounded-2xl mb-2"/>
        <button className="px-4 py-2 rounded-2xl bg-green-600 text-white hover:bg-green-700 transition" onClick={() => {navigator.clipboard.writeText(project.adminLink)}}>Copy Admin Link</button>
      </div>
      <div className="mb-4">
        <label className="block mb-2 text-sm font-medium text-gray-700">User Link</label>
        <input type="text" readOnly value={project.projectLink} className="w-full p-2 border border-gray-300 rounded-2xl mb-2"/>
        <button className="px-4 py-2 rounded-2xl bg-green-600 text-white hover:bg-green-700 transition" onClick={() => {navigator.clipboard.writeText(project.projectLink)}}>Copy User Link</button>
      </div>
      
      <div className="flex justify-end gap-4">
          <button  className="px-4 py-2 rounded-2xl bg-green-600 text-white hover:bg-green-700 transition" onClick={onClose}>Close</button>
        </div>
    </div>
  </div> </>) : (<><div onClick={onClose} className="fixed inset-0 bg-white flex items-center justify-center ">
      <div className="bg-white p-6 rounded-2xl w-96 shadow-lg z-auto" onClick={(e) => e.stopPropagation()}>
        <h2 className="text-2xl font-semibold mb-4">Create New Project</h2>
        {/* Image Upload*/} 
        <div className="mb-4"> 
          <label className="block mb-2 text-sm font-medium text-gray-700">Project Image</label>
          <input  type="file" className="w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-2xl file:border-0 file:text-sm file:font-semibold file:bg-green-600 file:text-white hover:file:bg-green-700 transition"/>
        </div>
        {/* Project Title and Description */} 

        <input value={title} className="w-full mb-4 p-2 border border-gray-300 rounded-2xl" placeholder="Project Title" onChange={(e) => {setTitle(e.target.value)}}/>
        <textarea value={description} className="w-full mb-4 p-2 border border-gray-300 rounded-2xl" placeholder="Project Description" onChange={(e)=>{setDescription(e.target.value)}}></textarea>
        <div className="flex justify-end gap-4">
          <button  className="px-4 py-2 rounded-2xl bg-gray-300 hover:bg-gray-400 transition" onClick={onClose}>Cancel</button>
          <button className="px-4 py-2 rounded-2xl bg-green-600 text-white hover:bg-green-700 transition" onClick={handleCreate}>Create</button>
        </div>
      </div>
    </div> </>)} </> , document.getElementById("portal") 
  );
}
