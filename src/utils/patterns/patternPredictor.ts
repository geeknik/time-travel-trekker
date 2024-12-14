import { PredictedPattern, isTimeSymmetric, isAstronomicalAlignment } from './patternTypes';

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

  // Predict next perfect square times
  for (let h = 0; h < 24; h++) {
    for (let m = 0; m < 60; m++) {
      // Format time as HHMM for checking perfect squares, ensuring valid time format
      const timeStr = h.toString().padStart(2, '0') + m.toString().padStart(2, '0');
      const timeNumber = parseInt(timeStr);
      
      // Check if it's a perfect square and the resulting time is valid
      const sqrt = Math.sqrt(timeNumber);
      if (sqrt % 1 === 0 && h < 24 && m < 60) {
        const nextOccurrence = findNextOccurrence(h, m, 0);
        if (nextOccurrence > now) {
          predictions.push({
            name: "Perfect Square Time",
            occurringAt: nextOccurrence,
            description: `Time will form perfect square: ${sqrt}²`,
            type: 'mathematical'
          });
        }
      }
    }
  }

  // Predict next symmetrical times
  for (let h = 0; h < 24; h++) {
    for (let m = 0; m < 60; m++) {
      if (isTimeSymmetric(h, m, 0)) {
        const nextOccurrence = findNextOccurrence(h, m, 0);
        if (nextOccurrence > now) {
          predictions.push({
            name: "Time Mirror Pattern",
            occurringAt: nextOccurrence,
            description: `Time will read the same forwards and backwards`,
            type: 'symmetry'
          });
        }
      }
    }
  }

  // Predict astronomical alignments
  let checkDate = new Date(now);
  for (let i = 0; i < 30; i++) {
    if (isAstronomicalAlignment(checkDate)) {
      predictions.push({
        name: "Astronomical Alignment",
        occurringAt: new Date(checkDate),
        description: "Upcoming astronomical alignment event",
        type: 'astronomical'
      });
    }
    checkDate.setDate(checkDate.getDate() + 1);
  }

  // Sort predictions by occurrence time and limit to next 10 events
  return predictions
    .sort((a, b) => a.occurringAt.getTime() - b.occurringAt.getTime())
    .slice(0, 10);
};