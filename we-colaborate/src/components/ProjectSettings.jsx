import { useState } from "react";

export default function Settings({project}) {
  return (
    <>
    
  
      <header className="mb-6 flex justify-between">
        <div className="flex">
          <button className="mr-4 text-2xl hover:underline" onClick={() => window.history.back()}>⬅️</button>
          <h1 className="text-3xl font-bold">Settings - {project ? project.name : 'Loading...'}</h1>
        </div>
      </header>
      <section>
        <h2 className="text-2xl font-semibold mb-4">Project Settings</h2>
        <div className="bg-white p-6 rounded-2xl shadow-md">
          <div className="mb-4">
            <label className="block text-gray-700 font-semibold mb-2">Project Name</label>
            <input type="text" defaultValue={project ? project.name : ''} className="w-full border border-gray-300 rounded-2xl px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-600"/>
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 font-semibold mb-2">Description</label>
            <textarea defaultValue={project ? project.description : ''} className="w-full border border-gray-300 rounded-2xl px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-600" rows="4"></textarea>
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 font-semibold mb-2">Privacy</label>
            <select defaultValue={project ? project.privacy : 'public'} className="w-full border border-gray-300 rounded-2xl px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-600">
              <option value="public">Public</option>
              <option value="private">Private</option>
            </select>
          </div>
          <button className="bg-green-600 text-white px-4 py-2 rounded-2xl hover:bg-green-700 transition">Save Changes</button>
        </div>
      </section>
      <section className="mt-8">
        {/* admin and user links */}
        <h2 className="text-2xl font-semibold mb-4">Admin & User Links</h2>
        <div className="bg-white p-6 rounded-2xl shadow-md">
          {/* Cpoy link to clipboard */}
          <div className="mb-4">
            <label className="block text-gray-700 font-semibold mb-2">Admin Link</label>
            <div className="flex">
              <input type="text" readOnly value={project ? project.adminLink : ''} className="w-full border border-gray-300 rounded-2xl px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-600"/>
              <button className="ml-2 bg-blue-600 text-white px-4 py-2 rounded-2xl hover:bg-blue-700 transition" onClick={() => {
                navigator.clipboard.writeText(project ? project.adminLink : '');
                alert('Admin link copied to clipboard!');
              }}>Copy</button>
            </div>
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 font-semibold mb-2">User Link</label>
            <div className="flex">
              <input type="text" readOnly value={project ? project.projectLink : ''} className="w-full border border-gray-300 rounded-2xl px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-600"/>
              <button className="ml-2 bg-blue-600 text-white px-4 py-2 rounded-2xl hover:bg-blue-700 transition" onClick={() => {
                navigator.clipboard.writeText(project ? project.projectLink : '');
                alert('User link copied to clipboard!');
              }}>Copy</button>
            </div>
          </div>
          <p className="text-sm text-gray-600">Share these links with others to invite them to the project.</p>
        </div>
      </section>

  </>
  );
}