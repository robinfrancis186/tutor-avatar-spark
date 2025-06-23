
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Slider } from '@/components/ui/slider';
import { Badge } from '@/components/ui/badge';
import { useToast } from '@/hooks/use-toast';
import { Zap, Weight } from 'lucide-react';
import { SimulationControls } from './SimulationControls';
import { PhysicsExperiment, LabSimulationProps } from '@/types/labTypes';

export const PhysicsLab: React.FC<LabSimulationProps> = ({ onExperimentComplete }) => {
  const [experiment, setExperiment] = useState<PhysicsExperiment>({
    id: 'pendulum',
    name: 'Simple Pendulum',
    description: 'Study oscillatory motion and period calculation',
    pendulumAngle: 30,
    pendulumLength: 50,
    gravity: 9.81,
    isSwinging: false
  });

  const { toast } = useToast();

  useEffect(() => {
    if (experiment.isSwinging) {
      const interval = setInterval(() => {
        setExperiment(prev => ({
          ...prev,
          pendulumAngle: prev.pendulumAngle * -0.95
        }));
      }, 100);

      return () => clearInterval(interval);
    }
  }, [experiment.isSwinging]);

  const startExperiment = () => {
    setExperiment(prev => ({ ...prev, isSwinging: true }));
    
    setTimeout(() => {
      setExperiment(prev => ({ ...prev, isSwinging: false }));
      toast({
        title: "Physics Simulation Complete! ⚡",
        description: `Period: ${(2 * Math.PI * Math.sqrt(experiment.pendulumLength / 100 / experiment.gravity)).toFixed(2)}s`,
      });
      onExperimentComplete?.(experiment.id, 90);
    }, 5000);
  };

  const resetExperiment = () => {
    setExperiment(prev => ({
      ...prev,
      isSwinging: false,
      pendulumAngle: 30
    }));
  };

  const handleLengthChange = (value: number[]) => {
    if (!experiment.isSwinging) {
      setExperiment(prev => ({ ...prev, pendulumLength: value[0] }));
    }
  };

  const handleAngleChange = (value: number[]) => {
    if (!experiment.isSwinging) {
      setExperiment(prev => ({ ...prev, pendulumAngle: value[0] }));
    }
  };

  return (
    <Card className="border-0 shadow-md">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Zap className="w-5 h-5 text-yellow-500" />
          Physics Laboratory
        </CardTitle>
        <p className="text-sm text-gray-600">{experiment.description}</p>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="text-center">
          <div className="relative w-64 h-64 mx-auto bg-gray-50 rounded-lg overflow-hidden">
            <div className="absolute top-4 left-1/2 w-1 bg-gray-800 transform -translate-x-1/2"
                 style={{ height: `${experiment.pendulumLength}%` }} />
            <div 
              className="absolute w-6 h-6 bg-blue-500 rounded-full transform transition-transform duration-100"
              style={{ 
                top: `${4 + experiment.pendulumLength}%`,
                left: '50%',
                transform: `translateX(-50%) rotate(${experiment.pendulumAngle}deg) translateY(-50%)`,
                transformOrigin: `50% -${experiment.pendulumLength * 2}px`
              }}
            />
            <Weight className="absolute bottom-2 right-2 w-4 h-4 text-gray-400" />
          </div>
        </div>

        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium mb-2">
              Pendulum Length: {experiment.pendulumLength}%
            </label>
            <Slider
              value={[experiment.pendulumLength]}
              onValueChange={handleLengthChange}
              max={80}
              min={20}
              step={5}
              className="w-full"
              disabled={experiment.isSwinging}
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">
              Initial Angle: {experiment.pendulumAngle}°
            </label>
            <Slider
              value={[Math.abs(experiment.pendulumAngle)]}
              onValueChange={handleAngleChange}
              max={60}
              min={10}
              step={5}
              className="w-full"
              disabled={experiment.isSwinging}
            />
          </div>

          <div className="text-center">
            <Badge variant="outline">
              Gravity: {experiment.gravity} m/s²
            </Badge>
          </div>
        </div>

        <SimulationControls
          isRunning={experiment.isSwinging}
          onStart={startExperiment}
          onPause={() => {}}
          onReset={resetExperiment}
          disabled={experiment.isSwinging}
        />

        <div className="text-center">
          <Badge variant={experiment.isSwinging ? 'default' : 'outline'}>
            {experiment.isSwinging ? 'Swinging' : 'Ready'}
          </Badge>
        </div>
      </CardContent>
    </Card>
  );
};
