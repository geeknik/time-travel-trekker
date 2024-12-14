import { TimePattern, isPerfectSquare, isTriangularNumber, isPentagonalNumber, 
         calculateNumerologicalNumber, isTimeSymmetric, isAstronomicalAlignment,
         HEX_PATTERNS } from './patternTypes';

export const detectPatterns = (date: Date): TimePattern[] => {
  const patterns: TimePattern[] = [];
  const hours = date.getHours();
  const minutes = date.getMinutes();
  const seconds = date.getSeconds();
  
  // Format time strings for pattern checking
  const timeStr = `${hours.toString().padStart(2, '0')}${minutes.toString().padStart(2, '0')}${seconds.toString().padStart(2, '0')}`;
  const hexTime = Number(`${hours}${minutes}`).toString(16).toUpperCase();
  const timeNumber = parseInt(timeStr);

  // Mathematical patterns
  if (isPerfectSquare(timeNumber)) {
    patterns.push({
      name: "Perfect Square Time",
      description: `Time digits form a perfect square: ${Math.sqrt(timeNumber)}²`,
      timestamp: new Date(),
      type: 'mathematical'
    });
  }

  if (isTriangularNumber(timeNumber)) {
    patterns.push({
      name: "Triangular Number Time",
      description: `Time digits form a triangular number`,
      timestamp: new Date(),
      type: 'mathematical'
    });
  }

  if (isPentagonalNumber(timeNumber)) {
    patterns.push({
      name: "Pentagonal Number Time",
      description: `Time digits form a pentagonal number`,
      timestamp: new Date(),
      type: 'mathematical'
    });
  }

  // Complex sequence patterns
  const digits = timeStr.split('').map(Number);
  const differences = digits.slice(1).map((n, i) => n - digits[i]);
  
  if (new Set(differences).size === 1) {
    patterns.push({
      name: "Arithmetic Sequence Time",
      description: `Time digits form an arithmetic sequence with difference ${differences[0]}`,
      timestamp: new Date(),
      type: 'sequence'
    });
  }

  // Geometric sequence check
  const ratios = digits.slice(1).map((n, i) => n !== 0 && digits[i] !== 0 ? n / digits[i] : NaN);
  if (new Set(ratios.filter(r => !isNaN(r))).size === 1) {
    patterns.push({
      name: "Geometric Sequence Time",
      description: `Time digits form a geometric sequence with ratio ${ratios[0]}`,
      timestamp: new Date(),
      type: 'sequence'
    });
  }

  // Numerological patterns
  const numerologicalNumber = calculateNumerologicalNumber(timeNumber);
  if ([1, 3, 7, 9].includes(numerologicalNumber)) {
    patterns.push({
      name: "Numerological Power Time",
      description: `Time reduces to powerful numerological number ${numerologicalNumber}`,
      timestamp: new Date(),
      type: 'numerological'
    });
  }

  // Time symmetry patterns
  if (isTimeSymmetric(hours, minutes, seconds)) {
    patterns.push({
      name: "Time Mirror Pattern",
      description: `Time reads the same forwards and backwards: ${hours}:${minutes}:${seconds}`,
      timestamp: new Date(),
      type: 'symmetry'
    });
  }

  // Astronomical alignments
  if (isAstronomicalAlignment(date)) {
    patterns.push({
      name: "Astronomical Alignment",
      description: `Current time aligns with significant astronomical event`,
      timestamp: new Date(),
      type: 'astronomical'
    });
  }

  // Special hex patterns
  if (HEX_PATTERNS[hexTime as keyof typeof HEX_PATTERNS]) {
    patterns.push({
      name: HEX_PATTERNS[hexTime as keyof typeof HEX_PATTERNS].name,
      description: `Hexadecimal pattern: 0x${hexTime}`,
      timestamp: new Date(),
      type: 'special'
    });
  }

  return patterns;
};