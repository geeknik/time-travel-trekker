import { TimeCard } from "@/components/TimeCard";
import { Pi, Clock } from "lucide-react";
import { HoverCard, HoverCardContent, HoverCardTrigger } from "@/components/ui/hover-card";
import { FibonacciClock } from "@/components/FibonacciClock";
import {
  calculatePhiTime,
  calculatePiTime,
  calculateETime,
  calculateQuaternionTime,
} from "@/utils/timeCalculations";

interface MathematicalTimeSectionProps {
  time: Date;
}

export function MathematicalTimeSection({ time }: MathematicalTimeSectionProps) {
  return (
    <>
      <FibonacciClock time={time} />
      
      <HoverCard>
        <HoverCardTrigger asChild>
          <div>
            <TimeCard title="φ-time" icon={<Pi className="w-5 h-5" />}>
              <div className="text-center">
                <div className="font-space text-4xl text-purple-400">
                  {calculatePhiTime(time)}
                </div>
              </div>
            </TimeCard>
          </div>
        </HoverCardTrigger>
        <HoverCardContent className="w-80">
          <div className="space-y-2">
            <h4 className="text-sm font-semibold">Golden Ratio Time</h4>
            <p className="text-sm text-muted-foreground">
              Time representation based on the golden ratio (φ ≈ 1.618033989). 
              This system divides the day into segments proportional to the golden ratio, 
              creating a naturally harmonious temporal rhythm.
            </p>
          </div>
        </HoverCardContent>
      </HoverCard>

      <HoverCard>
        <HoverCardTrigger asChild>
          <div>
            <TimeCard title="π-time" icon={<Pi className="w-5 h-5" />}>
              <div className="text-center">
                <div className="font-space text-4xl text-pink-400">
                  {calculatePiTime(time)}
                </div>
              </div>
            </TimeCard>
          </div>
        </HoverCardTrigger>
        <HoverCardContent className="w-80">
          <div className="space-y-2">
            <h4 className="text-sm font-semibold">Pi Time</h4>
            <p className="text-sm text-muted-foreground">
              A circular time system based on π (3.14159...). The day is divided into π 
              cycles, creating a mathematical connection between time and the fundamental 
              constant of circles and periodic functions.
            </p>
          </div>
        </HoverCardContent>
      </HoverCard>

      <HoverCard>
        <HoverCardTrigger asChild>
          <div>
            <TimeCard title="e-time" icon={<Clock className="w-5 h-5" />}>
              <div className="text-center">
                <div className="font-space text-4xl text-blue-400">
                  {calculateETime(time)}
                </div>
              </div>
            </TimeCard>
          </div>
        </HoverCardTrigger>
        <HoverCardContent className="w-80">
          <div className="space-y-2">
            <h4 className="text-sm font-semibold">Euler's Time</h4>
            <p className="text-sm text-muted-foreground">
              Time based on Euler's number e (2.71828...). This system reflects natural 
              growth and decay patterns, as e is fundamental to natural logarithms and 
              exponential growth.
            </p>
          </div>
        </HoverCardContent>
      </HoverCard>

      <HoverCard>
        <HoverCardTrigger asChild>
          <div>
            <TimeCard title="Quaternion Time" icon={<Clock className="w-5 h-5" />}>
              <div className="text-center">
                <div className="font-space text-4xl text-cyan-400">
                  {calculateQuaternionTime(time)}
                </div>
              </div>
            </TimeCard>
          </div>
        </HoverCardTrigger>
        <HoverCardContent className="w-80">
          <div className="space-y-2">
            <h4 className="text-sm font-semibold">Quaternion Time</h4>
            <p className="text-sm text-muted-foreground">
              A four-dimensional time representation using quaternions (i, j, k components). 
              This system explores time as a rotation in 4D space, offering a unique 
              perspective on temporal movement and orientation.
            </p>
          </div>
        </HoverCardContent>
      </HoverCard>
    </>
  );
}
