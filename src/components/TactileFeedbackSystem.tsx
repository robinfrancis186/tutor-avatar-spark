
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Slider } from '@/components/ui/slider';
import { Badge } from '@/components/ui/badge';
import { useToast } from '@/hooks/use-toast';
import { Vibrate, Zap, Hand, Waves, Settings, Play, Pause } from 'lucide-react';

interface HapticPattern {
  id: string;
  name: string;
  description: string;
  pattern: number[];
  intensity: number;
  frequency: number;
}

export const TactileFeedbackSystem = () => {
  const [isVibrationSupported, setIsVibrationSupported] = useState(false);
  const [currentPattern, setCurrentPattern] = useState<HapticPattern | null>(null);
  const [intensity, setIntensity] = useState(50);
  const [isPlaying, setIsPlaying] = useState(false);
  const [customPattern, setCustomPattern] = useState<number[]>([]);
  
  const { toast } = useToast();

  const hapticPatterns: HapticPattern[] = [
    {
      id: 'success',
      name: 'Success Celebration',
      description: 'Gentle pulsing for correct answers',
      pattern: [200, 100, 200, 100, 400],
      intensity: 30,
      frequency: 2
    },
    {
      id: 'attention',
      name: 'Attention Alert',
      description: 'Quick taps to focus attention',
      pattern: [100, 50, 100, 50, 100],
      intensity: 40,
      frequency: 3
    },
    {
      id: 'mistake',
      name: 'Gentle Correction',
      description: 'Soft buzz for incorrect attempts',
      pattern: [300, 200, 300],
      intensity: 25,
      frequency: 1
    },
    {
      id: 'texture-rough',
      name: 'Rough Texture',
      description: 'Simulates rough surface feeling',
      pattern: [50, 25, 50, 25, 50, 25, 50],
      intensity: 60,
      frequency: 8
    },
    {
      id: 'texture-smooth',
      name: 'Smooth Texture',
      description: 'Simulates smooth surface feeling',
      pattern: [500, 100, 500],
      intensity: 20,
      frequency: 1
    },
    {
      id: 'heartbeat',
      name: 'Rhythmic Pulse',
      description: 'Calming heartbeat-like rhythm',
      pattern: [100, 200, 100, 500],
      intensity: 35,
      frequency: 2
    }
  ];

  useEffect(() => {
    // Check if vibration API is supported
    setIsVibrationSupported('vibrate' in navigator);
  }, []);

  const triggerHapticFeedback = (pattern: HapticPattern) => {
    if (!isVibrationSupported) {
      toast({
        title: "Haptic Feedback Unavailable",
        description: "Your device doesn't support vibration feedback.",
      });
      return;
    }

    setCurrentPattern(pattern);
    setIsPlaying(true);

    // Scale pattern intensity based on user preference
    const scaledPattern = pattern.pattern.map(duration => 
      Math.floor(duration * (intensity / 100))
    );

    try {
      navigator.vibrate(scaledPattern);
      
      // Calculate total pattern duration
      const totalDuration = scaledPattern.reduce((sum, duration, index) => {
        return sum + duration + (index < scaledPattern.length - 1 ? 50 : 0);
      }, 0);

      setTimeout(() => {
        setIsPlaying(false);
      }, totalDuration);

      toast({
        title: `Playing: ${pattern.name}`,
        description: pattern.description,
      });
    } catch (error) {
      toast({
        title: "Haptic Error",
        description: "Failed to trigger haptic feedback.",
        variant: "destructive"
      });
    }
  };

  const createCustomPattern = () => {
    const newPattern: HapticPattern = {
      id: 'custom',
      name: 'Custom Pattern',
      description: 'User-created haptic pattern',
      pattern: customPattern.length > 0 ? customPattern : [200, 100, 200],
      intensity: intensity,
      frequency: 1
    };
    
    triggerHapticFeedback(newPattern);
  };

  const addToCustomPattern = (duration: number) => {
    if (customPattern.length < 10) {
      setCustomPattern(prev => [...prev, duration]);
    }
  };

  const clearCustomPattern = () => {
    setCustomPattern([]);
  };

  return (
    <Card className="border-0 shadow-md">
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-xl text-gray-800">
          <Hand className="w-6 h-6 text-purple-500" />
          Advanced Tactile Feedback System
        </CardTitle>
        <p className="text-sm text-gray-600">
          Enhanced haptic feedback for immersive learning experiences
        </p>
        <div className="flex items-center gap-2">
          <Badge variant={isVibrationSupported ? "default" : "secondary"}>
            {isVibrationSupported ? "Supported" : "Not Available"}
          </Badge>
          {currentPattern && isPlaying && (
            <Badge variant="outline" className="animate-pulse">
              <Waves className="w-3 h-3 mr-1" />
              Playing
            </Badge>
          )}
        </div>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Intensity Control */}
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <label className="font-medium text-gray-700">Feedback Intensity</label>
            <span className="text-sm text-gray-500">{intensity}%</span>
          </div>
          <Slider
            value={[intensity]}
            onValueChange={(value) => setIntensity(value[0])}
            max={100}
            min={10}
            step={5}
            className="w-full"
          />
        </div>

        {/* Preset Patterns */}
        <div className="space-y-3">
          <h3 className="font-medium text-gray-800 flex items-center gap-2">
            <Zap className="w-4 h-4" />
            Haptic Patterns
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {hapticPatterns.map((pattern) => (
              <Card key={pattern.id} className="border border-gray-200 hover:border-purple-300 transition-colors">
                <CardContent className="p-4">
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <h4 className="font-medium text-gray-800">{pattern.name}</h4>
                      <Badge variant="outline" className="text-xs">
                        {pattern.frequency}Hz
                      </Badge>
                    </div>
                    <p className="text-sm text-gray-600">{pattern.description}</p>
                    <Button
                      onClick={() => triggerHapticFeedback(pattern)}
                      disabled={!isVibrationSupported || isPlaying}
                      className="w-full hover-scale"
                      size="sm"
                    >
                      <Vibrate className="w-3 h-3 mr-2" />
                      Try Pattern
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Custom Pattern Builder */}
        <div className="space-y-3">
          <h3 className="font-medium text-gray-800 flex items-center gap-2">
            <Settings className="w-4 h-4" />
            Custom Pattern Builder
          </h3>
          <div className="p-4 bg-gray-50 rounded-lg space-y-3">
            <div className="flex flex-wrap gap-2">
              <Button
                onClick={() => addToCustomPattern(100)}
                variant="outline"
                size="sm"
                className="hover-scale"
              >
                Short (100ms)
              </Button>
              <Button
                onClick={() => addToCustomPattern(200)}
                variant="outline"
                size="sm"
                className="hover-scale"
              >
                Medium (200ms)
              </Button>
              <Button
                onClick={() => addToCustomPattern(400)}
                variant="outline"
                size="sm"
                className="hover-scale"
              >
                Long (400ms)
              </Button>
              <Button
                onClick={clearCustomPattern}
                variant="outline"
                size="sm"
                className="hover-scale"
              >
                Clear
              </Button>
            </div>
            
            {customPattern.length > 0 && (
              <div className="space-y-2">
                <p className="text-sm text-gray-600">
                  Pattern: {customPattern.join(' - ')}ms
                </p>
                <Button
                  onClick={createCustomPattern}
                  disabled={!isVibrationSupported || isPlaying}
                  className="hover-scale"
                  size="sm"
                >
                  <Play className="w-3 h-3 mr-2" />
                  Test Custom Pattern
                </Button>
              </div>
            )}
          </div>
        </div>

        {/* Learning Integration Examples */}
        <div className="space-y-3">
          <h3 className="font-medium text-gray-800">Learning Integration</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-2">
            <Button
              onClick={() => triggerHapticFeedback(hapticPatterns[0])}
              variant="outline"
              size="sm"
              className="hover-scale"
              disabled={!isVibrationSupported}
            >
              ✅ Correct Answer
            </Button>
            <Button
              onClick={() => triggerHapticFeedback(hapticPatterns[2])}
              variant="outline"
              size="sm"
              className="hover-scale"
              disabled={!isVibrationSupported}
            >
              ❌ Try Again
            </Button>
            <Button
              onClick={() => triggerHapticFeedback(hapticPatterns[1])}
              variant="outline"
              size="sm"
              className="hover-scale"
              disabled={!isVibrationSupported}
            >
              🔔 Pay Attention
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
