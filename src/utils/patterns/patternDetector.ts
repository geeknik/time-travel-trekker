import { TimePattern, isPerfectSquare, isTriangularNumber, isPentagonalNumber,
         isTimeSymmetric, isAstronomicalAlignment, isFibonacciNumber, 
         isPrime, isHarmonicNumber } from './patternTypes';

export const detectPatterns = (date: Date): TimePattern[] => {
  const patterns: TimePattern[] = [];
  const hours = date.getHours();
  const minutes = date.getMinutes();
  const seconds = date.getSeconds();
  
  // Format time strings for pattern checking
  const timeStr = `${hours.toString().padStart(2, '0')}${minutes.toString().padStart(2, '0')}${seconds.toString().padStart(2, '0')}`;
  const timeNumber = parseInt(timeStr);

  // Mathematical patterns with enhanced descriptions
  if (isPerfectSquare(timeNumber)) {
    patterns.push({
      name: "Perfect Square Time",
      description: `Time digits form a perfect square: ${Math.sqrt(timeNumber)}² = ${timeNumber}`,
      timestamp: new Date(),
      type: 'mathematical'
    });
  }

  if (isTriangularNumber(timeNumber)) {
    const n = Math.floor((-1 + Math.sqrt(1 + 8 * timeNumber)) / 2);
    patterns.push({
      name: "Triangular Number Time",
      description: `Time forms the ${n}th triangular number: ${timeNumber}`,
      timestamp: new Date(),
      type: 'sequence'
    });
  }

  if (isPentagonalNumber(timeNumber)) {
    patterns.push({
      name: "Pentagonal Number Time",
      description: `Time forms a pentagonal number: ${timeNumber}`,
      timestamp: new Date(),
      type: 'mathematical'
    });
  }

  if (isFibonacciNumber(timeNumber)) {
    patterns.push({
      name: "Fibonacci Time",
      description: `Current time matches a Fibonacci number in the sequence`,
      timestamp: new Date(),
      type: 'fibonacci'
    });
  }

  if (isPrime(timeNumber)) {
    patterns.push({
      name: "Prime Time",
      description: `Time forms a prime number: ${timeNumber}`,
      timestamp: new Date(),
      type: 'prime'
    });
  }

  if (isHarmonicNumber(timeNumber)) {
    patterns.push({
      name: "Harmonic Time",
      description: `Time corresponds to a harmonic number series sum`,
      timestamp: new Date(),
      type: 'harmonic'
    });
  }

  // Sequence patterns
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
  const nonZeroDigits = digits.filter(d => d !== 0);
  if (nonZeroDigits.length > 2) {
    const ratios = nonZeroDigits.slice(1).map((n, i) => n / nonZeroDigits[i]);
    const uniqueRatios = new Set(ratios.map(r => r.toFixed(6)));
    if (uniqueRatios.size === 1 && !isNaN(ratios[0])) {
      patterns.push({
        name: "Geometric Sequence Time",
        description: `Time digits form a geometric sequence with ratio ${ratios[0].toFixed(2)}`,
        timestamp: new Date(),
        type: 'sequence'
      });
    }
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

  // Astronomical patterns
  if (isAstronomicalAlignment(date)) {
    const event = determineAstronomicalEvent(date);
    patterns.push({
      name: "Astronomical Alignment",
      description: event,
      timestamp: new Date(),
      type: 'astronomical'
    });
  }

  return patterns;
};

function determineAstronomicalEvent(date: Date): string {
  const month = date.getMonth();
  const day = date.getDate();
  
  if (month === 2 && day === 20) return "Spring Equinox";
  if (month === 8 && day === 22) return "Autumn Equinox";
  if (month === 5 && day === 21) return "Summer Solstice";
  if (month === 11 && day === 21) return "Winter Solstice";
  if (month === 7 && day === 12) return "Perseids Meteor Shower Peak";
  if (month === 11 && day === 17) return "Leonids Meteor Shower Peak";
  if (month === 11 && day === 13) return "Geminids Meteor Shower Peak";
  if (day === Math.round(29.5309 * (month % 2))) return "Full Moon";
  
  return "Celestial Alignment";
}