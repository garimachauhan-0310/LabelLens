import { Scan } from "lucide-react";

const LoadingAnalysis = () => {
  return (
    <div className="flex flex-col items-center justify-center py-16 animate-fade-in">
      <div className="relative mb-6">
        <div className="w-20 h-20 rounded-2xl bg-primary/10 flex items-center justify-center animate-pulse-glow">
          <Scan size={40} className="text-primary animate-pulse" />
        </div>
        {/* Scanning lines */}
        <div className="absolute inset-0 overflow-hidden rounded-2xl">
          <div className="h-1 bg-gradient-to-r from-transparent via-primary to-transparent animate-shimmer" 
               style={{ backgroundSize: "200% 100%" }} />
        </div>
      </div>
      
      <h3 className="font-display text-xl font-semibold text-foreground mb-2">
        Analyzing Ingredients
      </h3>
      <p className="text-muted-foreground text-center max-w-xs">
        Our AI is reading your label and evaluating each ingredient...
      </p>

      {/* Progress steps */}
      <div className="mt-8 space-y-3 w-full max-w-xs">
        {["Extracting text", "Identifying ingredients", "Analyzing health impact", "Generating insights"].map((step, i) => (
          <div 
            key={step}
            className="flex items-center gap-3 animate-fade-in opacity-0"
            style={{ animationDelay: `${i * 400}ms`, animationFillMode: "forwards" }}
          >
            <div className="w-2 h-2 rounded-full bg-primary animate-pulse" />
            <span className="text-sm text-muted-foreground">{step}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default LoadingAnalysis;
