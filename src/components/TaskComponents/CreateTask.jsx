import ReactDom from 'react-dom';
import { useState } from 'react';
import MemberSelect from '../ProjectComponents/MemberSelect';
import { useBranch } from '../../customHooks/useBranch';
import { apiRequest } from '../../../api';
export default function CreateTask({ show, onClose }) {
  const [taskName, setTaskName] = useState('');
  const [description, setDescription] = useState('');
  const [dueDate, setDueDate] = useState('');
  const [priority, setPriority] = useState('Medium');
  const [selectedMembers, setSelectedMembers] = useState([]);
  const [submissionType, setSubmissionType] = useState('file');
  const [attachment, setAttachment] = useState([]);
  const [dueTime, setDueTime] = useState('');

  const branchId = JSON.parse(localStorage.getItem("currentBranch"));
  const projectId = JSON.parse(localStorage.getItem("currentProject"));

  const {branch, loading, error} = useBranch(branchId);

  if (loading) {
    return ReactDom.createPortal(<div>Loading...</div>, document.getElementById('portal'));
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    await apiRequest(`/api/projects/${projectId}/branches/${branchId}/tasks`, 'POST', {
      title: taskName,
      description,
      dueDate,
      priority,
      assignedTo: selectedMembers,
      submissionType,
      attachments: attachment,
      dueTime: dueTime
    }, JSON.parse(localStorage.getItem('token')).token);
    onClose();
    
  }
  return ReactDom.createPortal(
    <>
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 overflow-y-scroll" >  
        <div className="bg-white rounded-lg shadow-lg w-1/3">
          <div className="flex justify-between items-center border-b p-4">
            <h2 className="text-xl font-semibold">Create New Task</h2>
            <button className="text-gray-500 hover:text-gray-700" onClick={onClose}>
              &times;
            </button>
          </div>
          <form onSubmit={handleSubmit} className="p-4">
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700">Task Name</label>
              <input
                type="text"
                value={taskName}
                onChange={(e) => setTaskName(e.target.value)}
                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
                required
              />
            </div>
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700">Description</label>
              <textarea
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
                required
              />
            </div>
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700">Due Date</label>
              <input
                type="date"
                value={dueDate}
                onChange={(e) => setDueDate(e.target.value)}
                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
                required
              />
            </div>
            {/* Due time input field */}
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700">Due Time</label>
              <input
                type="time"
                value={dueTime}
                onChange={(e) => setDueTime(e.target.value)}
                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
                required
              />
            </div>
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700">Priority</label>
              <select
                value={priority}
                onChange={(e) => setPriority(e.target.value)}
                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
                required
              >
                <option value="Low">Low</option>
                <option value="Medium">Medium</option>
                <option value="High">High</option>
              </select>
            </div>
            <div className="mb-4">
              <MemberSelect selectedMembers={selectedMembers} setSelectedMembers={setSelectedMembers} branch={branch} />
            </div>
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700">Submission Type</label>
              <select
                value={submissionType}
                onChange={(e) => setSubmissionType(e.target.value)}
                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
                required
              >
                <option value="file">File</option>
                <option value="link">Link</option>
              </select>
            </div>
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700">Attachment</label>
              <input
                type="file"
                onChange={(e) => setAttachment([...attachment, e.target.files[0]])}
                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
                multiple
              />
            </div>
            <div className="flex justify-end">
              <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded-md" onClick={handleSubmit}>
                Create Task
              </button>
            </div>
          </form>
        </div>
      </div>
    </>, document.getElementById('portal'));
}
