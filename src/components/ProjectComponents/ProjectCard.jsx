import { useNavigate } from "react-router-dom";
export default function ProjectCard({project}) {
  const navigate = useNavigate();
  return (
    <div className="border border-gray-300 rounded-2xl p-4 shadow-md hover:shadow-lg transition">
      <img src="/OIP.jpeg" alt="Project" className="w-full h-30 object-cover rounded-2xl mb-4"/>
      <h3 className="text-xl font-semibold mb-2">{project.name}</h3>
      <p className="text-gray-600 mb-4">{project.description}</p>
      <div className="flex justify-between items-center">
        <span className="text-sm text-gray-500">Due Date: 2023-12-31</span>
        <button className="bg-blue-600 text-white px-3 py-1 rounded-2xl hover:bg-blue-700 transition" onClick={()=>{
          navigate(`/project/${project._id}`);
          localStorage.setItem("currentProject", JSON.stringify(project._id));
        }}>View</button>
      </div>
    </div>
  );
}