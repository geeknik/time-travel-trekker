import React from "react";
import { Atom } from "lucide-react";
import { TimeCard } from "@/components/TimeCard";
import { HoverCard, HoverCardContent, HoverCardTrigger } from "@/components/ui/hover-card";
import { 
  calculateParticleDecays,
  calculateAtomicVibrations,
  calculateAcceleratorCycles,
  calculateNuclearDecay
} from "@/utils/particlePhysicsCalculations";

interface ParticlePhysicsTimeSectionProps {
  time: Date;
}

export function ParticlePhysicsTimeSection({ time }: ParticlePhysicsTimeSectionProps) {
  const muonDecays = calculateParticleDecays(time, 'MUON');
  const atomicVibrations = calculateAtomicVibrations(time);
  const acceleratorCycles = calculateAcceleratorCycles(time);
  const nuclearDecay = calculateNuclearDecay(time);

  return (
    <HoverCard>
      <HoverCardTrigger asChild>
        <div>
          <TimeCard title="Particle Physics Time" icon={<Atom className="w-5 h-5" />}>
            <div className="text-center space-y-3">
              <div>
                <div className="text-sm text-muted-foreground">Muon Decays Today</div>
                <div className="font-space text-lg text-blue-400">
                  {muonDecays.decayed.toLocaleString()}
                </div>
              </div>
              <div>
                <div className="text-sm text-muted-foreground">Cs-133 Oscillations</div>
                <div className="font-space text-lg text-green-400">
                  {atomicVibrations.cesium}
                </div>
              </div>
              <div>
                <div className="text-sm text-muted-foreground">LHC Revolutions</div>
                <div className="font-space text-lg text-purple-400">
                  {acceleratorCycles.lhcRevolutions.toLocaleString()}
                </div>
              </div>
              <div>
                <div className="text-sm text-muted-foreground">C-14 Decays (1g)</div>
                <div className="font-space text-lg text-orange-400">
                  {nuclearDecay.carbon14.toLocaleString()}
                </div>
              </div>
            </div>
          </TimeCard>
        </div>
      </HoverCardTrigger>
      <HoverCardContent className="w-80">
        <div className="space-y-2">
          <h4 className="text-sm font-semibold">Subatomic Time Scales</h4>
          <p className="text-sm text-muted-foreground">
            Tracks fundamental particle processes: muon decay events from cosmic rays, 
            cesium atomic clock oscillations (the basis of our time standard), 
            particle accelerator cycles, and radioactive decay statistics.
          </p>
          <div className="text-xs text-muted-foreground mt-2">
            • Muons: Unstable particles from cosmic ray interactions<br/>
            • Cs-133: Defines the second in the International System of Units<br/>
            • LHC: Large Hadron Collider beam circulation frequency<br/>
            • C-14: Carbon dating isotope decay rate
          </div>
        </div>
      </HoverCardContent>
    </HoverCard>
  );
} 