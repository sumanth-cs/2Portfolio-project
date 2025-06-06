/**
 * Appwrite configuration for frontend file storage.
 */
import { Client, Storage } from 'appwrite';

export const appwriteConfig = {
  url: import.meta.env.VITE_APPWRITE_URL,
  projectId: import.meta.env.VITE_APPWRITE_PROJECT_ID,
  bucketId: import.meta.env.VITE_APPWRITE_BUCKET_ID,
};

if (!appwriteConfig.url || !appwriteConfig.projectId || !appwriteConfig.bucketId) {
  throw new Error('Missing required Appwrite environment variables');
}

const client = new Client();
client.setEndpoint(appwriteConfig.url).setProject(appwriteConfig.projectId);

export const storage = new Storage(client);