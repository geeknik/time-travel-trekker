import { Card } from "@/components/ui/card";
import { cn } from "@/lib/utils";

interface TimeCardProps {
  title: string;
  icon?: React.ReactNode;
  className?: string;
  children: React.ReactNode;
}

export function TimeCard({ title, icon, className, children }: TimeCardProps) {
  return (
    <Card className={cn("glass-card p-6 animate-fade-up", className)}>
      <div className="flex items-center gap-2 mb-4 text-muted-foreground">
        {icon}
        <h2 className="text-lg font-medium">{title}</h2>
      </div>
      {children}
    </Card>
  );
}