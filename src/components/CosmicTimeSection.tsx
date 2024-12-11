import { TimeCard } from "@/components/TimeCard";
import { Clock, Timer, Binary, Globe, Rocket, Sun, Moon, Infinity } from "lucide-react";
import {
  LAGRANGE_POINTS,
  calculateLightTime,
  calculateMarsTime,
  calculatePlanckTimeProgress,
  calculateGPSTimeDilation,
  calculateInternetTime,
  calculateGalacticYearProgress
} from "@/utils/cosmicCalculations";
import {
  calculateStardate,
  calculateMetricTime,
  calculateHexTime,
  calculateSiderealTime,
  calculateTimeDilation,
  calculateUnixEpochProgress,
  calculateDecimalTime,
  calculateTimeZoneCrossings
} from "@/utils/timeCalculations";

interface CosmicTimeSectionProps {
  time: Date;
}

const getLunarPhaseName = (phase: number): string => {
  const phases = [
    "New Moon 🌑",
    "Waxing Crescent 🌒",
    "First Quarter 🌓",
    "Waxing Gibbous 🌔",
    "Full Moon 🌕",
    "Waning Gibbous 🌖",
    "Last Quarter 🌗",
    "Waning Crescent 🌘"
  ];
  return phases[phase];
};

export function CosmicTimeSection({ time }: CosmicTimeSectionProps) {
  const lunarPhase = Math.floor(((time.getTime() / (29.5 * 24 * 60 * 60 * 1000)) % 1) * 8);
  const phaseName = getLunarPhaseName(lunarPhase);
  const phaseProgress = ((time.getTime() / (29.5 * 24 * 60 * 60 * 1000)) % 1) * 100;

  return (
    <>
      <TimeCard title="Earth Time" icon={<Timer className="w-5 h-5" />}>
        <div className="text-center">
          <div className="font-space text-4xl text-blue-400">
            {time.toLocaleTimeString()}
          </div>
          <div className="text-sm text-muted-foreground mt-2">
            Internet Time: {calculateInternetTime(time)}
          </div>
        </div>
      </TimeCard>

      <TimeCard title="Mars Time (Sol)" icon={<Rocket className="w-5 h-5" />}>
        <div className="text-center">
          <div className="font-space text-4xl text-red-400">
            {calculateMarsTime(time)}
          </div>
        </div>
      </TimeCard>

      <TimeCard title="Light Travel Time" icon={<Sun className="w-5 h-5" />}>
        <div className="text-center space-y-2">
          <div className="font-space text-lg text-yellow-400">
            To Moon: {calculateLightTime(384400)}s
          </div>
          <div className="font-space text-lg text-orange-400">
            To Mars: {calculateLightTime(225000000)}s
          </div>
          <div className="space-y-1 mt-2 text-sm">
            <div className="text-blue-400">To L1: {calculateLightTime(LAGRANGE_POINTS.L1)}s</div>
            <div className="text-green-400">To L2: {calculateLightTime(LAGRANGE_POINTS.L2)}s</div>
            <div className="text-purple-400">To L3: {calculateLightTime(LAGRANGE_POINTS.L3)}s</div>
            <div className="text-pink-400">To L4: {calculateLightTime(LAGRANGE_POINTS.L4)}s</div>
            <div className="text-indigo-400">To L5: {calculateLightTime(LAGRANGE_POINTS.L5)}s</div>
          </div>
        </div>
      </TimeCard>

      <TimeCard title="Lunar Phase" icon={<Moon className="w-5 h-5" />}>
        <div className="text-center space-y-2">
          <div className="font-space text-4xl text-gray-400">
            {phaseName}
          </div>
          <div className="text-sm text-muted-foreground">
            Phase {lunarPhase + 1} of 8
          </div>
          <div className="w-full bg-accent rounded-full h-2">
            <div 
              className="bg-gray-400 h-2 rounded-full transition-all duration-1000"
              style={{ width: `${phaseProgress}%` }}
            />
          </div>
          <div className="text-xs text-muted-foreground">
            Lunar cycle: {Math.round(phaseProgress)}% complete
          </div>
        </div>
      </TimeCard>

      <TimeCard title="Quantum & Relativistic Time" icon={<Infinity className="w-5 h-5" />}>
        <div className="text-center space-y-3">
          <div>
            <div className="text-sm text-muted-foreground">Planck Time Units Today</div>
            <div className="font-space text-lg text-violet-400">
              {calculatePlanckTimeProgress(time)}
            </div>
          </div>
          <div>
            <div className="text-sm text-muted-foreground">GPS Time Dilation</div>
            <div className="font-space text-lg text-emerald-400">
              {calculateGPSTimeDilation(time)}s
            </div>
          </div>
          <div>
            <div className="text-sm text-muted-foreground">Galactic Year Progress</div>
            <div className="font-space text-lg text-cyan-400">
              {calculateGalacticYearProgress(time)}%
            </div>
          </div>
        </div>
      </TimeCard>

      <TimeCard title="Alternative Time Systems" icon={<Clock className="w-5 h-5" />}>
        <div className="space-y-3 text-center">
          <div>
            <div className="text-sm text-muted-foreground">Stardate</div>
            <div className="font-space text-lg text-yellow-400">
              {calculateStardate(time)}
            </div>
          </div>
          <div>
            <div className="text-sm text-muted-foreground">Metric Time</div>
            <div className="font-space text-lg text-blue-400">
              {calculateMetricTime(time)}
            </div>
          </div>
          <div>
            <div className="text-sm text-muted-foreground">Decimal Time</div>
            <div className="font-space text-lg text-green-400">
              {calculateDecimalTime(time)}
            </div>
          </div>
        </div>
      </TimeCard>

      <TimeCard title="Programmer's Time" icon={<Binary className="w-5 h-5" />}>
        <div className="space-y-3 text-center">
          <div>
            <div className="text-sm text-muted-foreground">Hexadecimal Time</div>
            <div className="font-space text-lg text-purple-400">
              0x{calculateHexTime(time)}
            </div>
          </div>
          <div>
            <div className="text-sm text-muted-foreground">Unix Epoch Progress</div>
            <div className="w-full bg-accent rounded-full h-2 mt-2">
              <div 
                className="bg-orange-400 h-2 rounded-full transition-all duration-1000"
                style={{ width: `${calculateUnixEpochProgress(time)}%` }}
              />
            </div>
            <div className="text-xs text-muted-foreground mt-1">
              {calculateUnixEpochProgress(time).toFixed(2)}% until 32-bit overflow
            </div>
          </div>
        </div>
      </TimeCard>

      <TimeCard title="Astronomical Time" icon={<Globe className="w-5 h-5" />}>
        <div className="space-y-3 text-center">
          <div>
            <div className="text-sm text-muted-foreground">Sidereal Time</div>
            <div className="font-space text-lg text-indigo-400">
              {calculateSiderealTime(time)}
            </div>
          </div>
          <div>
            <div className="text-sm text-muted-foreground">Time Zone Crossings</div>
            <div className="font-space text-lg text-teal-400">
              {calculateTimeZoneCrossings(time)} zones
            </div>
          </div>
        </div>
      </TimeCard>

      <TimeCard title="Relativistic Effects" icon={<Infinity className="w-5 h-5" />}>
        <div className="space-y-3 text-center">
          <div>
            <div className="text-sm text-muted-foreground">Time Dilation Factor</div>
            <div className="font-space text-lg text-pink-400">
              {calculateTimeDilation(time)}
            </div>
          </div>
        </div>
      </TimeCard>
    </>
  );
}
