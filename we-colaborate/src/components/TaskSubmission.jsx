export default function TaskSubmission() {
  return (
    <>
    {/* Big Box to upload fines by drag or drop  or cliking the box*/}
    <h2 className="text-2xl font-semibold mb-4 mt-4">Submit Your Work</h2>
    <div className="flex flex-col mx-auto items-center justify-center border-2 border-dashed border-gray-300 rounded-2xl p-6 bg-white shadow-md hover:shadow-lg transition mt-6 w-[92%] h-64">
      <svg className="w-12 h-12 text-gray-400 mb-3" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"></path></svg>
      <p className="text-gray-600 mb-3">Drag and drop files here or click to upload</p>
      <button className="bg-blue-600 text-white px-4 py-2 rounded-2xl hover:bg-blue-700 transition">Upload Files</button>
    </div>
    {/* displaying submissions from other people in the task */}
    <section>
      <h2 className="text-2xl font-semibold mt-10 mb-4">Submissions</h2>
      <div className="space-y-4">
        {/* Example submission card */}
        <div className="border border-gray-300 rounded-lg p-4 shadow-sm hover:shadow-md transition flex justify-between items-center">
          <div>
            <p className="font-semibold">John Doe</p>
            <p className="text-gray-600">Submitted on: 2023-10-01</p>
          </div>
          <button className="bg-green-600 text-white px-4 py-2 rounded-2xl hover:bg-green-700 transition">View Submission</button>
        </div>
        {/* Add more submission cards as needed */}
      </div>
    </section>
    </>
  )
}