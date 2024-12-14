import { TimeCard } from "@/components/TimeCard";
import { Target } from "lucide-react";
import { Badge } from "@/components/ui/badge";

interface Milestone {
  name: string;
  predictedDate: Date;
  description: string;
  confidence: number;
  category: 'quantum' | 'space' | 'ai' | 'biotech';
}

const MILESTONES: Milestone[] = [
  {
    name: "Quantum Supremacy",
    predictedDate: new Date('2025-12-31'),
    description: "Quantum computers consistently outperform classical computers",
    confidence: 85,
    category: 'quantum'
  },
  {
    name: "First Mars Colony",
    predictedDate: new Date('2050-01-01'),
    description: "Establishment of first permanent human settlement on Mars",
    confidence: 70,
    category: 'space'
  },
  {
    name: "Solar System Colonization Begins",
    predictedDate: new Date('2075-01-01'),
    description: "Multiple self-sustaining colonies across the solar system",
    confidence: 45,
    category: 'space'
  },
  {
    name: "AGI Achievement",
    predictedDate: new Date('2045-01-01'),
    description: "Artificial General Intelligence reaches human-level capabilities",
    confidence: 60,
    category: 'ai'
  },
  {
    name: "Biological Age Reversal",
    predictedDate: new Date('2060-01-01'),
    description: "First successful clinical trials of age reversal treatments",
    confidence: 55,
    category: 'biotech'
  }
];

interface FutureMilestonesCardProps {
  currentTime: Date;
}

export function FutureMilestonesCard({ currentTime }: FutureMilestonesCardProps) {
  const getCategoryColor = (category: Milestone['category']) => {
    switch (category) {
      case 'quantum': return 'bg-purple-500';
      case 'space': return 'bg-blue-500';
      case 'ai': return 'bg-emerald-500';
      case 'biotech': return 'bg-pink-500';
      default: return 'bg-gray-500';
    }
  };

  const calculateTimeUntil = (date: Date) => {
    const diffYears = (date.getTime() - currentTime.getTime()) / (1000 * 60 * 60 * 24 * 365.25);
    return `${Math.max(0, diffYears.toFixed(1))} years`;
  };

  return (
    <TimeCard 
      title="Future Milestones" 
      icon={<Target className="w-5 h-5" />}
      className="border-emerald-500/20"
    >
      <div className="space-y-4 max-h-[300px] overflow-y-auto">
        {MILESTONES.map((milestone, index) => (
          <div key={index} className="space-y-2 p-3 bg-accent/50 rounded-lg">
            <div className="flex justify-between items-start">
              <div className="flex flex-col">
                <span className="text-lg font-medium">{milestone.name}</span>
                <span className="text-sm text-muted-foreground">
                  {milestone.description}
                </span>
              </div>
              <Badge className={`${getCategoryColor(milestone.category)} text-white`}>
                {milestone.category}
              </Badge>
            </div>
            <div className="flex justify-between items-center text-sm">
              <span className="text-muted-foreground">
                Time until: {calculateTimeUntil(milestone.predictedDate)}
              </span>
              <span className="text-muted-foreground">
                Confidence: {milestone.confidence}%
              </span>
            </div>
          </div>
        ))}
      </div>
    </TimeCard>
  );
}