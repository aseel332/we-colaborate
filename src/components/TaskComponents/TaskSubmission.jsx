import FileUploadModal from "../BranchComponents/FileUploadModal";
import { useState } from "react";
import loadFiles from "../../customHooks/loadFiles";

export default function TaskSubmission() {
  const [uploadModalOpen, setUploadModalOpen] = useState(false);
  const taskId = JSON.parse(localStorage.getItem("currentTask"));
  const {files, loading, error} = loadFiles(null, null, taskId);
  console.log("Current Task ID:", taskId);

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <>
    {uploadModalOpen && ( <FileUploadModal isOpen={uploadModalOpen} onClose={() => setUploadModalOpen(false)} taskId={taskId} /> )}
    {/* Big Box to upload fines by drag or drop  or cliking the box*/}
    <h2 className="text-2xl font-semibold mb-4 mt-4">Submit Your Work</h2>
    <div className="flex flex-col mx-auto items-center justify-center border-2 border-dashed border-gray-300 rounded-2xl p-6 bg-white shadow-md hover:shadow-lg transition mt-6 w-[92%] h-64">
      <svg className="w-12 h-12 text-gray-400 mb-3" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"></path></svg>
      <p className="text-gray-600 mb-3">Drag and drop files here or click to upload</p>
      <button className="bg-blue-600 text-white px-4 py-2 rounded-2xl hover:bg-blue-700 transition" onClick={() => setUploadModalOpen(true)}>Upload Files</button>
    </div>
    {/* displaying submissions from other people in the task */}
    <section>
      <h2 className="text-2xl font-semibold mt-10 mb-4">Submissions</h2>
      <div className="space-y-4">
        {/* Example submission card */}
        {files.map((file) => (
          <div key={file._id} className="border border-gray-300 rounded-2xl p-4 shadow-md hover:shadow-lg transition flex justify-between items-center">
            <div className="flex items-center">
              <div className="text-4xl mr-4">📄</div>
              <div>
                <h3 className="text-lg font-semibold">{file.createdBy.name}</h3>
                <div className="text-sm text-gray-600">{file.name}</div>
              </div>
            </div>
            <div className="text-right">
              <a href={file.url} target="_blank" rel="noopener noreferrer" className="bg-green-600 text-white px-4 py-2 rounded-2xl hover:bg-green-700 transition">View File</a>
              <p className="text-sm text-gray-600">Uploaded on {new Date(file.createdAt).toLocaleDateString()}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
    </>
  )
}