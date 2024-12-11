import { useEffect, useState } from "react";
import { TimeCard } from "@/components/TimeCard";
import { Globe2, Moon, Rocket, Timer } from "lucide-react";

const Index = () => {
  const [time, setTime] = useState(new Date());
  const [marsTime, setMarsTime] = useState("Sol 19531");
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      const now = new Date();
      setTime(now);
      
      // Calculate progress through day
      const startOfDay = new Date(now.setHours(0,0,0,0));
      const secondsInDay = 24 * 60 * 60;
      const secondsSinceStart = (now.getTime() - startOfDay.getTime()) / 1000;
      setProgress((secondsSinceStart / secondsInDay) * 100);
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  return (
    <div className="min-h-screen p-6 bg-gradient-to-b from-background to-accent">
      <div className="max-w-4xl mx-auto space-y-6">
        <div className="text-center mb-12 animate-fade-up">
          <h1 className="text-4xl font-bold font-space mb-2">Cosmic Time Explorer 🚀</h1>
          <p className="text-muted-foreground">Exploring time across the cosmos</p>
        </div>

        <TimeCard title="Earth Time" icon={<Globe2 className="w-5 h-5" />}>
          <div className="text-center">
            <div className="font-space text-5xl mb-4">
              {time.toLocaleTimeString()}
            </div>
            <div className="w-full bg-accent rounded-full h-2 mb-2">
              <div 
                className="bg-blue-500 h-2 rounded-full transition-all duration-1000"
                style={{ width: `${progress}%` }}
              />
            </div>
            <p className="text-sm text-muted-foreground">
              {progress.toFixed(2)}% through day
            </p>
          </div>
        </TimeCard>

        <TimeCard title="Lunar Status" icon={<Moon className="w-5 h-5" />}>
          <div className="text-center">
            <div className="font-space text-4xl text-purple-400 mb-2">
              59.0% Phase
            </div>
            <p className="text-muted-foreground">Far Side</p>
          </div>
        </TimeCard>

        <TimeCard title="Mars Time" icon={<Rocket className="w-5 h-5" />}>
          <div className="text-center">
            <div className="font-space text-4xl text-red-400 mb-2">
              {marsTime}
            </div>
            <div className="grid grid-cols-2 gap-4 mt-4">
              <div>
                <p className="text-sm text-muted-foreground mb-1">Light Time to Moon</p>
                <p className="font-space text-2xl">1.28s</p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground mb-1">Light Time to Mars</p>
                <p className="font-space text-2xl">760.32s</p>
              </div>
            </div>
          </div>
        </TimeCard>

        <TimeCard title="Future Events" icon={<Timer className="w-5 h-5" />}>
          <div className="grid grid-cols-2 gap-4">
            <div className="p-3 rounded-lg bg-purple-500/10">
              <p className="text-sm text-muted-foreground mb-1">Quantum Supremacy</p>
              <p className="font-space text-2xl">5 years</p>
            </div>
            <div className="p-3 rounded-lg bg-red-500/10">
              <p className="text-sm text-muted-foreground mb-1">Mars Colony</p>
              <p className="font-space text-2xl">26 years</p>
            </div>
            <div className="p-3 rounded-lg bg-blue-500/10">
              <p className="text-sm text-muted-foreground mb-1">Solar System Settlement</p>
              <p className="font-space text-2xl">76 years</p>
            </div>
            <div className="p-3 rounded-lg bg-green-500/10">
              <p className="text-sm text-muted-foreground mb-1">Technological Singularity</p>
              <p className="font-space text-2xl">21 years</p>
            </div>
          </div>
        </TimeCard>
      </div>
    </div>
  );
};

export default Index;