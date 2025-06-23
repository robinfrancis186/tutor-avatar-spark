
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Slider } from '@/components/ui/slider';
import { Badge } from '@/components/ui/badge';
import { useToast } from '@/hooks/use-toast';
import { Beaker, Thermometer, Droplet } from 'lucide-react';
import { SimulationControls } from './SimulationControls';
import { ChemistryExperiment, LabSimulationProps } from '@/types/labTypes';

export const ChemistryLab: React.FC<LabSimulationProps> = ({ onExperimentComplete }) => {
  const [experiment, setExperiment] = useState<ChemistryExperiment>({
    id: 'acid-base',
    name: 'Acid-Base Reaction',
    description: 'Mix hydrochloric acid with sodium hydroxide',
    reactants: ['HCl', 'NaOH'],
    products: ['NaCl', 'H2O'],
    status: 'ready',
    temperature: 20,
    color: '#87CEEB'
  });

  const { toast } = useToast();

  const startExperiment = () => {
    setExperiment(prev => ({ ...prev, status: 'mixing' }));
    
    setTimeout(() => {
      setExperiment(prev => ({ 
        ...prev, 
        status: 'complete',
        temperature: 35,
        color: '#98FB98'
      }));
      
      toast({
        title: "Experiment Complete! 🧪",
        description: "The reaction produced salt and water with heat release.",
      });
      
      onExperimentComplete?.(experiment.id, 85);
    }, 3000);
  };

  const resetExperiment = () => {
    setExperiment(prev => ({
      ...prev,
      status: 'ready',
      temperature: 20,
      color: '#87CEEB'
    }));
  };

  const handleTemperatureChange = (value: number[]) => {
    setExperiment(prev => ({ ...prev, temperature: value[0] }));
  };

  return (
    <Card className="border-0 shadow-md">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Beaker className="w-5 h-5 text-blue-500" />
          Chemistry Laboratory
        </CardTitle>
        <p className="text-sm text-gray-600">{experiment.description}</p>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="text-center">
          <div 
            className="w-32 h-40 mx-auto rounded-b-full border-4 border-gray-300 relative overflow-hidden transition-all duration-500"
            style={{ backgroundColor: experiment.color }}
          >
            <div className="absolute top-4 left-1/2 transform -translate-x-1/2">
              <Droplet className="w-6 h-6 text-white animate-bounce" />
            </div>
            {experiment.status === 'mixing' && (
              <div className="absolute inset-0 bg-gradient-to-t from-yellow-300 to-transparent opacity-50 animate-pulse" />
            )}
          </div>
          <div className="mt-4 flex items-center justify-center gap-2">
            <Thermometer className="w-4 h-4 text-red-500" />
            <span className="font-medium">{experiment.temperature}°C</span>
          </div>
        </div>

        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium mb-2">Temperature Control</label>
            <Slider
              value={[experiment.temperature]}
              onValueChange={handleTemperatureChange}
              max={100}
              min={0}
              step={5}
              className="w-full"
              disabled={experiment.status === 'mixing'}
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <h4 className="font-medium text-gray-800 mb-2">Reactants</h4>
              <div className="space-y-1">
                {experiment.reactants.map((reactant, index) => (
                  <Badge key={index} variant="outline">{reactant}</Badge>
                ))}
              </div>
            </div>
            <div>
              <h4 className="font-medium text-gray-800 mb-2">Products</h4>
              <div className="space-y-1">
                {experiment.products.map((product, index) => (
                  <Badge key={index} variant="secondary">{product}</Badge>
                ))}
              </div>
            </div>
          </div>
        </div>

        <SimulationControls
          isRunning={experiment.status === 'mixing'}
          onStart={startExperiment}
          onPause={() => {}}
          onReset={resetExperiment}
          disabled={experiment.status === 'mixing'}
        />

        <div className="text-center">
          <Badge variant={
            experiment.status === 'ready' ? 'outline' : 
            experiment.status === 'mixing' ? 'default' : 'secondary'
          }>
            Status: {experiment.status.charAt(0).toUpperCase() + experiment.status.slice(1)}
          </Badge>
        </div>
      </CardContent>
    </Card>
  );
};
