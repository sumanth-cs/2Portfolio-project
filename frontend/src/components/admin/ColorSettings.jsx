import { HexColorPicker } from 'react-colorful';
import { useState } from 'react';
import { useTheme } from '../../contexts/ThemeContext';
import { Button } from '../ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { Label } from '../ui/label';

const ColorSettings = () => {
  const { colors, updateColors } = useTheme();
  const [activeColor, setActiveColor] = useState(null);

  const colorOptions = [
    { id: 'text', label: 'Text Color' },
    { id: 'background', label: 'Background Color' }
  ];

  const handleColorChange = (color) => {
    updateColors({ [activeColor]: color });
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Theme Colors</CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 border-gray-800">
          {colorOptions.map((color) => (
            <div key={color.id} className="space-y-2 border-gray-800">
              <div
                className="w-full h-20 rounded-md cursor-pointer border border-gray-800"
                style={{ 
                  backgroundColor: color.id === 'background' ? colors.background : colors.text,
                  borderColor: color.id === 'text' ? colors.text : colors.background
                }}
                onClick={() => setActiveColor(color.id)}
              />
              <div>
                <Label>{color.label}</Label>
                <p className="text-sm font-mono">{colors[color.id]}</p>
              </div>
            </div>
          ))}
        </div>
        
        {activeColor && (
          <div className="p-4 bg-gray-50 rounded-lg">
            <Label className="font-medium mb-4">
              Editing: {colorOptions.find(c => c.id === activeColor)?.label}
            </Label>
            <HexColorPicker
              color={colors[activeColor]}
              onChange={handleColorChange}
              className="mb-4"
            />
            <div className="flex items-center gap-2">
              <input
                type="text"
                value={colors[activeColor]}
                onChange={(e) => handleColorChange(e.target.value)}
                className="px-3 py-2 border rounded flex-1"
              />
              <Button onClick={() => setActiveColor(null)}>Done</Button>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default ColorSettings;