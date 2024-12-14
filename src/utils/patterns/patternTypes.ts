export type TimePattern = {
  name: string;
  timestamp: Date;
  description?: string;
  type: 'mathematical' | 'sequence' | 'special' | 'astronomical' | 'numerological' | 'symmetry';
};

export type PredictedPattern = {
  name: string;
  occurringAt: Date;
  description: string;
  type: 'mathematical' | 'sequence' | 'special' | 'astronomical' | 'numerological' | 'symmetry';
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

// Mathematical patterns
export const isPerfectSquare = (n: number): boolean => {
  const sqrt = Math.sqrt(n);
  return sqrt === Math.floor(sqrt);
};

export const isTriangularNumber = (n: number): boolean => {
  const x = (Math.sqrt(8 * n + 1) - 1) / 2;
  return x === Math.floor(x);
};

export const isPentagonalNumber = (n: number): boolean => {
  const x = (Math.sqrt(24 * n + 1) + 1) / 6;
  return x === Math.floor(x);
};

// Numerological patterns
export const calculateNumerologicalNumber = (n: number): number => {
  const sum = n.toString().split('').reduce((acc, digit) => acc + parseInt(digit), 0);
  return sum > 9 ? calculateNumerologicalNumber(sum) : sum;
};

// Time symmetry patterns
export const isTimeSymmetric = (hours: number, minutes: number, seconds: number): boolean => {
  const timeStr = `${hours.toString().padStart(2, '0')}${minutes.toString().padStart(2, '0')}${seconds.toString().padStart(2, '0')}`;
  return timeStr === timeStr.split('').reverse().join('');
};

// Astronomical alignments (simplified for demo)
export const isAstronomicalAlignment = (date: Date): boolean => {
  const month = date.getMonth();
  const day = date.getDate();
  
  // Equinoxes (approximate)
  if ((month === 2 && day === 20) || (month === 8 && day === 22)) return true;
  
  // Solstices (approximate)
  if ((month === 5 && day === 21) || (month === 11 && day === 21)) return true;
  
  return false;
};