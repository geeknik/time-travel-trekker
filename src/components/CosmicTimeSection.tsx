import { EarthTimeSection } from "./time-sections/EarthTimeSection";
import { MarsTimeSection } from "./time-sections/MarsTimeSection";
import { LightTimeSection } from "./time-sections/LightTimeSection";
import { LunarPhaseSection } from "./time-sections/LunarPhaseSection";
import { QuantumTimeSection } from "./time-sections/QuantumTimeSection";
import { AlternativeTimeSection } from "./time-sections/AlternativeTimeSection";
import { ProgrammerTimeSection } from "./time-sections/ProgrammerTimeSection";
import { AstronomicalTimeSection } from "./time-sections/AstronomicalTimeSection";
import { BiologicalTimeSection } from "./time-sections/BiologicalTimeSection";
import { GeologicalTimeSection } from "./time-sections/GeologicalTimeSection";
import { DigitalTimeSection } from "./time-sections/DigitalTimeSection";
import { MusicalTimeSection } from "./time-sections/MusicalTimeSection";
import { EconomicTimeSection } from "./time-sections/EconomicTimeSection";
import { ParticlePhysicsTimeSection } from "./time-sections/ParticlePhysicsTimeSection";
import { StellarEvolutionTimeSection } from "./time-sections/StellarEvolutionTimeSection";
import { ExoplanetTimeSection } from "./time-sections/ExoplanetTimeSection";
import { OceanTimeSection } from "./time-sections/OceanTimeSection";
import { BlockchainTimeSection } from "./time-sections/BlockchainTimeSection";

interface CosmicTimeSectionProps {
  time: Date;
}

export function CosmicTimeSection({ time }: CosmicTimeSectionProps) {
  return (
    <>
      <EarthTimeSection time={time} />
      <MarsTimeSection time={time} />
      <LightTimeSection time={time} />
      <LunarPhaseSection time={time} />
      <QuantumTimeSection time={time} />
      <ParticlePhysicsTimeSection time={time} />
      <StellarEvolutionTimeSection time={time} />
      <ExoplanetTimeSection time={time} />
      <OceanTimeSection time={time} />
      <BiologicalTimeSection time={time} />
      <GeologicalTimeSection time={time} />
      <DigitalTimeSection time={time} />
      <MusicalTimeSection time={time} />
      <EconomicTimeSection time={time} />
      <BlockchainTimeSection time={time} />
      <AlternativeTimeSection time={time} />
      <ProgrammerTimeSection time={time} />
      <AstronomicalTimeSection time={time} />
    </>
  );
}