import { useEffect, useState } from "react";
import { apiRequest } from "../../api";
import { useProject } from "../customHooks/project";
import { loadBranches } from "../customHooks/loadBranches";
import ProjectDashboard from "../components/ProjectDashboard";
import CreateBranch from "../components/CreateBranch";
import Navbar from "../components/Navbar";


import Settings from "../components/ProjectSettings";
import Members from "../components/ProjectMembers";



export default function Project() {

  const projectId = window.location.pathname.split('/').pop() || JSON.parse(localStorage.getItem("currentProject"));
  const { project, loading, error } = useProject(projectId);
  const { branches, loading: branchesLoading, error: branchesError } = loadBranches(projectId);


  const [activeNav, setActiveNav] = useState("dashboard");
  const [isOpen, setIsOpen] = useState(false);
  
  const navbarOptions = [
    {name: "dashboard", },
    {name: "tasks"},
    {name: "messages"},
    {name: "files" },
    {name: "members" },
    {name: "settings" },
];

function renderComponent(activeNav) {
  switch(activeNav) {
    case 'dashboard':
      return <ProjectDashboard project={project} branches={branches} />;
    case 'tasks':
      return <div>Tasks Component</div>;
    case 'messages':
      return <div>Messages Component</div>;
    case 'files':
      return <div>Files Component</div>;
    case 'members':
      return <Members project={project} />;
    case 'settings':
      return <Settings project={project} />;
    default:
      return null;
  }
}


  useEffect(() => {
    document.title = `We-Colaborate | ${project ? project.name : 'Project'}`;
    localStorage.removeItem("currentBranch");
  }, [project]);


 
  if (loading || branchesLoading) {
    return <div className="w-[95%] h-[100vh] px-6 py-5 overflow-y-scroll">Loading...</div>; 
  }
  return (

    <>
  {isOpen && <CreateBranch />}
  <Navbar navbarOptions={navbarOptions} activeNav={activeNav} setActiveNav={setActiveNav}/>
  <div className="w-[95%] h-[100vh] px-6 py-5 overflow-y-scroll">
  {renderComponent(activeNav)}
    
  </div>
  </>
)
}
    