import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Slider } from '@/components/ui/slider';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { useToast } from '@/hooks/use-toast';
import { 
  TestTube, 
  Beaker, 
  Microscope, 
  Atom, 
  Zap, 
  Thermometer, 
  Droplets, 
  Eye,
  RotateCcw,
  Play,
  Pause,
  Settings,
  TrendingUp,
  AlertTriangle
} from 'lucide-react';

interface Experiment {
  id: string;
  name: string;
  subject: string;
  description: string;
  difficulty: 'Easy' | 'Medium' | 'Hard';
  duration: number;
  materials: string[];
  steps: string[];
  expectedResults: string[];
  safetyWarnings: string[];
}

interface SimulationState {
  currentStep: number;
  materials: { [key: string]: { amount: number; used: number } };
  temperature: number;
  ph: number;
  observations: string[];
  completed: boolean;
  success: boolean;
}

export const VirtualLabSimulations = () => {
  const [selectedExperiment, setSelectedExperiment] = useState<Experiment | null>(null);
  const [simulationState, setSimulationState] = useState<SimulationState | null>(null);
  const [isRunning, setIsRunning] = useState(false);
  const [timer, setTimer] = useState(0);
  const [userNotes, setUserNotes] = useState('');
  
  const { toast } = useToast();

  const experiments: Experiment[] = [
    {
      id: 'acid-base',
      name: 'Acid-Base Titration',
      subject: 'Chemistry',
      description: 'Learn about acids and bases through virtual titration',
      difficulty: 'Medium',
      duration: 15,
      materials: ['HCl Solution', 'NaOH Solution', 'Phenolphthalein', 'Burette', 'Conical Flask'],
      steps: [
        'Fill the burette with NaOH solution',
        'Add HCl solution to the conical flask',
        'Add 2-3 drops of phenolphthalein indicator',
        'Slowly add NaOH from burette while stirring',
        'Stop when solution turns pink',
        'Record the volume of NaOH used'
      ],
      expectedResults: ['Color change from clear to pink', 'Neutralization achieved', 'pH reaches 7'],
      safetyWarnings: ['Handle chemicals carefully', 'Wear safety goggles', 'Work in ventilated area']
    },
    {
      id: 'cell-division',
      name: 'Cell Division Observation',
      subject: 'Biology',
      description: 'Observe mitosis stages under virtual microscope',
      difficulty: 'Easy',
      duration: 10,
      materials: ['Onion Root Tip', 'Microscope', 'Methylene Blue Stain', 'Slides', 'Cover Slips'],
      steps: [
        'Prepare the onion root tip sample',
        'Apply methylene blue stain',
        'Place on microscope slide',
        'Start with low magnification',
        'Increase magnification to observe cells',
        'Identify different phases of mitosis'
      ],
      expectedResults: ['Clear cell boundaries', 'Visible chromosomes', 'Different mitosis phases'],
      safetyWarnings: ['Handle microscope carefully', 'Clean slides properly', 'Dispose of stains safely']
    },
    {
      id: 'pendulum',
      name: 'Simple Pendulum Physics',
      subject: 'Physics',
      description: 'Study pendulum motion and calculate gravitational acceleration',
      difficulty: 'Hard',
      duration: 20,
      materials: ['Pendulum Bob', 'String', 'Protractor', 'Stopwatch', 'Ruler', 'Stand'],
      steps: [
        'Set up pendulum with 1m string length',
        'Measure the length precisely',
        'Displace bob by 15 degrees',
        'Release and time 20 oscillations',
        'Repeat with different lengths',
        'Calculate period and g-value'
      ],
      expectedResults: ['Consistent oscillation period', 'g ≈ 9.8 m/s²', 'Linear relationship T² vs L'],
      safetyWarnings: ['Secure the pendulum stand', 'Keep clear of swinging bob', 'Handle equipment carefully']
    },
    {
      id: 'plant-growth',
      name: 'Plant Growth Factors',
      subject: 'Biology',
      description: 'Investigate how light and water affect plant growth',
      difficulty: 'Easy',
      duration: 30,
      materials: ['Seeds', 'Soil', 'Pots', 'Water', 'Light Source', 'Ruler', 'Growth Chart'],
      steps: [
        'Plant seeds in identical pots',
        'Create different light conditions',
        'Vary watering schedules',
        'Measure growth daily',
        'Record observations',
        'Analyze growth patterns'
      ],
      expectedResults: ['Different growth rates', 'Light affects growth', 'Water is essential'],
      safetyWarnings: ['Handle seeds gently', 'Keep workspace clean', 'Monitor water levels']
    }
  ];

  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (isRunning && simulationState) {
      interval = setInterval(() => {
        setTimer(prev => prev + 1);
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [isRunning, simulationState]);

  const startExperiment = (experiment: Experiment) => {
    setSelectedExperiment(experiment);
    
    // Initialize simulation state
    const materials: { [key: string]: { amount: number; used: number } } = {};
    experiment.materials.forEach(material => {
      materials[material] = { amount: 100, used: 0 };
    });

    setSimulationState({
      currentStep: 0,
      materials,
      temperature: 20,
      ph: 7,
      observations: [],
      completed: false,
      success: false
    });
    
    setTimer(0);
    setUserNotes('');
    setIsRunning(false);
    
    toast({
      title: `Starting: ${experiment.name}`,
      description: `${experiment.subject} - ${experiment.difficulty} level`,
    });
  };

  const nextStep = () => {
    if (!simulationState || !selectedExperiment) return;

    const newStep = simulationState.currentStep + 1;
    
    if (newStep >= selectedExperiment.steps.length) {
      // Experiment completed
      setSimulationState(prev => prev ? {
        ...prev,
        completed: true,
        success: Math.random() > 0.2 // 80% success rate for demo
      } : null);
      
      setIsRunning(false);
      
      toast({
        title: "Experiment Completed!",
        description: "Check your results and observations.",
      });
    } else {
      setSimulationState(prev => prev ? {
        ...prev,
        currentStep: newStep
      } : null);
      
      // Simulate some changes based on step
      simulateStepEffects(newStep);
    }
  };

  const simulateStepEffects = (step: number) => {
    if (!simulationState || !selectedExperiment) return;

    // Simulate realistic changes based on experiment type
    setTimeout(() => {
      setSimulationState(prev => {
        if (!prev) return null;
        
        const newObservations = [...prev.observations];
        let newTemperature = prev.temperature;
        let newPh = prev.ph;

        switch (selectedExperiment.id) {
          case 'acid-base':
            if (step === 3) {
              newObservations.push('Solution is clear and colorless');
              newPh = 2;
            } else if (step === 4) {
              newObservations.push('Pink color appears as base is added');
              newPh = 7;
              newTemperature = 25; // Slight temperature increase
            }
            break;
          case 'cell-division':
            if (step >= 3) {
              newObservations.push(`Magnification ${step * 100}x: Cells becoming clearer`);
            }
            break;
          case 'pendulum':
            if (step >= 2) {
              newObservations.push(`Oscillation period: ${(2 * Math.PI * Math.sqrt(1/9.8)).toFixed(2)}s`);
            }
            break;
        }

        return {
          ...prev,
          observations: newObservations,
          temperature: newTemperature,
          ph: newPh
        };
      });
    }, 1000);
  };

  const resetExperiment = () => {
    if (selectedExperiment) {
      startExperiment(selectedExperiment);
    }
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  return (
    <div className="space-y-6">
      <Card className="border-0 shadow-md bg-gradient-to-r from-blue-50 to-green-50">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-xl text-gray-800">
            <TestTube className="w-6 h-6 text-blue-500" />
            Virtual Laboratory Simulations
          </CardTitle>
          <p className="text-sm text-gray-600">
            Immersive virtual experiments with realistic simulations and safety protocols
          </p>
        </CardHeader>
      </Card>

      {!selectedExperiment ? (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {experiments.map((experiment) => (
            <Card key={experiment.id} className="border border-gray-200 hover:border-blue-300 transition-colors hover-scale">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle className="text-lg flex items-center gap-2">
                    {experiment.subject === 'Chemistry' && <Beaker className="w-5 h-5 text-blue-500" />}
                    {experiment.subject === 'Biology' && <Microscope className="w-5 h-5 text-green-500" />}
                    {experiment.subject === 'Physics' && <Atom className="w-5 h-5 text-purple-500" />}
                    {experiment.name}
                  </CardTitle>
                  <Badge variant={
                    experiment.difficulty === 'Easy' ? 'default' : 
                    experiment.difficulty === 'Medium' ? 'secondary' : 'destructive'
                  }>
                    {experiment.difficulty}
                  </Badge>
                </div>
                <p className="text-sm text-gray-600">{experiment.description}</p>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex items-center gap-4 text-sm text-gray-600">
                  <span className="flex items-center gap-1">
                    <Zap className="w-3 h-3" />
                    {experiment.subject}
                  </span>
                  <span>⏱️ {experiment.duration} min</span>
                  <span>📋 {experiment.steps.length} steps</span>
                </div>
                
                <div className="space-y-2">
                  <h4 className="font-medium text-gray-800">Materials Required:</h4>
                  <div className="flex flex-wrap gap-1">
                    {experiment.materials.slice(0, 3).map((material, index) => (
                      <Badge key={index} variant="outline" className="text-xs">
                        {material}
                      </Badge>
                    ))}
                    {experiment.materials.length > 3 && (
                      <Badge variant="outline" className="text-xs">
                        +{experiment.materials.length - 3} more
                      </Badge>
                    )}
                  </div>
                </div>

                {experiment.safetyWarnings.length > 0 && (
                  <div className="flex items-start gap-2 p-2 bg-yellow-50 rounded text-xs">
                    <AlertTriangle className="w-3 h-3 text-yellow-600 mt-0.5" />
                    <span className="text-yellow-800">
                      {experiment.safetyWarnings.length} safety considerations
                    </span>
                  </div>
                )}

                <Button
                  onClick={() => startExperiment(experiment)}
                  className="w-full hover-scale"
                >
                  <Play className="w-4 h-4 mr-2" />
                  Start Experiment
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
      ) : (
        <div className="space-y-6">
          {/* Experiment Header */}
          <Card className="border-0 shadow-md">
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle className="flex items-center gap-2">
                    {selectedExperiment.subject === 'Chemistry' && <Beaker className="w-5 h-5 text-blue-500" />}
                    {selectedExperiment.subject === 'Biology' && <Microscope className="w-5 h-5 text-green-500" />}
                    {selectedExperiment.subject === 'Physics' && <Atom className="w-5 h-5 text-purple-500" />}
                    {selectedExperiment.name}
                  </CardTitle>
                  <p className="text-sm text-gray-600">{selectedExperiment.description}</p>
                </div>
                <div className="flex items-center gap-2">
                  <Badge variant="outline">{formatTime(timer)}</Badge>
                  <Button
                    onClick={() => setSelectedExperiment(null)}
                    variant="outline"
                    size="sm"
                  >
                    ← Back
                  </Button>
                </div>
              </div>
            </CardHeader>
          </Card>

          {/* Safety Warnings */}
          {selectedExperiment.safetyWarnings.length > 0 && (
            <Card className="border-yellow-200 bg-yellow-50">
              <CardContent className="p-4">
                <div className="flex items-start gap-2">
                  <AlertTriangle className="w-5 h-5 text-yellow-600 mt-0.5" />
                  <div>
                    <h4 className="font-medium text-yellow-800">Safety Reminders</h4>
                    <ul className="text-sm text-yellow-700 mt-1 list-disc list-inside">
                      {selectedExperiment.safetyWarnings.map((warning, index) => (
                        <li key={index}>{warning}</li>
                      ))}
                    </ul>
                  </div>
                </div>
              </CardContent>
            </Card>
          )}

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Experiment Progress */}
            <Card className="border-0 shadow-md">
              <CardHeader>
                <CardTitle className="text-lg">Experiment Progress</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {simulationState && (
                  <>
                    <div className="space-y-2">
                      <div className="flex justify-between text-sm">
                        <span>Step {simulationState.currentStep + 1} of {selectedExperiment.steps.length}</span>
                        <span>{Math.round(((simulationState.currentStep + 1) / selectedExperiment.steps.length) * 100)}%</span>
                      </div>
                      <Progress value={((simulationState.currentStep + 1) / selectedExperiment.steps.length) * 100} />
                    </div>

                    <div className="p-3 bg-blue-50 rounded">
                      <h4 className="font-medium text-blue-800 mb-2">Current Step:</h4>
                      <p className="text-blue-700">
                        {selectedExperiment.steps[simulationState.currentStep] || "Experiment completed"}
                      </p>
                    </div>

                    <div className="flex gap-2">
                      <Button
                        onClick={() => setIsRunning(!isRunning)}
                        variant="outline"
                        className="hover-scale"
                        disabled={simulationState.completed}
                      >
                        {isRunning ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
                      </Button>
                      <Button
                        onClick={nextStep}
                        className="flex-1 hover-scale"
                        disabled={simulationState.completed}
                      >
                        {simulationState.currentStep >= selectedExperiment.steps.length - 1 ? "Complete" : "Next Step"}
                      </Button>
                      <Button
                        onClick={resetExperiment}
                        variant="outline"
                        className="hover-scale"
                      >
                        <RotateCcw className="w-4 h-4" />
                      </Button>
                    </div>
                  </>
                )}
              </CardContent>
            </Card>

            {/* Real-time Measurements */}
            <Card className="border-0 shadow-md">
              <CardHeader>
                <CardTitle className="text-lg flex items-center gap-2">
                  <TrendingUp className="w-5 h-5" />
                  Live Measurements
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {simulationState && (
                  <>
                    <div className="grid grid-cols-2 gap-4">
                      <div className="p-3 bg-red-50 rounded">
                        <div className="flex items-center gap-2 mb-1">
                          <Thermometer className="w-4 h-4 text-red-500" />
                          <span className="text-sm font-medium">Temperature</span>
                        </div>
                        <div className="text-lg font-bold text-red-600">
                          {simulationState.temperature}°C
                        </div>
                      </div>
                      
                      <div className="p-3 bg-purple-50 rounded">
                        <div className="flex items-center gap-2 mb-1">
                          <Droplets className="w-4 h-4 text-purple-500" />
                          <span className="text-sm font-medium">pH Level</span>
                        </div>
                        <div className="text-lg font-bold text-purple-600">
                          {simulationState.ph.toFixed(1)}
                        </div>
                      </div>
                    </div>

                    {/* Observations */}
                    <div className="space-y-2">
                      <h4 className="font-medium flex items-center gap-2">
                        <Eye className="w-4 h-4" />
                        Observations
                      </h4>
                      <div className="max-h-40 overflow-y-auto space-y-1">
                        {simulationState.observations.map((observation, index) => (
                          <div key={index} className="text-sm p-2 bg-gray-50 rounded">
                            <span className="text-gray-500">#{index + 1}:</span> {observation}
                          </div>
                        ))}
                        {simulationState.observations.length === 0 && (
                          <p className="text-sm text-gray-500 italic">No observations yet...</p>
                        )}
                      </div>
                    </div>

                    {/* Results */}
                    {simulationState.completed && (
                      <div className={`p-3 rounded ${simulationState.success ? 'bg-green-50' : 'bg-red-50'}`}>
                        <h4 className={`font-medium ${simulationState.success ? 'text-green-800' : 'text-red-800'}`}>
                          {simulationState.success ? '✅ Experiment Successful!' : '❌ Experiment Needs Improvement'}
                        </h4>
                        <p className={`text-sm ${simulationState.success ? 'text-green-700' : 'text-red-700'}`}>
                          {simulationState.success 
                            ? 'All expected results were achieved. Great work!'
                            : 'Some steps may need to be repeated. Review your procedure.'
                          }
                        </p>
                      </div>
                    )}
                  </>
                )}
              </CardContent>
            </Card>
          </div>

          {/* Lab Notes */}
          <Card className="border-0 shadow-md">
            <CardHeader>
              <CardTitle className="text-lg">Lab Notes</CardTitle>
            </CardHeader>
            <CardContent>
              <Input
                placeholder="Record your observations and thoughts about the experiment..."
                value={userNotes}
                onChange={(e) => setUserNotes(e.target.value)}
                className="w-full"
              />
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  );
};
