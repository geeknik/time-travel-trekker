import { Rocket } from "lucide-react";
import { TimeCard } from "@/components/TimeCard";
import { HoverCard, HoverCardContent, HoverCardTrigger } from "@/components/ui/hover-card";
import { calculateMarsTime } from "@/utils/cosmicCalculations";

interface MarsTimeSectionProps {
  time: Date;
}

export function MarsTimeSection({ time }: MarsTimeSectionProps) {
  return (
    <HoverCard>
      <HoverCardTrigger asChild>
        <div>
          <TimeCard title="Mars Time (Sol)" icon={<Rocket className="w-5 h-5" />}>
            <div className="text-center">
              <div className="font-space text-4xl text-red-400">
                {calculateMarsTime(time)}
              </div>
            </div>
          </TimeCard>
        </div>
      </HoverCardTrigger>
      <HoverCardContent className="w-80">
        <div className="space-y-2">
          <h4 className="text-sm font-semibold">Martian Solar Time</h4>
          <p className="text-sm text-muted-foreground">
            Shows the current time on Mars in Sols. A Sol is slightly longer than an Earth day,
            lasting approximately 24 hours and 39 minutes.
          </p>
        </div>
      </HoverCardContent>
    </HoverCard>
  );
}