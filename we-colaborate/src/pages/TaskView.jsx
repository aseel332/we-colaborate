import loadTask from "../customHooks/loadTask";
import Navbar from "../components/Navbar";
import TaskConversation from "../components/TaskConversation";
import useConversation from "../customHooks/useConversation";
import { useState } from "react";
import TaskSubmission from "../components/TaskSubmission";
export default function TaskView() {

  const [activeNav, setActiveNav] = useState("details");
  const taskId = JSON.parse(localStorage.getItem("currentTask"));

  const {task, loading, error} = loadTask(taskId);

  const navBarOptions = [
    {name: "details"},
    {name: "submissions"},
  ];


  if (loading ) {
    return <div className="w-[95%] h-[100vh] px-6 py-5 overflow-y-scroll">Loading...</div>;
  }



  return (
    <>
    <Navbar navbarOptions={navBarOptions} activeNav={activeNav} setActiveNav={setActiveNav} />
    { activeNav === "details" ? (<div className="w-[95%] h-[100vh] px-6 py-5 overflow-y-scroll">
    <header className="mb-6 flex justify-between items-center">
      <div className="flex">
        <button className="mr-4 text-2xl hover:underline" onClick={() => window.history.back()}>⬅️</button>
        <h1 className="text-3xl font-bold">{task.title}</h1>
      </div>
      <div className="flex space-x-4">
        <button className="bg-blue-600 text-white px-4 py-2 rounded-2xl hover:bg-blue-700 transition">Edit Task</button>
        <button className="bg-red-600 text-white px-4 py-2 rounded-2xl hover:bg-red-700 transition">Delete Task</button>
      </div>
    </header>
    <div className="border border-gray-300 rounded-lg p-4 mb-4 shadow-sm hover:shadow-md transition">
      <div className="flex justify-between items-center mb-4">
      <h2 className="text-2xl font-semibold mb-4">Description</h2>
        <p className="text-lg text-gray-600 mb-1">Due: {new Date(task.dueDate).toLocaleString()}</p>
        <p className="text-lg text-gray-600 mb-1">Priority: <span className={`font-semibold px-2 p-1 rounded-full ${task.priority === "High" ? "text-red-600 bg-red-300" : task.priority === "Medium" ? "text-yellow-600" : "text-green-600"}`}>{task.priority}</span></p>
        <p className="text-lg text-gray-600 mb-1">Status: <span className={`font-bold  ${task.status === "Completed" ? "text-green-600" : "text-yellow-600"}`}>{task.status}</span></p>
        <p className="text-lg text-gray-600 mb-1">Assignee: {task.createdBy.name}</p>
      </div>
      <p className="text-gray-700 mb-6">{task.description}</p>
    </div>
    <TaskConversation />
    </div>) : (<div className="w-[95%] h-[100vh] px-6 py-5 overflow-y-scroll"> <TaskSubmission /> </div>) }
    
    
    </>
  );
}