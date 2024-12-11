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
          const combined = [...newPatterns, ...prev];
          const unique = combined.filter((pattern, index, self) =>
            index === self.findIndex(p => p.name === pattern.name)
          ).slice(0, 10);
          return unique;
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
          <TimeCard title="φ-time" icon={<Pi className="w-5 h-5" />}>
            <div className="text-center">
              <div className="font-space text-4xl text-purple-400">
                {calculatePhiTime(time)}
              </div>
            </div>
          </TimeCard>

          <TimeCard title="π-time" icon={<Pi className="w-5 h-5" />}>
            <div className="text-center">
              <div className="font-space text-4xl text-pink-400">
                {calculatePiTime(time)}
              </div>
            </div>
          </TimeCard>

          <TimeCard title="e-time" icon={<Clock className="w-5 h-5" />}>
            <div className="text-center">
              <div className="font-space text-4xl text-blue-400">
                {calculateETime(time)}
              </div>
            </div>
          </TimeCard>

          <TimeCard title="Quaternion Time" icon={<Clock className="w-5 h-5" />}>
            <div className="text-center">
              <div className="font-space text-4xl text-cyan-400">
                {calculateQuaternionTime(time)}
              </div>
            </div>
          </TimeCard>

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