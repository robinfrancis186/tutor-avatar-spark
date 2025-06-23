
import React from 'react';
import { Button } from '@/components/ui/button';
import { TestTube, Zap, Microscope } from 'lucide-react';
import { LabType } from '@/types/labTypes';

interface LabSelectorProps {
  currentLab: LabType;
  onLabChange: (lab: LabType) => void;
}

export const LabSelector: React.FC<LabSelectorProps> = ({ currentLab, onLabChange }) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
      <Button
        variant={currentLab === 'chemistry' ? 'default' : 'outline'}
        onClick={() => onLabChange('chemistry')}
        className="hover-scale flex items-center gap-2"
      >
        <TestTube className="w-4 h-4" />
        Chemistry Lab
      </Button>
      <Button
        variant={currentLab === 'physics' ? 'default' : 'outline'}
        onClick={() => onLabChange('physics')}
        className="hover-scale flex items-center gap-2"
      >
        <Zap className="w-4 h-4" />
        Physics Lab
      </Button>
      <Button
        variant={currentLab === 'biology' ? 'default' : 'outline'}
        onClick={() => onLabChange('biology')}
        className="hover-scale flex items-center gap-2"
      >
        <Microscope className="w-4 h-4" />
        Biology Lab
      </Button>
    </div>
  );
};
