/**
 * API client for file uploads.
 */
import { apiFetch } from './api.js';

export const uploadFile = async (file) => {
    if (!file) {
        throw new Error('No file provided');
    }

    const formData = new FormData();
    formData.append('file', file);

    try {
        const response = await apiFetch('/api/upload', {
            method: 'POST',
            body: {
                body: formData,
                headers: {}
            }, // No Content-Type header to let FormData set it
        });
        return response.fileUrl;
    } catch (error) {
        console.error('Upload failed:', error);
        throw new Error(`Failed to upload file: ${error.message}`);
    }
};