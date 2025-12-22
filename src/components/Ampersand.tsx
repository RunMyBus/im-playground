const Ampersand = () => {
  return (
    <div className="relative mx-8 md:mx-12">
      <span className="font-display text-6xl md:text-8xl lg:text-9xl text-gold italic animate-pulse-glow">
        &
      </span>
      <div className="absolute inset-0 blur-2xl bg-gold/20 -z-10" />
    </div>
  );
};

export default Ampersand;
