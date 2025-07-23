// Particle Physics Time Calculations

// Particle lifetimes in seconds (mean lifetimes)
export const PARTICLE_LIFETIMES = {
  MUON: 2.197e-6,           // Muon lifetime
  NEUTRON: 879.4,           // Free neutron lifetime  
  TAU: 2.906e-13,           // Tau lepton lifetime
  PION_CHARGED: 2.603e-8,   // Charged pion lifetime
  KAON_NEUTRAL: 5.116e-8,   // Neutral kaon lifetime
  LAMBDA: 2.632e-10,        // Lambda baryon lifetime
  W_BOSON: 3e-25,           // W boson lifetime
  Z_BOSON: 3e-25,           // Z boson lifetime
  HIGGS: 1.56e-22,          // Higgs boson lifetime
};

// Fundamental constants and frequencies
export const PHYSICS_CONSTANTS = {
  CAESIUM_FREQUENCY: 9192631770,        // Caesium-133 hyperfine transition (Hz)
  HYDROGEN_FREQUENCY: 1420405751.768,   // Hydrogen 21cm line (Hz)
  PLANCK_FREQUENCY: 1.85487e43,         // Planck frequency (Hz)
  COMPTON_TIME: 1.288e-21,              // Compton time (s)
  NUCLEAR_TIME: 1e-23,                  // Nuclear time scale (s)
};

// Calculate how many particles have decayed since start of day
export const calculateParticleDecays = (time: Date, particleType: keyof typeof PARTICLE_LIFETIMES) => {
  const secondsToday = time.getHours() * 3600 + time.getMinutes() * 60 + time.getSeconds();
  const lifetime = PARTICLE_LIFETIMES[particleType];
  const halfLife = lifetime * Math.log(2);
  
  // Assuming we start with 10^12 particles at beginning of day
  const initialCount = 1e12;
  const remaining = initialCount * Math.exp(-secondsToday / lifetime);
  const decayed = initialCount - remaining;
  
  return {
    decayed: Math.floor(decayed),
    remaining: Math.floor(remaining),
    halfLives: secondsToday / halfLife
  };
};

// Calculate atomic vibrations
export const calculateAtomicVibrations = (time: Date) => {
  const secondsToday = time.getHours() * 3600 + time.getMinutes() * 60 + time.getSeconds();
  const cesiumOscillations = secondsToday * PHYSICS_CONSTANTS.CAESIUM_FREQUENCY;
  const hydrogenOscillations = secondsToday * PHYSICS_CONSTANTS.HYDROGEN_FREQUENCY;
  
  return {
    cesium: cesiumOscillations.toExponential(2),
    hydrogen: hydrogenOscillations.toExponential(2)
  };
};

// Calculate particle accelerator cycles
export const calculateAcceleratorCycles = (time: Date) => {
  const secondsToday = time.getHours() * 3600 + time.getMinutes() * 60 + time.getSeconds();
  
  // LHC beam revolution frequency: ~11.245 kHz
  const lhcFrequency = 11245;
  const lhcRevolutions = secondsToday * lhcFrequency;
  
  return {
    lhcRevolutions: Math.floor(lhcRevolutions),
    lhcFrequency
  };
};

// Calculate quantum tunneling events
export const calculateQuantumEvents = (time: Date) => {
  const secondsToday = time.getHours() * 3600 + time.getMinutes() * 60 + time.getSeconds();
  
  // Estimate quantum tunneling events in a typical quantum system
  const tunnelingRate = 1e15; // Events per second in quantum systems
  const tunnelingEvents = secondsToday * tunnelingRate;
  
  return tunnelingEvents.toExponential(2);
};

// Calculate nuclear decay statistics
export const calculateNuclearDecay = (time: Date) => {
  const secondsToday = time.getHours() * 3600 + time.getMinutes() * 60 + time.getSeconds();
  
  // Carbon-14 half-life: 5,730 years
  const carbon14HalfLife = 5730 * 365.25 * 24 * 3600;
  const carbon14Lambda = Math.log(2) / carbon14HalfLife;
  
  // Uranium-238 half-life: 4.468 billion years  
  const uranium238HalfLife = 4.468e9 * 365.25 * 24 * 3600;
  const uranium238Lambda = Math.log(2) / uranium238HalfLife;
  
  // Calculate decay events in 1 gram samples
  const avogadro = 6.022e23;
  const carbon14Atoms = avogadro / 14; // atoms per gram
  const uranium238Atoms = avogadro / 238; // atoms per gram
  
  const carbon14DecaysToday = carbon14Atoms * carbon14Lambda * secondsToday;
  const uranium238DecaysToday = uranium238Atoms * uranium238Lambda * secondsToday;
  
  return {
    carbon14: Math.floor(carbon14DecaysToday),
    uranium238: Math.floor(uranium238DecaysToday)
  };
}; 