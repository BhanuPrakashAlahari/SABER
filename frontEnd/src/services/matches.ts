import { api } from './api';
import type { Match } from './jobs';

export const matchesService = {
    getMatches: async () => {
        const response = await api.get<{ matches: Match[] }>('/matches');
        return response.data.matches;
    },

    sendMessage: async (matchId: string, content: string) => {
        return api.post('/matches/messages', { match_id: matchId, content });
    }
};
