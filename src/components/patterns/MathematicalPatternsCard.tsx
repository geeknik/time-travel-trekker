import { TimeCard } from "@/components/TimeCard";
import { Infinity } from "lucide-react";
import { TimePattern } from "@/utils/patterns/patternTypes";
import { Badge } from "@/components/ui/badge";

interface MathematicalPatternsCardProps {
  patterns: TimePattern[];
}

export function MathematicalPatternsCard({ patterns }: MathematicalPatternsCardProps) {
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
      title="Active Temporal Patterns" 
      icon={<Infinity className="w-5 h-5" />} 
      className="border-yellow-500/20"
    >
      <div className="space-y-3">
        {patterns.map((pattern, index) => (
          <div 
            key={index} 
            className="p-3 bg-accent/50 rounded-lg space-y-2"
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
          </div>
        ))}
        {patterns.length === 0 && (
          <div className="text-muted-foreground italic">
            No active patterns detected
          </div>
        )}
      </div>
    </TimeCard>
  );
}