import { Infinity } from "lucide-react";
import { TimeCard } from "@/components/TimeCard";
import { HoverCard, HoverCardContent, HoverCardTrigger } from "@/components/ui/hover-card";
import { 
  calculatePlanckTimeProgress,
  calculateGPSTimeDilation,
  calculateGalacticYearProgress
} from "@/utils/cosmicCalculations";

interface QuantumTimeSectionProps {
  time: Date;
}

export function QuantumTimeSection({ time }: QuantumTimeSectionProps) {
  return (
    <HoverCard>
      <HoverCardTrigger asChild>
        <div>
          <TimeCard title="Quantum & Relativistic Time" icon={<Infinity className="w-5 h-5" />}>
            <div className="text-center space-y-3">
              <div>
                <div className="text-sm text-muted-foreground">Planck Time Units Today</div>
                <div className="font-space text-lg text-violet-400">
                  {calculatePlanckTimeProgress(time)}
                </div>
              </div>
              <div>
                <div className="text-sm text-muted-foreground">GPS Time Dilation</div>
                <div className="font-space text-lg text-emerald-400">
                  {calculateGPSTimeDilation(time)}s
                </div>
              </div>
              <div>
                <div className="text-sm text-muted-foreground">Galactic Year Progress</div>
                <div className="font-space text-lg text-cyan-400">
                  {calculateGalacticYearProgress(time)}%
                </div>
              </div>
            </div>
          </TimeCard>
        </div>
      </HoverCardTrigger>
      <HoverCardContent className="w-80">
        <div className="space-y-2">
          <h4 className="text-sm font-semibold">Quantum Time Measurements</h4>
          <p className="text-sm text-muted-foreground">
            Explores time at its smallest scale (Planck time), relativistic effects on GPS satellites,
            and our progress through the galaxy's orbital year (approximately 225-250 million Earth years).
          </p>
        </div>
      </HoverCardContent>
    </HoverCard>
  );
}