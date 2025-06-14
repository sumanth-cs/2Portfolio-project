import mongoose from 'mongoose';

const themeSchema = new mongoose.Schema({
  userId: { 
    type: mongoose.Schema.Types.ObjectId, 
    ref: 'User', 
    required: true,
    unique: true 
  },
  'text-color': { 
    type: String, 
    default: '#000000',
    validate: {
      validator: (v) => /^#([0-9a-f]{3}){1,2}$/i.test(v),
      message: props => `${props.value} is not a valid hex color`
    }
  },
  'bg-color': { 
    type: String, 
    default: '#ffffff',
    validate: {
      validator: (v) => /^#([0-9a-f]{3}){1,2}$/i.test(v),
      message: props => `${props.value} is not a valid hex color`
    }
  },
  'primary-color': { 
    type: String, 
    default: '#0B1D51',
    validate: {
      validator: (v) => /^#([0-9a-f]{3}){1,2}$/i.test(v),
      message: props => `${props.value} is not a valid hex color`
    }
  },
  'secondary-color': { 
    type: String, 
    default: '#6b7280',
    validate: {
      validator: (v) => /^#([0-9a-f]{3}){1,2}$/i.test(v),
      message: props => `${props.value} is not a valid hex color`
    }
  },
  'accent-color': { 
    type: String, 
    default: '#10b981',
    validate: {
      validator: (v) => /^#([0-9a-f]{3}){1,2}$/i.test(v),
      message: props => `${props.value} is not a valid hex color`
    }
  },
  'button-text': { 
    type: String, 
    default: '#ffffff',
    validate: {
      validator: (v) => /^#([0-9a-f]{3}){1,2}$/i.test(v),
      message: props => `${props.value} is not a valid hex color`
    }
  }
}, { timestamps: true });

export const getTheme = async (userId) => {
  return await Theme.findOne({ userId });
};

export const updateTheme = async (userId, colors) => {
  return await Theme.findOneAndUpdate(
    { userId },
    { 
      'text-color': colors['text-color'] || '#000000',
      'bg-color': colors['bg-color'] || '#ffffff',
      'primary-color': colors['primary-color'] || '#0B1D51',
      'secondary-color': colors['secondary-color'] || '#6b7280',
      'accent-color': colors['accent-color'] || '#10b981',
      'button-text': colors['button-text'] || '#ffffff'
    },
    { upsert: true, new: true }
  );
};

const Theme = mongoose.model('Theme', themeSchema);
export default Theme;