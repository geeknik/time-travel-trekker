import { useEffect, useState } from "react";
import { CosmicTimeSection } from "@/components/CosmicTimeSection";
import { MathematicalTimeSection } from "@/components/MathematicalTimeSection";
import { detectPatterns } from "@/utils/patterns/patternDetector";
import { predictNextPatterns } from "@/utils/patterns/patternPredictor";
import { TimePattern, PredictedPattern } from "@/utils/patterns/patternTypes";
import { MathematicalPatternsCard } from "@/components/patterns/MathematicalPatternsCard";
import { UpcomingPatternsCard } from "@/components/patterns/UpcomingPatternsCard";
import { TemporalMathematicsLog } from "@/components/patterns/TemporalMathematicsLog";
import { FutureMilestonesCard } from "@/components/patterns/FutureMilestonesCard";

const isSignificantPattern = (pattern: TimePattern): boolean => {
  // Define which patterns are considered significant enough to archive
  switch (pattern.type) {
    case 'mathematical':
      // Only archive perfect squares and special mathematical sequences
      return pattern.name.includes('Perfect Square') || 
             pattern.name.includes('Golden Ratio');
    case 'sequence':
      // Only archive geometric and special sequences
      return pattern.name.includes('Geometric') || 
             pattern.name.includes('Fibonacci');
    case 'special':
      // All special patterns are significant
      return true;
    case 'astronomical':
      // All astronomical alignments are significant
      return true;
    default:
      return false;
  }
};

const Index = () => {
  const [time, setTime] = useState(new Date());
  const [patterns, setPatterns] = useState<TimePattern[]>([]);
  const [patternHistory, setPatternHistory] = useState<TimePattern[]>([]);
  const [upcomingPatterns, setUpcomingPatterns] = useState<PredictedPattern[]>([]);

  useEffect(() => {
    const timer = setInterval(() => {
      const now = new Date();
      setTime(now);
      
      // Detect new patterns
      const newPatterns = detectPatterns(now);
      if (newPatterns.length > 0) {
        setPatterns(newPatterns);
        setPatternHistory(prev => {
          const nonActivePatterns = prev.filter(historyPattern => 
            !newPatterns.some(activePattern => activePattern.name === historyPattern.name)
          );
          
          const significantNewPatterns = newPatterns.filter(isSignificantPattern);
          const combined = [...significantNewPatterns, ...nonActivePatterns];
          return combined.slice(0, 10); // Keep only the 10 most recent significant patterns
        });
      }

      // Update upcoming patterns every minute
      if (now.getSeconds() === 0) {
        setUpcomingPatterns(predictNextPatterns(now));
      }
    }, 1000);

    // Initial prediction
    setUpcomingPatterns(predictNextPatterns(new Date()));

    return () => clearInterval(timer);
  }, []);

  const handleReset = () => {
    setPatternHistory([]);
  };

  return (
    <div className="min-h-screen p-6 bg-gradient-to-b from-background to-accent">
      <div className="max-w-4xl mx-auto space-y-6">
        {/* Header */}
        <div className="text-center mb-12 animate-fade-up">
          <h1 className="text-4xl font-bold font-space mb-2">
            Cosmic Time Explorer
          </h1>
          <p className="text-muted-foreground">
            Journey through cosmic dimensions and mathematical patterns of time
          </p>
        </div>

        {/* Main Grid */}
        <div className="grid md:grid-cols-2 gap-6">
          {/* Cosmic Time Section */}
          <CosmicTimeSection time={time} />

          {/* Mathematical Time Section */}
          <MathematicalTimeSection time={time} />

          {/* Pattern Detection Section */}
          <MathematicalPatternsCard patterns={patterns} />
          <UpcomingPatternsCard patterns={upcomingPatterns} />
          
          {/* Future Milestones */}
          <FutureMilestonesCard currentTime={time} />
          
          {/* History Log */}
          <TemporalMathematicsLog 
            patterns={patternHistory}
            onReset={handleReset}
          />
        </div>
      </div>
    </div>
  );
};

export default Index;
