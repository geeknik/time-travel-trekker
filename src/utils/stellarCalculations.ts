// Stellar Evolution and Cosmic Time Calculations

// Stellar lifetimes in years (main sequence)
export const STELLAR_LIFETIMES = {
  O_TYPE: 3e6,          // O-type stars (very massive, blue)
  B_TYPE: 30e6,         // B-type stars (massive, blue-white)
  A_TYPE: 500e6,        // A-type stars (white)
  F_TYPE: 3e9,          // F-type stars (yellow-white)
  G_TYPE: 10e9,         // G-type stars (like our Sun, yellow)
  K_TYPE: 50e9,         // K-type stars (orange)
  M_TYPE: 200e9,        // M-type stars (red dwarf, longest lived)
};

// Cosmic events and their timescales
export const COSMIC_EVENTS = {
  BIG_BANG: 13.8e9,              // Age of universe in years
  FIRST_STARS: 13.6e9,           // First stars formed
  MILKY_WAY_FORMATION: 13.6e9,   // Milky Way galaxy formation
  SUN_FORMATION: 4.6e9,          // Sun formed
  EARTH_FORMATION: 4.54e9,       // Earth formed
  FIRST_LIFE: 3.8e9,             // First life on Earth
  OXYGEN_ATMOSPHERE: 2.4e9,      // Great Oxidation Event
  COMPLEX_CELLS: 1.8e9,          // Eukaryotic cells
  MULTICELLULAR_LIFE: 1e9,       // First multicellular organisms
  CAMBRIAN_EXPLOSION: 540e6,     // Cambrian explosion
  DINOSAUR_EXTINCTION: 66e6,     // K-Pg extinction event
  HUMAN_EVOLUTION: 300000,       // Homo sapiens emergence
};

// Calculate stellar age as percentage of lifetime
export const calculateStellarAge = (starType: keyof typeof STELLAR_LIFETIMES, age: number) => {
  const maxLifetime = STELLAR_LIFETIMES[starType];
  return (age / maxLifetime * 100).toFixed(2);
};

// Calculate cosmic calendar (13.8 billion years = 1 year)
export const calculateCosmicCalendar = (time: Date) => {
  const universeAge = COSMIC_EVENTS.BIG_BANG;
  const yearInSeconds = 365.25 * 24 * 3600;
  const cosmicYear = universeAge;
  
  // Current moment in cosmic calendar
  const currentYear = time.getFullYear();
  const dayOfYear = Math.floor((time.getTime() - new Date(currentYear, 0, 0).getTime()) / (1000 * 60 * 60 * 24));
  const timeOfDay = time.getHours() * 3600 + time.getMinutes() * 60 + time.getSeconds();
  
  // Map current time to cosmic calendar
  const cosmicMonth = Math.floor(dayOfYear / 30.44); // Average days per month
  const cosmicDay = dayOfYear % 30.44;
  const cosmicHour = Math.floor(timeOfDay / 3600);
  const cosmicMinute = Math.floor((timeOfDay % 3600) / 60);
  
  return {
    month: Math.min(cosmicMonth + 1, 12),
    day: Math.floor(cosmicDay) + 1,
    hour: cosmicHour,
    minute: cosmicMinute
  };
};

// Calculate time until stellar events
export const calculateStellarFuture = () => {
  return {
    sunRedGiant: 5e9,           // Sun becomes red giant (years from now)
    andromedaCollision: 4.5e9,  // Andromeda-Milky Way collision
    sunDeath: 7.59e9,           // Sun becomes white dwarf
    stellarFormationEnd: 100e12, // Star formation ends in universe
    protonDecay: 1e34,          // Protons decay (theoretical)
    heatDeath: 1e100,           // Heat death of universe
  };
};

// Calculate neutron star properties
export const calculateNeutronStarTime = (time: Date) => {
  const pulsarPeriod = 1.337; // Pulsar PSR B1919+21 period in seconds
  const secondsToday = time.getHours() * 3600 + time.getMinutes() * 60 + time.getSeconds();
  const rotations = Math.floor(secondsToday / pulsarPeriod);
  
  return {
    rotations,
    period: pulsarPeriod,
    frequency: (1 / pulsarPeriod).toFixed(3)
  };
};

// Calculate supernova frequency
export const calculateSupernovaRate = (time: Date) => {
  const secondsToday = time.getHours() * 3600 + time.getMinutes() * 60 + time.getSeconds();
  
  // Milky Way supernova rate: ~1 every 50 years
  const milkyWayRate = 1 / (50 * 365.25 * 24 * 3600); // per second
  const observableUniverseRate = milkyWayRate * 2e12; // ~2 trillion galaxies
  
  const milkyWaySupernovae = secondsToday * milkyWayRate;
  const universeSupernovae = secondsToday * observableUniverseRate;
  
  return {
    milkyWay: milkyWaySupernovae.toFixed(8),
    universe: Math.floor(universeSupernovae)
  };
};

// Calculate light travel distances
export const calculateCosmicDistances = (time: Date) => {
  const secondsToday = time.getHours() * 3600 + time.getMinutes() * 60 + time.getSeconds();
  const lightSpeed = 299792458; // m/s
  
  const distanceToday = lightSpeed * secondsToday; // meters
  
  return {
    meters: distanceToday,
    kilometers: Math.floor(distanceToday / 1000),
    earthDiameters: (distanceToday / 12756000).toFixed(2), // Earth diameter ~12,756 km
    moonDistances: (distanceToday / 384400000).toFixed(4), // Moon distance ~384,400 km
  };
}; 