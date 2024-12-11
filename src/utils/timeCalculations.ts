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

export const calculateInternetTime = (date: Date): string => {
  // Convert to BMT (Biel Mean Time)
  const utc = date.getTime() + (date.getTimezoneOffset() * 60000);
  const bmt = new Date(utc + (3600000 * 1)); // UTC+1 for BMT
  
  // Calculate .beats (Swatch Internet Time)
  const secondsInDay = (bmt.getHours() * 3600) + (bmt.getMinutes() * 60) + bmt.getSeconds();
  const beats = Math.floor((secondsInDay / 86400) * 1000);
  
  return `@${beats.toString().padStart(3, '0')}`;
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

export const calculateStardate = (date: Date): string => {
  const stardate = (date.getFullYear() - 2000) * 1000 + 
                  (date.getMonth() * 83.33) + 
                  (date.getDate() * 2.74);
  return stardate.toFixed(2);
};

export const calculateMetricTime = (date: Date): string => {
  const totalSeconds = date.getHours() * 3600 + date.getMinutes() * 60 + date.getSeconds();
  const metricTime = (totalSeconds / 86400) * 100000;
  return metricTime.toFixed(2);
};

export const calculateHexTime = (date: Date): string => {
  const totalSeconds = date.getHours() * 3600 + date.getMinutes() * 60 + date.getSeconds();
  return totalSeconds.toString(16).toUpperCase().padStart(4, '0');
};

export const calculateSiderealTime = (date: Date): string => {
  const J2000 = new Date('2000-01-01T12:00:00Z');
  const daysFromJ2000 = (date.getTime() - J2000.getTime()) / (24 * 60 * 60 * 1000);
  const siderealRotations = daysFromJ2000 * 1.002737909350795;
  const fractionalPart = siderealRotations % 1;
  const hours = Math.floor(fractionalPart * 24);
  const minutes = Math.floor((fractionalPart * 24 * 60) % 60);
  return `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}`;
};

export const calculateTimeDilation = (date: Date): string => {
  // Example: Time dilation near Earth's surface vs GPS satellite orbit
  const satelliteAltitude = 20200; // km
  const earthRadius = 6371; // km
  const c = 299792458; // speed of light in m/s
  const G = 6.67430e-11; // gravitational constant
  const M = 5.972e24; // Earth's mass in kg
  
  const timeDilation = Math.sqrt(1 - (2 * G * M) / (c * c * (earthRadius + satelliteAltitude) * 1000));
  return (1 - timeDilation).toFixed(12);
};

export const calculateUnixEpochProgress = (date: Date): number => {
  const maxInt32 = 2147483647;
  const currentUnixTime = Math.floor(date.getTime() / 1000);
  return (currentUnixTime / maxInt32) * 100;
};

export const calculateDecimalTime = (date: Date): string => {
  const totalSeconds = date.getHours() * 3600 + date.getMinutes() * 60 + date.getSeconds();
  const decimalHours = (totalSeconds / 86400) * 10;
  const decimalMinutes = (decimalHours % 1) * 100;
  const decimalSeconds = (decimalMinutes % 1) * 100;
  return `${Math.floor(decimalHours)}:${Math.floor(decimalMinutes)}:${Math.floor(decimalSeconds)}`;
};

export const calculateTimeZoneCrossings = (date: Date): number => {
  const secondsSinceStart = date.getMilliseconds() / 1000;
  const distanceTraveled = secondsSinceStart * 299792.458; // km
  const earthCircumference = 40075; // km
  return Math.floor((distanceTraveled / earthCircumference) * 24);
};
