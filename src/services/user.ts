import { api } from './api';

export const userService = {
    setIntent: async (intent_text: string, why_text: string) => {
        return api.post('/user/intent', { intent_text, why_text });
    },

    setConstraints: async (constraints: Record<string, any>) => {
        return api.post('/user/constraints', constraints);
    }
};
