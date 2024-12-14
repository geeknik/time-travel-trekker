import { TimePattern, HEX_PATTERNS } from './patternTypes';

export const detectPatterns = (date: Date): TimePattern[] => {
  const patterns: TimePattern[] = [];
  const hours = date.getHours();
  const minutes = date.getMinutes();
  const seconds = date.getSeconds();
  
  // Format time strings for pattern checking
  const timeStr = `${hours.toString().padStart(2, '0')}${minutes.toString().padStart(2, '0')}${seconds.toString().padStart(2, '0')}`;
  const hexTime = Number(`${hours}${minutes}`).toString(16).toUpperCase();

  // Mathematical patterns
  if (hours === minutes && minutes === seconds) {
    patterns.push({ 
      name: "Triple Equal Time",
      description: `All units equal: ${hours}:${minutes}:${seconds}`,
      timestamp: new Date(),
      type: 'mathematical'
    });
  }

  // Fibonacci sequence check (simplified)
  const timeArray = [hours, minutes, seconds];
  if (timeArray.every((num, i) => i < 2 || num === timeArray[i-1] + timeArray[i-2])) {
    patterns.push({
      name: "Fibonacci Time",
      description: `Time units follow Fibonacci sequence`,
      timestamp: new Date(),
      type: 'mathematical'
    });
  }

  // Prime number time
  const isPrime = (num: number) => {
    for(let i = 2; i <= Math.sqrt(num); i++)
      if(num % i === 0) return false; 
    return num > 1;
  };

  if ([hours, minutes, seconds].every(isPrime)) {
    patterns.push({
      name: "Prime Time",
      description: "All time units are prime numbers",
      timestamp: new Date(),
      type: 'mathematical'
    });
  }

  // Palindrome time
  if (timeStr === timeStr.split('').reverse().join('')) {
    patterns.push({ 
      name: `Palindrome Time`,
      description: `Time reads the same forwards and backwards: ${hours}:${minutes}:${seconds}`,
      timestamp: new Date(),
      type: 'sequence'
    });
  }

  // Binary patterns
  const binaryMinute = minutes.toString(2).padStart(6, '0');
  if (binaryMinute.match(/^1+$/) || binaryMinute.match(/^0+$/)) {
    patterns.push({ 
      name: `Binary Pattern: ${binaryMinute}`,
      description: `Minutes in binary form a pattern`,
      timestamp: new Date(),
      type: 'sequence'
    });
  }

  // Hex patterns
  if (HEX_PATTERNS[hexTime as keyof typeof HEX_PATTERNS]) {
    patterns.push({ 
      name: HEX_PATTERNS[hexTime as keyof typeof HEX_PATTERNS].name,
      description: `Hexadecimal pattern: 0x${hexTime}`,
      timestamp: new Date(),
      type: 'special'
    });
  }

  // Sequential time
  const digits = timeStr.split('');
  let isSequential = true;
  let expectedNext = parseInt(digits[0]) + 1;
  
  for (let i = 1; i < digits.length; i++) {
    const current = parseInt(digits[i]);
    if (current !== expectedNext % 10) {
      isSequential = false;
      break;
    }
    expectedNext = current + 1;
  }
  
  if (isSequential) {
    patterns.push({ 
      name: "Sequential Time",
      description: `Time digits follow a sequence: ${hours}:${minutes}:${seconds}`,
      timestamp: new Date(),
      type: 'sequence'
    });
  }

  return patterns;
};