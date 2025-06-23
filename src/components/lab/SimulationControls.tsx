
import React from 'react';
import { Button } from '@/components/ui/button';
import { Play, Pause, RotateCcw, Save } from 'lucide-react';

interface SimulationControlsProps {
  isRunning: boolean;
  onStart: () => void;
  onPause: () => void;
  onReset: () => void;
  onSave?: () => void;
  disabled?: boolean;
}

export const SimulationControls: React.FC<SimulationControlsProps> = ({
  isRunning,
  onStart,
  onPause,
  onReset,
  onSave,
  disabled = false
}) => {
  return (
    <div className="flex gap-2 justify-center">
      <Button
        onClick={isRunning ? onPause : onStart}
        disabled={disabled}
        className="hover-scale"
      >
        {isRunning ? <Pause className="w-4 h-4 mr-2" /> : <Play className="w-4 h-4 mr-2" />}
        {isRunning ? 'Pause' : 'Start'}
      </Button>
      <Button
        onClick={onReset}
        variant="outline"
        className="hover-scale"
      >
        <RotateCcw className="w-4 h-4 mr-2" />
        Reset
      </Button>
      {onSave && (
        <Button
          onClick={onSave}
          variant="outline"
          className="hover-scale"
        >
          <Save className="w-4 h-4 mr-2" />
          Save
        </Button>
      )}
    </div>
  );
};
