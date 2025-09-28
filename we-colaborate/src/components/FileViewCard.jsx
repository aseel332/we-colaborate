export default function FileViewCard({file}) {
  // Making a card for displaying file it should have the preview of the file on top and the name of the file below it
  return (
    <div className="border cursor-pointer border-gray-300 rounded-2xl p-4 shadow-md hover:shadow-lg transition w-[300px]" onClick={() => window.open(file.url, '_blank', 'noopener,noreferrer')}>
      <div className="mb-4">
        {/* Preview of the file */}
        {/* Check the mimetype of the file and display accordingly and if its pdf display pdf logo */}
        {file.mimetype === "application/pdf" ? (
          <img src="/pdf.jpg" alt="PDF Logo" className="w-full h-[80px] object-cover rounded-lg" />
        ) : (
          <img src={file.url} alt={file.originalname} className="w-full h-[80px] object-cover rounded-lg" />
        )}
      </div>
      <h3 className="text-lg font-semibold mb-2">{file.originalname}</h3>
      <div className="flex justify-between">
        <button className="bg-blue-600 text-white px-4 py-2 rounded-2xl hover:bg-blue-700 transition" onClick={() => window.open(file.url, '_blank', 'noopener,noreferrer')}>Download</button>
      </div>
    </div>
  );
}