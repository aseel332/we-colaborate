export default function BranchMain({branch, tasks}) {
  return (
    <>
    <h1 className="text-3xl font-bold">{branch.name}</h1>
        {/* Announcements Box for leader to post announcements*/}
        <div className="mt-6 p-4 min-h-[200px] border border-gray-300 rounded-lg bg-gray-50">
          <h2 className="text-2xl font-semibold mb-4">Announcements</h2>
          <p className="text-gray-600">No announcements yet.</p>
        </div>
       {/* YYour Activity and Task side by side */}
       <div className="flex justify-between mt-6">
         <div className="w-[48%] p-4 min-h-[300px] ">
           <h2 className="text-2xl font-semibold mb-4">Your Activity</h2>
           <p className="text-gray-600">No recent activity.</p>
         </div>
         <div className="w-[48%] min-h-[300px] p-4 ">
           <h2 className="text-2xl font-semibold mb-4">Your Tasks</h2>
           {tasks.length === 0 ? (
             <p className="text-gray-600">No tasks assigned.</p>
           ) : (
             tasks.map(task => (
               <div key={task._id} className="border-b border-gray-200 py-2">
                 <h3 className="font-semibold">{task.title}</h3>
                 <p className="text-sm text-gray-600">Due: {new Date(task.dueDate).toLocaleString()}</p>
               </div>
             ))
           )}

         </div>
       </div>
       {/* Due Dates and deadlines section */}
        <div className="mt-6 p-4 min-h-[300px] ">
          <h2 className="text-2xl font-semibold mb-4">Due Dates & Deadlines</h2>
          <p className="text-gray-600">No upcoming due dates.</p>
        </div>
    </>
  );
}