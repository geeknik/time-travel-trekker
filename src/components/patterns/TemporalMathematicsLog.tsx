import { TimeCard } from "@/components/TimeCard";
import { History, RefreshCcw } from "lucide-react";
import { Button } from "@/components/ui/button";
import { TimePattern } from "@/utils/patterns/patternTypes";

interface TemporalMathematicsLogProps {
  patterns: TimePattern[];
  onReset: () => void;
}

export function TemporalMathematicsLog({ patterns, onReset }: TemporalMathematicsLogProps) {
  return (
    <TimeCard 
      title="Temporal Mathematics Log" 
      icon={<History className="w-5 h-5" />}
      className="relative"
    >
      <Button
        onClick={onReset}
        className="absolute top-6 right-6 text-muted-foreground hover:text-foreground"
        variant="ghost"
        size="icon"
      >
        <RefreshCcw className="w-4 h-4" />
      </Button>
      <div className="space-y-2">
        {patterns.map((pattern, index) => (
          <div 
            key={index} 
            className="flex justify-between items-center p-3 bg-accent/50 rounded-lg"
          >
            <span className="text-lg">{pattern.name}</span>
            <span className="text-muted-foreground">
              {pattern.timestamp.toLocaleTimeString()}
            </span>
          </div>
        ))}
        {patterns.length === 0 && (
          <div className="text-muted-foreground italic">
            No patterns logged yet
          </div>
        )}
      </div>
    </TimeCard>
  );
}