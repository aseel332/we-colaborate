// A small box to display tasks and events

export default function TaskEventComponent({tasks, events}) {
  return (
    <div className="border border-gray-300 rounded-lg p-4 mb-4 shadow-sm hover:shadow-md transition mt-6">
      <h3 className="text-lg font-semibold mb-2">Tasks</h3>
      {tasks.length === 0 ? (<p className="text-sm text-gray-600">No upcoming tasks</p>) : tasks.map(task => (
        <div key={task.id} className="mb-2">
          <h4 className="text-md font-semibold">{task.title}</h4>
          <p className="text-sm text-gray-600">Due: {new Date(task.dueDate).toLocaleString()}</p>
        </div>
      ))}
      <h3 className="text-lg font-semibold mb-2">Events</h3>
      {events.length === 0 ? (<p className="text-sm text-gray-600">No upcoming events</p>) : events.map(event => (
        <div key={event.id} className="mb-2">
          <h4 className="text-md font-semibold">{event.title}</h4>
          <p className="text-sm text-gray-600">Start: {new Date(event.start).toLocaleString()}</p>
        </div>
      ))}
      
    </div>
  );
}
