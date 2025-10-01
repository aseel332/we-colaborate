const BASE_URL = import.meta.env.VITE_BACKEND_URL || 'http://localhost:5000';

export async function apiRequest(endpoint, method = "GET", body = null, token = null) {
    const headers = {
        'Content-Type': 'application/json',
    };
    if (token) {
        headers['Authorization'] = `${token}`;
    }

    const options = {
        method,
        headers,
       
    };

    if (body) {
        options.body = JSON.stringify(body);
    }

    const response = await fetch(`${BASE_URL}${endpoint}`, options);
    
    if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'API request failed');
    }

    return response.json();
  
}


