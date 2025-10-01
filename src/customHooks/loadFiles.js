import { useState, useEffect } from "react";
import { apiRequest } from "../../api";

export default function loadFiles(branchId = null, folderId = null, taskId = null) {
  const [files, setFiles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  
  function buildUrl() {
    let url = `/api/files/`;
    if (branchId) url += `branch/${branchId}/`;
    if (folderId) url += `folder/${folderId}/`;
    if (taskId) url += `task/${taskId}/`;
    return url;
  }

  useEffect(() => {
    const fetchFiles = async () => {
      try {
        const response = await apiRequest(buildUrl(), "GET", null, JSON.parse(localStorage.getItem("token")).token);
        console.log(response);
        setFiles(response);
      } catch (err) {
        setError(err);
      } finally {
        setLoading(false);
      }
    };

    fetchFiles();
  }, [branchId]);

  return { files, loading, error };
}
