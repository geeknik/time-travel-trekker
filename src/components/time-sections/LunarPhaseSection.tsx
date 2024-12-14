import { Moon } from "lucide-react";
import { TimeCard } from "@/components/TimeCard";
import { HoverCard, HoverCardContent, HoverCardTrigger } from "@/components/ui/hover-card";

interface LunarPhaseSectionProps {
  time: Date;
}

const getLunarPhaseName = (phase: number): string => {
  const phases = [
    "New Moon 🌑",
    "Waxing Crescent 🌒",
    "First Quarter 🌓",
    "Waxing Gibbous 🌔",
    "Full Moon 🌕",
    "Waning Gibbous 🌖",
    "Last Quarter 🌗",
    "Waning Crescent 🌘"
  ];
  return phases[phase];
};

const getMoonVisualization = (phase: number): string => {
  const phases = ["🌑", "🌒", "🌓", "🌔", "🌕", "🌖", "🌗", "🌘"];
  return phases[phase];
};

export function LunarPhaseSection({ time }: LunarPhaseSectionProps) {
  const lunarPhase = Math.floor(((time.getTime() / (29.5 * 24 * 60 * 60 * 1000)) % 1) * 8);
  const phaseName = getLunarPhaseName(lunarPhase);
  const phaseProgress = ((time.getTime() / (29.5 * 24 * 60 * 60 * 1000)) % 1) * 100;
  const moonEmoji = getMoonVisualization(lunarPhase);

  return (
    <HoverCard>
      <HoverCardTrigger asChild>
        <div>
          <TimeCard title="Lunar Phase" icon={<Moon className="w-5 h-5" />}>
            <div className="text-center space-y-4">
              <div className="font-space text-4xl text-gray-400">
                {phaseName}
              </div>
              
              {/* Large Moon Visualization */}
              <div className="text-8xl my-6 animate-pulse">
                {moonEmoji}
              </div>
              
              <div className="text-sm text-muted-foreground">
                Phase {lunarPhase + 1} of 8
              </div>
              
              <div className="space-y-2">
                <div className="w-full bg-accent rounded-full h-2">
                  <div 
                    className="bg-gray-400 h-2 rounded-full transition-all duration-1000"
                    style={{ width: `${phaseProgress}%` }}
                  />
                </div>
                <div className="text-xs text-muted-foreground">
                  Lunar cycle: {Math.round(phaseProgress)}% complete
                </div>
              </div>
            </div>
          </TimeCard>
        </div>
      </HoverCardTrigger>
      <HoverCardContent className="w-80">
        <div className="space-y-2">
          <h4 className="text-sm font-semibold">Lunar Phase Tracker</h4>
          <p className="text-sm text-muted-foreground">
            Displays the current phase of the Moon in its 29.5-day cycle, showing both 
            the phase name and a visual progress indicator of the lunar month.
          </p>
        </div>
      </HoverCardContent>
    </HoverCard>
  );
}