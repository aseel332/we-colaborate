import { useState } from "react";
import FileUploadModal from "./FileUploadModal";
import loadFiles from "../customHooks/loadFiles";
import FileViewCard from "./fileViewCard";
import CreateFolderModal from "./CreateFolderModal";
import InsideFolder from "./InsideFolder";
import loadFolders from "../customHooks/loadFolders";

export default function Files(){
  const [uploadModalOpen, setUploadModalOpen] = useState(false);
  const [createFolderModalOpen, setCreateFolderModalOpen] = useState(false);
  const [folder, setFolder] = useState(null);
  const branchId = JSON.parse(localStorage.getItem("currentBranch"));

  const {files, loading, error} = loadFiles(branchId);
  const {folders, loading: foldersLoading, error: foldersError} = loadFolders(branchId);

  if (loading || foldersLoading) return <p>Loading...</p>;
  if (error ) return <p>Error loading files: {error.message}</p>;
  if (foldersError) return <p>Error loading folders: {foldersError.message}</p>;

  if(folder) {
    return <InsideFolder folder={folder} />
  }

  return (
    <>
      {uploadModalOpen && ( <FileUploadModal isOpen={uploadModalOpen} onClose={() => setUploadModalOpen(false)} branchId={branchId} /> )}
      {createFolderModalOpen && ( <CreateFolderModal isOpen={createFolderModalOpen} onClose={() => setCreateFolderModalOpen(false)} onCreate={() => {}} /> )}
      <header className="mb-6 flex justify-between items-center">
        <div className="flex">
          <button className="mr-4 text-2xl hover:underline" onClick={() => window.history.back()}>⬅️</button>
          <h1 className="text-3xl font-bold">Files</h1>
        </div>
        <div className="flex space-x-4">
          <input type="text" placeholder="Search files..." className="border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-600" />
          <button className="bg-blue-600 text-white px-4 py-2 rounded-2xl hover:bg-blue-700 transition" onClick={() => setUploadModalOpen(true)}>Upload File</button>
          <button className="bg-green-600 text-white px-4 py-2 rounded-2xl hover:bg-green-700 transition" onClick={() => setCreateFolderModalOpen(true)}>Create Folder</button>
        </div>
      </header>
      <section>
        <h2 className="text-2xl font-semibold mb-4">Branch Resources</h2>
        {/* Folders Section */}
        <div className="flex flex-wrap gap-6 mb-8">
          <h2 className="text-2xl font-semibold mb-4 w-full">Folders</h2>
          {folders.map((folder) => (
            <div onClick={() => {setFolder(folder)}} key={folder._id} className="border border-gray-300 rounded-2xl p-4 shadow-md hover:shadow-lg transition w-40 h-40 flex flex-col items-center justify-center">
              <div className="text-6xl mb-2">📁</div>
              <h3 className="text-lg font-semibold text-center">{folder.name}</h3>
            </div>
          ))}
        </div>
        {/* Files Section */}
        <h2 className="text-2xl font-semibold mb-4">Files</h2>
        <div className="flex flex-wrap gap-6">
          {/* Example File/Folder Card */}
          {files.map((file) => (
            <FileViewCard key={file._id} file={file} />
          ))}
        </div>
      </section>
    </>
  )
}