import { useState, useEffect } from "react";
import { apiRequest } from "../../api";
export default function loadFolders(branchId) {
  const [folders, setFolders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchFolders = async () => {
      try {
        const response = await apiRequest(`/api/files/${branchId}/folder`, "GET", null, JSON.parse(localStorage.getItem("token")).token);
        setFolders(response);
        console.log(response);
      } catch (err) {
        setError(err);
      } finally {
        setLoading(false);
      }
    };

    fetchFolders();
  }, [branchId]);

  return { folders, loading, error };
}
