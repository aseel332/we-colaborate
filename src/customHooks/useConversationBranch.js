import { useState, useEffect, useRef } from 'react';
import { apiRequest } from '../../api';
import { io } from 'socket.io-client';
export default function useConversationBranch(branchId) {
  const [conversations, setConversations] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const projectId = JSON.parse(localStorage.getItem("currentProject"));

  // Keep socket instance persistent
  const socketRef = useRef(null);
  // Fetch initial conversations
  useEffect(() => {
    console.log("Branch ID in hook:", branchId);
    const fetchConversations = async () => {
      console.log("Fetching conversations for branch:", branchId);
      try {
        const token = JSON.parse(localStorage.getItem('token')).token;
        const response = await apiRequest(
          `/api/projects/${projectId}/branches/${branchId}/conversation`,
          'GET',
          null,
          token
        );
        console.log("Conversation : ",response[0]);
        setConversations(response[0].messages);
      } catch (error) {
        console.error("Error fetching conversations:", error);
        setError(error);
      } finally {
        setLoading(false);
      }
    };
    fetchConversations();
  }, [branchId, projectId]);


  // Socket connection
  useEffect(() => {
    // Initialize socket only once
    socketRef.current = io('http://localhost:5000', {
      transports: ['websocket', 'polling'],
    });
    const socket = socketRef.current;
    // Join the branch room
    socket.emit('joinBranch', branchId);
    // Listen for new messages
    socket.on('chat:newBranchMessage', (message) => {
      console.log("Received message:", message);
      setConversations(prev => [...prev, message]);
    });
    return () => {
      // Leave the room and disconnect on cleanup
      socket.emit('leaveBranch', branchId);
      socket.disconnect();
    };
  }, [branchId]);

  // Function to add a new conversation message
  async function addConversation(content) {
    try {
      const token = JSON.parse(localStorage.getItem('token')).token;
      const response = await apiRequest(
        `/api/projects/${projectId}/branches/${branchId}/conversation`,
        'POST',
        { content: content.content },
        token
      );
      return response;
    } catch (error) {
      setError(error);
    }
  }

  return { conversations, loading, error, addConversation };
}