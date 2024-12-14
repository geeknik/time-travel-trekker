import { useEffect, useState } from "react";
import { TimeCard } from "@/components/TimeCard";
import { CosmicTimeSection } from "@/components/CosmicTimeSection";
import { Pi, Clock } from "lucide-react";
import {
  calculatePhiTime,
  calculatePiTime,
  calculateETime,
  calculateQuaternionTime,
} from "@/utils/timeCalculations";
import { detectPatterns } from "@/utils/patterns/patternDetector";
import { predictNextPatterns } from "@/utils/patterns/patternPredictor";
import { TimePattern, PredictedPattern } from "@/utils/patterns/patternTypes";
import { MathematicalPatternsCard } from "@/components/patterns/MathematicalPatternsCard";
import { UpcomingPatternsCard } from "@/components/patterns/UpcomingPatternsCard";
import { TemporalMathematicsLog } from "@/components/patterns/TemporalMathematicsLog";
import { HoverCard, HoverCardContent, HoverCardTrigger } from "@/components/ui/hover-card";

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
    case 'numerological':
      // Only archive powerful numerological numbers (1, 3, 7, 9)
      return pattern.description?.includes('powerful');
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
          // Filter out patterns that are currently active
          const nonActivePatterns = prev.filter(historyPattern => 
            !newPatterns.some(activePattern => activePattern.name === historyPattern.name)
          );
          
          // Only archive significant patterns that aren't already active
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

          {/* Mathematical Time Cards */}
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

          {/* Pattern Detection Section */}
          <MathematicalPatternsCard patterns={patterns} />
          <UpcomingPatternsCard patterns={upcomingPatterns} />
          
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