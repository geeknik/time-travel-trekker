import { useEffect, useState } from "react";
import { TimeCard } from "@/components/TimeCard";
import { Pi, Infinity, Binary, Clock, RefreshCcw, History } from "lucide-react";
import {
  calculatePhiTime,
  calculatePiTime,
  calculateETime,
  calculateQuaternionTime,
  calculateComplexTime,
  calculatePolarTime,
  calculateRecursionState,
  detectPatterns
} from "@/utils/timeCalculations";

const Index = () => {
  const [time, setTime] = useState(new Date());
  const [patterns, setPatterns] = useState<Array<{ name: string; timestamp: Date }>>([]);
  const [patternHistory, setPatternHistory] = useState<Array<{ name: string; timestamp: Date }>>([]);

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
          // Remove duplicates and keep only last 10
          const unique = combined.filter((pattern, index, self) =>
            index === self.findIndex(p => p.name === pattern.name)
          ).slice(0, 10);
          return unique;
        });
      }
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const handleReset = () => {
    setPatternHistory([]);
  };

  return (
    <div className="min-h-screen p-6 bg-gradient-to-b from-background to-accent">
      <div className="max-w-4xl mx-auto space-y-6">
        <div className="text-center mb-12 animate-fade-up">
          <h1 className="text-4xl font-bold font-space mb-2">Meta-Mathematical Time Explorer <Infinity className="inline-block" /></h1>
          <p className="text-muted-foreground">Exploring time across mathematical dimensions</p>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
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

          <TimeCard title="Complex Time" icon={<Clock className="w-5 h-5" />}>
            <div className="text-center">
              <div className="font-space text-4xl text-orange-400">
                {calculateComplexTime(time)}
              </div>
            </div>
          </TimeCard>

          <TimeCard title="Polar Time" icon={<Clock className="w-5 h-5" />}>
            <div className="text-center">
              <div className="font-space text-3xl text-red-400">
                {calculatePolarTime(time)}
              </div>
            </div>
          </TimeCard>

          <TimeCard title="Recursion State" icon={<Binary className="w-5 h-5" />} className="md:col-span-2">
            <div className="text-center">
              <div className="font-space text-4xl text-green-400">
                {calculateRecursionState(time)}
              </div>
              <div className="w-full bg-accent rounded-full h-2 mt-4">
                <div 
                  className="bg-green-500 h-2 rounded-full transition-all duration-1000"
                  style={{ width: `${(time.getSeconds() / 60) * 100}%` }}
                />
              </div>
            </div>
          </TimeCard>
        </div>

        <TimeCard title="Mathematical Patterns" icon={<Infinity className="w-5 h-5" />} className="border-yellow-500/20">
          <div className="space-y-2">
            {patterns.map((pattern, index) => (
              <div key={index} className="p-3 bg-accent/50 rounded-lg">
                {pattern.name}
              </div>
            ))}
          </div>
        </TimeCard>

        <TimeCard 
          title="Temporal Mathematics Log" 
          icon={<History className="w-5 h-5" />}
          className="relative"
        >
          <button
            onClick={handleReset}
            className="absolute top-6 right-6 text-muted-foreground hover:text-foreground"
          >
            <RefreshCcw className="w-4 h-4" />
          </button>
          <div className="space-y-2">
            {patternHistory.map((pattern, index) => (
              <div key={index} className="flex justify-between items-center p-3 bg-accent/50 rounded-lg">
                <span>{pattern.name}</span>
                <span className="text-sm text-muted-foreground">
                  {pattern.timestamp.toLocaleTimeString()}
                </span>
              </div>
            ))}
          </div>
        </TimeCard>
      </div>
    </div>
  );
};

export default Index;
