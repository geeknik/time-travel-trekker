export type TimePattern = {
  name: string;
  timestamp: Date;
  description?: string;
  type: 'mathematical' | 'sequence' | 'special' | 'astronomical';
};

export type PredictedPattern = {
  name: string;
  occurringAt: Date;
  description: string;
  type: 'mathematical' | 'sequence' | 'special' | 'astronomical';
};

export const HEX_PATTERNS = {
  'CAFE': { name: 'Café Time', type: 'special' },
  'FACE': { name: 'Face Time', type: 'special' },
  'BABE': { name: 'Babe Time', type: 'special' },
  'DEAD': { name: 'Dead Time', type: 'special' },
  'BEEF': { name: 'Beef Time', type: 'special' },
  'C0DE': { name: 'Code Time', type: 'special' },
  'B00B': { name: 'Boob Time', type: 'special' },
  'FADE': { name: 'Fade Time', type: 'special' },
  'FEED': { name: 'Feed Time', type: 'special' },
  'F00D': { name: 'Food Time', type: 'special' },
} as const;