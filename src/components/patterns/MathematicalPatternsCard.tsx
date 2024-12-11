import { TimeCard } from "@/components/TimeCard";
import { Infinity } from "lucide-react";
import { TimePattern } from "@/utils/patterns/patternTypes";

interface MathematicalPatternsCardProps {
  patterns: TimePattern[];
}

export function MathematicalPatternsCard({ patterns }: MathematicalPatternsCardProps) {
  return (
    <TimeCard 
      title="Mathematical Patterns" 
      icon={<Infinity className="w-5 h-5" />} 
      className="border-yellow-500/20"
    >
      <div className="space-y-2">
        {patterns.map((pattern, index) => (
          <div 
            key={index} 
            className="p-3 bg-accent/50 rounded-lg text-lg font-medium"
          >
            {pattern.name}
          </div>
        ))}
        {patterns.length === 0 && (
          <div className="text-muted-foreground italic">
            Waiting for patterns...
          </div>
        )}
      </div>
    </TimeCard>
  );
}