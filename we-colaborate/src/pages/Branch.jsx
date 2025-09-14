import Navbar from "../components/Navbar";
import { useBranch } from "../customHooks/useBranch";

export default function Branch() {
  const branchId = window.location.pathname.split('/').pop() || JSON.parse(localStorage.getItem("currentBranch"));
  const {branch, loading, error} = useBranch(branchId);

  if (loading) {
    return <div className="w-[95%] h-[100vh] px-6 py-5 overflow-y-scroll">Loading...</div>; 
  }
  return (
    <>
      <Navbar />
      <div className="w-[95%] h-[100vh] px-6 py-5 overflow-y-scroll">
        <h1 className="text-3xl font-bold">{branch.name}</h1>
        <p>This is the Branch page. Details about the branch will be displayed here.</p>
      </div>
    </>
  )
}