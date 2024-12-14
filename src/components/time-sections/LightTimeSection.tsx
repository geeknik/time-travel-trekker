import { Sun, Rocket } from "lucide-react";
import { TimeCard } from "@/components/TimeCard";
import { HoverCard, HoverCardContent, HoverCardTrigger } from "@/components/ui/hover-card";
import { calculateLightTime, LAGRANGE_POINTS, SPACE_OBJECTS } from "@/utils/cosmicCalculations";

interface LightTimeSectionProps {
  time: Date;
}

export function LightTimeSection({ time }: LightTimeSectionProps) {
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
                <div className="text-blue-400">To Jupiter: {calculateLightTime(SPACE_OBJECTS.JUPITER)}s</div>
                <div className="text-green-400">To Asteroid Belt: {calculateLightTime(SPACE_OBJECTS.KUIPER_BELT / 2)}s</div>
                <div className="text-purple-400">To Kuiper Belt: {calculateLightTime(SPACE_OBJECTS.KUIPER_BELT)}s</div>
                <div className="text-pink-400">To Oort Cloud: {calculateLightTime(SPACE_OBJECTS.OORT_CLOUD)}s</div>
              </div>
              
              <div className="border-t border-gray-700 pt-2 mt-2">
                <div className="text-xs text-muted-foreground mb-1">Lagrange Points</div>
                <div className="grid grid-cols-2 gap-1 text-xs">
                  <div className="text-emerald-400">L1: {calculateLightTime(LAGRANGE_POINTS.L1)}s</div>
                  <div className="text-teal-400">L2: {calculateLightTime(LAGRANGE_POINTS.L2)}s</div>
                  <div className="text-cyan-400">L3: {calculateLightTime(LAGRANGE_POINTS.L3)}s</div>
                  <div className="text-sky-400">L4: {calculateLightTime(LAGRANGE_POINTS.L4)}s</div>
                  <div className="text-indigo-400">L5: {calculateLightTime(LAGRANGE_POINTS.L5)}s</div>
                </div>
              </div>

              <div className="border-t border-gray-700 pt-2 mt-2">
                <div className="text-xs text-muted-foreground mb-1">Space Probes</div>
                <div className="flex items-center justify-center gap-2">
                  <Rocket className="w-4 h-4" />
                  <span className="text-indigo-400">
                    Voyager 1: {calculateLightTime(SPACE_OBJECTS.VOYAGER_1(time))}s
                  </span>
                </div>
                <div className="flex items-center justify-center gap-2">
                  <Rocket className="w-4 h-4" />
                  <span className="text-cyan-400">
                    Voyager 2: {calculateLightTime(SPACE_OBJECTS.VOYAGER_2(time))}s
                  </span>
                </div>
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
            Lagrange points, deep space probes, the Asteroid Belt, and the mysterious Oort Cloud. 
            The Voyager probes' distances update in real-time as they continue their journey 
            into interstellar space.
          </p>
        </div>
      </HoverCardContent>
    </HoverCard>
  );
}