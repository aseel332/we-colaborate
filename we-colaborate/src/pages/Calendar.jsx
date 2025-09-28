import Navbar from "../components/Navbar";
import { branchNavbarOptions } from "./Branch";
import CalendarComponent from "../components/CalendarComponent";
import useTask from "../customHooks/useTask";
import TaskEventComponent from "../components/TaskEventComponent";

export default function Calendar({tasks}) {
  
  return(
    <>
      <header className="flex justify-between items-center w-[80%]">
        <h1 className="text-3xl font-bold">Calendar</h1>
        <button className="bg-blue-600 text-white px-4 py-2 rounded-2xl hover:bg-blue-700 transition">Add Event</button>
      </header>
      {/* Calendar component */}
      <div className="flex justify-between mt-4 mb-6">
      <CalendarComponent tasks={tasks}/>
      <TaskEventComponent tasks={tasks} events={[]} />
      </div>

    
  </>
  )
}