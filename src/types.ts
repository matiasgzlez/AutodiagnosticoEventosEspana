export interface Question {
  id: number;
  text: string;
  recommendation: string;
}

export interface UserData {
  nombre: string;
  empresa: string;
  cargo: string;
  pais: string;
  correo: string;
  whatsapp?: string;
}

export interface TestResult {
  totalScore: number;
  questionScores: number[];
  recommendations: string[];
  level: 'low' | 'medium' | 'high';
  levelText: string;
  interpretation: string;
  userData?: UserData;
}

export interface TestConfig {
  questions: Question[];
  levels: {
    low: { min: number; max: number; text: string; interpretation: string };
    medium: { min: number; max: number; text: string; interpretation: string };
    high: { min: number; max: number; text: string; interpretation: string };
  };
}
