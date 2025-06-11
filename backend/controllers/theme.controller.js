import { getTheme, updateTheme } from '../models/theme.model.js';

export const getUserTheme = async (req, res, next) => {
  try {
    const theme = await getTheme(req.user.id);
    res.status(200).json({ 
      success: true, 
      theme: theme || {
        'text-color': '#000000',
        'bg-color': '#ffffff'
      }
    });
  } catch (error) {
    next(error);
  }
};

export const updateUserTheme = async (req, res, next) => {
  try {
    const { 'text-color': textColor, 'bg-color': bgColor } = req.body;
    
    if (!textColor || !bgColor) {
      return res.status(400).json({ 
        success: false, 
        message: 'Both text-color and bg-color are required' 
      });
    }

    const theme = await updateTheme(req.user.id, { 
      'text-color': textColor,
      'bg-color': bgColor
    });
    
    res.status(200).json({ 
      success: true, 
      theme 
    });
  } catch (error) {
    next(error);
  }
};