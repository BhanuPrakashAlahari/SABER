import { api } from './api';
import type { Bookmark } from './jobs';

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
        return response.data;
    },

    deleteBookmark: async (jobId: string) => {
        const response = await api.delete<{ success: boolean, message: string }>(`/candidates/bookmarks/${jobId}`);
        return response.data;
    }
};
