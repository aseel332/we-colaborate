import { useState, useEffect, useRef } from 'react';
import { apiRequest } from '../../api';
import { io } from 'socket.io-client';

export default function useConversation(taskId) {
  const [conversations, setConversations] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const branchId = JSON.parse(localStorage.getItem("currentBranch"));
  const projectId = JSON.parse(localStorage.getItem("currentProject"));

  // Keep socket instance persistent
  const socketRef = useRef(null);

  // Fetch initial conversations
  useEffect(() => {
    const fetchConversations = async () => {
      try {
        const token = JSON.parse(localStorage.getItem('token')).token;
        const response = await apiRequest(
          `/api/projects/${projectId}/branches/${branchId}/tasks/${taskId}/conversation`,
          'GET',
          null,
          token
        );
        console.log(response.messages);
        setConversations(response.messages);
      } catch (err) {
        setError(err);
      } finally {
        setLoading(false);
      }
    };

    fetchConversations();
  }, [taskId, branchId, projectId]);

  // Socket connection
  useEffect(() => {
    // Initialize socket only once
    socketRef.current = io('http://localhost:5000', {
      transports: ['websocket', 'polling'],
    });

    const socket = socketRef.current;

    // Join the conversation room
    socket.emit('joinConversation', taskId);

    // Listen for new messages
    socket.on('chat:newMessage', (message) => {
      
        console.log("Received message:", message);
        setConversations(prev => [...prev, message]);
      
    });

    return () => {
      // Leave the room and disconnect on cleanup
      socket.emit('leaveConversation', taskId);
      socket.disconnect();
    };
  }, [taskId]);

  // Send message via API
  const addConversation = async (newConversation) => {
    // Optimistic update
    
    try {
      const token = JSON.parse(localStorage.getItem('token')).token;
      const response = await apiRequest(
        `/api/projects/${projectId}/branches/${branchId}/tasks/${taskId}/conversation`,
        'POST',
        { content: newConversation.content },
        token
      );
      return response;
    } catch (err) {
      setError(err);
      console.error(err);
    }
  };

  return { conversations, loading, error, addConversation };
}
