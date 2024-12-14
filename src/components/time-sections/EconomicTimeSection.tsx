import { DollarSign } from "lucide-react";
import { TimeCard } from "@/components/TimeCard";
import { HoverCard, HoverCardContent, HoverCardTrigger } from "@/components/ui/hover-card";

interface EconomicTimeSectionProps {
  time: Date;
}

// US Market Holidays for 2024
const MARKET_HOLIDAYS_2024 = [
  new Date("2024-01-01"), // New Year's Day
  new Date("2024-01-15"), // Martin Luther King Jr. Day
  new Date("2024-02-19"), // Presidents Day
  new Date("2024-03-29"), // Good Friday
  new Date("2024-05-27"), // Memorial Day
  new Date("2024-06-19"), // Juneteenth
  new Date("2024-07-04"), // Independence Day
  new Date("2024-09-02"), // Labor Day
  new Date("2024-11-28"), // Thanksgiving Day
  new Date("2024-12-25"), // Christmas Day
];

export function EconomicTimeSection({ time }: EconomicTimeSectionProps) {
  const isWeekend = (date: Date) => {
    const day = date.getDay();
    return day === 0 || day === 6; // 0 is Sunday, 6 is Saturday
  };

  const isHoliday = (date: Date) => {
    return MARKET_HOLIDAYS_2024.some(holiday => 
      holiday.getDate() === date.getDate() &&
      holiday.getMonth() === date.getMonth() &&
      holiday.getFullYear() === date.getFullYear()
    );
  };

  const marketStatus = () => {
    if (isWeekend(time)) {
      return "NYSE Closed (Weekend)";
    }

    if (isHoliday(time)) {
      return "NYSE Closed (Holiday)";
    }

    const hour = time.getHours();
    const minute = time.getMinutes();
    const timeValue = hour * 100 + minute;
    
    if (timeValue >= 930 && timeValue <= 1600) {
      return "NYSE Open";
    } else {
      return "NYSE Closed";
    }
  };

  const getStatusColor = () => {
    const status = marketStatus();
    if (status === "NYSE Open") {
      return "text-green-400";
    }
    return "text-red-400";
  };

  return (
    <HoverCard>
      <HoverCardTrigger asChild>
        <div>
          <TimeCard title="Economic Time" icon={<DollarSign className="w-5 h-5" />}>
            <div className="text-center space-y-3">
              <div>
                <div className="text-sm text-muted-foreground">Market Status</div>
                <div className={`font-space text-lg ${getStatusColor()}`}>
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
            Markets are closed on weekends and major US holidays.
          </p>
        </div>
      </HoverCardContent>
    </HoverCard>
  );
}