import { apiRequest } from "../../api";

export default function JoinProject() {
  // fetching type project id and key from this url http://localhost:5173/join-project?type=admin&projectId=68c20a75e8db80d34bbcf34c&accessKey=djaeijo6ys8

  const params = new URLSearchParams(window.location.search);
  const type = params.get('type');
  const projectId = params.get('projectId');
  const accessKey = params.get('accessKey');
  
  // Handle Accept Invite

  const handleAcceptInvite = async () => {
    try {
      const response = apiRequest(`/api/projects/join/${projectId}`, 'POST', {
        type: type,
        passKey: accessKey,
      }, JSON.parse(localStorage.getItem('token')).token);
      console.log(response);  
      // Redirect to project page
      window.location.href = `/project/${projectId}`;
    } catch (error) {
      console.error("Error joining project:", error);
      alert("Failed to join project. Please check the link or try again later.");
    } 
  };
  
  // Accept invite frontend
  return (
    <>
    <div className="w-[95%] h-[100vh] px-6 py-5 flex flex-col items-center justify-center">
      <h1 className="text-3xl font-bold mb-4">Join Project</h1>
      <p className="mb-6">You are about to join the project with ID: <span className="font-mono">{projectId}</span> as a {type}.</p>
      <button className="bg-green-600 text-white px-4 py-2 rounded-2xl hover:bg-green-700 transition" onClick={handleAcceptInvite}> Accept Invite</button>
    </div>
    </>
  );
} 