import { account } from '../config/appwrite.js';
import { ID } from 'appwrite';

export const createUser = async ({ name, email, password, isAdmin }) => {
  try {
    const user = await account.create(ID.unique(), email, password, name);
    if (isAdmin) {
      await account.updateLabels(user.$id, ['admin']);
    }
    return user;
  } catch (error) {
    throw new Error(`Failed to create user: ${error.message}`);
  }
};

export const getUser = async (userId) => {
  try {
    const user = await account.get(userId);
    return {
      id: user.$id,
      name: user.name,
      email: user.email,
      isAdmin: user.labels.includes('admin'),
    };
  } catch (error) {
    throw new Error(`Failed to get user: ${error.message}`);
  }
};

export const loginUser = async (email, password) => {
  try {
    await account.createEmailSession(email, password);
    const user = await account.get();
    return {
      id: user.$id,
      name: user.name,
      email: user.email,
      isAdmin: user.labels.includes('admin'),
    };
  } catch (error) {
    throw new Error(`Failed to login: ${error.message}`);
  }
};


