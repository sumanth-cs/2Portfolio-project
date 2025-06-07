/**
 * Handles file storage operations with Appwrite on the frontend.
 */
import { ID } from 'appwrite';
import { appwriteConfig, storage } from './config';

const DEFAULT_IMG = 'https://via.placeholder.com/200';

export async function uploadFile(file) {
  if (!file) {
    throw new Error('No file provided');
  }
  try {
    const uploadedFile = await storage.createFile(
      appwriteConfig.bucketId,
      ID.unique(),
      file
    );
    const fileUrl = storage.getFileView(appwriteConfig.bucketId, uploadedFile.$id).href;
    return fileUrl;
  } catch (error) {
    console.error('Upload failed:', error);
    throw new Error(`Failed to upload file: ${error.message || 'unknown error'}`);
  }
}

export function getFileView(fileId) {
  if (!fileId) return DEFAULT_IMG;
  try {
    const fileUrl = storage.getFileView(appwriteConfig.bucketId, fileId);
    return fileUrl?.href || DEFAULT_IMG;
  } catch (error) {
    console.error('Error getting file view:', error);
    return DEFAULT_IMG;
  }
}

export async function deleteFile(fileId) {
  try {
    await storage.deleteFile(appwriteConfig.bucketId, fileId);
  } catch (error) {
    console.error('Delete file failed:', error);
    throw error;
  }
}