import { BinType } from './types';

export const BIN_CONFIG = {
  [BinType.GREEN]: {
    id: BinType.GREEN,
    label: 'Organic Waste',
    thaiLabel: 'ขยะเปียก (Wet)',
    colorClass: 'bg-binGreen',
    hoverClass: 'hover:bg-green-600',
    borderColor: 'border-green-700',
    textColor: 'text-green-900',
    description: 'Food scraps, leaves, vegetable peels.',
    icon: '🍃'
  },
  [BinType.YELLOW]: {
    id: BinType.YELLOW,
    label: 'Recycle',
    thaiLabel: 'ขยะรีไซเคิล',
    colorClass: 'bg-binYellow',
    hoverClass: 'hover:bg-yellow-500',
    borderColor: 'border-yellow-700',
    textColor: 'text-yellow-900',
    description: 'Glass, plastic bottles, paper, metal cans.',
    icon: '♻️'
  },
  [BinType.RED]: {
    id: BinType.RED,
    label: 'Hazardous',
    thaiLabel: 'ขยะอันตราย',
    colorClass: 'bg-binRed',
    hoverClass: 'hover:bg-red-600',
    borderColor: 'border-red-700',
    textColor: 'text-red-900',
    description: 'Batteries, light bulbs, spray cans, chemicals.',
    icon: '☣️'
  },
  [BinType.BLUE]: {
    id: BinType.BLUE,
    label: 'General Waste',
    thaiLabel: 'ขยะทั่วไป',
    colorClass: 'bg-binBlue',
    hoverClass: 'hover:bg-blue-600',
    borderColor: 'border-blue-700',
    textColor: 'text-blue-900',
    description: 'Snack wrappers, foam boxes, dirty plastic bags.',
    icon: '🗑️'
  }
};

export const INITIAL_GAME_STATE = {
  score: 0,
  streak: 0,
  highScore: 0,
  history: []
};
