import { useNavigate } from "react-router-dom";
export default function BranchCard({branch}) {
  const navigate = useNavigate();
  const projectId = JSON.parse(localStorage.getItem("currentProject"));
  return (
    <div className="border border-gray-300 rounded-2xl p-4 shadow-md hover:shadow-lg transition">
      <h3 className="text-xl font-semibold mb-2">{branch.name}</h3>
      <button className="bg-blue-600 text-white px-3 py-1 rounded-2xl hover:bg-blue-700 transition" onClick={() => navigate(`/project/${projectId}/branch/${branch._id}`)}>View</button>
    </div>
  );
}
