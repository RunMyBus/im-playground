/**
 * Landing Page Slider Configuration
 * Centralized configuration for the landing page slider
 */

export const LANDING_PAGE_SLIDER_CONFIG = {
  // Auto-advance settings
  autoAdvance: true,
  autoAdvanceDelay: 5000, // 5 seconds
  
  // Transition settings
  transitionSpeed: 500, // 0.5 seconds
  transitionEffect: 'fade', // 'fade', 'slide', or 'none'
  
  // Navigation settings
  showNavigationDots: true,
  showNavigationArrows: true,
  enableManualNavigation: true,
  
  // Display settings
  showProgressCounter: true,
  showCloseAllButton: true,
  pauseOnHover: true,
  
  // Priority settings
  priorityBased: true,
  respectPriority: true,
  
  // Performance settings
  preloadNext: true,
  lazyLoadImages: true,
  
  // Accessibility settings
  announceTransitions: true,
  keyboardNavigation: true,
  
  // Mobile settings
  mobileAutoAdvance: true,
  mobileSwipeGestures: true,
  
  // Analytics settings
  trackViews: true,
  trackInteractions: true,
  trackDwellTime: true
};

export const TRANSITION_EFFECTS = {
  FADE: 'fade',
  SLIDE: 'slide',
  NONE: 'none'
};

export const DISPLAY_TYPES = {
  POPUP: 'popup',
  BANNER: 'banner',
  FULL_PAGE: 'full-page',
  NOTIFICATION: 'notification'
};

export default LANDING_PAGE_SLIDER_CONFIG;