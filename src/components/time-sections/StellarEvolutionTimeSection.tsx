import { Star } from "lucide-react";
import { TimeCard } from "@/components/TimeCard";
import { HoverCard, HoverCardContent, HoverCardTrigger } from "@/components/ui/hover-card";
import { 
  calculateStellarAge,
  calculateNeutronStarTime,
  calculateSupernovaRate,
  calculateCosmicDistances,
  STELLAR_LIFETIMES
} from "@/utils/stellarCalculations";

interface StellarEvolutionTimeSectionProps {
  time: Date;
}

export function StellarEvolutionTimeSection({ time }: StellarEvolutionTimeSectionProps) {
  const sunAge = calculateStellarAge('G_TYPE', 4.6e9); // Sun's current age
  const pulsarData = calculateNeutronStarTime(time);
  const supernovaRate = calculateSupernovaRate(time);
  const cosmicDistances = calculateCosmicDistances(time);

  return (
    <HoverCard>
      <HoverCardTrigger asChild>
        <div>
          <TimeCard title="Stellar Evolution Time" icon={<Star className="w-5 h-5" />}>
            <div className="text-center space-y-3">
              <div>
                <div className="text-sm text-muted-foreground">Sun's Lifetime Progress</div>
                <div className="font-space text-lg text-yellow-400">
                  {sunAge}%
                </div>
              </div>
              <div>
                <div className="text-sm text-muted-foreground">Pulsar Rotations Today</div>
                <div className="font-space text-lg text-cyan-400">
                  {pulsarData.rotations.toLocaleString()}
                </div>
              </div>
              <div>
                <div className="text-sm text-muted-foreground">Universe Supernovae Today</div>
                <div className="font-space text-lg text-red-400">
                  {supernovaRate.universe.toLocaleString()}
                </div>
              </div>
              <div>
                <div className="text-sm text-muted-foreground">Light Travel Today</div>
                <div className="font-space text-lg text-blue-400">
                  {cosmicDistances.moonDistances} Moon distances
                </div>
              </div>
            </div>
          </TimeCard>
        </div>
      </HoverCardTrigger>
      <HoverCardContent className="w-80">
        <div className="space-y-2">
          <h4 className="text-sm font-semibold">Cosmic Evolution Timescales</h4>
          <p className="text-sm text-muted-foreground">
            Explores stellar lifetimes and cosmic phenomena: our Sun's journey through its 
            10-billion-year main sequence life, neutron star rotation frequencies, 
            supernova explosion rates across the observable universe, and the distance 
            light travels each day.
          </p>
          <div className="text-xs text-muted-foreground mt-2">
            • Sun: Middle-aged G-type star with ~5 billion years remaining<br/>
            • Pulsars: Ultra-dense neutron stars spinning hundreds of times per second<br/>
            • Supernovae: Stellar explosions occur roughly once per second in the universe<br/>
            • Light Speed: 299,792,458 meters per second - the cosmic speed limit
          </div>
        </div>
      </HoverCardContent>
    </HoverCard>
  );
} 