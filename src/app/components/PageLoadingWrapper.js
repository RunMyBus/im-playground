/**
 * Global Page Loading Wrapper
 * Shows loading state for minimum 2 seconds AND until page fully loads
 * 
 * Features:
 * - Minimum 2-second display time
 * - Waits for complete page load (images, fonts, etc.)
 * - Smooth fade-out transition
 * - Prevents flash of loading for fast loads
 */

"use client";
import { useState, useEffect } from 'react';
import { PageLoader } from '../loading';

export default function PageLoadingWrapper({ 
  children,
  message = "Loading...",
  variant = "primary",
  minLoadTime = 2000 // 2 seconds minimum
}) {
  const [isLoading, setIsLoading] = useState(true);
  const [minTimeElapsed, setMinTimeElapsed] = useState(false);
  const [pageLoaded, setPageLoaded] = useState(false);

  useEffect(() => {
    // Timer for minimum loading time (2 seconds)
    const minTimer = setTimeout(() => {
      setMinTimeElapsed(true);
    }, minLoadTime);

    // Check if page is already loaded
    const checkPageLoad = () => {
      if (document.readyState === 'complete') {
        setPageLoaded(true);
      }
    };

    // Listen for page load event
    if (document.readyState === 'complete') {
      setPageLoaded(true);
    } else {
      window.addEventListener('load', () => setPageLoaded(true));
    }

    // Cleanup
    return () => {
      clearTimeout(minTimer);
      window.removeEventListener('load', checkPageLoad);
    };
  }, [minLoadTime]);

  // Hide loading when BOTH conditions are met:
  // 1. Minimum time has elapsed (2 seconds)
  // 2. Page is fully loaded
  useEffect(() => {
    if (minTimeElapsed && pageLoaded) {
      // Small delay for smooth transition
      setTimeout(() => {
        setIsLoading(false);
      }, 100);
    }
  }, [minTimeElapsed, pageLoaded]);

  if (isLoading) {
    return <PageLoader message={message} variant={variant} />;
  }

  return <>{children}</>;
}
