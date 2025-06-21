
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';
import { Slider } from '@/components/ui/slider';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useToast } from '@/hooks/use-toast';
import { Volume2, Eye, Heart, Brain, Palette, Clock } from 'lucide-react';

export const AccessibilitySettings = () => {
  const [settings, setSettings] = useState({
    voiceFeedback: true,
    visualSupport: true,
    slowPacing: false,
    highContrast: false,
    largeText: false,
    emotionalSupport: true,
    readingSpeed: [50],
    voiceVolume: [70],
    breakFrequency: [15]
  });
  
  const { toast } = useToast();

  const handleSettingChange = (key: string, value: boolean | number[]) => {
    setSettings(prev => ({ ...prev, [key]: value }));
    toast({
      title: "Settings Updated",
      description: "Your accessibility preferences have been saved.",
    });
  };

  return (
    <Card className="border-0 shadow-md">
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-xl text-gray-800">
          <Brain className="w-6 h-6 text-purple-500" />
          Accessibility & Learning Support
        </CardTitle>
        <p className="text-sm text-gray-600">
          Customize your learning experience for optimal comprehension and comfort
        </p>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Voice & Audio Settings */}
        <div className="space-y-4">
          <h3 className="font-semibold text-gray-700 flex items-center gap-2">
            <Volume2 className="w-4 h-4" />
            Voice & Audio Support
          </h3>
          
          <div className="flex items-center justify-between">
            <Label htmlFor="voice-feedback" className="text-sm">
              Enable familiar voice feedback
            </Label>
            <Switch
              id="voice-feedback"
              checked={settings.voiceFeedback}
              onCheckedChange={(checked) => handleSettingChange('voiceFeedback', checked)}
            />
          </div>

          <div className="space-y-2">
            <Label className="text-sm">Voice Volume</Label>
            <Slider
              value={settings.voiceVolume}
              onValueChange={(value) => handleSettingChange('voiceVolume', value)}
              max={100}
              step={10}
              className="w-full"
            />
            <p className="text-xs text-gray-500">{settings.voiceVolume[0]}%</p>
          </div>
        </div>

        {/* Visual Support Settings */}
        <div className="space-y-4">
          <h3 className="font-semibold text-gray-700 flex items-center gap-2">
            <Eye className="w-4 h-4" />
            Visual Support
          </h3>
          
          <div className="flex items-center justify-between">
            <Label htmlFor="visual-support" className="text-sm">
              Enhanced visual learning aids
            </Label>
            <Switch
              id="visual-support"
              checked={settings.visualSupport}
              onCheckedChange={(checked) => handleSettingChange('visualSupport', checked)}
            />
          </div>

          <div className="flex items-center justify-between">
            <Label htmlFor="high-contrast" className="text-sm">
              High contrast colors
            </Label>
            <Switch
              id="high-contrast"
              checked={settings.highContrast}
              onCheckedChange={(checked) => handleSettingChange('highContrast', checked)}
            />
          </div>

          <div className="flex items-center justify-between">
            <Label htmlFor="large-text" className="text-sm">
              Large text display
            </Label>
            <Switch
              id="large-text"
              checked={settings.largeText}
              onCheckedChange={(checked) => handleSettingChange('largeText', checked)}
            />
          </div>
        </div>

        {/* Learning Pace Settings */}
        <div className="space-y-4">
          <h3 className="font-semibold text-gray-700 flex items-center gap-2">
            <Clock className="w-4 h-4" />
            Learning Pace & Breaks
          </h3>
          
          <div className="flex items-center justify-between">
            <Label htmlFor="slow-pacing" className="text-sm">
              Slower learning pace
            </Label>
            <Switch
              id="slow-pacing"
              checked={settings.slowPacing}
              onCheckedChange={(checked) => handleSettingChange('slowPacing', checked)}
            />
          </div>

          <div className="space-y-2">
            <Label className="text-sm">Reading Speed</Label>
            <Slider
              value={settings.readingSpeed}
              onValueChange={(value) => handleSettingChange('readingSpeed', value)}
              max={100}
              min={10}
              step={10}
              className="w-full"
            />
            <p className="text-xs text-gray-500">{settings.readingSpeed[0]}% of normal speed</p>
          </div>

          <div className="space-y-2">
            <Label className="text-sm">Break Frequency (minutes)</Label>
            <Slider
              value={settings.breakFrequency}
              onValueChange={(value) => handleSettingChange('breakFrequency', value)}
              max={30}
              min={5}
              step={5}
              className="w-full"
            />
            <p className="text-xs text-gray-500">Every {settings.breakFrequency[0]} minutes</p>
          </div>
        </div>

        {/* Emotional Support Settings */}
        <div className="space-y-4">
          <h3 className="font-semibold text-gray-700 flex items-center gap-2">
            <Heart className="w-4 h-4" />
            Emotional Support
          </h3>
          
          <div className="flex items-center justify-between">
            <Label htmlFor="emotional-support" className="text-sm">
              Enable encouragement & emotional feedback
            </Label>
            <Switch
              id="emotional-support"
              checked={settings.emotionalSupport}
              onCheckedChange={(checked) => handleSettingChange('emotionalSupport', checked)}
            />
          </div>
        </div>

        <div className="pt-4 border-t">
          <Button className="w-full hover-scale" onClick={() => {
            toast({
              title: "Settings Saved! 🎯",
              description: "Your personalized learning environment is ready!",
            });
          }}>
            <Palette className="w-4 h-4 mr-2" />
            Apply All Settings
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};
