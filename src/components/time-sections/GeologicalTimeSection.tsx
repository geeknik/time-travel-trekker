import { Mountain } from "lucide-react";
import { TimeCard } from "@/components/TimeCard";
import { HoverCard, HoverCardContent, HoverCardTrigger } from "@/components/ui/hover-card";

interface GeologicalTimeSectionProps {
  time: Date;
}

export function GeologicalTimeSection({ time: _ }: GeologicalTimeSectionProps) {
  const earthAge = 4.543; // billion years
  const tectonicMovement = 2.5; // cm per year
  const currentEon = "Phanerozoic";
  const currentEra = "Cenozoic";
  const currentPeriod = "Quaternary";

  return (
    <HoverCard>
      <HoverCardTrigger asChild>
        <div>
          <TimeCard title="Geological Time" icon={<Mountain className="w-5 h-5" />}>
            <div className="text-center space-y-3">
              <div>
                <div className="text-sm text-muted-foreground">Earth's Age</div>
                <div className="font-space text-lg text-stone-400">
                  {earthAge.toFixed(3)} Billion Years
                </div>
              </div>
              <div>
                <div className="text-sm text-muted-foreground">Current Period</div>
                <div className="font-space text-base text-amber-400">
                  {currentEon} / {currentEra} / {currentPeriod}
                </div>
              </div>
              <div>
                <div className="text-sm text-muted-foreground">Tectonic Movement Today</div>
                <div className="font-space text-lg text-yellow-400">
                  {(tectonicMovement / 365).toFixed(6)} cm
                </div>
              </div>
            </div>
          </TimeCard>
        </div>
      </HoverCardTrigger>
      <HoverCardContent className="w-80">
        <div className="space-y-2">
          <h4 className="text-sm font-semibold">Geological Time Scale</h4>
          <p className="text-sm text-muted-foreground">
            Displays Earth's age, current geological period, and daily tectonic plate movement.
          </p>
        </div>
      </HoverCardContent>
    </HoverCard>
  );
}