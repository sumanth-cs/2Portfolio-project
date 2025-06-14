import { HexColorPicker } from 'react-colorful';
import { useState } from 'react';
import { Button } from '../ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { Label } from '../ui/label';

const ColorSettings = ({ currentColors, onSave }) => {
  const [activeColor, setActiveColor] = useState(null);
  const [colors, setColors] = useState(currentColors);

  const colorOptions = [
    { id: 'text', label: 'Text Color' },
    { id: 'background', label: 'Background Color' },
    { id: 'primary', label: 'Primary Color' },
    { id: 'secondary', label: 'Secondary Color' },
    { id: 'accent', label: 'Accent Color' },
    { id: 'buttonText', label: 'Button Text Color' }
  ];

  const handleColorChange = (color) => {
    setColors(prev => ({
      ...prev,
      [activeColor]: color
    }));
  };

  const handleSave = () => {
    onSave(colors);
    setActiveColor(null);
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Theme Colors</CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
          {colorOptions.map((color) => (
            <div key={color.id} className="space-y-2">
              <div
                className="w-full h-20 rounded-md cursor-pointer border"
                style={{ 
                  backgroundColor: colors[color.id],
                  borderColor: colors.text
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
          <div className="p-4 rounded-lg border">
            <Label className="font-medium mb-4">
              Editing: {colorOptions.find(c => c.id === activeColor)?.label}
            </Label>
            <HexColorPicker
              color={colors[activeColor]}
              onChange={handleColorChange}
              className="mb-4 w-full"
            />
            <div className="flex items-center gap-2">
              <input
                type="text"
                value={colors[activeColor]}
                onChange={(e) => handleColorChange(e.target.value)}
                className="px-3 py-2 border rounded flex-1"
              />
              <Button onClick={handleSave}>Save</Button>
              <Button variant="outline" onClick={() => setActiveColor(null)}>
                Cancel
              </Button>
            </div>
          </div>
        )}

        {!activeColor && (
          <Button onClick={() => onSave(colors)}>
            Save All Colors
          </Button>
        )}
      </CardContent>
    </Card>
  );
};

export default ColorSettings;