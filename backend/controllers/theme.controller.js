// /**
//  * Theme controller for handling theme-related operations.
//  */
// import { getTheme, updateTheme } from '../models/theme.model.js';

// export const getUserTheme = async (req, res, next) => {
//   try {
//     const theme = await getTheme(req.userId);
//     res.status(200).json({ success: true, theme: theme || {} });
//   } catch (error) {
//     next(error);
//   }
// };

// export const updateUserTheme = async (req, res, next) => {
//   try {
//     const { 'text-color': textColor, 'bg-color': bgColor } = req.body;
//     const theme = await updateTheme(req.userId, { 'text-color': textColor, 'bg-color': bgColor });
//     res.status(200).json({ success: true, theme });
//   } catch (error) {
//     next(error);
//   }
// };

// backend/controllers/theme.controller.js
import { getTheme, updateTheme } from '../models/theme.model.js';

export const getUserTheme = async (req, res, next) => {
  try {
    const theme = await getTheme(req.userId);
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
    const theme = await updateTheme(req.userId, { 
      'text-color': textColor,
      'bg-color': bgColor
    });
    res.status(200).json({ success: true, theme });
  } catch (error) {
    next(error);
  }
};