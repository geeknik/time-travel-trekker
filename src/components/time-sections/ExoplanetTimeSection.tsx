import { Telescope } from "lucide-react";
import { TimeCard } from "@/components/TimeCard";
import { HoverCard, HoverCardContent, HoverCardTrigger } from "@/components/ui/hover-card";
import { 
  calculateExoplanetTime,
  calculateExoplanetDiscoveries,
  calculateExoplanetCommunication,
  calculateExoplanetSeasons
} from "@/utils/exoplanetCalculations";

interface ExoplanetTimeSectionProps {
  time: Date;
}

export function ExoplanetTimeSection({ time }: ExoplanetTimeSectionProps) {
  const proximaTime = calculateExoplanetTime(time, 'PROXIMA_CENTAURI_B');
  const discoveries = calculateExoplanetDiscoveries(time);
  const communication = calculateExoplanetCommunication('PROXIMA_CENTAURI_B');
  const trappistSeasons = calculateExoplanetSeasons(time, 'TRAPPIST_1E');

  return (
    <HoverCard>
      <HoverCardTrigger asChild>
        <div>
          <TimeCard title="Exoplanet Time" icon={<Telescope className="w-5 h-5" />}>
            <div className="text-center space-y-3">
              <div>
                <div className="text-sm text-muted-foreground">Proxima Centauri b Time</div>
                <div className="font-space text-lg text-green-400">
                  {proximaTime.hours}:{proximaTime.minutes.toString().padStart(2, '0')}
                </div>
              </div>
              <div>
                <div className="text-sm text-muted-foreground">Exoplanets Discovered</div>
                <div className="font-space text-lg text-purple-400">
                  {discoveries.confirmed.toLocaleString()}
                </div>
              </div>
              <div>
                <div className="text-sm text-muted-foreground">TRAPPIST-1e Season</div>
                <div className="font-space text-lg text-orange-400">
                  {trappistSeasons.season}
                </div>
              </div>
              <div>
                <div className="text-sm text-muted-foreground">Nearest Communication</div>
                <div className="font-space text-lg text-cyan-400">
                  {communication.roundTrip} years
                </div>
              </div>
            </div>
          </TimeCard>
        </div>
      </HoverCardTrigger>
      <HoverCardContent className="w-80">
        <div className="space-y-2">
          <h4 className="text-sm font-semibold">Worlds Beyond Our Solar System</h4>
          <p className="text-sm text-muted-foreground">
            Explores time on exoplanets: the current time on our nearest potentially habitable neighbor, 
            the count of worlds we've discovered beyond our solar system, seasonal cycles on distant planets, 
            and the communication delays across interstellar space.
          </p>
          <div className="text-xs text-muted-foreground mt-2">
            • Proxima Centauri b: Our closest exoplanet, 4.24 light-years away<br/>
            • Discoveries: Over 5,000 confirmed exoplanets since 1995<br/>
            • TRAPPIST-1e: Earth-sized world in habitable zone, 40 light-years away<br/>
            • Communication: Round-trip messages would take human generations
          </div>
        </div>
      </HoverCardContent>
    </HoverCard>
  );
} 