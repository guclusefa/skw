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
        const auth = useAuthStore();
        if (auth.isLoggedIn) {
            config.headers.Authorization = `Bearer ${auth.access_token}`;
        }
        return config;
    }
);

// Add a response interceptor to refresh the access token if it has expired
api.interceptors.response.use(
    function (response) {
        return response;
    },

    function (error) {
        const originalRequest = error.config;
        const auth = useAuthStore();
        if (error.response.status === 401 && auth.isLoggedIn && !originalRequest._retry) {
            originalRequest._retry = true;
            return auth.refreshToken()
                .then(() => {
                    api.defaults.headers.common['Authorization'] = 'Bearer ' + auth.access_token;
                    return api(originalRequest);
                })
                .catch(() => {
                    auth.logout();
                    return Promise.reject(error);
                });
        }
        return Promise.reject(error);
    }
);

export default api;