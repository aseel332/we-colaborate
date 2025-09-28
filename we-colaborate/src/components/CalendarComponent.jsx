// Import necessary FullCalendar components
import { useState, useEffect } from "react";
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import interactionPlugin from '@fullcalendar/interaction';
import { formatDateForCalendar, combineDueDateTime, getStartTime } from "../utils/date";

export default function CalendarComponent({tasks}) {
  console.log("Tasks received:", tasks);
  const [events, setEvents] = useState([]);
  useEffect(() => {
    if (tasks && Array.isArray(tasks)) {
      const formattedEvents = tasks.map((task, taskIndex) => ({
        // adding making task star half an hour before the due date
        // using due time from the task
        id: taskIndex.toString(),
        title: task.title,
        // removing time from the due date
        start: combineDueDateTime(task.dueDate, task.dueTime),
        backgroundColor: task.priority === 'High' ? '#f87171' : task.priority === 'Medium' ? '#fbbf24' : '#34d399',
        borderColor: task.priority === 'High' ? '#f87171' : task.priority === 'Medium' ? '#fbbf24' : '#34d399',
        textColor: '#ffffff',
        allDay: false,
      }));
      console.log("Formatted events for calendar:", formattedEvents);
      setEvents(formattedEvents);
    }
  }, [tasks]);
  return (
    <div className="w-[80%] h-[75vh] mt-6 flex flex-col">
      <div className="flex-grow">
        <FullCalendar 
          height="100%"
          headerToolbar={{
            left: 'prev,next today',
            center: 'title',
            right: 'dayGridMonth,timeGridWeek,timeGridDay'
          }}
          
          dayCellClassNames={'bg-white h-[14vh] border border-gray-200 hover:bg-gray-100 cursor-pointer'}
          
          plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
          initialView="dayGridMonth"
          events={events}
          selectable={true}
          selectMirror={true}
          dayMaxEvents={true}
          eventClick={(info) => alert(`Event: ${info.event.title}\nDue: ${formatDateForCalendar(info.event.start)}`)}
          eventClassNames={'cursor-pointer hover:opacity-80 transition items-center justify-center flex text-center'}

          
        />
      </div>
    </div>
  );
}
