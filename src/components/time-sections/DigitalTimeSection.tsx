import { Cpu } from "lucide-react";
import { TimeCard } from "@/components/TimeCard";
import { HoverCard, HoverCardContent, HoverCardTrigger } from "@/components/ui/hover-card";

interface DigitalTimeSectionProps {
  time: Date;
}

export function DigitalTimeSection({ time }: DigitalTimeSectionProps) {
  // Assuming a 3GHz processor
  const cyclesPerSecond = 3000000000;
  const secondsToday = time.getHours() * 3600 + time.getMinutes() * 60 + time.getSeconds();
  const cyclesToday = secondsToday * cyclesPerSecond;
  
  return (
    <HoverCard>
      <HoverCardTrigger asChild>
        <div>
          <TimeCard title="Digital Time" icon={<Cpu className="w-5 h-5" />}>
            <div className="text-center space-y-3">
              <div>
                <div className="text-sm text-muted-foreground">CPU Cycles Today</div>
                <div className="font-space text-lg text-emerald-400">
                  {(cyclesToday / 1e12).toFixed(2)} trillion
                </div>
              </div>
              <div>
                <div className="text-sm text-muted-foreground">Clock Speed</div>
                <div className="font-space text-lg text-teal-400">
                  3.0 GHz
                </div>
              </div>
              <div>
                <div className="text-sm text-muted-foreground">Cycles per Second</div>
                <div className="font-space text-lg text-cyan-400">
                  {(cyclesPerSecond / 1e9).toFixed(1)} billion
                </div>
              </div>
            </div>
          </TimeCard>
        </div>
      </HoverCardTrigger>
      <HoverCardContent className="w-80">
        <div className="space-y-2">
          <h4 className="text-sm font-semibold">Digital Clock Cycles</h4>
          <p className="text-sm text-muted-foreground">
            Tracks CPU clock cycles and processing metrics based on a 3GHz processor.
          </p>
        </div>
      </HoverCardContent>
    </HoverCard>
  );
}