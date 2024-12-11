import { TimeCard } from "@/components/TimeCard";
import { Rocket, Sun, Moon, Timer, Infinity } from "lucide-react";
import { LAGRANGE_POINTS, calculateLightTime, calculateMarsTime, calculatePlanckTimeProgress, calculateGPSTimeDilation, calculateInternetTime, calculateGalacticYearProgress } from "@/utils/cosmicCalculations";

interface CosmicTimeSectionProps {
  time: Date;
}

export function CosmicTimeSection({ time }: CosmicTimeSectionProps) {
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
        <div className="text-center">
          <div className="font-space text-4xl text-gray-400">
            {Math.floor(((time.getTime() / (29.5 * 24 * 60 * 60 * 1000)) % 1) * 8)} / 8
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
    </>
  );
}