
export interface ChemistryExperiment {
  id: string;
  name: string;
  description: string;
  reactants: string[];
  products: string[];
  status: 'ready' | 'mixing' | 'complete';
  temperature: number;
  color: string;
}

export interface PhysicsExperiment {
  id: string;
  name: string;
  description: string;
  pendulumAngle: number;
  pendulumLength: number;
  gravity: number;
  isSwinging: boolean;
}

export interface BiologyExperiment {
  id: string;
  name: string;
  description: string;
  magnification: number;
  specimen: string;
  focused: boolean;
}

export type LabType = 'chemistry' | 'physics' | 'biology';

export interface LabSimulationProps {
  onExperimentComplete?: (experimentId: string, score: number) => void;
}
