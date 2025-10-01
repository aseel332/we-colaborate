import { useState, useEffect } from "react";
import CreateBranch from "../BranchComponents/CreateBranch";
import Navbar from "../ProjectComponents/Navbar";
import BranchCard from "../BranchComponents/BranchCard";
export default function ProjectDashboard({project, branches, isAdmin}) {
 
  const [isOpen, setIsOpen] = useState(false);
   
  return (

    <>
  {isOpen && <CreateBranch />}
  
  
    <header className="mb-6 flex justify-between">
      <div className="flex">
        <button className="mr-4 text-2xl hover:underline" onClick={() => window.history.back()}>⬅️</button>
      <h1 className="text-3xl font-bold">{project.name}</h1>
      </div>
      <div className="flex items-center gap-4">
        {/*Branch search bar */}
        <input type="text" placeholder="Search Branches..." className="border border-gray-300 rounded-2xl px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-600"/>
        {isAdmin && <button className="bg-blue-600 text-white px-4 py-2 rounded-2xl hover:bg-blue-700 transition" onClick={() => setIsOpen(true)}>Add Branch</button>}
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

  </>
)

}