import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import Logo from "@/components/Logo";
import ImageUploader from "@/components/ImageUploader";
import LoadingAnalysis from "@/components/LoadingAnalysis";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";

const Index = () => {
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const navigate = useNavigate();
  const { toast } = useToast();

  const handleImageSelected = (file: File, preview: string) => {
    setSelectedFile(file);
    setSelectedImage(preview);
  };

  const handleClear = () => {
    setSelectedFile(null);
    setSelectedImage(null);
  };

  const handleAnalyze = async () => {
    if (!selectedImage) {
      toast({
        title: "No image selected",
        description: "Please upload or capture an image of an ingredient label.",
        variant: "destructive",
      });
      return;
    }

    setIsAnalyzing(true);
    
    // Simulate analysis time (in production, this would call the AI API)
    setTimeout(() => {
      navigate("/analysis", { state: { image: selectedImage } });
    }, 2500);
  };

  return (
    <div className="min-h-screen gradient-subtle">
      <div className="container max-w-lg py-8 px-4">
        {/* Header */}
        <header className="text-center mb-10 animate-fade-up">
          <Logo size="lg" showTagline />
        </header>

        {/* Main Content */}
        <main className="space-y-8">
          {isAnalyzing ? (
            <LoadingAnalysis />
          ) : (
            <>
              <ImageUploader
                onImageSelected={handleImageSelected}
                selectedImage={selectedImage}
                onClear={handleClear}
              />

              {/* Analyze Button */}
              {selectedImage && (
                <div className="animate-fade-up">
                  <Button
                    variant="hero"
                    size="xl"
                    className="w-full"
                    onClick={handleAnalyze}
                  >
                    <span>Analyze Ingredients</span>
                    <ArrowRight size={20} />
                  </Button>
                </div>
              )}

              {/* Info Section */}
              {!selectedImage && (
                <div className="text-center space-y-6 pt-4 animate-fade-in stagger-2">
                  <div className="inline-flex items-center gap-2 px-4 py-2 bg-primary/10 rounded-full text-primary text-sm font-medium">
                    <span className="w-2 h-2 rounded-full bg-primary animate-pulse" />
                    AI-Powered Analysis
                  </div>
                  
                  <div className="grid grid-cols-2 gap-4 text-center">
                    {[
                      { label: "Key Insights", desc: "Understand ingredients" },
                      { label: "Health Impact", desc: "Know the effects" },
                      { label: "Trade-offs", desc: "Balanced view" },
                      { label: "Verdict", desc: "Clear recommendation" },
                    ].map((item, i) => (
                      <div 
                        key={item.label}
                        className="p-4 bg-card rounded-xl shadow-soft animate-fade-up opacity-0"
                        style={{ animationDelay: `${300 + i * 100}ms`, animationFillMode: "forwards" }}
                      >
                        <p className="font-display font-semibold text-foreground">{item.label}</p>
                        <p className="text-sm text-muted-foreground mt-1">{item.desc}</p>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </>
          )}
        </main>

        {/* Footer */}
        <footer className="mt-12 text-center">
          <p className="text-xs text-muted-foreground">
            LabelLens uses AI to help you make informed food choices.
          </p>
        </footer>
      </div>
    </div>
  );
};

export default Index;
