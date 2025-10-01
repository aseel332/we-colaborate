import { use, useEffect, useState } from "react";
import Navbar from "../components/ProjectComponents/Navbar";
import ProjectCard from "../components/ProjectComponents/ProjectCard";
import SearchBar from "../components/SearchBar";
import CreateProject from "../components/ProjectComponents/CreateProject";
import { apiRequest } from "../../api";

export default function Home() {
  // cannot go back to login page if already logged in
 
  const [show, setShow] = useState(false);
  const [projects, setProjects] = useState(null);
  useEffect(() => {
    document.title = "We-Colaborate | Home";
    localStorage.removeItem("currentProject");
    async function fetchData() {
      const projects = await apiRequest('/api/projects/', 'GET', null, JSON.parse(localStorage.getItem('token')).token);
      console.log(projects);
      setProjects(projects);
    } fetchData();
     if (localStorage.getItem("token")) {
    window.history.pushState(null, "", "/home");
  }
  }, [show]);

  return (
    <>
    {show && <CreateProject show={show} onClose={() => setShow(false)} />}
    <Navbar />
    <div className="w-[95%] h-[100vh] px-6 py-5 overflow-y-scroll">
      <div className="w-full flex gap-4">
      <SearchBar />
      <button className="bg-green-600 text-white px-4 py-2 rounded-2xl  hover:bg-green-700 transition" onClick={() => {setShow(true)}}>New Project</button>
      </div>
      <div className="mt-8">
        <div>
        <h2 className="text-2xl font-semibold">Ongoing Projects</h2>
        <div className="mt-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"> 
         {projects && projects.map((project) => (

          <ProjectCard key={project._id} project={project} />
         ))} 
         {!projects && <p>No ongoing projects. Create a new project to get started!</p>}
         
        </div>
        </div>
      </div>
      <div className="mt-8">
        <h2 className="text-2xl font-semibold">Previous Projects</h2>
        <div className="mt-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"> 
         
        </div>
      </div>
    </div>

    </>
  );
}