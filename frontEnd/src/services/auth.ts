import { getCookie } from '../utils/cookieUtils';

const API_URL = import.meta.env.VITE_API_URL || 'https://saber-api-backend.vercel.app/api';

export interface User {
    id: string;
    role: 'candidate' | 'recruiter' | 'admin';
    name: string;
    email: string;
    photo_url: string;
    created_at: string;
    // Normalized fields (computed from backend response)
    onboarding_complete?: boolean;
    auth_provider?: 'google' | 'github' | 'linkedin';
    linked_providers?: string[];
    // Raw backend fields
    oauth_accounts?: { provider: string;[key: string]: any }[];
}

export interface AuthResponse {
    token: string;
    user: User;
}

const normalizeUser = (user: any): User => {
    // Map oauth_accounts to linked_providers
    const linked = user.oauth_accounts?.map((acc: any) => acc.provider) || [];

    return {
        ...user,
        linked_providers: linked,
        // If backend doesn't give auth_provider, we might rely on localStorage or the first linked account?
        // But for safety, we leave it undefined if missing, Onboarding.tsx handles the fallback.
        auth_provider: user.auth_provider || (linked.length > 0 ? linked[0] : undefined),

        // If backend doesn't give onboarding_complete, we default to false or rely on logic
        onboarding_complete: user.onboarding_complete ?? false
    };
};

export const authService = {
    async login(provider: string, code: string, redirectUri?: string): Promise<AuthResponse> {
        const response = await fetch(`${API_URL}/auth/oauth/callback`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                provider,
                code,
                redirect_uri: redirectUri,
            }),
        });

        if (!response.ok) {
            const errorData = await response.json().catch(() => ({}));
            throw new Error(errorData.message || `Failed to authenticate with ${provider}`);
        }

        const data = await response.json();
        return {
            token: data.token,
            user: normalizeUser(data.user)
        };
    },

    async linkProvider(provider: string, code: string, redirectUri?: string): Promise<{ status: string; message: string }> {
        const token = getCookie('token');
        if (!token) throw new Error('No auth token found');

        const response = await fetch(`${API_URL}/auth/link-provider`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            },
            body: JSON.stringify({
                provider,
                code,
                redirect_uri: redirectUri,
            }),
        });

        if (!response.ok) {
            const errorData = await response.json().catch(() => ({}));
            throw new Error(errorData.message || `Failed to link ${provider}`);
        }

        return await response.json();
    },

    async me(): Promise<User> {
        const token = getCookie('token');
        if (!token) throw new Error('No auth token found');

        const response = await fetch(`${API_URL}/auth/me`, {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        });

        if (!response.ok) {
            throw new Error('Failed to fetch user session');
        }

        const user = await response.json();
        return normalizeUser(user);
    },

    // Deprecated: Alias for backward compatibility if needed, but better to use generic login
    async googleLogin(code: string, redirectUri?: string): Promise<AuthResponse> {
        return this.login('google', code, redirectUri);
    }
};
