export enum BinType {
  GREEN = 'GREEN',   // Organic/Wet
  YELLOW = 'YELLOW', // Recyclable
  RED = 'RED',       // Hazardous
  BLUE = 'BLUE',     // General
}

export interface WasteItem {
  name: string;
  thaiName: string;
  correctBin: BinType;
  explanation: string;
  emoji: string;
}

export interface GameState {
  score: number;
  streak: number;
  highScore: number;
  history: {
    item: string;
    correct: boolean;
  }[];
}

export interface FeedbackState {
  show: boolean;
  isCorrect: boolean;
  item: WasteItem | null;
  selectedBin: BinType | null;
}