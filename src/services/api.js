import axios from 'axios';
import { useAuthStore } from '../stores/auth.js';

// Create axios instance with base url and headers
const api = axios.create({
    baseURL: import.meta.env.VITE_API_SPOTIFY_URL,
    headers: {
        "Accept": "application/json",
        "Content-Type": "application/json",
    },
});

// Add a request interceptor to add the access token to the header
api.interceptors.request.use(
    function (config) {
        const authStore = useAuthStore();
        if (authStore.isLoggedIn) {
            config.headers.Authorization = `Bearer ${authStore.access_token}`;
        }
        return config;
    }
);

export default api;