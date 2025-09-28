// Selctor component to select members from a list of members and admins of the project not modal but just a dropdown
import { useState } from "react";
import ReactDom from "react-dom";

export default function MemberSelect({project, selectedMembers, setSelectedMembers, branch}) {
  const [isOpen, setIsOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  // If project get members and admins and if branch get members and leader and admin
  const allMembers = project ? [...project.members, ...project.admin] : branch ? [...branch.members, branch.leader] : [];

  const filteredMembers = allMembers.filter(member =>
    member.name.toLowerCase().includes(searchTerm.toLowerCase())
  );
  function toggleMember(memberId) {
    if (selectedMembers.includes(memberId)) {
      setSelectedMembers(selectedMembers.filter(id => id !== memberId));
    } else {
      setSelectedMembers([...selectedMembers, memberId]);
    }
  }

  return(
    <>
    <div className="relative w-full mb-4">
      <div className="border border-gray-300 rounded-2xl p-2 flex items-center justify-between cursor-pointer" onClick={() => setIsOpen(!isOpen)}>
        <div className="flex flex-wrap gap-2">
          {selectedMembers.length === 0 ? (
            <span className="text-gray-400">Select Members</span>
          ) : (
            selectedMembers.map(memberId => {
              const member = allMembers.find(m => m._id === memberId);  
              return member ? (
                <span key={memberId} className="bg-blue-100 text-blue-800 px-2 py-1 rounded-2xl text-sm flex items-center">
                  {member.name}
                  <button className="ml-2 text-blue-500 hover:text-blue-700" onClick={(e) => {e.stopPropagation(); toggleMember(memberId);}}>x</button>
                </span>
              ) : null;
            })
          )}
        </div>  
        <span className="text-gray-400">{isOpen ? "▲" : "▼"}</span>
      </div>
      {isOpen && (  
        <div className="absolute z-10 mt-1 w-full bg-white border border-gray-300 rounded-2xl shadow-lg max-h-60 overflow-y-auto">
          <input 
            type="text" 
            placeholder="Search Members..."
            className="w-full p-2 border-b border-gray-300 focus:outline-none"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <ul>
            {filteredMembers.map(member => (
              <li key={member._id} className="p-2 hover:bg-gray-100 cursor-pointer" onClick={() => toggleMember(member._id)}>
                {member.name}
                {selectedMembers.includes(member._id) && <span className="ml-2 text-blue-500">✓</span>}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
    </>
  )
}