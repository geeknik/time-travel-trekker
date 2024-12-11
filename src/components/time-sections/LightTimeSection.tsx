import { Sun } from "lucide-react";
import { TimeCard } from "@/components/TimeCard";
import { HoverCard, HoverCardContent, HoverCardTrigger } from "@/components/ui/hover-card";
import { calculateLightTime, LAGRANGE_POINTS } from "@/utils/cosmicCalculations";

interface LightTimeSectionProps {
  time: Date;
}

export function LightTimeSection({ time: _ }: LightTimeSectionProps) {
  return (
    <HoverCard>
      <HoverCardTrigger asChild>
        <div>
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
        </div>
      </HoverCardTrigger>
      <HoverCardContent className="w-80">
        <div className="space-y-2">
          <h4 className="text-sm font-semibold">Light Travel Times</h4>
          <p className="text-sm text-muted-foreground">
            Shows how long it takes light to travel to various celestial points, including 
            the Moon, Mars, and the five Lagrange points (L1-L5) in the Earth-Sun system.
          </p>
        </div>
      </HoverCardContent>
    </HoverCard>
  );
}