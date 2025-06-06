import { storage, ID, appwriteConfig } from './config';
// import defaultImg from "../../assets/RHD-defaultImg.png"

export const uploadFile = async (file) => {
  try {
    if (!file) {
      throw new Error('No file provided');
    }

    // //console.log('Uploading file to bucket:', appwriteConfig.bucketId);
    const uploadedFile = await storage.createFile(
      appwriteConfig.bucketId,
      ID.unique(),
      file
    );
    // //console.log('File uploaded successfully:', uploadedFile.$id);
    return uploadedFile;
  } catch (error) {
    console.error('Upload failed:', error);
    throw new Error(`Failed to upload file: ${error.message}`);
  }
};

export const uploadMultipleFiles = async (files) => {
  try {
    if (!files || files.length === 0) {
      throw new Error('No files provided');
    }

    const results = await Promise.all(
      files.map(file => {
        if (!file) {
          console.warn('Skipping undefined file');
          return null;
        }
        return uploadFile(file);
      })
    );

    return results.filter(result => result !== null);
  } catch (error) {
    console.error('Multiple upload failed:', error);
    throw error;
  }
};

export function getFileView(fileId) {

  if (!fileId) return defaultImg;

  try {
    const fileUrl = storage.getFileView(
      appwriteConfig.bucketId,
      fileId
    );
    return fileUrl || defaultImg;
  } catch (error) {
    console.error("Error getting file view:", error);
    return defaultImg;
  }
}

// Similar for preview if needed
export function getFilePreview(fileId, width = 200, height = 200) {
  try {
    const fileUrl = storage.getFilePreview(
      appwriteConfig.bucketId,
      fileId,
      width,
      height
    );
    if (!fileUrl) throw new Error("Failed to generate preview URL");
    return fileUrl;
  } catch (error) {
    console.error("Error getting file preview:", error);
    return null;
  }
}

export async function deleteFile(fileId) {
  try {
    await storage.deleteFile(appwriteConfig.bucketId, fileId);
  } catch (error) {
    console.error("Delete file failed:", error);
    throw error;
  }
}