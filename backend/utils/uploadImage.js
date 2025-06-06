import { storage, ID } from '../config/appwrite.js';

export const uploadImage = async (file) => {
  try {
    if (!file) {
      throw new Error('No file provided');
    }
    const uploadedFile = await storage.createFile(
      process.env.APPWRITE_BUCKET_ID,
      ID.unique(),
      file
    );
    return uploadedFile;
  } catch (error) {
    throw new Error(`Image upload failed: ${error.message}`);
  }
};

export const uploadMultipleImages = async (files) => {
  try {
    if (!files || files.length === 0) {
      throw new Error('No files provided');
    }
    const results = await Promise.all(
      files.map((file) => uploadImage(file))
    );
    return results;
  } catch (error) {
    throw new Error(`Multiple image upload failed: ${error.message}`);
  }
};