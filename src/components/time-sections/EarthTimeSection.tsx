import { Timer } from "lucide-react";
import { TimeCard } from "@/components/TimeCard";
import { HoverCard, HoverCardContent, HoverCardTrigger } from "@/components/ui/hover-card";
import { calculateInternetTime } from "@/utils/timeCalculations";

interface EarthTimeSectionProps {
  time: Date;
}

export function EarthTimeSection({ time }: EarthTimeSectionProps) {
  // Get user's timezone
  const userTimeZone = Intl.DateTimeFormat().resolvedOptions().timeZone;
  
  // Format UTC time
  const utcTime = time.toLocaleTimeString('en-US', { 
    timeZone: 'UTC',
    hour12: false,
  });

  return (
    <HoverCard>
      <HoverCardTrigger asChild>
        <div>
          <TimeCard title="Earth Time" icon={<Timer className="w-5 h-5" />}>
            <div className="text-center space-y-2">
              <div className="font-space text-4xl text-blue-400">
                {time.toLocaleTimeString()}
              </div>
              <div className="text-sm text-muted-foreground">
                UTC: {utcTime}
              </div>
              <div className="text-xs text-muted-foreground">
                Timezone: {userTimeZone}
              </div>
              <div className="text-sm text-muted-foreground">
                Internet Time: {calculateInternetTime(time)}
              </div>
            </div>
          </TimeCard>
        </div>
      </HoverCardTrigger>
      <HoverCardContent className="w-80">
        <div className="space-y-2">
          <h4 className="text-sm font-semibold">Earth Time Systems</h4>
          <p className="text-sm text-muted-foreground">
            Displays current local time, UTC time, detected timezone, and Swatch Internet Time (.beat time), 
            which divides each day into 1000 beats, independent of time zones.
          </p>
        </div>
      </HoverCardContent>
    </HoverCard>
  );
}