import { HeartPulse } from "lucide-react";
import { TimeCard } from "@/components/TimeCard";
import { HoverCard, HoverCardContent, HoverCardTrigger } from "@/components/ui/hover-card";

interface BiologicalTimeSectionProps {
  time: Date;
}

export function BiologicalTimeSection({ time }: BiologicalTimeSectionProps) {
  // Average human heart beats per day: 100,000
  const beatsToday = Math.floor((time.getHours() * 3600 + time.getMinutes() * 60 + time.getSeconds()) * (100000 / 86400));
  
  // Average cell divisions per day: ~300 billion
  const cellDivisions = Math.floor((time.getHours() * 3600 + time.getMinutes() * 60 + time.getSeconds()) * (300000000000 / 86400));

  return (
    <HoverCard>
      <HoverCardTrigger asChild>
        <div>
          <TimeCard title="Biological Time" icon={<HeartPulse className="w-5 h-5" />}>
            <div className="text-center space-y-3">
              <div>
                <div className="text-sm text-muted-foreground">Heartbeats Today</div>
                <div className="font-space text-lg text-red-400">
                  {beatsToday.toLocaleString()}
                </div>
              </div>
              <div>
                <div className="text-sm text-muted-foreground">Cell Divisions</div>
                <div className="font-space text-lg text-pink-400">
                  {cellDivisions.toLocaleString()}
                </div>
              </div>
              <div>
                <div className="text-sm text-muted-foreground">Circadian Phase</div>
                <div className="font-space text-lg text-orange-400">
                  {time.getHours() < 6 ? "Night" :
                   time.getHours() < 12 ? "Morning" :
                   time.getHours() < 18 ? "Afternoon" : "Evening"}
                </div>
              </div>
            </div>
          </TimeCard>
        </div>
      </HoverCardTrigger>
      <HoverCardContent className="w-80">
        <div className="space-y-2">
          <h4 className="text-sm font-semibold">Biological Rhythms</h4>
          <p className="text-sm text-muted-foreground">
            Tracks biological processes including heartbeats, cell divisions, and 
            circadian rhythm phases throughout the day.
          </p>
        </div>
      </HoverCardContent>
    </HoverCard>
  );
}