import { Music } from "lucide-react";
import { TimeCard } from "@/components/TimeCard";
import { HoverCard, HoverCardContent, HoverCardTrigger } from "@/components/ui/hover-card";

interface MusicalTimeSectionProps {
  time: Date;
}

export function MusicalTimeSection({ time }: MusicalTimeSectionProps) {
  // Standard tempo is 120 BPM
  const standardBPM = 120;
  const beatsToday = Math.floor((time.getHours() * 3600 + time.getMinutes() * 60 + time.getSeconds()) * (standardBPM / 60));
  const measures = Math.floor(beatsToday / 4); // Assuming 4/4 time

  return (
    <HoverCard>
      <HoverCardTrigger asChild>
        <div>
          <TimeCard title="Musical Time" icon={<Music className="w-5 h-5" />}>
            <div className="text-center space-y-3">
              <div>
                <div className="text-sm text-muted-foreground">Beats Today</div>
                <div className="font-space text-lg text-violet-400">
                  {beatsToday.toLocaleString()}
                </div>
              </div>
              <div>
                <div className="text-sm text-muted-foreground">Measures (4/4)</div>
                <div className="font-space text-lg text-purple-400">
                  {measures.toLocaleString()}
                </div>
              </div>
              <div>
                <div className="text-sm text-muted-foreground">Tempo</div>
                <div className="font-space text-lg text-fuchsia-400">
                  {standardBPM} BPM (Allegro)
                </div>
              </div>
            </div>
          </TimeCard>
        </div>
      </HoverCardTrigger>
      <HoverCardContent className="w-80">
        <div className="space-y-2">
          <h4 className="text-sm font-semibold">Musical Time</h4>
          <p className="text-sm text-muted-foreground">
            Represents time in musical terms using beats, measures, and tempo markings 
            based on standard 120 BPM (Allegro).
          </p>
        </div>
      </HoverCardContent>
    </HoverCard>
  );
}