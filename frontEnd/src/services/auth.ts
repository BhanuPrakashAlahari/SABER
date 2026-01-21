
const API_URL = import.meta.env.VITE_API_URL || 'https://saber-api-backend.vercel.app';

export interface User {
    id: string;
    role: 'candidate' | 'recruiter' | 'admin';
    name: string;
    email: string;
    photo_url: string;
    created_at: string;
}

export interface AuthResponse {
    token: string;
    user: User;
}

export const authService = {
    async googleLogin(code: string, redirectUri?: string): Promise<AuthResponse> {
        try {
            const response = await fetch(`${API_URL}/auth/oauth/callback`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    provider: 'google',
                    code,
                    redirect_uri: redirectUri,
                }),
            });

            if (!response.ok) {
                const errorData = await response.json().catch(() => ({}));
                throw new Error(errorData.message || 'Failed to authenticate with Google');
            }

            return await response.json();
        } catch (error) {
            console.error('Login Error:', error);
            throw error;
        }
    }
};
