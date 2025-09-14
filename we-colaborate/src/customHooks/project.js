import { useState, useEffect } from "react";
import { apiRequest } from "../../api";

export function useProject(projectId) {
  const [project, setProject] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function fetchData() {
      try {
        const token = JSON.parse(localStorage.getItem("token"))?.token;
        const projectData = await apiRequest(`/api/projects/${projectId}`, "GET", null, token);
        document.title = `We-Colaborate | ${projectData.name || 'Project'}`;
        console.log("API raw response:", projectData);

        // adjust this line depending on shape of response
        setProject(projectData?.data || projectData);
      } catch (err) {
        console.error("Error fetching project:", err);
        setError(err);
      } finally {
        setLoading(false);
      }
    }
    fetchData();
  }, [projectId]);

  return { project, loading, error };
}
