import { TimeCard } from "@/components/TimeCard";
import { Calendar } from "lucide-react";
import { PredictedPattern } from "@/utils/patterns/patternTypes";

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

  return (
    <TimeCard 
      title="Upcoming Patterns" 
      icon={<Calendar className="w-5 h-5" />} 
      className="border-blue-500/20"
    >
      <div className="space-y-4 max-h-[300px] overflow-y-auto">
        {patterns.slice(0, 5).map((pattern, index) => (
          <div key={index} className="space-y-1">
            <div className="text-lg font-medium">{pattern.name}</div>
            <div className="text-muted-foreground">
              {formatTime(pattern.occurringAt)} - {pattern.description}
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