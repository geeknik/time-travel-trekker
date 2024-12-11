import { Globe } from "lucide-react";
import { TimeCard } from "@/components/TimeCard";
import { HoverCard, HoverCardContent, HoverCardTrigger } from "@/components/ui/hover-card";
import {
  calculateSiderealTime,
  calculateTimeZoneCrossings,
  calculateTimeDilation
} from "@/utils/timeCalculations";

interface AstronomicalTimeSectionProps {
  time: Date;
}

export function AstronomicalTimeSection({ time }: AstronomicalTimeSectionProps) {
  return (
    <HoverCard>
      <HoverCardTrigger asChild>
        <div>
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
              <div>
                <div className="text-sm text-muted-foreground">Time Dilation Factor</div>
                <div className="font-space text-lg text-pink-400">
                  {calculateTimeDilation(time)}
                </div>
              </div>
            </div>
          </TimeCard>
        </div>
      </HoverCardTrigger>
      <HoverCardContent className="w-80">
        <div className="space-y-2">
          <h4 className="text-sm font-semibold">Astronomical Time Measurements</h4>
          <p className="text-sm text-muted-foreground">
            Displays Earth's rotation relative to fixed stars (sidereal time), 
            time zone crossings by light in the current second, and relativistic time dilation effects.
          </p>
        </div>
      </HoverCardContent>
    </HoverCard>
  );
}