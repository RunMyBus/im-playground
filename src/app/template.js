/**
 * Global Template Component
 * Simple wrapper for page content - no animations
 * No global loading state - each page handles its own loading
 */

export default function Template({ children }) {
  // No animations - just render content immediately
  return (
    <div className="content-loaded">
      {children}
    </div>
  );
}
