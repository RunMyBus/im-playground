import DecorativeElement from "@/components/DecorativeElement";
import Ampersand from "@/components/Ampersand";

const Index = () => {
  return (
    <main className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden bg-background">
      {/* Background gradient */}
      <div 
        className="absolute inset-0 opacity-60"
        style={{ background: 'var(--gradient-radial)' }}
      />
      
      {/* Decorative elements */}
      <DecorativeElement />

      {/* Subtle border frame */}
      <div className="absolute inset-4 md:inset-8 border border-gold/10 rounded-lg pointer-events-none" />

      {/* Main content */}
      <div className="relative z-10 text-center px-6">
        {/* Names */}
        <div className="flex flex-col md:flex-row items-center justify-center mb-8 animate-fade-up">
          <h1 className="font-display text-5xl md:text-7xl lg:text-8xl font-medium tracking-wide text-foreground">
            Gopi
          </h1>
          <Ampersand />
          <h1 className="font-display text-5xl md:text-7xl lg:text-8xl font-medium tracking-wide text-foreground">
            Durga
          </h1>
        </div>

        {/* Decorative line */}
        <div className="flex items-center justify-center gap-4 mb-8 animate-fade-in" style={{ animationDelay: '0.3s' }}>
          <div className="w-16 md:w-24 h-px bg-gradient-to-r from-transparent via-gold/50 to-transparent" />
          <div className="w-2 h-2 rotate-45 border border-gold/50" />
          <div className="w-16 md:w-24 h-px bg-gradient-to-r from-transparent via-gold/50 to-transparent" />
        </div>

        {/* Tagline */}
        <p 
          className="font-body text-lg md:text-xl text-muted-foreground tracking-[0.3em] uppercase animate-fade-in"
          style={{ animationDelay: '0.6s' }}
        >
          Welcome
        </p>
      </div>

      {/* Bottom ornamental line */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-fade-in" style={{ animationDelay: '0.9s' }}>
        <div className="shimmer w-32 h-px" />
      </div>
    </main>
  );
};

export default Index;
