import { DollarSign } from "lucide-react";
import { TimeCard } from "@/components/TimeCard";
import { HoverCard, HoverCardContent, HoverCardTrigger } from "@/components/ui/hover-card";

interface EconomicTimeSectionProps {
  time: Date;
}

export function EconomicTimeSection({ time }: EconomicTimeSectionProps) {
  const marketStatus = () => {
    const hour = time.getHours();
    const minute = time.getMinutes();
    const timeValue = hour * 100 + minute;
    
    if (timeValue >= 930 && timeValue <= 1600) {
      return "NYSE Open";
    } else {
      return "NYSE Closed";
    }
  };

  return (
    <HoverCard>
      <HoverCardTrigger asChild>
        <div>
          <TimeCard title="Economic Time" icon={<DollarSign className="w-5 h-5" />}>
            <div className="text-center space-y-3">
              <div>
                <div className="text-sm text-muted-foreground">Market Status</div>
                <div className="font-space text-lg text-green-400">
                  {marketStatus()}
                </div>
              </div>
              <div>
                <div className="text-sm text-muted-foreground">Trading Hours</div>
                <div className="font-space text-lg text-emerald-400">
                  9:30 AM - 4:00 PM EST
                </div>
              </div>
              <div>
                <div className="text-sm text-muted-foreground">Time Zones Active</div>
                <div className="font-space text-lg text-lime-400">
                  NYSE / LSE / TSE
                </div>
              </div>
            </div>
          </TimeCard>
        </div>
      </HoverCardTrigger>
      <HoverCardContent className="w-80">
        <div className="space-y-2">
          <h4 className="text-sm font-semibold">Economic Time</h4>
          <p className="text-sm text-muted-foreground">
            Tracks market hours and trading status across major global financial centers.
          </p>
        </div>
      </HoverCardContent>
    </HoverCard>
  );
}