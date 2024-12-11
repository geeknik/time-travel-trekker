export type TimePattern = {
  name: string;
  timestamp: Date;
};

export type PredictedPattern = {
  name: string;
  occurringAt: Date;
  description: string;
};

export const HEX_PATTERNS = {
  'CAFE': 'Café Time',
  'FACE': 'Face Time',
  'BABE': 'Babe Time',
  'DEAD': 'Dead Time',
  'BEEF': 'Beef Time',
  'C0DE': 'Code Time',
  'B00B': 'Boob Time',
  'FADE': 'Fade Time',
  'FEED': 'Feed Time',
  'F00D': 'Food Time',
} as const;