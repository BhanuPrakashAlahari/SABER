import { api } from './api';
import { useAuthStore } from '../store/useAuthStore';
import type { User } from '../store/useAuthStore';

interface OAuthResponse {
    token: string;
    user: User;
}

export const authService = {
    oauthCallback: async (provider: string, code: string, redirect_uri: string): Promise<OAuthResponse> => {
        const response = await api.post<OAuthResponse>('/auth/oauth/callback', {
            provider,
            code,
            redirect_uri,
        });
        return response.data;
    },

    getMe: async (): Promise<User> => {
        const response = await api.get<{ user: User }>('/auth/me');
        return response.data.user;
    },

    // Legacy support or if the backend supports manual logout call
    logout: async () => {
        useAuthStore.getState().logout();
    },

    linkProvider: async (provider: string, code: string, redirect_uri: string): Promise<{ status: string; message: string }> => {
        const response = await api.post('/auth/link-provider', {
            provider,
            code,
            redirect_uri
        });
        return response.data;
    }
};
