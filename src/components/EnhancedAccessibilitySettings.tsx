
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';
import { Slider } from '@/components/ui/slider';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useToast } from '@/hooks/use-toast';
import { Volume2, Eye, Ear, Hand, Brain, Heart, Keyboard, Mouse, Monitor } from 'lucide-react';

export const EnhancedAccessibilitySettings = () => {
  const [settings, setSettings] = useState({
    // Vision Support
    highContrast: false,
    largeText: false,
    screenReader: false,
    colorBlindSupport: false,
    motionReduction: false,
    fontSize: [16],
    
    // Hearing Support
    visualCues: true,
    captionsEnabled: true,
    signLanguageSupport: false,
    hapticFeedback: false,
    
    // Motor Support
    voiceControl: false,
    eyeTracking: false,
    switchControl: false,
    stickyKeys: false,
    slowKeys: false,
    mouseSpeed: [50],
    
    // Cognitive Support
    simplifiedInterface: false,
    memoryAids: true,
    timeExtensions: true,
    stepByStepGuidance: true,
    distractionReduction: false,
    readingSpeed: [50],
    processingTime: [30],
    
    // Voice & Audio
    voiceFeedback: true,
    voiceCommands: false,
    voiceRate: [50],
    voicePitch: [50],
    voiceVolume: [70]
  });

  const { toast } = useToast();

  const handleSettingChange = (key: string, value: boolean | number[]) => {
    setSettings(prev => ({ ...prev, [key]: value }));
    toast({
      title: "Accessibility Setting Updated",
      description: `${key} has been ${Array.isArray(value) ? 'adjusted' : value ? 'enabled' : 'disabled'}.`,
    });
  };

  return (
    <Card className="border-0 shadow-md">
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-xl text-gray-800">
          <Brain className="w-6 h-6 text-purple-500" />
          Enhanced Accessibility & Inclusion Settings
        </CardTitle>
        <p className="text-sm text-gray-600">
          Comprehensive accessibility features for all learning needs and abilities
        </p>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue="vision" className="space-y-6">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="vision" className="flex items-center gap-1">
              <Eye className="w-3 h-3" />
              Vision
            </TabsTrigger>
            <TabsTrigger value="hearing" className="flex items-center gap-1">
              <Ear className="w-3 h-3" />
              Hearing
            </TabsTrigger>
            <TabsTrigger value="motor" className="flex items-center gap-1">
              <Hand className="w-3 h-3" />
              Motor
            </TabsTrigger>
            <TabsTrigger value="cognitive" className="flex items-center gap-1">
              <Brain className="w-3 h-3" />
              Cognitive
            </TabsTrigger>
          </TabsList>

          <TabsContent value="vision" className="space-y-4">
            <h3 className="font-semibold text-gray-700 flex items-center gap-2">
              <Eye className="w-4 h-4" />
              Visual Accessibility Support
            </h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="flex items-center justify-between">
                <Label htmlFor="high-contrast" className="text-sm">High contrast mode</Label>
                <Switch
                  id="high-contrast"
                  checked={settings.highContrast}
                  onCheckedChange={(checked) => handleSettingChange('highContrast', checked)}
                />
              </div>

              <div className="flex items-center justify-between">
                <Label htmlFor="large-text" className="text-sm">Large text display</Label>
                <Switch
                  id="large-text"
                  checked={settings.largeText}
                  onCheckedChange={(checked) => handleSettingChange('largeText', checked)}
                />
              </div>

              <div className="flex items-center justify-between">
                <Label htmlFor="screen-reader" className="text-sm">Screen reader support</Label>
                <Switch
                  id="screen-reader"
                  checked={settings.screenReader}
                  onCheckedChange={(checked) => handleSettingChange('screenReader', checked)}
                />
              </div>

              <div className="flex items-center justify-between">
                <Label htmlFor="color-blind" className="text-sm">Color blind friendly</Label>
                <Switch
                  id="color-blind"
                  checked={settings.colorBlindSupport}
                  onCheckedChange={(checked) => handleSettingChange('colorBlindSupport', checked)}
                />
              </div>

              <div className="flex items-center justify-between">
                <Label htmlFor="motion-reduction" className="text-sm">Reduce motion/animations</Label>
                <Switch
                  id="motion-reduction"
                  checked={settings.motionReduction}
                  onCheckedChange={(checked) => handleSettingChange('motionReduction', checked)}
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label className="text-sm">Font Size</Label>
              <Slider
                value={settings.fontSize}
                onValueChange={(value) => handleSettingChange('fontSize', value)}
                max={32}
                min={12}
                step={2}
                className="w-full"
              />
              <p className="text-xs text-gray-500">{settings.fontSize[0]}px</p>
            </div>
          </TabsContent>

          <TabsContent value="hearing" className="space-y-4">
            <h3 className="font-semibold text-gray-700 flex items-center gap-2">
              <Ear className="w-4 h-4" />
              Hearing Accessibility Support
            </h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="flex items-center justify-between">
                <Label htmlFor="visual-cues" className="text-sm">Visual sound cues</Label>
                <Switch
                  id="visual-cues"
                  checked={settings.visualCues}
                  onCheckedChange={(checked) => handleSettingChange('visualCues', checked)}
                />
              </div>

              <div className="flex items-center justify-between">
                <Label htmlFor="captions" className="text-sm">Closed captions</Label>
                <Switch
                  id="captions"
                  checked={settings.captionsEnabled}
                  onCheckedChange={(checked) => handleSettingChange('captionsEnabled', checked)}
                />
              </div>

              <div className="flex items-center justify-between">
                <Label htmlFor="sign-language" className="text-sm">Sign language interpreter</Label>
                <Switch
                  id="sign-language"
                  checked={settings.signLanguageSupport}
                  onCheckedChange={(checked) => handleSettingChange('signLanguageSupport', checked)}
                />
              </div>

              <div className="flex items-center justify-between">
                <Label htmlFor="haptic" className="text-sm">Haptic feedback</Label>
                <Switch
                  id="haptic"
                  checked={settings.hapticFeedback}
                  onCheckedChange={(checked) => handleSettingChange('hapticFeedback', checked)}
                />
              </div>
            </div>
          </TabsContent>

          <TabsContent value="motor" className="space-y-4">
            <h3 className="font-semibold text-gray-700 flex items-center gap-2">
              <Hand className="w-4 h-4" />
              Motor Accessibility Support
            </h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="flex items-center justify-between">
                <Label htmlFor="voice-control" className="text-sm">Voice control navigation</Label>
                <Switch
                  id="voice-control"
                  checked={settings.voiceControl}
                  onCheckedChange={(checked) => handleSettingChange('voiceControl', checked)}
                />
              </div>

              <div className="flex items-center justify-between">
                <Label htmlFor="eye-tracking" className="text-sm">Eye tracking support</Label>
                <Switch
                  id="eye-tracking"
                  checked={settings.eyeTracking}
                  onCheckedChange={(checked) => handleSettingChange('eyeTracking', checked)}
                />
              </div>

              <div className="flex items-center justify-between">
                <Label htmlFor="switch-control" className="text-sm">Switch control</Label>
                <Switch
                  id="switch-control"
                  checked={settings.switchControl}
                  onCheckedChange={(checked) => handleSettingChange('switchControl', checked)}
                />
              </div>

              <div className="flex items-center justify-between">
                <Label htmlFor="sticky-keys" className="text-sm">Sticky keys</Label>
                <Switch
                  id="sticky-keys"
                  checked={settings.stickyKeys}
                  onCheckedChange={(checked) => handleSettingChange('stickyKeys', checked)}
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label className="text-sm">Mouse/Pointer Speed</Label>
              <Slider
                value={settings.mouseSpeed}
                onValueChange={(value) => handleSettingChange('mouseSpeed', value)}
                max={100}
                min={10}
                step={5}
                className="w-full"
              />
              <p className="text-xs text-gray-500">{settings.mouseSpeed[0]}% speed</p>
            </div>
          </TabsContent>

          <TabsContent value="cognitive" className="space-y-4">
            <h3 className="font-semibold text-gray-700 flex items-center gap-2">
              <Brain className="w-4 h-4" />
              Cognitive & Learning Support
            </h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="flex items-center justify-between">
                <Label htmlFor="simplified" className="text-sm">Simplified interface</Label>
                <Switch
                  id="simplified"
                  checked={settings.simplifiedInterface}
                  onCheckedChange={(checked) => handleSettingChange('simplifiedInterface', checked)}
                />
              </div>

              <div className="flex items-center justify-between">
                <Label htmlFor="memory-aids" className="text-sm">Memory aids & reminders</Label>
                <Switch
                  id="memory-aids"
                  checked={settings.memoryAids}
                  onCheckedChange={(checked) => handleSettingChange('memoryAids', checked)}
                />
              </div>

              <div className="flex items-center justify-between">
                <Label htmlFor="time-extensions" className="text-sm">Extended time limits</Label>
                <Switch
                  id="time-extensions"
                  checked={settings.timeExtensions}
                  onCheckedChange={(checked) => handleSettingChange('timeExtensions', checked)}
                />
              </div>

              <div className="flex items-center justify-between">
                <Label htmlFor="step-guidance" className="text-sm">Step-by-step guidance</Label>
                <Switch
                  id="step-guidance"
                  checked={settings.stepByStepGuidance}
                  onCheckedChange={(checked) => handleSettingChange('stepByStepGuidance', checked)}
                />
              </div>

              <div className="flex items-center justify-between">
                <Label htmlFor="distraction-reduction" className="text-sm">Reduce distractions</Label>
                <Switch
                  id="distraction-reduction"
                  checked={settings.distractionReduction}
                  onCheckedChange={(checked) => handleSettingChange('distractionReduction', checked)}
                />
              </div>
            </div>

            <div className="space-y-4">
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
                <Label className="text-sm">Processing Time (seconds)</Label>
                <Slider
                  value={settings.processingTime}
                  onValueChange={(value) => handleSettingChange('processingTime', value)}
                  max={60}
                  min={10}
                  step={5}
                  className="w-full"
                />
                <p className="text-xs text-gray-500">{settings.processingTime[0]} seconds</p>
              </div>
            </div>
          </TabsContent>
        </Tabs>

        <div className="pt-6 border-t space-y-4">
          <div className="flex gap-2">
            <Button className="flex-1 hover-scale" onClick={() => {
              toast({
                title: "Accessibility Profile Saved! ♿",
                description: "Your personalized accessibility settings are now active!",
              });
            }}>
              <Heart className="w-4 h-4 mr-2" />
              Save Accessibility Profile
            </Button>
            
            <Button variant="outline" className="hover-scale" onClick={() => {
              toast({
                title: "Quick Setup Started",
                description: "Accessibility wizard will guide you through personalized setup.",
              });
            }}>
              <Monitor className="w-4 h-4 mr-2" />
              Quick Setup Wizard
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
