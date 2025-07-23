// Exoplanet and Planetary Time Calculations

// Exoplanet data (day length in Earth hours, year length in Earth days)
export const EXOPLANETS = {
  KEPLER_452B: { dayLength: 24.7, yearLength: 384.8, distance: 1402 }, // Most Earth-like
  PROXIMA_CENTAURI_B: { dayLength: 24.0, yearLength: 11.2, distance: 4.24 }, // Closest
  TRAPPIST_1E: { dayLength: 24.0, yearLength: 6.1, distance: 40 }, // Habitable zone
  TOI_715B: { dayLength: 19.3, yearLength: 19.3, distance: 137 }, // Recent discovery
  K2_18B: { dayLength: 24.0, yearLength: 33, distance: 124 }, // Water vapor detected
  GLIESE_667CC: { dayLength: 24.0, yearLength: 28.1, distance: 23.6 }, // Super-Earth
  HD_40307G: { dayLength: 24.0, yearLength: 197.8, distance: 42 }, // Potentially habitable
};

// Calculate time on exoplanets
export const calculateExoplanetTime = (earthTime: Date, planet: keyof typeof EXOPLANETS) => {
  const planetData = EXOPLANETS[planet];
  const earthDayMs = 24 * 60 * 60 * 1000;
  const planetDayMs = planetData.dayLength * 60 * 60 * 1000;
  
  // Calculate planet time based on different day length
  const planetTime = (earthTime.getTime() % planetDayMs) / planetDayMs * 24;
  const planetHours = Math.floor(planetTime);
  const planetMinutes = Math.floor((planetTime - planetHours) * 60);
  
  return {
    hours: planetHours,
    minutes: planetMinutes,
    dayLength: planetData.dayLength,
    yearLength: planetData.yearLength,
    distance: planetData.distance
  };
};

// Calculate light travel time to exoplanets
export const calculateExoplanetLightTime = (planet: keyof typeof EXOPLANETS) => {
  const planetData = EXOPLANETS[planet];
  const lightYearsToSeconds = 365.25 * 24 * 3600; // seconds in a year (light travel time)
  const travelTime = planetData.distance * lightYearsToSeconds;
  
  return {
    years: planetData.distance,
    seconds: travelTime,
    humanLifetimes: (planetData.distance / 80).toFixed(1) // Assuming 80-year human lifetime
  };
};

// Calculate age of a person on different planets
export const calculateExoplanetAge = (earthAge: number, planet: keyof typeof EXOPLANETS) => {
  const planetData = EXOPLANETS[planet];
  const earthYears = earthAge;
  const planetYears = earthYears * (365.25 / planetData.yearLength);
  
  return {
    earthAge: earthAge,
    planetAge: planetYears.toFixed(2),
    yearLength: planetData.yearLength
  };
};

// Calculate seasons on different planets
export const calculateExoplanetSeasons = (time: Date, planet: keyof typeof EXOPLANETS) => {
  const planetData = EXOPLANETS[planet];
  const dayOfYear = Math.floor((time.getTime() - new Date(time.getFullYear(), 0, 0).getTime()) / (1000 * 60 * 60 * 24));
  
  // Calculate planet's year progress
  const planetYearProgress = (dayOfYear % planetData.yearLength) / planetData.yearLength;
  
  let season = "";
  if (planetYearProgress < 0.25) season = "Spring";
  else if (planetYearProgress < 0.5) season = "Summer";
  else if (planetYearProgress < 0.75) season = "Autumn";
  else season = "Winter";
  
  return {
    season,
    yearProgress: (planetYearProgress * 100).toFixed(1),
    dayOfYear: Math.floor(dayOfYear % planetData.yearLength)
  };
};

// Calculate tidal forces on exoplanets
export const calculateExoplanetTides = (planet: keyof typeof EXOPLANETS) => {
  const planetData = EXOPLANETS[planet];
  
  // Simplified tidal calculation based on year length (closer = stronger tides)
  const tidalStrength = 365.25 / planetData.yearLength;
  let tidalDescription = "";
  
  if (tidalStrength > 10) tidalDescription = "Extreme tides";
  else if (tidalStrength > 5) tidalDescription = "Strong tides";
  else if (tidalStrength > 2) tidalDescription = "Moderate tides";
  else tidalDescription = "Weak tides";
  
  return {
    strength: tidalStrength.toFixed(2),
    description: tidalDescription
  };
};

// Calculate how many exoplanets we've discovered
export const calculateExoplanetDiscoveries = (time: Date) => {
  // First exoplanet confirmed in 1995
  const discoveryStart = new Date('1995-01-01');
  const yearsSearching = (time.getTime() - discoveryStart.getTime()) / (1000 * 60 * 60 * 24 * 365.25);
  
  // Approximate rate: ~5000 confirmed exoplanets as of 2024
  const confirmedPlanets = Math.floor(yearsSearching * 170); // ~170 per year average
  const candidates = confirmedPlanets * 3; // Rough ratio of candidates to confirmed
  
  return {
    confirmed: Math.min(confirmedPlanets, 5600), // Cap at realistic current number
    candidates: Math.min(candidates, 16800),
    yearsSearching: yearsSearching.toFixed(1)
  };
};

// Calculate communication delays with exoplanets
export const calculateExoplanetCommunication = (planet: keyof typeof EXOPLANETS) => {
  const planetData = EXOPLANETS[planet];
  const oneWayTime = planetData.distance; // years for one-way communication
  const roundTripTime = oneWayTime * 2;
  
  return {
    oneWay: oneWayTime,
    roundTrip: roundTripTime,
    humanGenerations: (roundTripTime / 25).toFixed(1) // 25 years per generation
  };
}; 