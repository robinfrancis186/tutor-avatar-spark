
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Slider } from '@/components/ui/slider';
import { Badge } from '@/components/ui/badge';
import { useToast } from '@/hooks/use-toast';
import { Microscope, Eye, Focus } from 'lucide-react';
import { BiologyExperiment, LabSimulationProps } from '@/types/labTypes';

export const BiologyLab: React.FC<LabSimulationProps> = ({ onExperimentComplete }) => {
  const [experiment, setExperiment] = useState<BiologyExperiment>({
    id: 'cell-observation',
    name: 'Cell Observation',
    description: 'Observe plant cells under microscope',
    magnification: 100,
    specimen: 'Onion Epidermis',
    focused: false
  });

  const { toast } = useToast();

  const specimens = ['Onion Epidermis', 'Cheek Cells', 'Leaf Cross-section', 'Blood Smear'];

  const handleMagnificationChange = (value: number[]) => {
    setExperiment(prev => ({ ...prev, magnification: value[0], focused: false }));
  };

  const focusMicroscope = () => {
    setExperiment(prev => ({ ...prev, focused: true }));
    toast({
      title: "Microscope Focused! 🔬",
      description: `Clear view of ${experiment.specimen} at ${experiment.magnification}x`,
    });
    onExperimentComplete?.(experiment.id, 80);
  };

  const changeSpecimen = (specimen: string) => {
    setExperiment(prev => ({ ...prev, specimen, focused: false }));
  };

  const getViewportContent = () => {
    if (!experiment.focused) {
      return (
        <div className="flex items-center justify-center h-full text-gray-400">
          <Focus className="w-8 h-8" />
        </div>
      );
    }

    // Simple representation based on specimen and magnification
    const cellSize = Math.max(8, 40 - (experiment.magnification / 50));
    const cellCount = Math.floor((experiment.magnification / 100) * 6);

    return (
      <div className="grid gap-1 h-full p-2" style={{ 
        gridTemplateColumns: `repeat(${Math.ceil(Math.sqrt(cellCount))}, 1fr)` 
      }}>
        {Array.from({ length: cellCount }, (_, i) => (
          <div
            key={i}
            className="bg-green-200 border border-green-400 rounded"
            style={{ minHeight: `${cellSize}px` }}
          >
            <div className="w-2 h-2 bg-green-600 rounded-full m-1" />
          </div>
        ))}
      </div>
    );
  };

  return (
    <Card className="border-0 shadow-md">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Microscope className="w-5 h-5 text-green-500" />
          Biology Laboratory
        </CardTitle>
        <p className="text-sm text-gray-600">{experiment.description}</p>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="text-center">
          <div className="w-48 h-48 mx-auto bg-black rounded-full border-8 border-gray-300 relative overflow-hidden">
            <div className="absolute inset-4 bg-white rounded-full">
              {getViewportContent()}
            </div>
            <Eye className="absolute bottom-2 right-2 w-4 h-4 text-gray-400" />
          </div>
        </div>

        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium mb-2">
              Magnification: {experiment.magnification}x
            </label>
            <Slider
              value={[experiment.magnification]}
              onValueChange={handleMagnificationChange}
              max={1000}
              min={40}
              step={50}
              className="w-full"
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">Specimen</label>
            <div className="grid grid-cols-2 gap-2">
              {specimens.map((specimen) => (
                <Button
                  key={specimen}
                  variant={experiment.specimen === specimen ? 'default' : 'outline'}
                  onClick={() => changeSpecimen(specimen)}
                  size="sm"
                  className="hover-scale"
                >
                  {specimen}
                </Button>
              ))}
            </div>
          </div>
        </div>

        <div className="text-center">
          <Button
            onClick={focusMicroscope}
            disabled={experiment.focused}
            className="hover-scale"
          >
            <Focus className="w-4 h-4 mr-2" />
            Focus Microscope
          </Button>
        </div>

        <div className="text-center">
          <Badge variant={experiment.focused ? 'default' : 'outline'}>
            {experiment.focused ? 'In Focus' : 'Needs Focusing'}
          </Badge>
        </div>
      </CardContent>
    </Card>
  );
};
