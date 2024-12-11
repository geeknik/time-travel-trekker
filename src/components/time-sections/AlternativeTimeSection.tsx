import { Clock } from "lucide-react";
import { TimeCard } from "@/components/TimeCard";
import { HoverCard, HoverCardContent, HoverCardTrigger } from "@/components/ui/hover-card";
import {
  calculateStardate,
  calculateMetricTime,
  calculateDecimalTime
} from "@/utils/timeCalculations";

interface AlternativeTimeSectionProps {
  time: Date;
}

export function AlternativeTimeSection({ time }: AlternativeTimeSectionProps) {
  return (
    <HoverCard>
      <HoverCardTrigger asChild>
        <div>
          <TimeCard title="Alternative Time Systems" icon={<Clock className="w-5 h-5" />}>
            <div className="space-y-3 text-center">
              <div>
                <div className="text-sm text-muted-foreground">Stardate</div>
                <div className="font-space text-lg text-yellow-400">
                  {calculateStardate(time)}
                </div>
              </div>
              <div>
                <div className="text-sm text-muted-foreground">Metric Time</div>
                <div className="font-space text-lg text-blue-400">
                  {calculateMetricTime(time)}
                </div>
              </div>
              <div>
                <div className="text-sm text-muted-foreground">Decimal Time</div>
                <div className="font-space text-lg text-green-400">
                  {calculateDecimalTime(time)}
                </div>
              </div>
            </div>
          </TimeCard>
        </div>
      </HoverCardTrigger>
      <HoverCardContent className="w-80">
        <div className="space-y-2">
          <h4 className="text-sm font-semibold">Alternative Time Systems</h4>
          <p className="text-sm text-muted-foreground">
            Features Star Trek's Stardate system, metric time (based on powers of 10),
            and decimal time (day divided into 10 decimal hours).
          </p>
        </div>
      </HoverCardContent>
    </HoverCard>
  );
}