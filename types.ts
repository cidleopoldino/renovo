
export type TabType = 'today' | 'science' | 'soul' | 'progress';

export enum HealingPhase {
  PREPARATION = 0,
  GENTLE_CLEANSING = 1,
  CELLULAR_NOURISHMENT = 2,
  TARGETED_SUPPLEMENTATION = 3,
  METABOLIC_RESET = 4,
  RHYTHM_LIFESTYLE = 5,
}

export type TaskType = 'default' | 'nutrition' | 'tea' | 'supplements' | 'movement' | 'prayer' | 'gratitude';

export interface Task {
  id: string;
  type: TaskType;
  title: string;
  description: string;
  icon: string;
  timeOfDay: 'Morning' | 'Midday' | 'Afternoon' | 'Evening' | 'Night';
  completed: boolean;
  phase: HealingPhase;
  details?: string[]; // For checklists like vegetables
  instructions?: string; // For tea prep or tips
}

export interface ScienceCard {
  id: string;
  title: string;
  summary: string;
  detail: string;
  icon: string;
}

export interface Devotional {
  verse: string;
  reference: string;
  reflection: string;
}

export interface ProgressData {
  date: string;
  energy: number;
  sleep: number;
  digestion: boolean;
  victory: string;
  gratitude?: string;
}
