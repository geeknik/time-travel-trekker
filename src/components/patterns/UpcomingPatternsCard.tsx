import { TimeCard } from "@/components/TimeCard";
import { Calendar } from "lucide-react";
import { PredictedPattern } from "@/utils/patterns/patternTypes";
import { Badge } from "@/components/ui/badge";

interface UpcomingPatternsCardProps {
  patterns: PredictedPattern[];
}

export function UpcomingPatternsCard({ patterns }: UpcomingPatternsCardProps) {
  const formatTime = (date: Date) => {
    return date.toLocaleTimeString('en-US', { 
      hour12: false, 
      hour: '2-digit', 
      minute: '2-digit', 
      second: '2-digit' 
    });
  };

  const getTypeColor = (type: PredictedPattern['type']) => {
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
      title="Temporal Pattern Forecast" 
      icon={<Calendar className="w-5 h-5" />} 
      className="border-blue-500/20"
    >
      <div className="space-y-4 max-h-[300px] overflow-y-auto">
        {patterns.slice(0, 5).map((pattern, index) => (
          <div key={index} className="space-y-2 p-3 bg-accent/50 rounded-lg">
            <div className="flex justify-between items-start">
              <div className="flex flex-col">
                <span className="text-lg font-medium">{pattern.name}</span>
                <span className="text-sm text-muted-foreground">
                  {pattern.description}
                </span>
              </div>
              <Badge className={`${getTypeColor(pattern.type)} text-white`}>
                {pattern.type}
              </Badge>
            </div>
            <div className="text-sm text-muted-foreground">
              Occurring at: {formatTime(pattern.occurringAt)}
            </div>
          </div>
        ))}
        {patterns.length === 0 && (
          <div className="text-muted-foreground italic">
            No upcoming patterns predicted
          </div>
        )}
      </div>
    </TimeCard>
  );
}