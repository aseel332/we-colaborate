import Navbar from "../components/Navbar"
import ProfileCircle from "../components/ProfileCircle";
import { navbarOptions } from "./Project"
import { useState } from "react"
import { useProject } from "../customHooks/project";

export default function Members() {
  const [activeNav, setActiveNav] = useState("members");
  const [searchTerm, setSearchTerm] = useState("");
  const projectId =  JSON.parse(localStorage.getItem("currentProject"));
  const { project, loading } = useProject(projectId);

  const filteredAdmins = project && project.admin
    ? project.admin.filter(admin =>
        admin.name.toLowerCase().includes(searchTerm.toLowerCase())
      )
    : [];

  const filteredMembers = project && project.members
    ? project.members.filter(member =>
        member.name.toLowerCase().includes(searchTerm.toLowerCase())
      )
    : [];

  return (
    <>
      <Navbar navbarOptions={navbarOptions} activeNav={activeNav} setActiveNav={setActiveNav}/>
      <div className="w-[95%] h-[100vh] px-6 py-5 overflow-y-scroll">
        <header className="mb-6 flex justify-between">
          <div className="flex justify-between w-full">
            <div className="flex">
            <button className="mr-4 text-2xl hover:underline" onClick={() => window.history.back()}>⬅️</button>
            <h1 className="text-3xl font-bold">Collaborators</h1>
            </div>
            <input 
              type="text" 
              placeholder="Search Members..." 
              className=" border border-gray-300 rounded-2xl px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-600"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
        </header>
        <section className="mb-6">
          <div className="flex justify-between">
            <h2 className="text-2xl font-semibold mb-4">Admins</h2>
            <button className="text-blue-600 hover:underline">View All</button>
          </div>
          <div className=" flex gap-13 flex-wrap">
            {filteredAdmins && filteredAdmins.length > 0 ? filteredAdmins.map((admin) => (
              <ProfileCircle key={admin._id} user={admin} type="Admin"/>
            )) : (<p>No admins available.</p>)}
          </div>
        </section>
        <section className="mb-6">
          <div className="flex justify-between">
            <h2 className="text-2xl font-semibold mb-4">Members</h2>
            <button className="text-blue-600 hover:underline">View All</button>
          </div>
          <div className=" flex gap-13 flex-wrap">
            {filteredMembers && filteredMembers.length > 0 ? filteredMembers.map((member) => (
              <ProfileCircle key={member._id} user={member} type="Member"/>
            )) : (<p>No members available.</p>)}
          </div>
        </section>
      </div>
    </>
  )} 
