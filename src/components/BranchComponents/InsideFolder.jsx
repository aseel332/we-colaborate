import loadFiles from "../../customHooks/loadFiles";
import FileViewCard from "./FileViewCard";
import { useState } from "react";
import FileUploadModal from "./FileUploadModal";

export default function insideFolder( {folder} ) {
  const {files , loading, error} = loadFiles(null, folder._id);
  const [uploadModalOpen, setUploadModalOpen] = useState(false);


  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error loading files: {error.message}</p>;
  return (
    <>
      {uploadModalOpen && ( <FileUploadModal isOpen={uploadModalOpen} onClose={() => setUploadModalOpen(false)} folderId={folder._id} /> )}
    <div className="mb-6 flex justify-between items-center">
      <div className="flex">
        <button className="mr-4 text-2xl hover:underline" onClick={() => window.history.back()}>⬅️</button>
      <h2 className="text-2xl font-semibold mb-4">Files in {folder.name}</h2>
      </div>
      {/* Upload File button */}
      <div className="flex space-x-4">
        <input type="text" placeholder="Search files..." className="border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-600" />
        <button className="bg-blue-600 text-white px-4 py-2 rounded-2xl hover:bg-blue-700 transition" onClick={() => setUploadModalOpen(true)}>Upload File</button>
      </div>
    </div>
    <div className="flex flex-wrap gap-6">
      {files.map((file) => (
        <FileViewCard key={file._id} file={file} />
      ))}
    </div>
    </>
  )
}

