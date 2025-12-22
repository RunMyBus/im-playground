/**
 * Utility to ensure jQuery is loaded before importing react-owl-carousel
 * This prevents "Cannot read properties of undefined (reading 'fn')" errors
 */

export function waitForJQuery(maxAttempts = 100, interval = 50) {
  return new Promise((resolve, reject) => {
    if (typeof window === 'undefined') {
      reject(new Error('Window is not available'));
      return;
    }

    let attempts = 0;

    const checkJQuery = () => {
      if (window.jQuery && window.jQuery.fn && window.$ && window.$.fn) {
        resolve(window.jQuery);
      } else if (attempts < maxAttempts) {
        attempts++;
        setTimeout(checkJQuery, interval);
      } else {
        reject(new Error('jQuery failed to load within the expected time'));
      }
    };

    // If jQuery is already loaded, resolve immediately
    if (window.jQuery && window.jQuery.fn && window.$ && window.$.fn) {
      resolve(window.jQuery);
    } else {
      checkJQuery();
    }
  });
}

/**
 * Dynamically import react-owl-carousel only after jQuery is available
 * Returns a promise that resolves to the component for use with Next.js dynamic()
 */
export function loadOwlCarousel() {
  return waitForJQuery()
    .then(() => import("react-owl-carousel"))
    .then((module) => module.default)
    .catch((error) => {
      console.error('Failed to load OwlCarousel:', error);
      throw error;
    });
}

