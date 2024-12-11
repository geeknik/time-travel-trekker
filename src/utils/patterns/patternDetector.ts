import { TimePattern, HEX_PATTERNS } from './patternTypes';

export const detectPatterns = (date: Date): TimePattern[] => {
  const patterns: TimePattern[] = [];
  const hours = date.getHours();
  const minutes = date.getMinutes();
  const seconds = date.getSeconds();
  
  // Format time strings for pattern checking
  const timeStr = `${hours.toString().padStart(2, '0')}${minutes.toString().padStart(2, '0')}${seconds.toString().padStart(2, '0')}`;
  const hexTime = Number(`${hours}${minutes}`).toString(16).toUpperCase();

  // Leet time (13:37)
  if (hours === 13 && minutes === 37) {
    patterns.push({ name: "L337 Time (Elite o'clock)", timestamp: new Date() });
  }

  // Palindrome time (including seconds)
  if (timeStr === timeStr.split('').reverse().join('')) {
    patterns.push({ 
      name: `Palindrome Time (${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')})`, 
      timestamp: new Date() 
    });
  }

  // Binary patterns
  const binaryMinute = minutes.toString(2).padStart(6, '0');
  if (binaryMinute.match(/^1+$/) || binaryMinute.match(/^0+$/)) {
    patterns.push({ name: `Binary Pattern: ${binaryMinute}`, timestamp: new Date() });
  }

  // Hex patterns
  if (HEX_PATTERNS[hexTime as keyof typeof HEX_PATTERNS]) {
    patterns.push({ 
      name: `Hex ${HEX_PATTERNS[hexTime as keyof typeof HEX_PATTERNS]} (0x${hexTime})`, 
      timestamp: new Date() 
    });
  }

  // Repeating digits
  if (new Set(timeStr).size === 1) {
    patterns.push({ name: "Repeating Digits Time", timestamp: new Date() });
  }

  // Sequential time (checking for true sequential patterns like 12:34:56)
  const formattedTime = `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
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
      name: `Sequential Time (${formattedTime})`, 
      timestamp: new Date() 
    });
  }

  return patterns;
};