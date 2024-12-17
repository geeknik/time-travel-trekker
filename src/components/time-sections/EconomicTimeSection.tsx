import { DollarSign } from "lucide-react";
import { TimeCard } from "@/components/TimeCard";
import { HoverCard, HoverCardContent, HoverCardTrigger } from "@/components/ui/hover-card";

interface EconomicTimeSectionProps {
  time: Date;
}

// Market definitions with their trading hours in local time
const MARKETS = {
  NYSE: {
    name: "NYSE (New York)",
    timezone: "America/New_York",
    openHour: 930, // 9:30 AM
    closeHour: 1600, // 4:00 PM
    weekendDays: [0, 6], // Sunday, Saturday
  },
  LSE: {
    name: "LSE (London)",
    timezone: "Europe/London",
    openHour: 800, // 8:00 AM
    closeHour: 1630, // 4:30 PM
    weekendDays: [0, 6],
  },
  TSE: {
    name: "TSE (Tokyo)",
    timezone: "Asia/Tokyo",
    openHour: 900, // 9:00 AM
    closeHour: 1530, // 3:30 PM
    weekendDays: [0, 6],
  },
  SSE: {
    name: "SSE (Shanghai)",
    timezone: "Asia/Shanghai",
    openHour: 930, // 9:30 AM
    closeHour: 1500, // 3:00 PM
    weekendDays: [0, 6],
  },
  HKE: {
    name: "HKE (Hong Kong)",
    timezone: "Asia/Hong_Kong",
    openHour: 930, // 9:30 AM
    closeHour: 1600, // 4:00 PM
    weekendDays: [0, 6],
  }
};

export function EconomicTimeSection({ time }: EconomicTimeSectionProps) {
  const getMarketStatus = (market: typeof MARKETS[keyof typeof MARKETS]) => {
    // Convert the input time to the market's timezone
    const marketTime = new Date(time.toLocaleString('en-US', { timeZone: market.timezone }));
    const day = marketTime.getDay();
    
    // Check for weekend
    if (market.weekendDays.includes(day)) {
      return { status: "Closed", reason: "Weekend", color: "text-red-400" };
    }

    // Get time value in market's timezone
    const hours = marketTime.getHours();
    const minutes = marketTime.getMinutes();
    const timeValue = hours * 100 + minutes;
    
    if (timeValue >= market.openHour && timeValue <= market.closeHour) {
      return { status: "Open", reason: "Trading", color: "text-green-400" };
    }
    
    return { status: "Closed", reason: "Outside Trading Hours", color: "text-red-400" };
  };

  const getActiveMarkets = () => {
    return Object.entries(MARKETS).map(([key, market]) => {
      const status = getMarketStatus(market);
      const marketTime = new Date(time.toLocaleString('en-US', { timeZone: market.timezone }));
      const timeString = marketTime.toLocaleTimeString('en-US', { 
        hour: '2-digit', 
        minute: '2-digit', 
        hour12: true,
        timeZone: market.timezone 
      });
      
      return {
        name: market.name,
        status: status.status,
        reason: status.reason,
        color: status.color,
        localTime: timeString
      };
    });
  };

  return (
    <HoverCard>
      <HoverCardTrigger asChild>
        <div>
          <TimeCard title="Economic Time" icon={<DollarSign className="w-5 h-5" />}>
            <div className="text-center space-y-3">
              {getActiveMarkets().map((market, index) => (
                <div key={index}>
                  <div className="text-sm text-muted-foreground">
                    {market.name} ({market.localTime})
                  </div>
                  <div className={`font-space text-lg ${market.color}`}>
                    {market.status} ({market.reason})
                  </div>
                </div>
              ))}
            </div>
          </TimeCard>
        </div>
      </HoverCardTrigger>
      <HoverCardContent className="w-80">
        <div className="space-y-2">
          <h4 className="text-sm font-semibold">Economic Time</h4>
          <p className="text-sm text-muted-foreground">
            Tracks market hours and trading status across major global financial centers.
            Shows real-time status for NYSE, LSE, TSE, SSE, and HKE markets.
          </p>
        </div>
      </HoverCardContent>
    </HoverCard>
  );
}