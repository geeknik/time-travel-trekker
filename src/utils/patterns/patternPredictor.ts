import { PredictedPattern, HEX_PATTERNS } from './patternTypes';

export const predictNextPatterns = (currentDate: Date): PredictedPattern[] => {
  const predictions: PredictedPattern[] = [];
  const now = new Date(currentDate);
  
  // Predict next L337 time
  const nextL337 = new Date(now);
  nextL337.setHours(13, 37, 0);
  if (nextL337 <= now) {
    nextL337.setDate(nextL337.getDate() + 1);
  }
  predictions.push({
    name: "L337 Time",
    occurringAt: nextL337,
    description: "Elite o'clock - Hacker's favorite time"
  });

  // Predict next palindrome times
  let checkDate = new Date(now);
  let found = 0;
  while (found < 3) { // Find next 3 palindrome times
    const hours = checkDate.getHours().toString().padStart(2, '0');
    const minutes = checkDate.getMinutes().toString().padStart(2, '0');
    const timeStr = hours + minutes;
    
    if (timeStr === timeStr.split('').reverse().join('') && checkDate > now) {
      predictions.push({
        name: "Palindrome Time",
        occurringAt: new Date(checkDate),
        description: `Time that reads the same forwards and backwards: ${hours}:${minutes}`
      });
      found++;
    }
    
    checkDate.setMinutes(checkDate.getMinutes() + 1);
  }

  // Predict next hex pattern times
  Object.entries(HEX_PATTERNS).forEach(([hex, description]) => {
    const decimalTime = parseInt(hex, 16);
    const hours = Math.floor(decimalTime / 100);
    const minutes = decimalTime % 100;
    
    if (hours < 24 && minutes < 60) {
      const nextHexTime = new Date(now);
      nextHexTime.setHours(hours, minutes, 0);
      if (nextHexTime <= now) {
        nextHexTime.setDate(nextHexTime.getDate() + 1);
      }
      
      predictions.push({
        name: `${description}`,
        occurringAt: nextHexTime,
        description: `Hexadecimal pattern 0x${hex} occurs`
      });
    }
  });

  // Sort predictions by occurrence time
  return predictions.sort((a, b) => a.occurringAt.getTime() - b.occurringAt.getTime());
};