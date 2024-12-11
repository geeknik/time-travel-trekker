import { TimePattern, HEX_PATTERNS } from './patternTypes';

export const detectPatterns = (date: Date): TimePattern[] => {
  const patterns: TimePattern[] = [];
  const hours = date.getHours();
  const minutes = date.getMinutes();
  
  // Format time strings for pattern checking
  const timeStr = `${hours.toString().padStart(2, '0')}${minutes.toString().padStart(2, '0')}`;
  const hexTime = Number(timeStr).toString(16).toUpperCase();

  // Leet time (13:37)
  if (hours === 13 && minutes === 37) {
    patterns.push({ name: "L337 Time (Elite o'clock)", timestamp: new Date() });
  }

  // Palindrome time
  if (timeStr === timeStr.split('').reverse().join('')) {
    patterns.push({ name: "Palindrome Time", timestamp: new Date() });
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

  // Sequential digits
  if (/01|12|23|34|45|56|78|89/.test(timeStr)) {
    patterns.push({ name: "Sequential Time", timestamp: new Date() });
  }

  return patterns;
};