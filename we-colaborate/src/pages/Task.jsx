import Navbar from "../components/Navbar";
import { branchNavbarOptions } from "./Branch";
import { useState } from "react";
import CreateTask from "../components/CreateTask";
import useTask from "../customHooks/useTask";
import TaskListCard from "../components/TaskListCard";

export default function Task({tasks}) {
  const [activeNav, setActiveNav] = useState("tasks");
  const [showCreateTask, setShowCreateTask] = useState(false);
  const branchId = JSON.parse(localStorage.getItem("currentBranch"));


  
  return <>
  {showCreateTask && <CreateTask show={showCreateTask} onClose={() => setShowCreateTask(false)} />}
  
    <h1 className="text-3xl font-bold">Tasks</h1>
    {/* Sort and Filter Options */}
    <div className="mt-4 flex justify-between items-center">
      <div className="flex gap-4">
      <div className="flex items-center gap-4">
        <label htmlFor="sort" className="font-semibold">Sort by:</label>
        <select id="sort" className="border border-gray-300 rounded-2xl px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-600">
          <option value="dueDate">Due Date</option>
          <option value="priority">Priority</option>
          <option value="status">Status</option>
          <option value="assignee">Assignee</option>
        </select>
      </div>
      <div className="flex items-center gap-4">
        <label htmlFor="filter" className="font-semibold">Filter:</label>
        <select id="filter" className="border border-gray-300 rounded-2xl px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-600">
          <option value="all">All Tasks</option>
          <option value="completed">Completed</option>
          <option value="pending">Pending</option>
          <option value="highPriority">High Priority</option>
        </select>
      </div>
      </div>
      {/*Search Bar and New Task Button */}
      <div className="flex items-center gap-4">
      <input type="text" placeholder="Search tasks..." className="border border-gray-300 rounded-2xl px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-600"/>
      <button className="bg-blue-600 text-white px-4 py-2 rounded-2xl hover:bg-blue-700 transition" onClick={() => setShowCreateTask(true)}>+ New Task</button> 
      </div>
    </div>
    {/* Task List */}
    <div className="mt-6">
      {tasks && tasks.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {tasks.map((task) => (
            <TaskListCard key={task._id} task={task} />
          ))}
        </div>
      ) : (
        <p className="text-gray-600">No tasks available.</p>
      )}  
    </div>

  </>;
}