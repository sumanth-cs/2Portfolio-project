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
    { id: 'primary', label: 'Primary', desc: 'Main brand color' },
    { id: 'secondary', label: 'Secondary', desc: 'Supporting color' },
    { id: 'accent', label: 'Accent', desc: 'Highlight color' },
    { id: 'neutral', label: 'Neutral', desc: 'Background color' },
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
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
          {colorOptions.map((color) => (
            <div key={color.id} className="space-y-2">
              <div
                className="w-full h-20 rounded-md cursor-pointer border border-neutral"
                style={{ backgroundColor: colors[color.id] }}
                onClick={() => setActiveColor(color.id)}
              />
              <div>
                <Label>{color.label}</Label>
                <p className="text-sm text-on-surface/60">{color.desc}</p>
                <p className="text-sm font-mono">{colors[color.id]}</p>
              </div>
            </div>
          ))}
        </div>
        {activeColor && (
          <div className="p-4 bg-neutral rounded-md">
            <Label className="font-medium mb-4">
              Editing: {colorOptions.find((c) => c.id === activeColor)?.label}
            </Label>
            <HexColorPicker
              color={colors[activeColor]}
              onChange={handleColorChange}
              className="mb-4"
            />
            <div className="flex items-center gap-4">
              <input
                type="text"
                value={colors[activeColor]}
                onChange={(e) => handleColorChange(e.target.value)}
                className="px-3 py-2 border border-neutral rounded-md w-full bg-surface text-on-surface"
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