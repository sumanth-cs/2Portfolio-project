// /**
//  * Loads and validates environment variables.
//  */
// import dotenv from 'dotenv';
// import path from 'path';
// import { fileURLToPath } from 'url';

// const __filename = fileURLToPath(import.meta.url);
// const __dirname = path.dirname(__filename);

// dotenv.config({ path: path.resolve(__dirname, '../.env') });

// const requiredEnv = [
//   'MONGO_URI',
//   'JWT_SECRET',
//   'FRONTEND_URL',
// ];

// const missingEnv = requiredEnv.filter((env) => !process.env[env]);

// if (missingEnv.length > 0) {
//   throw new Error(`Missing required environment variables: ${missingEnv.join(', ')}`);
// }

// export const config = {
//   mongoUri: process.env.MONGO_URI,
//   jwtSecret: process.env.JWT_SECRET,
//   frontendUrl: process.env.FRONTEND_URL,
//   port: process.env.PORT || 5000,
// };

/**
 * Environment configuration.
 */
import dotenv from 'dotenv';
import { fileURLToPath } from 'url';
import path from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

dotenv.config({ path: path.resolve(__dirname, '../.env') });

export const config = {
  jwtSecret: process.env.JWT_SECRET,
  mongoUri: process.env.MONGO_URI,
  port: process.env.PORT || 5000,
  frontendUrl: process.env.FRONTEND_URL || 'http://localhost:5173',
};