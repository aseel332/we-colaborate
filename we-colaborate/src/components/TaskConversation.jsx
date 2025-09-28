import useConversation from "../customHooks/useConversation";
import { getTimeFromDate } from "../utils/date";
export default function TaskConversation(){
  const taskId = JSON.parse(localStorage.getItem("currentTask"));
  const email = JSON.parse(localStorage.getItem("email"));
  const {conversations, loading, error, addConversation} = useConversation(taskId);
  function sentMessageFormatter(message, timestamp) {
    // Display messages sent by the user on the right side starting from the bottom that is already verified
    // Display Me and below it the content of the message and then below it the timestamp
    // Use a blue background with white text for the message bubble
    // Add some padding and rounded corners to the message bubble
    // Add some margin between messages
    // Align messages sent by others to the left side starting from the bottom
    // Display the sender's name and below it the content of the message and then below it the timestamp
    // Use a gray background with black text for the message bubble
    // Add some padding and rounded corners to the message bubble
    // Add some margin between messages
    return (
      <div className="flex w-full  items-end mb-4 justify-end">
        <div className="bg-gray-300 text-black p-2 rounded-lg">
          <div className="font-semibold">Me</div>
          <div>{message}</div>
          {console.log(message)}
          <div className="text-sm text-gray-500">{getTimeFromDate(timestamp)}</div>
        </div>
      </div>
    );
  }

  function receivedMessageFormatter(message, sender, timestamp) {
    return (
      <div className="flex w-full mx-auto items-start mb-4 justify-start">
        <div className="bg-gray-300 text-black p-2 rounded-lg">
          <div className="font-semibold">{sender}</div>
          <div>{message}</div>
          <div className="text-sm text-gray-500">{getTimeFromDate(timestamp)}</div>
        </div>
      </div>
    );
  }
  if (loading) {
    return <div className="w-[95%] h-[100vh] px-6 py-5 overflow-y-scroll">Loading...</div>;
  }
  return(
    <div className="border border-gray-300 rounded-lg p-4 mb-4 shadow-sm hover:shadow-md transition mt-6 h-[70vh]  relative">
      <h1 className="text-lg font-semibold mb-2">Task Conversation</h1>
      <div className=" absolute flex flex-col bottom-0 left-0 w-full p-4 bg-white">
      <div>
        {conversations.length === 0 ? (
          <p className="text-gray-600">No conversations yet. Start the discussion!</p>
        ) : (
          <div className="h-[50vh] overflow-y-scroll scrollbar-none mb-4 relative">
            {console.log(conversations)}
           {conversations.map((conv, index) => (
            <div key={index}>
              {conv.sender.email === email ? sentMessageFormatter(conv.content, conv.timestamp) : receivedMessageFormatter(conv.content, conv.sender.name, conv.timestamp)}
            </div>
           ))}
          </div>
        )}
      </div>
      <div className="mt-4 flex justify-between items-center gap-2">
        <input type="text" placeholder="Type a message..." className="w-full border border-gray-300 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"/>
        <button className="mt-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition" onClick={() => {
          const message = document.querySelector('input[type="text"]').value;
          const email = JSON.parse(localStorage.getItem("email"));
          const object = {
            content: message,
            sender: {email: email}
          }
          document.querySelector('input[type="text"]').value = "";
          addConversation(object);
        }}>Send</button>
      </div>
      </div>
    </div>
  )
}