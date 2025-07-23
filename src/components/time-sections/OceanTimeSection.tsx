import { Waves } from "lucide-react";
import { TimeCard } from "@/components/TimeCard";
import { HoverCard, HoverCardContent, HoverCardTrigger } from "@/components/ui/hover-card";
import { 
  calculateTides,
  calculateMarineMigrations,
  calculatePlanktonMigration,
  calculateDeepOceanCirculation
} from "@/utils/oceanCalculations";

interface OceanTimeSectionProps {
  time: Date;
}

export function OceanTimeSection({ time }: OceanTimeSectionProps) {
  const tides = calculateTides(time);
  const marineMigrations = calculateMarineMigrations(time);
  const planktonMigration = calculatePlanktonMigration(time);
  const oceanCirculation = calculateDeepOceanCirculation(time);

  return (
    <HoverCard>
      <HoverCardTrigger asChild>
        <div>
          <TimeCard title="Ocean Time" icon={<Waves className="w-5 h-5" />}>
            <div className="text-center space-y-3">
              <div>
                <div className="text-sm text-muted-foreground">Tidal Phase</div>
                <div className="font-space text-lg text-blue-400">
                  {tides.phase}
                </div>
              </div>
              <div>
                <div className="text-sm text-muted-foreground">Whale Migration</div>
                <div className="font-space text-lg text-cyan-400">
                  {marineMigrations.status}
                </div>
              </div>
              <div>
                <div className="text-sm text-muted-foreground">Plankton Depth</div>
                <div className="font-space text-lg text-green-400">
                  {planktonMigration.currentDepth}m
                </div>
              </div>
              <div>
                <div className="text-sm text-muted-foreground">Gulf Stream Today</div>
                <div className="font-space text-lg text-purple-400">
                  {oceanCirculation.gulfStreamKm} km
                </div>
              </div>
            </div>
          </TimeCard>
        </div>
      </HoverCardTrigger>
      <HoverCardContent className="w-80">
        <div className="space-y-2">
          <h4 className="text-sm font-semibold">Marine & Oceanic Cycles</h4>
          <p className="text-sm text-muted-foreground">
            Tracks ocean phenomena: tidal phases driven by lunar gravity, 
            seasonal whale migration patterns, daily plankton vertical migration 
            for feeding, and the movement of major ocean currents like the Gulf Stream.
          </p>
          <div className="text-xs text-muted-foreground mt-2">
            • Tides: 12.42-hour cycle caused by Moon's gravitational pull<br/>
            • Whales: Travel up to 16,000 km in annual migration routes<br/>
            • Plankton: Daily vertical migration of trillions of organisms<br/>
            • Gulf Stream: Moves 2.5 m/s, carrying 30 times Amazon River flow
          </div>
        </div>
      </HoverCardContent>
    </HoverCard>
  );
} 