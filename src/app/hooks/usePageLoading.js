/**
 * Custom Hook: usePageLoading
 * Manages loading state with minimum display time and complete page load detection
 * 
 * Usage:
 * ```javascript
 * const isLoading = usePageLoading({ minTime: 2000 });
 * 
 * return (
 *   <>
 *     {isLoading ? <PageLoader /> : <Content />}
 *   </>
 * );
 * ```
 */

"use client";
import { useState, useEffect } from 'react';

export function usePageLoading({ 
  minTime = 2000, // Minimum 2 seconds
  waitForImages = true,
  waitForFonts = true 
} = {}) {
  const [isLoading, setIsLoading] = useState(true);
  const [minTimeElapsed, setMinTimeElapsed] = useState(false);
  const [contentLoaded, setContentLoaded] = useState(false);

  useEffect(() => {
    let mounted = true;

    // Minimum time timer
    const minTimer = setTimeout(() => {
      if (mounted) setMinTimeElapsed(true);
    }, minTime);

    // Check for complete page load
    const checkContentLoaded = async () => {
      try {
        // Wait for DOM to be ready
        if (document.readyState === 'loading') {
          await new Promise(resolve => {
            document.addEventListener('DOMContentLoaded', resolve, { once: true });
          });
        }

        // Wait for all resources (images, stylesheets, scripts)
        if (document.readyState !== 'complete') {
          await new Promise(resolve => {
            window.addEventListener('load', resolve, { once: true });
          });
        }

        // Optional: Wait for images to load
        if (waitForImages) {
          const images = Array.from(document.images);
          await Promise.all(
            images
              .filter(img => !img.complete)
              .map(img => new Promise(resolve => {
                img.addEventListener('load', resolve, { once: true });
                img.addEventListener('error', resolve, { once: true }); // Continue even if image fails
              }))
          );
        }

        // Optional: Wait for fonts to load
        if (waitForFonts && document.fonts) {
          await document.fonts.ready;
        }

        if (mounted) setContentLoaded(true);
      } catch (error) {
        console.error('Error in page loading detection:', error);
        if (mounted) setContentLoaded(true); // Continue anyway
      }
    };

    checkContentLoaded();

    return () => {
      mounted = false;
      clearTimeout(minTimer);
    };
  }, [minTime, waitForImages, waitForFonts]);

  // Loading is complete when BOTH conditions are met
  useEffect(() => {
    if (minTimeElapsed && contentLoaded) {
      // Small delay for smooth transition
      const fadeTimer = setTimeout(() => {
        setIsLoading(false);
      }, 100);

      return () => clearTimeout(fadeTimer);
    }
  }, [minTimeElapsed, contentLoaded]);

  return isLoading;
}
