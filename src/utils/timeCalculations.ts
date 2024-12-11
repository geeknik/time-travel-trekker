export const calculatePhiTime = (date: Date): string => {
  const totalSeconds = date.getHours() * 3600 + date.getMinutes() * 60 + date.getSeconds();
  const phiTime = (totalSeconds / 86400) * Math.PI * 1.618033988749895;
  return phiTime.toFixed(6);
};

export const calculatePiTime = (date: Date): string => {
  const totalSeconds = date.getHours() * 3600 + date.getMinutes() * 60 + date.getSeconds();
  const piTime = (totalSeconds / 86400) * Math.PI * 10;
  return piTime.toFixed(6);
};

export const calculateETime = (date: Date): string => {
  const totalSeconds = date.getHours() * 3600 + date.getMinutes() * 60 + date.getSeconds();
  const eTime = (totalSeconds / 86400) * Math.E * 10;
  return eTime.toFixed(6);
};

export const calculateQuaternionTime = (date: Date): string => {
  const hours = date.getHours();
  const minutes = date.getMinutes();
  const seconds = date.getSeconds();
  
  const i = Math.floor(hours / 2);
  const j = Math.floor(minutes / 30);
  const k = Math.floor(seconds / 12);
  
  return `${i}i + ${j}j + ${k}k`;
};

export const calculateComplexTime = (date: Date): string => {
  const real = date.getHours();
  const imaginary = date.getMinutes();
  return `${real} + ${imaginary}i`;
};

export const calculatePolarTime = (date: Date): string => {
  const totalSeconds = date.getHours() * 3600 + date.getMinutes() * 60 + date.getSeconds();
  const angle = (totalSeconds / 86400) * 2 * Math.PI;
  return angle.toFixed(20);
};

export const calculateRecursionState = (date: Date): string => {
  const seconds = date.getSeconds();
  return seconds.toString(2).padStart(6, '0');
};

type Pattern = {
  name: string;
  timestamp: Date;
};

export const detectPatterns = (date: Date): Pattern[] => {
  const patterns: Pattern[] = [];
  const hours = date.getHours();
  const minutes = date.getMinutes();
  const seconds = date.getSeconds();

  // GCD Pattern
  if (gcd(hours, minutes) > 1) {
    patterns.push({ name: "Transitive GCD Pattern", timestamp: new Date() });
  }

  // Recursion Pattern
  if (isRecursive(hours, minutes, seconds)) {
    patterns.push({ name: "Recursion Base Case", timestamp: new Date() });
  }

  return patterns;
};

function gcd(a: number, b: number): number {
  return b === 0 ? a : gcd(b, a % b);
}

function isRecursive(h: number, m: number, s: number): boolean {
  return (h % 3 === 0) && (m % 3 === 0) && (s % 3 === 0);
}