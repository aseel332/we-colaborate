import { useEffect, useState } from "react";
import { apiRequest } from "../../api";
import { useProject } from "../customHooks/project";
import { loadBranches } from "../customHooks/loadBranches";

import CreateBranch from "../components/CreateBranch";
import Navbar from "../components/Navbar";
import BranchCard from "../components/BranchCard";

const projectId = window.location.pathname.split('/').pop() || JSON.parse(localStorage.getItem("currentProject"));

export const navbarOptions = [
    {name: "dasboard", link: `/project/${projectId}`},
    {name: "tasks", link: `/project/${projectId}/tasks`},
    {name: "messages", link: `/project/${projectId}/messages`},
    {name: "files", link: `/project/${projectId}/files`},
    {name: "members", link: `/project/${projectId}/members`},
    {name: "settings", link: `/project/${projectId}/settings`},
];

export default function Project() {

  
  const { project, loading, error } = useProject(projectId);
  const { branches, loading: branchesLoading, error: branchesError } = loadBranches(projectId);

  const [activeNav, setActiveNav] = useState("dashboard");
  const [isOpen, setIsOpen] = useState(false);

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
    <header className="mb-6 flex justify-between">
      <div className="flex">
        <button className="mr-4 text-2xl hover:underline" onClick={() => window.history.back()}>⬅️</button>
      <h1 className="text-3xl font-bold">{project.name}</h1>
      </div>
      <div className="flex items-center gap-4">
        {/*Branch search bar */}
        <input type="text" placeholder="Search Branches..." className="border border-gray-300 rounded-2xl px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-600"/>
        <button className="bg-blue-600 text-white px-4 py-2 rounded-2xl hover:bg-blue-700 transition" onClick={() => setIsOpen(true)}>Add Branch</button>
      </div>
    </header>
    <section className="mb-6">
      <div className="flex justify-between">
      <h2 className="text-2xl font-semibold mb-4">Your Branches</h2>
      {/*View all Button */}
        <button className="text-blue-600 hover:underline">View All</button>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {branches && branches.length > 0 ? branches.map((branch) => (
          <BranchCard key={branch._id} branch={branch} />
        )) : (<p>No branches available. Create a new branch to get started!</p>)}
      </div>
    </section>
  </div>
  </>
)
}
    