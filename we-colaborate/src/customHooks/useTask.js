import { useState, useEffect, use } from "react";
import { apiRequest } from "../../api";
import { io } from "socket.io-client";


export default function useTask(branchId) {
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const projectId = JSON.parse(localStorage.getItem("currentProject"));

  useEffect(() => {
    const fetchTasks = async () => {
      try {
        const response = await apiRequest(`/api/projects/${projectId}/branches/${branchId}/tasks`, 'GET', null, JSON.parse(localStorage.getItem('token')).token);
        console.log("Fetched tasks:", response);
        setTasks(response);
      } catch (err) {
        setError(err);
      } finally {
        setLoading(false);
      }
    };

    fetchTasks();
  }, []);

  useEffect(() => {
    // Initialize socket connection
    const socket = io('http://localhost:5000', {
      transports: ['websocket', 'polling'],
    });
    // Join the branch room
    socket.emit('joinTask', branchId);
    // Listen for task updates
    socket.on('branch:newTask', (newTask) => {
      console.log("Received new task via socket:", newTask);
      setTasks(prevTasks => [...prevTasks, newTask]);
    });

    return () => {
      // Leave the room and disconnect on cleanup
      socket.emit('leaveTask', branchId);
      socket.disconnect();
    };  
  }, [branchId]);

  return { tasks, loading, error };
}