import { HexColorPicker } from "react-colorful";
import { useContext, useState } from "react";
import { Button } from "../ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { Label } from "../ui/label";
import { ThemeContext } from "@/contexts/ThemeContext";

const ColorSettings = ({ currentColors, onSave }) => {
  const { colors: themeColors } = useContext(ThemeContext); // Renamed to themeColors
  const [activeColor, setActiveColor] = useState(null);
  const [localColors, setLocalColors] = useState(currentColors || themeColors); // Renamed to localColors

  const colorOptions = [
    { id: "text", label: "Text Color" },
    { id: "background", label: "Background Color" },
    { id: "primary", label: "Primary Color" },
    { id: "secondary", label: "Secondary Color" },
    { id: "accent", label: "Accent Color" },
    { id: "buttonText", label: "Button Text Color" },
  ];

  const handleColorChange = (color) => {
    setLocalColors((prev) => ({
      ...prev,
      [activeColor]: color,
    }));
  };

  const handleSave = () => {
    onSave(localColors);
    setActiveColor(null);
  };

  return (
    <Card className="bg-gray-100 dark:bg-white">
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
                  backgroundColor: localColors[color.id],
                  borderColor: localColors.text,
                }}
                onClick={() => setActiveColor(color.id)}
              />
              <div>
                <Label>{color.label}</Label>
                <p className="text-sm font-mono">{localColors[color.id]}</p>
              </div>
            </div>
          ))}
        </div>

        {activeColor && (
          <div className="p-4 rounded-lg border">
            <Label className="font-medium mb-4">
              Editing: {colorOptions.find((c) => c.id === activeColor)?.label}
            </Label>
            <HexColorPicker
              color={localColors[activeColor]}
              onChange={handleColorChange}
              className="mb-4 w-full"
            />
            <div className="flex items-center gap-2">
              <input
                type="text"
                value={localColors[activeColor]}
                onChange={(e) => handleColorChange(e.target.value)}
                className="px-3 py-2 border rounded flex-1"
              />
              <Button
                onClick={handleSave}
                style={{
                  backgroundColor: themeColors.primary,
                  color: themeColors.buttonText,
                }}
              >
                Save
              </Button>
              <Button variant="outline" onClick={() => setActiveColor(null)}>
                Cancel
              </Button>
            </div>
          </div>
        )}

        {!activeColor && (
          <Button
            onClick={() => onSave(localColors)}
            style={{
              backgroundColor: themeColors.primary,
              color: themeColors.buttonText,
            }}
          >
            Save All Colors
          </Button>
        )}
      </CardContent>
    </Card>
  );
};

export default ColorSettings;
