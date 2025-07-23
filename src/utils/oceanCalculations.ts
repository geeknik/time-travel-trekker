// Ocean and Marine Time Calculations

// Ocean circulation and current data
export const OCEAN_CYCLES = {
  GULF_STREAM_VELOCITY: 2.5, // m/s average velocity
  THERMOHALINE_CIRCULATION: 1000, // years for complete cycle
  TIDAL_CYCLE: 12.42, // hours for tidal cycle
  EL_NINO_CYCLE: 5, // years average cycle
  DEEP_WATER_FORMATION: 1500, // years to reach deep ocean
  WAVE_FREQUENCY: 0.1, // Hz for typical ocean wave
};

// Marine life migration and behavior cycles
export const MARINE_CYCLES = {
  WHALE_MIGRATION: 16000, // km distance for humpback whales
  SALMON_LIFECYCLE: 4, // years typical lifecycle
  CORAL_SPAWNING: 365, // days - annual event
  PLANKTON_CYCLE: 1, // day for daily vertical migration
  TURTLE_NESTING: 2, // years between nesting
  KELP_GROWTH: 60, // cm per day for giant kelp
};

// Calculate ocean wave properties
export const calculateOceanWaves = (time: Date) => {
  const secondsToday = time.getHours() * 3600 + time.getMinutes() * 60 + time.getSeconds();
  const waveFrequency = OCEAN_CYCLES.WAVE_FREQUENCY;
  const wavesGenerated = secondsToday * waveFrequency;
  
  return {
    wavesToday: Math.floor(wavesGenerated),
    frequency: waveFrequency,
    period: (1 / waveFrequency).toFixed(1)
  };
};

// Calculate tidal information
export const calculateTides = (time: Date) => {
  const tidalCycle = OCEAN_CYCLES.TIDAL_CYCLE * 3600 * 1000; // Convert to milliseconds
  const currentPhase = (time.getTime() % tidalCycle) / tidalCycle;
  
  let tidePhase = "";
  if (currentPhase < 0.25) tidePhase = "Rising";
  else if (currentPhase < 0.5) tidePhase = "High";
  else if (currentPhase < 0.75) tidePhase = "Falling";
  else tidePhase = "Low";
  
  const nextHighTide = (1 - currentPhase) * OCEAN_CYCLES.TIDAL_CYCLE;
  
  return {
    phase: tidePhase,
    progress: (currentPhase * 100).toFixed(1),
    nextHigh: nextHighTide.toFixed(2)
  };
};

// Calculate marine migrations
export const calculateMarineMigrations = (time: Date) => {
  const dayOfYear = Math.floor((time.getTime() - new Date(time.getFullYear(), 0, 0).getTime()) / (1000 * 60 * 60 * 24));
  
  // Humpback whale migration - peak around day 60 (March) and day 240 (September)
  const migrationProgress = Math.sin((dayOfYear / 365.25) * 2 * Math.PI);
  let migrationStatus = "";
  
  if (migrationProgress > 0.5) migrationStatus = "Northward Migration";
  else if (migrationProgress > -0.5) migrationStatus = "Feeding Grounds";
  else migrationStatus = "Southward Migration";
  
  return {
    status: migrationStatus,
    whaleProgress: (migrationProgress * 100).toFixed(1),
    dayOfYear
  };
};

// Calculate deep ocean circulation
export const calculateDeepOceanCirculation = (time: Date) => {
  const secondsToday = time.getHours() * 3600 + time.getMinutes() * 60 + time.getSeconds();
  const circulationPeriod = OCEAN_CYCLES.THERMOHALINE_CIRCULATION * 365.25 * 24 * 3600; // Convert to seconds
  
  const circulationProgress = (secondsToday / circulationPeriod) * 100;
  const gulfStreamDistance = secondsToday * OCEAN_CYCLES.GULF_STREAM_VELOCITY / 1000; // km
  
  return {
    thermohalineProgress: circulationProgress.toFixed(10),
    gulfStreamKm: gulfStreamDistance.toFixed(2),
    period: OCEAN_CYCLES.THERMOHALINE_CIRCULATION
  };
};

// Calculate coral reef processes
export const calculateCoralProcesses = (time: Date) => {
  const secondsToday = time.getHours() * 3600 + time.getMinutes() * 60 + time.getSeconds();
  const daysThisYear = Math.floor((time.getTime() - new Date(time.getFullYear(), 0, 0).getTime()) / (1000 * 60 * 60 * 24));
  
  // Coral spawning typically occurs in spring/summer
  const spawningProgress = Math.sin((daysThisYear / 365.25) * 2 * Math.PI);
  let spawningStatus = spawningProgress > 0 ? "Spawning Season" : "Growth Season";
  
  // Coral polyp feeding (typically at night)
  const hour = time.getHours();
  const feedingActive = hour >= 20 || hour <= 6;
  
  return {
    spawningStatus,
    spawningProgress: (spawningProgress * 100).toFixed(1),
    feedingActive,
    daysInYear: daysThisYear
  };
};

// Calculate sea level changes
export const calculateSeaLevel = (time: Date) => {
  const secondsToday = time.getHours() * 3600 + time.getMinutes() * 60 + time.getSeconds();
  
  // Global sea level rise: ~3.4 mm per year
  const annualRise = 3.4; // mm
  const dailyRise = annualRise / 365.25; // mm per day
  const todayRise = (secondsToday / 86400) * dailyRise; // mm today
  
  return {
    riseToday: todayRise.toFixed(6),
    annualRate: annualRise,
    since1900: ((time.getFullYear() - 1900) * annualRise).toFixed(1)
  };
};

// Calculate plankton vertical migration
export const calculatePlanktonMigration = (time: Date) => {
  const hour = time.getHours();
  const minute = time.getMinutes();
  const timeOfDay = hour + minute / 60;
  
  // Plankton migrate up at night, down during day
  let depth = 0;
  let migrationPhase = "";
  
  if (timeOfDay >= 6 && timeOfDay <= 18) {
    // Daytime - deep
    depth = 200 - (Math.sin((timeOfDay - 6) / 12 * Math.PI) * 100);
    migrationPhase = "Descending to Deep Waters";
  } else {
    // Nighttime - shallow
    depth = 100 + (Math.sin((timeOfDay > 18 ? timeOfDay - 18 : timeOfDay + 6) / 12 * Math.PI) * 80);
    migrationPhase = "Ascending for Night Feeding";
  }
  
  return {
    currentDepth: Math.floor(depth),
    migrationPhase,
    timeOfDay: `${hour}:${minute.toString().padStart(2, '0')}`
  };
};

// Calculate ocean temperature changes
export const calculateOceanTemperature = (time: Date) => {
  const dayOfYear = Math.floor((time.getTime() - new Date(time.getFullYear(), 0, 0).getTime()) / (1000 * 60 * 60 * 24));
  
  // Simplified seasonal temperature variation
  const seasonalVariation = Math.sin((dayOfYear / 365.25) * 2 * Math.PI);
  const baseTemp = 15; // Celsius average
  const currentTemp = baseTemp + (seasonalVariation * 3); // ±3°C seasonal variation
  
  // Ocean warming: ~0.6°C since 1900
  const warmingSince1900 = ((time.getFullYear() - 1900) / 124) * 0.6;
  
  return {
    currentTemp: currentTemp.toFixed(2),
    seasonalVariation: (seasonalVariation * 100).toFixed(1),
    warmingSince1900: warmingSince1900.toFixed(3)
  };
}; 