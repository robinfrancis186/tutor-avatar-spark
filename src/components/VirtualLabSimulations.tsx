
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { TestTube } from 'lucide-react';
import { LabSelector } from './lab/LabSelector';
import { ChemistryLab } from './lab/ChemistryLab';
import { PhysicsLab } from './lab/PhysicsLab';
import { BiologyLab } from './lab/BiologyLab';
import { LabType } from '@/types/labTypes';

export const VirtualLabSimulations = () => {
  const [currentLab, setCurrentLab] = useState<LabType>('chemistry');
  const [completedExperiments, setCompletedExperiments] = useState<string[]>([]);
  const [totalScore, setTotalScore] = useState(0);

  const handleExperimentComplete = (experimentId: string, score: number) => {
    if (!completedExperiments.includes(experimentId)) {
      setCompletedExperiments(prev => [...prev, experimentId]);
      setTotalScore(prev => prev + score);
    }
  };

  const renderCurrentLab = () => {
    switch (currentLab) {
      case 'chemistry':
        return <ChemistryLab onExperimentComplete={handleExperimentComplete} />;
      case 'physics':
        return <PhysicsLab onExperimentComplete={handleExperimentComplete} />;
      case 'biology':
        return <BiologyLab onExperimentComplete={handleExperimentComplete} />;
      default:
        return <ChemistryLab onExperimentComplete={handleExperimentComplete} />;
    }
  };

  return (
    <div className="space-y-6">
      <Card className="border-0 shadow-md bg-gradient-to-r from-blue-50 to-green-50">
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle className="flex items-center gap-2 text-xl text-gray-800">
              <TestTube className="w-6 h-6 text-blue-500" />
              Virtual Laboratory Simulations
            </CardTitle>
            <div className="flex items-center gap-2">
              <Badge variant="secondary">
                Experiments: {completedExperiments.length}
              </Badge>
              <Badge variant="secondary">
                Score: {totalScore}
              </Badge>
            </div>
          </div>
          <p className="text-sm text-gray-600">
            Conduct safe, interactive experiments in virtual lab environments
          </p>
        </CardHeader>
        <CardContent>
          <LabSelector currentLab={currentLab} onLabChange={setCurrentLab} />
        </CardContent>
      </Card>

      {renderCurrentLab()}
    </div>
  );
};
