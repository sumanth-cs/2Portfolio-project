import { HexColorPicker } from 'react-colorful';
import { useState } from 'react';
import { useTheme } from '../../contexts/ThemeContext';
import { Button } from '../ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { Label } from '../ui/label';
import { Input } from '../ui/input';

const ColorSettings = () => {
  const { colors, updateColors } = useTheme();
  const [activeColor, setActiveColor] = useState(null);

  const colorOptions = [
    { id: 'primary', label: 'Primary', desc: 'Main brand color' },
    { id: 'text-color', label: 'Text', desc: 'Primary text color' },
    { id: 'bg-color', label: 'Background', desc: 'Background color' },
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
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
          {colorOptions.map((color) => (
            <div key={color.id} className="space-y-2">
              <div
                className="w-full h-20 rounded-md cursor-pointer border border-gray-300 dark:border-gray-700"
                style={{ backgroundColor: colors[color.id] }}
                onClick={() => setActiveColor(color.id)}
              />
              <div>
                <Label className="text-text-primary-on-background">{color.label}</Label>
                <p className="text-sm text-text-secondary-on-background">{color.desc}</p>
                <p className="text-sm font-mono text-text-primary-on-background">{colors[color.id]}</p>
              </div>
            </div>
          ))}
        </div>
        {activeColor && (
          <div className="p-4 bg-surface rounded-lg">
            <Label className="font-medium text-text-primary-on-background mb-4">
              Editing: {colorOptions.find((c) => c.id === activeColor)?.label}
            </Label>
            <HexColorPicker
              color={colors[activeColor]}
              onChange={handleColorChange}
              className="mb-4"
            />
            <div className="flex items-center gap-2">
              <Input
                type="text"
                value={colors[activeColor]}
                onChange={(e) => handleColorChange(e.target.value)}
                className="px-3 py-2 text-text-primary-on-background bg-surface border-gray-300 dark:border-gray-700 rounded"
              />
              <Button onClick={() => setActiveColor(null)} className="bg-primary text-white">Done</Button>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default ColorSettings;