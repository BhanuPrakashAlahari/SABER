import axios from 'axios';
import { useAuthStore } from '../store/useAuthStore';

// Environment variable for API URL or default to the provided production URL
// Note: User prompt specified https://saber-api-backend.vercel.app as production base URL
const BASE_URL = import.meta.env.VITE_API_URL || 'https://saber-api-backend.vercel.app';

export const api = axios.create({
    baseURL: BASE_URL,
    headers: {
        'Content-Type': 'application/json',
    },
});

// Request Interceptor: Attach Token
api.interceptors.request.use(
    (config) => {
        const token = useAuthStore.getState().token;
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
    },
    (error) => Promise.reject(error)
);

// Response Interceptor: Handle Errors (Global 429, 401)
api.interceptors.response.use(
    (response) => response,
    (error) => {
        const status = error.response ? error.response.status : null;

        if (status === 401) {
            // Token expired or invalid
            useAuthStore.getState().logout();
            // Optional: Redirect to login is usually handled by Router usage of auth state
        } else if (status === 429) {
            // Rate Limit Reached
            // We can dispatch a global event or update a store state to show a modal
            console.error("Rate limit reached");
            // For now, we propagate the error so components can handle specific 429s (like Swipe limit)
            // or we could emit an event here.
            window.dispatchEvent(new CustomEvent('api-rate-limit'));
        }

        return Promise.reject(error);
    }
);
