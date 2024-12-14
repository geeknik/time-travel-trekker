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

  // Predict next palindrome times
  for (let h = 0; h < 24; h++) {
    for (let m = 0; m < 60; m++) {
      if (isTimeSymmetric(h, m, 0)) {
        const nextOccurrence = findNextOccurrence(h, m, 0);
        if (nextOccurrence > now) {
          predictions.push({
            name: "Time Mirror Pattern",
            occurringAt: nextOccurrence,
            description: `Time will read the same forwards and backwards: ${h.toString().padStart(2, '0')}:${m.toString().padStart(2, '0')}:00`,
            type: 'symmetry'
          });
        }
      }
    }
  }

  // Predict astronomical events
  let checkDate = new Date(now);
  for (let i = 0; i < 30; i++) {
    if (isAstronomicalAlignment(checkDate)) {
      predictions.push({
        name: "Astronomical Alignment",
        occurringAt: new Date(checkDate),
        description: determineAstronomicalEvent(checkDate),
        type: 'astronomical'
      });
    }
    checkDate.setDate(checkDate.getDate() + 1);
  }

  // Predict perfect square times
  const predictPerfectSquareTimes = () => {
    for (let i = 0; i < 24; i++) {
      const timeStr = i.toString().padStart(2, '0') + "00";
      const timeNumber = parseInt(timeStr);
      if (Math.sqrt(timeNumber) % 1 === 0) {
        const nextOccurrence = findNextOccurrence(i, 0, 0);
        if (nextOccurrence > now) {
          predictions.push({
            name: "Perfect Square Time",
            occurringAt: nextOccurrence,
            description: `Time will form a perfect square: ${Math.sqrt(timeNumber)}² = ${timeNumber}`,
            type: 'mathematical'
          });
        }
      }
    }
  };

  predictPerfectSquareTimes();

  // Sort predictions by occurrence time and limit to next 10 events
  return predictions
    .sort((a, b) => a.occurringAt.getTime() - b.occurringAt.getTime())
    .slice(0, 10);
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