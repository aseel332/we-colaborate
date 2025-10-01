import loadTask from "../customHooks/loadTask";
import Navbar from "../components/ProjectComponents/Navbar";
import TaskConversation from "../components/TaskComponents/TaskConversation";
import useConversation from "../customHooks/useConversation";
import { useState } from "react";
import TaskSubmission from "../components/TaskComponents/TaskSubmission";
import Task from "./Task";
import MembersModify from "../components/TaskComponents/MembersModify";
import { apiRequest } from "../../api";
export default function TaskView() {

  const [activeNav, setActiveNav] = useState("details");
  const taskId = JSON.parse(localStorage.getItem("currentTask"));
  const email = JSON.parse(localStorage.getItem("email"));
  const projectId = JSON.parse(localStorage.getItem("currentProject"));
  const branchId = JSON.parse(localStorage.getItem("currentBranch"));

  const [editMode, setEditMode] = useState(false);
  const [membersModalOpen, setMembersModalOpen] = useState(false);


  const {task, loading, error} = loadTask(taskId);
  console.log("Loaded Task:", task);

  const navBarOptions = [
    {name: "details"},
    {name: "submissions"},
  ];

  async function handleSave( complete = false ) {
    const response = await apiRequest(`/api/projects/${projectId}/branches/${branchId}/tasks/${taskId}/modify`, 'PUT', {
      title: document.getElementById("title").value,
      description: document.getElementById("description").value,
      dueDate: document.getElementById("dueDate").value,

      status: complete ? "completed" : task.status
    }, JSON.parse(localStorage.getItem('token')).token);
    console.log(response);
  }

  async function handleDelete() {
    const response = await apiRequest(`/api/projects/${projectId}/branches/${branchId}/tasks/${taskId}`, 'DELETE', {}, JSON.parse(localStorage.getItem('token')).token);
    console.log(response);
  }

  function TaskDetails() {
    if (editMode) {
      return (
        <>
        <div className="border border-gray-300 rounded-lg p-4 mb-4 shadow-sm hover:shadow-md transition">
        <div className="flex justify-between items-center mb-4">
        <h2 className="text-2xl font-semibold mb-4">Edit Task</h2>
        <div className="flex space-x-4">
          {/* Add or remove members button */}
          <button className="bg-blue-600 text-white px-4 py-2 rounded-2xl hover:bg-blue-700 transition" onClick={() => setMembersModalOpen(true)}>Members</button>
          <button className="bg-green-600 text-white px-4 py-2 rounded-2xl hover:bg-green-700 transition" onClick={() => {setEditMode(false); handleSave()}}>Save</button>
          <button className="bg-gray-600 text-white px-4 py-2 rounded-2xl hover:bg-gray-700 transition" onClick={() => setEditMode(false)}>Cancel</button>
        </div>
      </div>
      <form>
        <div className="mb-4">
          <label className="block text-gray-700 font-semibold mb-2" htmlFor="title">Title</label>
          <input className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-600" type="text" id="title" defaultValue={task.title} />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 font-semibold mb-2" htmlFor="description">Description</label>
          <textarea className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-600" id="description" rows="4" defaultValue={task.description}></textarea>
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 font-semibold mb-2" htmlFor="dueDate">Due Date</label>
          <input className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-600" type="datetime-local" id="dueDate" defaultValue={new Date(task.dueDate).toISOString().slice(0,16)} />
        </div>
        </form>
        {/* Mark as complete button */}
        <div className="flex justify-between items-center mb-4">
        <div className="flex space-x-4">
          <button className="bg-green-600 text-white px-4 py-2 rounded-2xl hover:bg-green-700 transition" onClick={() => handleSave(true)}>Mark as Complete</button>
        </div>
      </div>
        </div>
        </>
      )
    }
    return (
      
       <div className="border border-gray-300 rounded-lg p-4 mb-4 shadow-sm hover:shadow-md transition">
      <div className="flex justify-between items-center mb-4">
      <h2 className="text-2xl font-semibold mb-4">Description</h2>
        <p className="text-lg text-gray-600 mb-1">Due: {new Date(task.dueDate).toLocaleString()}</p>
        <p className="text-lg text-gray-600 mb-1">Priority: <span className={`font-semibold px-2 p-1 rounded-full ${task.priority === "high" ? "text-red-600 bg-red-300" : task.priority === "Medium" ? "text-yellow-600" : "text-green-600"}`}>{task.priority}</span></p>
        <p className="text-lg text-gray-600 mb-1">Status: <span className={`font-bold  ${task.status === "completed" ? "text-green-600" : "text-yellow-600"}`}>{task.status}</span></p>
        <p className="text-lg text-gray-600 mb-1">Assignee: {task.createdBy.name}</p>
      </div>
      <p className="text-gray-700 mb-6">{task.description}</p>
    </div>
    )
  }

  if (loading ) {
    return <div className="w-[95%] h-[100vh] px-6 py-5 overflow-y-scroll">Loading...</div>;
  }

  const leader_email = task ? task.createdBy.email : null;
  const isLeader = email === leader_email;

  return (
    <>
    {membersModalOpen && <MembersModify task={task} onClose={() => setMembersModalOpen(false)} />}
    <Navbar navbarOptions={navBarOptions} activeNav={activeNav} setActiveNav={setActiveNav} />
    { activeNav === "details" ? (<div className="w-[95%] h-[100vh] px-6 py-5 overflow-y-scroll">
    <header className="mb-6 flex justify-between items-center">
      <div className="flex">
        <button className="mr-4 text-2xl hover:underline" onClick={() => window.history.back()}>⬅️</button>
        <h1 className="text-3xl font-bold">{task.title}</h1>
      </div>
      {isLeader &&
      <div className="flex space-x-4">
        <button className="bg-blue-600 text-white px-4 py-2 rounded-2xl hover:bg-blue-700 transition" onClick={() => setEditMode(true)}>Edit Task</button>
        <button className="bg-red-600 text-white px-4 py-2 rounded-2xl hover:bg-red-700 transition" onClick={handleDelete}>Delete Task</button>
      </div>
  }
    </header>
    <TaskDetails />
    <TaskConversation taskId={taskId} />
    </div>) : (<div className="w-[95%] h-[100vh] px-6 py-5 overflow-y-scroll"> <TaskSubmission /> </div>) }
    
    
    </>
  );
}