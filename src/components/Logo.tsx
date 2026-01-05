import { Scan } from "lucide-react";

interface LogoProps {
  size?: "sm" | "md" | "lg";
  showTagline?: boolean;
}

const Logo = ({ size = "md", showTagline = false }: LogoProps) => {
  const sizes = {
    sm: { icon: 20, text: "text-xl" },
    md: { icon: 28, text: "text-2xl" },
    lg: { icon: 36, text: "text-4xl" },
  };

  return (
    <div className="flex flex-col items-center gap-1">
      <div className="flex items-center gap-2">
        <div className="relative">
          <div className="absolute inset-0 bg-primary/20 rounded-xl blur-lg" />
          <div className="relative bg-primary p-2 rounded-xl shadow-soft">
            <Scan size={sizes[size].icon} className="text-primary-foreground" />
          </div>
        </div>
        <h1 className={`font-display font-semibold ${sizes[size].text} text-foreground`}>
          Label<span className="text-primary">Lens</span>
        </h1>
      </div>
      {showTagline && (
        <p className="text-muted-foreground text-sm font-body animate-fade-in stagger-1">
          Understand what you eat, instantly
        </p>
      )}
    </div>
  );
};

export default Logo;
