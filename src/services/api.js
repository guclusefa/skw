import axios from 'axios';

// Create axios instance with base url and headers
const api = axios.create({
    baseURL: import.meta.env.VITE_API_URL,
    headers: {
        "Accept": "application/json",
        "Content-Type": "application/json",
    },
});

// set bearer token if available
const token = localStorage.getItem('token');
if (token) {
    api.defaults.headers.common['Authorization'] = `Bearer ${token}`;
}

export default api;