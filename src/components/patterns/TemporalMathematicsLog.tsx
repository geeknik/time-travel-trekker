import { TimeCard } from "@/components/TimeCard";
import { History, RefreshCcw } from "lucide-react";
import { Button } from "@/components/ui/button";
import { TimePattern } from "@/utils/patterns/patternTypes";
import { Badge } from "@/components/ui/badge";

interface TemporalMathematicsLogProps {
  patterns: TimePattern[];
  onReset: () => void;
}

export function TemporalMathematicsLog({ patterns, onReset }: TemporalMathematicsLogProps) {
  const getTypeColor = (type: TimePattern['type']) => {
    switch (type) {
      case 'mathematical': return 'bg-purple-500';
      case 'sequence': return 'bg-blue-500';
      case 'special': return 'bg-amber-500';
      case 'astronomical': return 'bg-indigo-500';
      default: return 'bg-gray-500';
    }
  };

  return (
    <TimeCard 
      title="Temporal Pattern Archive" 
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
      <div className="space-y-3">
        {patterns.map((pattern, index) => (
          <div 
            key={index} 
            className="flex flex-col gap-2 p-3 bg-accent/50 rounded-lg"
          >
            <div className="flex justify-between items-start">
              <div className="flex flex-col">
                <span className="text-lg font-medium">{pattern.name}</span>
                {pattern.description && (
                  <span className="text-sm text-muted-foreground">
                    {pattern.description}
                  </span>
                )}
              </div>
              <Badge className={`${getTypeColor(pattern.type)} text-white`}>
                {pattern.type}
              </Badge>
            </div>
            <span className="text-sm text-muted-foreground">
              {pattern.timestamp.toLocaleTimeString('en-US', { 
                hour12: false,
                hour: '2-digit',
                minute: '2-digit',
                second: '2-digit'
              })}
            </span>
          </div>
        ))}
        {patterns.length === 0 && (
          <div className="text-muted-foreground italic">
            No patterns archived yet
          </div>
        )}
      </div>
    </TimeCard>
  );
}