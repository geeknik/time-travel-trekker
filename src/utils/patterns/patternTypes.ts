export type TimePattern = {
  name: string;
  timestamp: Date;
  description?: string;
  type: 'mathematical' | 'sequence' | 'special' | 'astronomical' | 'symmetry' | 'prime' | 'fibonacci' | 'harmonic';
};

export type PredictedPattern = {
  name: string;
  occurringAt: Date;
  description: string;
  type: TimePattern['type'];
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

export const isFibonacciNumber = (n: number): boolean => {
  const phi = (1 + Math.sqrt(5)) / 2;
  const a = phi * n;
  return Math.abs(Math.round(a) - a) < 1e-10;
};

export const isPrime = (n: number): boolean => {
  if (n <= 1) return false;
  if (n <= 3) return true;
  if (n % 2 === 0 || n % 3 === 0) return false;
  for (let i = 5; i * i <= n; i += 6) {
    if (n % i === 0 || n % (i + 2) === 0) return false;
  }
  return true;
};

export const isHarmonicNumber = (n: number): boolean => {
  const harmonicSum = Array.from({length: n}, (_, i) => 1 / (i + 1))
    .reduce((sum, val) => sum + val, 0);
  return Math.abs(Math.round(harmonicSum) - harmonicSum) < 1e-10;
};

// Time symmetry patterns
export const isTimeSymmetric = (hours: number, minutes: number, seconds: number): boolean => {
  const timeStr = `${hours.toString().padStart(2, '0')}${minutes.toString().padStart(2, '0')}${seconds.toString().padStart(2, '0')}`;
  return timeStr === timeStr.split('').reverse().join('');
};

// Astronomical alignments (enhanced)
export const isAstronomicalAlignment = (date: Date): boolean => {
  const month = date.getMonth();
  const day = date.getDate();
  const hour = date.getHours();
  
  // Equinoxes (more precise)
  if ((month === 2 && day === 20 && hour >= 21) || 
      (month === 8 && day === 22 && hour >= 20)) return true;
  
  // Solstices (more precise)
  if ((month === 5 && day === 21 && hour >= 4) || 
      (month === 11 && day === 21 && hour >= 15)) return true;
  
  // Meteor showers peaks
  if ((month === 7 && day === 12) || // Perseids
      (month === 11 && day === 17) || // Leonids
      (month === 11 && day === 13)) return true; // Geminids
      
  // Full moons (approximate)
  if (day === Math.round(29.5309 * (month % 2))) return true;
  
  return false;
};
