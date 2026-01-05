interface HealthScoreProps {
  score: number; // 0-100
  size?: "sm" | "md" | "lg";
}

const HealthScore = ({ score, size = "md" }: HealthScoreProps) => {
  const getScoreColor = (score: number) => {
    if (score >= 80) return "text-score-excellent";
    if (score >= 60) return "text-score-good";
    if (score >= 40) return "text-score-moderate";
    if (score >= 20) return "text-score-poor";
    return "text-score-bad";
  };

  const getScoreBg = (score: number) => {
    if (score >= 80) return "bg-score-excellent";
    if (score >= 60) return "bg-score-good";
    if (score >= 40) return "bg-score-moderate";
    if (score >= 20) return "bg-score-poor";
    return "bg-score-bad";
  };

  const getLabel = (score: number) => {
    if (score >= 80) return "Excellent";
    if (score >= 60) return "Good";
    if (score >= 40) return "Moderate";
    if (score >= 20) return "Poor";
    return "Avoid";
  };

  const sizes = {
    sm: { ring: 80, stroke: 6, text: "text-xl", label: "text-xs" },
    md: { ring: 120, stroke: 8, text: "text-3xl", label: "text-sm" },
    lg: { ring: 160, stroke: 10, text: "text-5xl", label: "text-base" },
  };

  const { ring, stroke, text, label } = sizes[size];
  const radius = (ring - stroke) / 2;
  const circumference = radius * 2 * Math.PI;
  const offset = circumference - (score / 100) * circumference;

  return (
    <div className="flex flex-col items-center gap-2">
      <div className="relative" style={{ width: ring, height: ring }}>
        {/* Background circle */}
        <svg className="transform -rotate-90" width={ring} height={ring}>
          <circle
            cx={ring / 2}
            cy={ring / 2}
            r={radius}
            stroke="currentColor"
            strokeWidth={stroke}
            fill="none"
            className="text-muted/50"
          />
          {/* Progress circle */}
          <circle
            cx={ring / 2}
            cy={ring / 2}
            r={radius}
            stroke="currentColor"
            strokeWidth={stroke}
            fill="none"
            strokeLinecap="round"
            className={`${getScoreColor(score)} transition-all duration-1000 ease-out`}
            style={{
              strokeDasharray: circumference,
              strokeDashoffset: offset,
            }}
          />
        </svg>
        {/* Score text */}
        <div className="absolute inset-0 flex flex-col items-center justify-center">
          <span className={`font-display font-bold ${text} ${getScoreColor(score)}`}>
            {score}
          </span>
        </div>
      </div>
      <div className={`
        px-3 py-1 rounded-full font-medium ${label}
        ${getScoreBg(score)} text-card
      `}>
        {getLabel(score)}
      </div>
    </div>
  );
};

export default HealthScore;
