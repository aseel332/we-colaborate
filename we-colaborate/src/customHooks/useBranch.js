// getting branch details from backend using branchId
import { useState, useEffect } from "react";
import { apiRequest } from "../../api";
export function useBranch(branchId) {

  const [branch, setBranch] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const projectId = JSON.parse(localStorage.getItem("currentProject"));
  console.log("Current Project ID:", projectId);

  useEffect(() => {
    async function fetchData() {
      setLoading(true);
      try {
        const token = JSON.parse(localStorage.getItem("token"))?.token;
        const branchData = await apiRequest(`/api/projects/${projectId}/branches/${branchId}`, "GET", null, token);
        console.log("API raw response:", branchData);
        setBranch(branchData);
      } catch (err) {
        console.error("Error fetching branch:", err);
        setError(err);
      } finally {
        setLoading(false);
      } 
    }
    if (branchId) {
      fetchData();
    }
  }, [branchId]);

  return { branch, loading, error };
}