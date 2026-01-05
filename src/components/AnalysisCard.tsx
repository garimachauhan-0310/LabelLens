import { ReactNode } from "react";
import { LucideIcon } from "lucide-react";

interface AnalysisCardProps {
  title: string;
  icon: LucideIcon;
  iconColor?: string;
  children: ReactNode;
  delay?: number;
}

const AnalysisCard = ({ 
  title, 
  icon: Icon, 
  iconColor = "text-primary",
  children,
  delay = 0 
}: AnalysisCardProps) => {
  return (
    <div 
      className="bg-card rounded-2xl p-5 shadow-soft hover:shadow-medium transition-shadow duration-300 animate-fade-up opacity-0"
      style={{ animationDelay: `${delay}ms`, animationFillMode: "forwards" }}
    >
      <div className="flex items-center gap-3 mb-4">
        <div className={`p-2.5 rounded-xl bg-primary/10 ${iconColor}`}>
          <Icon size={22} />
        </div>
        <h3 className="font-display text-lg font-semibold text-foreground">
          {title}
        </h3>
      </div>
      <div className="text-foreground/80 font-body text-[15px] leading-relaxed space-y-3">
        {children}
      </div>
    </div>
  );
};

export default AnalysisCard;
