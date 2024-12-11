import { EarthTimeSection } from "./time-sections/EarthTimeSection";
import { MarsTimeSection } from "./time-sections/MarsTimeSection";
import { LightTimeSection } from "./time-sections/LightTimeSection";
import { LunarPhaseSection } from "./time-sections/LunarPhaseSection";
import { QuantumTimeSection } from "./time-sections/QuantumTimeSection";
import { AlternativeTimeSection } from "./time-sections/AlternativeTimeSection";
import { ProgrammerTimeSection } from "./time-sections/ProgrammerTimeSection";
import { AstronomicalTimeSection } from "./time-sections/AstronomicalTimeSection";

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
      <AlternativeTimeSection time={time} />
      <ProgrammerTimeSection time={time} />
      <AstronomicalTimeSection time={time} />
    </>
  );
}