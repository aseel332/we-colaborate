import Navbar from "../components/Navbar";
import { useBranch } from "../customHooks/useBranch";
import { useState } from "react";
import useTask from "../customHooks/useTask";
import BranchMain from "./BranchMain";
import Calendar from "./Calendar";
import Task from "./Task";
import Files from "../components/Files";

const projectId = JSON.parse(localStorage.getItem("currentProject"));
const branchId = JSON.parse(localStorage.getItem("currentBranch"));


export const branchNavbarOptions = [
    {name: "dashboard", link: `/project/${projectId}/branch/${branchId}`},
    {name: "calendar", link: `/project/${projectId}/branch/${branchId}/calendar`},
    {name: "tasks", link: `/project/${projectId}/branch/${branchId}/tasks`},
    {name: "messages", link: `/project/${projectId}/branch/${branchId}/messages`},
    {name: "members", link: `/project/${projectId}/branch/${branchId}/members`},
    {name: "files", link: `/project/${projectId}/branch/${branchId}/files`},
    {name: "settings", link: `/project/${projectId}/branch/${branchId}/settings`},
];

export default function Branch() {
  const branchId = window.location.pathname.split('/').pop() || JSON.parse(localStorage.getItem("currentBranch"));
  const {branch, loading, error} = useBranch(branchId);
  const [activeNav, setActiveNav] = useState("dashboard");

  const {tasks, loading: tasksLoading} = useTask(branchId);

  function renderComponent(activeNav) {
  switch(activeNav) {
    case 'dashboard':
      return <BranchMain branch={branch} tasks={tasks} />;
    case 'calendar':
      return <Calendar tasks={tasks} />;
    case 'tasks':
      return <Task tasks={tasks} />;
    case 'files':
      return <Files />
    
    // case 'messages':
    //   return <Messages branchId={branchId} />;
  }
}

  if (loading || tasksLoading) {
    return <div className="w-[95%] h-[100vh] px-6 py-5 overflow-y-scroll">Loading...</div>; 
  }
  return (
    <>
      <Navbar navbarOptions={branchNavbarOptions} setActiveNav={setActiveNav} activeNav={activeNav} />
      <div className="w-[95%] h-[100vh] px-6 py-5 overflow-y-scroll">
        {renderComponent(activeNav)}
      </div>
      
    </>
  )
}