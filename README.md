# We-Collaborate

## Overview  

This project was inspired by my own experiences working on group assignments and student-led initiatives at my university. I often found it difficult to coordinate responsibilities, track contributions, and maintain clear communication across different parts of a project. Those challenges motivated me to build a tool that could make collaboration more structured and transparent, while also giving a sense of fairness and accountability to every member involved.  

The result is a project management application where users can create projects, invite teammates through a project link, and organize work into branches that represent different departments. Each branch can have its own leader and selected members, with tasks created and assigned within that space. Users can submit files as part of their work and view tasks on an integrated calendar, making project coordination simpler and more efficient.  

## Features  

- **Project Creation & Invitations**: Start a new project and invite friends or teammates via a unique project link.  
- **Role Management**: Assign roles as project admins, branch leaders, or regular users for better collaboration.  
- **Branch System**: Organize projects into branches that represent different departments or sub-teams.  
- **Branch Leaders**: Designate leaders who can manage members, create tasks, and oversee progress.  
- **Selective Member Assignment**: Add specific users to branches based on their role in the project.  
- **Task Management**: Create, assign, and track tasks within each branch.  
- **File Submissions**: Allow users to upload files as submissions for their assigned tasks.  
- **Calendar Integration**: View tasks and deadlines in a built-in calendar for clear scheduling.
- **Real-Time Communication**: Chat with all the members in the branch or task.
- **Collaboration Made Simple**: Keep everything organized and transparent in one place, reducing miscommunication.  

## Tech Stack  

- **Frontend**: [Vite](https://vitejs.dev/) + [React](https://react.dev/) for a fast and modern development experience.  
- **Backend**: [Node.js](https://nodejs.org/) with [Express](https://expressjs.com/) for building the API and server-side logic.  
- **Database**: [MongoDB](https://www.mongodb.com/) for flexible and scalable data storage.  
- **Storage**: [Supabase](https://supabase.com/) for uploading large files and data management.  
- **Real-Time Communication**:  
  - Implemented **WebSockets** to power instant task updates and live chat functionality.  
  - Ensures that when a task is created, updated, or completed, all relevant users see the changes in real time.  
  - Enables seamless chat messaging between project members without page reloads.  
