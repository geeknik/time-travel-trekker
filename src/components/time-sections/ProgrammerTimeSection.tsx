import { Binary } from "lucide-react";
import { TimeCard } from "@/components/TimeCard";
import { HoverCard, HoverCardContent, HoverCardTrigger } from "@/components/ui/hover-card";
import {
  calculateHexTime,
  calculateUnixEpochProgress
} from "@/utils/timeCalculations";

interface ProgrammerTimeSectionProps {
  time: Date;
}

export function ProgrammerTimeSection({ time }: ProgrammerTimeSectionProps) {
  return (
    <HoverCard>
      <HoverCardTrigger asChild>
        <div>
          <TimeCard title="Programmer's Time" icon={<Binary className="w-5 h-5" />}>
            <div className="space-y-3 text-center">
              <div>
                <div className="text-sm text-muted-foreground">Hexadecimal Time</div>
                <div className="font-space text-lg text-purple-400">
                  0x{calculateHexTime(time)}
                </div>
              </div>
              <div>
                <div className="text-sm text-muted-foreground">Unix Epoch Progress</div>
                <div className="w-full bg-accent rounded-full h-2 mt-2">
                  <div 
                    className="bg-orange-400 h-2 rounded-full transition-all duration-1000"
                    style={{ width: `${calculateUnixEpochProgress(time)}%` }}
                  />
                </div>
                <div className="text-xs text-muted-foreground mt-1">
                  {calculateUnixEpochProgress(time).toFixed(2)}% until 32-bit overflow
                </div>
              </div>
            </div>
          </TimeCard>
        </div>
      </HoverCardTrigger>
      <HoverCardContent className="w-80">
        <div className="space-y-2">
          <h4 className="text-sm font-semibold">Developer Time Formats</h4>
          <p className="text-sm text-muted-foreground">
            Shows time in hexadecimal format and tracks progress towards the Unix Epoch 
            32-bit integer overflow (Year 2038 problem).
          </p>
        </div>
      </HoverCardContent>
    </HoverCard>
  );
}