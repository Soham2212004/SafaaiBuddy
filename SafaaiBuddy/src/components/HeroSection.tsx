import { Button } from "@/components/ui/button";
import { Sparkles, Shield, Clock, Users } from "lucide-react";

interface HeroSectionProps {
  onOpenForm: () => void;
}

const HeroSection = ({ onOpenForm }: HeroSectionProps) => {
  console.log("HeroSection rendering...");
  console.log("Button component imported:", typeof Button);
  
  // Using a placeholder background instead of imported image
  const heroImageStyle = {
    backgroundImage: 'linear-gradient(135deg, #3b82f6 0%, #06b6d4 50%, #10b981 100%)',
  };
  return (
    <section className="min-h-screen relative overflow-hidden">
      {/* Background with gradient */}
      <div 
        className="absolute inset-0"
        style={heroImageStyle}
      >
        <div className="absolute inset-0 bg-gradient-to-br from-primary/80 via-primary/60 to-secondary/70"></div>
      </div>
      
      {/* Floating elements */}
      <div className="absolute top-20 left-10 animate-float">
        <div className="w-20 h-20 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center">
          <Sparkles className="w-10 h-10 text-white" />
        </div>
      </div>
      <div className="absolute top-40 right-20 animate-float" style={{ animationDelay: '2s' }}>
        <div className="w-16 h-16 rounded-full bg-secondary/30 backdrop-blur-sm flex items-center justify-center">
          <Shield className="w-8 h-8 text-white" />
        </div>
      </div>
      <div className="absolute bottom-40 left-20 animate-float" style={{ animationDelay: '4s' }}>
        <div className="w-24 h-24 rounded-full bg-white/15 backdrop-blur-sm flex items-center justify-center">
          <Clock className="w-12 h-12 text-white" />
        </div>
      </div>

      {/* Main content */}
      <div className="relative z-10 flex items-center justify-center min-h-screen px-4">
        <div className="text-center max-w-4xl mx-auto animate-slide-up">
          <h1 className="text-5xl md:text-7xl font-bold text-white mb-6 leading-tight">
            <span className="block">SafaaiBuddy</span>
            <span className="text-transparent bg-gradient-to-r from-yellow-200 to-white bg-clip-text">
              Deep Cleaning
            </span>
          </h1>
          
          <p className="text-xl md:text-2xl text-white/90 mb-8 max-w-2xl mx-auto leading-relaxed">
            Quick and reliable deep cleaning at your doorstep. 
            Get instant estimates and transform your home today.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-12">
            <Button 
              variant="hero" 
              size="xl"
              onClick={onOpenForm}
              className="animate-pulse-glow"
            >
              <Sparkles className="w-6 h-6 mr-2" />
              Get Free Instant Quote
            </Button>
            <Button 
              variant="glass" 
              size="xl"
              className="text-white border-white/30"
            >
              <Users className="w-6 h-6 mr-2" />
              View Our Work
            </Button>
          </div>

          {/* Trust indicators */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-16">
            <div className="card-glass rounded-2xl p-6 text-center">
              <div className="w-16 h-16 mx-auto mb-4 bg-gradient-primary rounded-full flex items-center justify-center">
                <Shield className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-xl font-semibold text-primary mb-2">Fully Insured</h3>
              <p className="text-muted-foreground">Licensed & bonded professionals</p>
            </div>
            
            <div className="card-glass rounded-2xl p-6 text-center">
              <div className="w-16 h-16 mx-auto mb-4 bg-gradient-secondary rounded-full flex items-center justify-center">
                <Clock className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-xl font-semibold text-primary mb-2">Same Day Service</h3>
              <p className="text-muted-foreground">Available 7 days a week</p>
            </div>
            
            <div className="card-glass rounded-2xl p-6 text-center">
              <div className="w-16 h-16 mx-auto mb-4 bg-gradient-primary rounded-full flex items-center justify-center">
                <Sparkles className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-xl font-semibold text-primary mb-2">100% Satisfaction</h3>
              <p className="text-muted-foreground">Money-back guarantee</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;