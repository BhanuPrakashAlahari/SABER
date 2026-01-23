import { api } from './api';
import type { Application } from './jobs';

export const applicationsService = {
    getAllApplications: async (status?: string) => {
        const params = status ? { status } : {};
        const response = await api.get<{ applications: Application[] }>('/candidates/applications', { params });
        return response.data.applications;
    },

    submitApplication: async (jobId: string, coverNote?: string) => {
        const response = await api.post<{ application: Application, message: string }>('/candidates/applications', {
            job_id: jobId,
            cover_note: coverNote
        });
        return response.data;
    },

    withdrawApplication: async (applicationId: string) => {
        const response = await api.delete<{ success: boolean, message: string }>(`/candidates/applications/${applicationId}`);
        return response.data;
    }
};
