import dotenv from 'dotenv';

dotenv.config();

const requiredEnv = [
  'APPWRITE_ENDPOINT',
  'APPWRITE_PROJECT_ID',
  'APPWRITE_API_KEY',
  'APPWRITE_DATABASE_ID',
  'APPWRITE_BIO_COLLECTION_ID',
  'APPWRITE_PORTFOLIO_COLLECTION_ID',
  'APPWRITE_BUCKET_ID',
];

requiredEnv.forEach((env) => {
  if (!process.env[env]) {
    throw new Error(`Missing required environment variable: ${env}`);
  }
});

export const config = {
  appwrite: {
    endpoint: process.env.APPWRITE_ENDPOINT,
    projectId: process.env.APPWRITE_PROJECT_ID,
    apiKey: process.env.API_KEY_WRITE,
    databaseId: process.env.APPWRITE_DATABASE_ID,
    bioCollectionId: process.env.APPWRITE_BIORE_COLLECTION_ID,
    portfolioCollectionId: process.env.APPWRITE_PORTFOLIO_COLLECTION_ID,
    bucketId: process.env.APPWRITE_BUCKET,
  },
  port: process.env.PORT || 5000,
};