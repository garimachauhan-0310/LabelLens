import { useState, useRef, useCallback } from "react";
import { Camera, Upload, X, Image as ImageIcon } from "lucide-react";
import { Button } from "@/components/ui/button";

interface ImageUploaderProps {
  onImageSelected: (file: File, preview: string) => void;
  selectedImage: string | null;
  onClear: () => void;
}

const ImageUploader = ({ onImageSelected, selectedImage, onClear }: ImageUploaderProps) => {
  const [isDragging, setIsDragging] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const cameraInputRef = useRef<HTMLInputElement>(null);

  const handleFile = useCallback((file: File) => {
    if (file && file.type.startsWith("image/")) {
      const reader = new FileReader();
      reader.onload = (e) => {
        onImageSelected(file, e.target?.result as string);
      };
      reader.readAsDataURL(file);
    }
  }, [onImageSelected]);

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    const file = e.dataTransfer.files[0];
    handleFile(file);
  }, [handleFile]);

  const handleDragOver = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  }, []);

  const handleDragLeave = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
  }, []);

  if (selectedImage) {
    return (
      <div className="relative w-full max-w-md mx-auto animate-scale-in">
        <div className="relative rounded-2xl overflow-hidden shadow-medium bg-card">
          <img
            src={selectedImage}
            alt="Selected ingredient label"
            className="w-full h-auto max-h-80 object-contain"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-foreground/20 to-transparent" />
        </div>
        <Button
          variant="secondary"
          size="icon"
          onClick={onClear}
          className="absolute top-3 right-3 rounded-full shadow-medium bg-card/90 backdrop-blur-sm hover:bg-card"
        >
          <X size={18} />
        </Button>
      </div>
    );
  }

  return (
    <div className="w-full max-w-md mx-auto space-y-4 animate-fade-up">
      {/* Drop Zone */}
      <div
        onDrop={handleDrop}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        className={`
          relative flex flex-col items-center justify-center gap-4 p-8 
          border-2 border-dashed rounded-2xl transition-all duration-300
          ${isDragging 
            ? "border-primary bg-primary/10 scale-[1.02]" 
            : "border-border bg-card/50 hover:border-primary/50 hover:bg-card"
          }
        `}
      >
        <div className={`
          p-4 rounded-full transition-all duration-300
          ${isDragging ? "bg-primary/20" : "bg-secondary"}
        `}>
          <ImageIcon size={32} className={isDragging ? "text-primary" : "text-muted-foreground"} />
        </div>
        <div className="text-center">
          <p className="font-medium text-foreground">Drop your image here</p>
          <p className="text-sm text-muted-foreground mt-1">
            JPEG, PNG, or WebP accepted
          </p>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="flex gap-3">
        <Button
          variant="upload"
          size="lg"
          className="flex-1 h-14"
          onClick={() => fileInputRef.current?.click()}
        >
          <Upload size={20} />
          <span>Upload Image</span>
        </Button>
        <Button
          variant="hero"
          size="lg"
          className="flex-1 h-14"
          onClick={() => cameraInputRef.current?.click()}
        >
          <Camera size={20} />
          <span>Take Photo</span>
        </Button>
      </div>

      {/* Hidden Inputs */}
      <input
        ref={fileInputRef}
        type="file"
        accept="image/*"
        className="hidden"
        onChange={(e) => e.target.files?.[0] && handleFile(e.target.files[0])}
      />
      <input
        ref={cameraInputRef}
        type="file"
        accept="image/*"
        capture="environment"
        className="hidden"
        onChange={(e) => e.target.files?.[0] && handleFile(e.target.files[0])}
      />
    </div>
  );
};

export default ImageUploader;
