// Light travel time calculations for various cosmic distances
export const calculateLightTime = (distance: number) => {
  return (distance / 299792).toFixed(3); // Speed of light in km/s
};

// Lagrange point distances from Earth (approximate, in km)
export const LAGRANGE_POINTS = {
  L1: 1500000, // Earth-Sun L1
  L2: 1500000, // Earth-Sun L2
  L3: 149600000, // Earth-Sun L3
  L4: 149600000, // Earth-Sun L4 (60° ahead of Earth)
  L5: 149600000, // Earth-Sun L5 (60° behind Earth)
};

// Distances in kilometers (approximate, changes over time)
export const SPACE_OBJECTS = {
  VOYAGER_1: 24000000000, // ~24 billion km from Earth
  VOYAGER_2: 20000000000, // ~20 billion km from Earth
  JUPITER: 628730000,     // Average distance
  KUIPER_BELT: 7479893535, // Beginning of Kuiper Belt
  OORT_CLOUD: 7479893535000 // Beginning of Oort Cloud
};

// Calculate Mars time (Sol)
export const calculateMarsTime = (earthTime: Date) => {
  const marsDay = 24 * 60 * 60 * 1000 + 39 * 60 * 1000 + 35.244 * 1000;
  return ((earthTime.getTime() % marsDay) / marsDay * 24).toFixed(3);
};

// Calculate Planck Time progress through the day
export const calculatePlanckTimeProgress = (date: Date) => {
  const totalSeconds = date.getHours() * 3600 + date.getMinutes() * 60 + date.getSeconds();
  const planckTime = 5.391247 * Math.pow(10, -44); // in seconds
  return (totalSeconds / planckTime).toExponential(2);
};

// Calculate time dilation for GPS satellites
export const calculateGPSTimeDilation = (date: Date) => {
  // GPS satellites experience about 45 microseconds of time dilation per day
  const secondsInDay = date.getHours() * 3600 + date.getMinutes() * 60 + date.getSeconds();
  return ((45 * Math.pow(10, -6) * secondsInDay) / 86400).toFixed(9);
};

// Calculate "Internet Time" (.beat time)
export const calculateInternetTime = (date: Date) => {
  const utc = date.getUTCHours() * 3600 + date.getUTCMinutes() * 60 + date.getUTCSeconds();
  const beats = ((utc + 3600) / 86.4) % 1000;
  return `@${Math.floor(beats).toString().padStart(3, '0')}`;
};

// Calculate Galactic Year Progress
export const calculateGalacticYearProgress = (date: Date) => {
  const galacticYear = 225000000; // years
  const currentYear = date.getFullYear();
  return ((currentYear % galacticYear) / galacticYear * 100).toFixed(10);
};

// Calculate Jovian Time (based on Jupiter's rotation period)
export const calculateJovianTime = (earthTime: Date) => {
  const jovianDay = 9.925 * 60 * 60 * 1000; // Jupiter's day in milliseconds
  return ((earthTime.getTime() % jovianDay) / jovianDay * 24).toFixed(3);
};

// Calculate Asteroid Belt Time (based on average orbital period)
export const calculateAsteroidBeltTime = (earthTime: Date) => {
  const averageOrbitalPeriod = 4.6 * 365.25 * 24 * 60 * 60 * 1000; // ~4.6 years in ms
  return ((earthTime.getTime() % averageOrbitalPeriod) / averageOrbitalPeriod * 100).toFixed(2);
};
