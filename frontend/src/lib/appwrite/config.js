import { Client, Storage, ID } from 'appwrite';

// Initialize the Appwrite client
const client = new Client()
  .setEndpoint(import.meta.env.VITE_APPWRITE_ENDPOINT)
  .setProject(import.meta.env.VITE_APPWRITE_PROJECT_ID);

// Initialize Storage
const storage = new Storage(client);

// Appwrite configuration
const appwriteConfig = {
  bucketId: import.meta.env.VITE_APPWRITE_BUCKET_ID,
};

export { 
  client, 
  storage,
  ID,
  appwriteConfig 
};