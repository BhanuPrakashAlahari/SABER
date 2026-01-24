import { api } from './api';
import type { Bookmark } from './jobs';

const BOOKMARKS_CACHE_KEY = 'api_cache_/candidates/bookmarks_{}';

export const bookmarksService = {
    getAllBookmarks: async () => {
        const response = await api.get<{ bookmarks: Bookmark[] }>('/candidates/bookmarks');
        return response.data.bookmarks;
    },

    createBookmark: async (jobId: string, notes?: string) => {
        const response = await api.post<{ bookmark: Bookmark, message: string }>('/candidates/bookmarks', {
            job_id: jobId,
            notes
        });
        localStorage.removeItem(BOOKMARKS_CACHE_KEY);
        return response.data;
    },

    deleteBookmark: async (jobId: string) => {
        const response = await api.delete<{ success: boolean, message: string }>(`/candidates/bookmarks/${jobId}`);
        localStorage.removeItem(BOOKMARKS_CACHE_KEY);
        return response.data;
    }
};
