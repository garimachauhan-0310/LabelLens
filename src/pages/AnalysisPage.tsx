import { useLocation, useNavigate } from "react-router-dom";
import { ArrowLeft, Lightbulb, Heart, Scale, CheckCircle, Share2, Bookmark } from "lucide-react";
import Logo from "@/components/Logo";
import HealthScore from "@/components/HealthScore";
import AnalysisCard from "@/components/AnalysisCard";
import IngredientBadge from "@/components/IngredientBadge";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";

// Mock analysis data - in production this would come from AI
const mockAnalysis = {
  score: 68,
  verdict: "Good Choice",
  summary: "This product has a balanced nutritional profile with some beneficial ingredients, though it contains moderate sodium levels worth noting.",
  insights: {
    keyIngredients: [
      { name: "Whole Grain Oats", type: "good" as const },
      { name: "Honey", type: "neutral" as const },
      { name: "Almonds", type: "good" as const },
      { name: "Palm Oil", type: "warning" as const },
      { name: "Natural Flavors", type: "neutral" as const },
    ],
    highlights: [
      "Good source of whole grains and fiber",
      "Contains heart-healthy nuts",
      "No artificial preservatives detected",
    ],
    concerns: [
      "Contains palm oil (saturated fat)",
      "Added sugars from honey and syrup",
    ],
  },
  whyItMatters: [
    "Whole grain oats provide sustained energy and support digestive health through their fiber content.",
    "The almonds contribute healthy fats and protein, making this more satiating than refined grain alternatives.",
    "Palm oil, while shelf-stable, adds saturated fat that should be limited for heart health.",
    "Natural flavors is a broad term that can include various additives—generally safe but non-specific.",
  ],
  tradeoffs: [
    { pro: "Convenient breakfast option", con: "Higher sugar than plain oatmeal" },
    { pro: "Longer shelf life", con: "Palm oil for preservation" },
    { pro: "Good protein content", con: "Moderate sodium per serving" },
  ],
  bottomLine: {
    verdict: "Good Choice",
    recommendation: "Consume in Moderation",
    takeaway: "A reasonable breakfast option that's better than many alternatives, but consider pairing with fresh fruit and limiting to recommended serving sizes.",
  },
};

const AnalysisPage = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { toast } = useToast();
  const image = location.state?.image;

  const handleShare = () => {
    toast({
      title: "Share feature coming soon",
      description: "You'll be able to share your analysis results.",
    });
  };

  const handleSave = () => {
    toast({
      title: "Saved to history",
      description: "You can view this analysis later in your history.",
    });
  };

  return (
    <div className="min-h-screen gradient-subtle pb-8">
      <div className="container max-w-lg py-6 px-4">
        {/* Header */}
        <header className="flex items-center justify-between mb-6 animate-fade-in">
          <Button
            variant="ghost"
            size="icon"
            onClick={() => navigate("/")}
            className="rounded-full"
          >
            <ArrowLeft size={20} />
          </Button>
          <Logo size="sm" />
          <div className="flex gap-1">
            <Button variant="ghost" size="icon" onClick={handleSave} className="rounded-full">
              <Bookmark size={18} />
            </Button>
            <Button variant="ghost" size="icon" onClick={handleShare} className="rounded-full">
              <Share2 size={18} />
            </Button>
          </div>
        </header>

        {/* Image Preview */}
        {image && (
          <div className="mb-6 animate-fade-up">
            <div className="relative rounded-2xl overflow-hidden shadow-soft h-32">
              <img
                src={image}
                alt="Analyzed product"
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-foreground/40 to-transparent" />
            </div>
          </div>
        )}

        {/* Health Score */}
        <div className="flex justify-center mb-8 animate-fade-up" style={{ animationDelay: "100ms" }}>
          <HealthScore score={mockAnalysis.score} size="lg" />
        </div>

        {/* Quick Verdict */}
        <div className="text-center mb-8 animate-fade-up" style={{ animationDelay: "200ms" }}>
          <p className="text-muted-foreground text-sm mb-2">Overall Assessment</p>
          <h2 className="font-display text-2xl font-bold text-foreground mb-3">
            {mockAnalysis.bottomLine.verdict}
          </h2>
          <p className="text-foreground/80 leading-relaxed">
            {mockAnalysis.summary}
          </p>
        </div>

        {/* Analysis Cards */}
        <div className="space-y-4">
          {/* Insights */}
          <AnalysisCard title="Key Insights" icon={Lightbulb} delay={300}>
            <div className="flex flex-wrap gap-2 mb-4">
              {mockAnalysis.insights.keyIngredients.map((ing) => (
                <IngredientBadge key={ing.name} name={ing.name} type={ing.type} />
              ))}
            </div>
            <div className="space-y-2">
              <p className="font-medium text-score-good">✓ Good:</p>
              <ul className="space-y-1 ml-4">
                {mockAnalysis.insights.highlights.map((item, i) => (
                  <li key={i} className="text-sm">{item}</li>
                ))}
              </ul>
            </div>
            {mockAnalysis.insights.concerns.length > 0 && (
              <div className="space-y-2 mt-3">
                <p className="font-medium text-score-moderate">⚠ Note:</p>
                <ul className="space-y-1 ml-4">
                  {mockAnalysis.insights.concerns.map((item, i) => (
                    <li key={i} className="text-sm">{item}</li>
                  ))}
                </ul>
              </div>
            )}
          </AnalysisCard>

          {/* Why It Matters */}
          <AnalysisCard title="Why It Matters" icon={Heart} iconColor="text-score-poor" delay={400}>
            <ul className="space-y-3">
              {mockAnalysis.whyItMatters.map((item, i) => (
                <li key={i} className="flex gap-3">
                  <span className="text-primary mt-1">•</span>
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </AnalysisCard>

          {/* Trade-offs */}
          <AnalysisCard title="Trade-offs" icon={Scale} iconColor="text-score-moderate" delay={500}>
            <div className="space-y-3">
              {mockAnalysis.tradeoffs.map((item, i) => (
                <div key={i} className="flex gap-3 text-sm">
                  <div className="flex-1 p-2.5 bg-score-good/10 rounded-lg">
                    <span className="text-score-good font-medium">+</span> {item.pro}
                  </div>
                  <div className="flex-1 p-2.5 bg-score-moderate/10 rounded-lg">
                    <span className="text-score-moderate font-medium">−</span> {item.con}
                  </div>
                </div>
              ))}
            </div>
          </AnalysisCard>

          {/* Bottom Line */}
          <AnalysisCard title="Bottom Line" icon={CheckCircle} iconColor="text-score-excellent" delay={600}>
            <div className="space-y-4">
              <div className="flex items-center gap-3">
                <span className="px-3 py-1.5 bg-primary/15 text-primary rounded-full text-sm font-semibold">
                  {mockAnalysis.bottomLine.recommendation}
                </span>
              </div>
              <p className="text-[15px] leading-relaxed">
                {mockAnalysis.bottomLine.takeaway}
              </p>
            </div>
          </AnalysisCard>
        </div>

        {/* Action Buttons */}
        <div className="mt-8 space-y-3 animate-fade-up" style={{ animationDelay: "700ms" }}>
          <Button
            variant="hero"
            size="xl"
            className="w-full"
            onClick={() => navigate("/")}
          >
            Scan Another Label
          </Button>
          <Button
            variant="soft"
            size="lg"
            className="w-full"
            onClick={handleSave}
          >
            <Bookmark size={18} />
            Save to History
          </Button>
        </div>
      </div>
    </div>
  );
};

export default AnalysisPage;
