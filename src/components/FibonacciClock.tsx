import { useEffect, useState } from 'react';
import { TimeCard } from "@/components/TimeCard";
import { Clock } from "lucide-react";
import { HoverCard, HoverCardContent, HoverCardTrigger } from "@/components/ui/hover-card";

interface SquareProps {
  size: number;
  color: string;
  value: number;
}

const Square: React.FC<SquareProps> = ({ size, color, value }) => (
  <div 
    className={`${color} border border-white/10`}
    style={{ 
      width: `${size * 20}%`,
      height: `${size * 20}%`,
      transition: 'background-color 0.3s ease'
    }}
  />
);

export function FibonacciClock({ time }: { time: Date }) {
  const [squares, setSquares] = useState<Array<{ size: number; color: string; value: number }>>([
    { size: 5, color: 'bg-transparent', value: 5 },  // Largest square
    { size: 3, color: 'bg-transparent', value: 3 },  // Medium square
    { size: 2, color: 'bg-transparent', value: 2 },  // Small square
    { size: 1, color: 'bg-transparent', value: 1 },  // Tiny square 1
    { size: 1, color: 'bg-transparent', value: 1 }   // Tiny square 2
  ]);

  useEffect(() => {
    const hours = time.getHours() % 12 || 12; // Convert to 12-hour format
    const minutes = Math.floor(time.getMinutes() / 5); // Convert minutes to 5-minute blocks (0-11)

    // Reset colors
    const newSquares = squares.map(square => ({ ...square, color: 'bg-transparent' }));
    
    // Find combination for hours (sum should equal hours)
    let remainingHours = hours;
    let remainingMinutes = minutes;

    // Sort squares by value in descending order for greedy allocation
    const sortedSquareIndices = [...newSquares.keys()].sort(
      (a, b) => newSquares[b].value - newSquares[a].value
    );

    for (const index of sortedSquareIndices) {
      const square = newSquares[index];
      if (remainingHours >= square.value && remainingMinutes >= square.value) {
        newSquares[index].color = 'bg-blue-500/60'; // Both hours and minutes
        remainingHours -= square.value;
        remainingMinutes -= square.value;
      } else if (remainingHours >= square.value) {
        newSquares[index].color = 'bg-red-500/60'; // Hours only
        remainingHours -= square.value;
      } else if (remainingMinutes >= square.value) {
        newSquares[index].color = 'bg-green-500/60'; // Minutes only
        remainingMinutes -= square.value;
      }
    }

    setSquares(newSquares);
  }, [time]);

  return (
    <HoverCard>
      <HoverCardTrigger asChild>
        <div>
          <TimeCard title="Fibonacci Clock" icon={<Clock className="w-5 h-5" />}>
            <div className="relative w-full pt-[60%] bg-black/40 rounded-lg overflow-hidden">
              <div className="absolute inset-0 p-2">
                <div className="relative w-full h-full">
                  {/* Large 5x5 square */}
                  <div className="absolute right-0 top-0 w-[61.8%] h-full">
                    <Square {...squares[0]} />
                  </div>
                  {/* Left side container */}
                  <div className="absolute left-0 top-0 w-[38.2%] h-full">
                    {/* Top section with 3x3 square */}
                    <div className="relative w-full h-[61.8%]">
                      <Square {...squares[1]} />
                    </div>
                    {/* Bottom section with 2x2 and 1x1 squares */}
                    <div className="relative w-full h-[38.2%]">
                      {/* 2x2 square */}
                      <div className="absolute left-0 top-0 w-[66.6%] h-full">
                        <Square {...squares[2]} />
                      </div>
                      {/* Two 1x1 squares stacked */}
                      <div className="absolute right-0 top-0 w-[33.3%] h-full">
                        <div className="h-1/2">
                          <Square {...squares[3]} />
                        </div>
                        <div className="h-1/2">
                          <Square {...squares[4]} />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </TimeCard>
        </div>
      </HoverCardTrigger>
      <HoverCardContent className="w-80">
        <div className="space-y-2">
          <h4 className="text-sm font-semibold">Fibonacci Time Display</h4>
          <p className="text-sm text-muted-foreground">
            Each square represents a Fibonacci number (1,1,2,3,5). Red squares count
            towards hours, green towards minutes (×5), and blue counts for both.
            Add the values of colored squares to read the time.
          </p>
        </div>
      </HoverCardContent>
    </HoverCard>
  );
}