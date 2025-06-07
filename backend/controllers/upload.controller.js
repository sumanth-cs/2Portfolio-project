/**
 * File upload controller.
 */
import { v4 as uuidv4 } from 'uuid';
import path from 'path';
import fs from 'fs/promises';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export const uploadFile = async (req, res, next) => {
  try {
    if (!req.file) {
      return res.status(400).json({ success: false, message: 'No file uploaded' });
    }
    const fileName = `${uuidv4()}-${req.file.originalname}`;
    const uploadPath = path.join(__dirname, '../../uploads', fileName);
    await fs.mkdir(path.dirname(uploadPath), { recursive: true });
    await fs.writeFile(uploadPath, req.file.buffer);
    const fileUrl = `${req.protocol}://${req.get('host')}/uploads/${fileName}`;
    res.status(200).json({ success: true, fileUrl });
  } catch (error) {
    next(error);
  }
};