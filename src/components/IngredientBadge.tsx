interface IngredientBadgeProps {
  name: string;
  type: "good" | "neutral" | "warning" | "bad";
}

const IngredientBadge = ({ name, type }: IngredientBadgeProps) => {
  const styles = {
    good: "bg-score-excellent/15 text-score-excellent border-score-excellent/30",
    neutral: "bg-muted text-muted-foreground border-border",
    warning: "bg-score-moderate/15 text-score-moderate border-score-moderate/30",
    bad: "bg-score-bad/15 text-score-bad border-score-bad/30",
  };

  return (
    <span className={`
      inline-flex items-center px-2.5 py-1 rounded-lg text-sm font-medium
      border ${styles[type]} transition-transform hover:scale-105
    `}>
      {name}
    </span>
  );
};

export default IngredientBadge;
