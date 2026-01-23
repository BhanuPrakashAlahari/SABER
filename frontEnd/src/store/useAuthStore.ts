import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export interface OAuthAccount {
    id: string;
    user_id: string;
    provider: string;
    provider_user_id: string;
    access_token: string | null;
    refresh_token: string | null;
    expires_at: string | null;
    raw_data_json: Record<string, any>;
}

export interface User {
    id: string;
    role: 'candidate' | 'recruiter';
    onboarding: boolean;
    intent_text?: string | null;
    why_text?: string | null;
    company_id?: string | null;
    constraints_json?: Record<string, any> | null;
    oauth_accounts?: OAuthAccount[];
    email?: string;
    name?: string;
    photo_url?: string;
}

interface AuthState {
    token: string | null;
    user: User | null;
    isAuthenticated: boolean;
    setAuth: (token: string, user: User) => void;
    updateUser: (updates: Partial<User>) => void;
    logout: () => void;
}

export const useAuthStore = create<AuthState>()(
    persist(
        (set) => ({
            token: null,
            user: null,
            isAuthenticated: false,
            setAuth: (token, user) => set({ token, user, isAuthenticated: true }),
            updateUser: (updates) => set((state) => ({
                user: state.user ? { ...state.user, ...updates } : null
            })),
            logout: () => set({ token: null, user: null, isAuthenticated: false }),
        }),
        {
            name: 'auth-storage',
        }
    )
);
