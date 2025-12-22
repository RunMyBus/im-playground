const DecorativeElement = () => {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {/* Top left ornament */}
      <div className="absolute -top-20 -left-20 w-80 h-80 opacity-10">
        <svg viewBox="0 0 200 200" className="w-full h-full text-gold">
          <circle cx="100" cy="100" r="80" fill="none" stroke="currentColor" strokeWidth="0.5" />
          <circle cx="100" cy="100" r="60" fill="none" stroke="currentColor" strokeWidth="0.3" />
          <circle cx="100" cy="100" r="40" fill="none" stroke="currentColor" strokeWidth="0.2" />
        </svg>
      </div>

      {/* Bottom right ornament */}
      <div className="absolute -bottom-20 -right-20 w-96 h-96 opacity-10">
        <svg viewBox="0 0 200 200" className="w-full h-full text-gold">
          <circle cx="100" cy="100" r="90" fill="none" stroke="currentColor" strokeWidth="0.5" />
          <circle cx="100" cy="100" r="70" fill="none" stroke="currentColor" strokeWidth="0.3" />
          <circle cx="100" cy="100" r="50" fill="none" stroke="currentColor" strokeWidth="0.2" />
        </svg>
      </div>

      {/* Floating particles */}
      <div className="absolute top-1/4 left-1/4 w-2 h-2 rounded-full bg-gold/20 animate-float" style={{ animationDelay: '0s' }} />
      <div className="absolute top-1/3 right-1/3 w-1.5 h-1.5 rounded-full bg-gold/15 animate-float" style={{ animationDelay: '1s' }} />
      <div className="absolute bottom-1/3 left-1/3 w-1 h-1 rounded-full bg-gold/25 animate-float" style={{ animationDelay: '2s' }} />
      <div className="absolute top-2/3 right-1/4 w-2 h-2 rounded-full bg-gold/10 animate-float" style={{ animationDelay: '3s' }} />
    </div>
  );
};

export default DecorativeElement;
