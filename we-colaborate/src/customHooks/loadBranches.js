import { useState, useEffect } from "react";
import { apiRequest } from "../../api";

export function loadBranches(projectId) {
  const [branches, setBranches] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function fetchBranches() {
      setLoading(true);
      try {
        const token = JSON.parse(localStorage.getItem("token"))?.token;
        const branchData = await apiRequest(`/api/projects/${projectId}/branches`, "GET", null, token);
        setBranches(branchData);
      } catch (err) {
        setError(err);
      } finally {
        setLoading(false);
      }
    }

    if (projectId) {
      fetchBranches();
    }
  }, [projectId]);

  return { branches, loading, error };
}
