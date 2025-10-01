import { apiRequest } from "../../api";
import { useState, useEffect } from "react";

export default function loadTask(taskId) {
  const [task, setTask] = useState({});
  const projectId = JSON.parse(localStorage.getItem("currentProject"));
  const branchId = JSON.parse(localStorage.getItem("currentBranch"));
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  useEffect(() => {
    const fetchTask = async () => {
      try {
        const response = await apiRequest(`/api/projects/${projectId}/branches/${branchId}/tasks/${taskId}`, 'GET', null, JSON.parse(localStorage.getItem('token')).token);
        setTask(response);
      } catch (error) {
        setError(error);
      } finally {
        setLoading(false);
      }
    };
    fetchTask();
  }, [taskId]);
  return { task, loading, error };
}