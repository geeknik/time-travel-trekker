import { PredictedPattern, HEX_PATTERNS } from './patternTypes';

export const predictNextPatterns = (currentDate: Date): PredictedPattern[] => {
  const predictions: PredictedPattern[] = [];
  const now = new Date(currentDate);
  
  // Helper function to find next occurrence of a specific time
  const findNextOccurrence = (targetHours: number, targetMinutes: number, targetSeconds: number): Date => {
    const next = new Date(now);
    next.setHours(targetHours, targetMinutes, targetSeconds);
    if (next <= now) {
      next.setDate(next.getDate() + 1);
    }
    return next;
  };

  // Predict next palindrome times
  let checkDate = new Date(now);
  let found = 0;
  const maxChecks = 24 * 60 * 60;
  let checksPerformed = 0;
  
  while (found < 3 && checksPerformed < maxChecks) {
    const hours = checkDate.getHours().toString().padStart(2, '0');
    const minutes = checkDate.getMinutes().toString().padStart(2, '0');
    const seconds = checkDate.getSeconds().toString().padStart(2, '0');
    const timeStr = hours + minutes + seconds;
    
    if (timeStr === timeStr.split('').reverse().join('') && checkDate > now) {
      predictions.push({
        name: "Palindrome Time",
        occurringAt: new Date(checkDate),
        description: `Time will read the same forwards and backwards: ${hours}:${minutes}:${seconds}`,
        type: 'sequence'
      });
      found++;
    }
    
    checkDate.setSeconds(checkDate.getSeconds() + 1);
    checksPerformed++;
  }

  // Predict next special hex patterns
  Object.entries(HEX_PATTERNS).forEach(([hex, { name, type }]) => {
    const decimalTime = parseInt(hex, 16);
    const hours = Math.floor(decimalTime / 100);
    const minutes = decimalTime % 100;
    
    if (hours < 24 && minutes < 60) {
      const nextHexTime = findNextOccurrence(hours, minutes, 0);
      
      predictions.push({
        name,
        occurringAt: nextHexTime,
        description: `Hexadecimal pattern 0x${hex} will occur`,
        type
      });
    }
  });

  // Predict next triple equal time
  for (let h = 0; h < 24; h++) {
    if (h >= now.getHours()) {
      const nextTripleEqual = findNextOccurrence(h, h, h);
      predictions.push({
        name: "Triple Equal Time",
        occurringAt: nextTripleEqual,
        description: `All time units will be equal: ${h}:${h}:${h}`,
        type: 'mathematical'
      });
    }
  }

  // Sort predictions by occurrence time
  return predictions.sort((a, b) => a.occurringAt.getTime() - b.occurringAt.getTime());
};