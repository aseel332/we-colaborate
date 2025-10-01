import { useNavigate } from "react-router-dom";
export default function TaskListCard({ task }) {
  const navigate = useNavigate();
  const projectId = JSON.parse(localStorage.getItem("currentProject"));
  const branchId = JSON.parse(localStorage.getItem("currentBranch"));
  return (
    <div id={task._id} className="border border-gray-300 rounded-lg p-4 bg-white shadow hover:shadow-md transition cursor-pointer " onClick={() => {
      // On clicking the task card, navigate to the task view page
      
      localStorage.setItem("currentTask", JSON.stringify(task._id));
      navigate(`/project/${projectId}/branch/${branchId}/task/${task._id}`);
    }}>
      {/* Task title and status */}
      <div className="flex justify-between items-center mb-1">
      <h3 className="text-xl font-semibold mb-1">{task.title}</h3>
      <div>
      {/* Priority */}
      <span className={`text-sm font-semibold px-2 py-1 rounded-full ${task.priority === 'High' ? 'bg-red-100 text-red-800' : task.priority === 'Medium' ? 'bg-yellow-100 text-yellow-800' : 'bg-green-100 text-green-800'} mr-2`}>
        {task.priority.charAt(0).toUpperCase() + task.priority.slice(1)}
      </span>
      {/* Status */}
      <span className={`text-sm font-semibold px-2 py-1 rounded-full ${task.status === 'Completed' ? 'bg-green-100 text-green-800' : task.status === 'In Progress' ? 'bg-yellow-100 text-yellow-800' : 'bg-gray-100 text-gray-800'}`}>
        {task.status.charAt(0).toUpperCase() + task.status.slice(1)}
      </span>
      </div>
      </div>
      {/* Task description */}
      <p className="text-gray-600 mb-4">{task.description}</p>
      <div className="flex justify-between items-center">
        
        {/* Displaying due date in the like 9 Sept, 11:59 PM */}
        <span className="text-sm text-gray-500">Due: {new Date(task.dueDate).toLocaleString('en-US', { timeZone: 'UTC', day: 'numeric', month: 'short', hour: '2-digit', minute: '2-digit', hour12: true })}</span>
        {/* Member of the task */}
        <span className="text-sm text-gray-500">{/* Mapping over the members of the task and displaying  */
          task.assignedTo.map((member, memberIndex) => (
            // Displaying only the image of first 2 members and if more than 2, displaying +n more
              memberIndex < 2 ? (
            <img key={member._id} src={member.avatar} alt={member.name} title={member.name} className="w-6 h-6 rounded-full inline-block -ml-2 border-2 border-white"/>
          ) : memberIndex === 2 ? (
            <span key={member._id} className="text-sm text-gray-500">+{task.assignedTo.length - 2} more</span>
          ) : null
          ))}</span>
      </div>
    </div>
  );
}
