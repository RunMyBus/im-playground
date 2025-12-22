/**
 * Landing Page Performance Optimizer
 * Handles lazy loading, caching, and performance optimizations
 */

class LandingPageOptimizer {
  constructor() {
    this.intersectionObserver = null;
    this.imageCache = new Map();
    this.contentCache = new Map();
    this.performanceMetrics = {
      loadTimes: [],
      renderTimes: [],
      interactionTimes: [],
    };
    
    this.initializeObserver();
  }

  /**
   * Initialize Intersection Observer for lazy loading
   */
  initializeObserver() {
    if (typeof window === 'undefined' || !window.IntersectionObserver) {
      return;
    }

    this.intersectionObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            this.lazyLoadElement(entry.target);
            this.intersectionObserver.unobserve(entry.target);
          }
        });
      },
      {
        rootMargin: '50px',
        threshold: 0.1,
      }
    );
  }

  /**
   * Lazy load an element
   */
  lazyLoadElement(element) {
    const src = element.dataset.src;
    const srcset = element.dataset.srcset;

    if (src) {
      element.src = src;
      element.removeAttribute('data-src');
    }

    if (srcset) {
      element.srcset = srcset;
      element.removeAttribute('data-srcset');
    }

    element.classList.remove('lazy');
    element.classList.add('loaded');
  }

  /**
   * Optimize images in landing page content
   */
  optimizeImages(content) {
    if (typeof window === 'undefined') return content;

    const tempDiv = document.createElement('div');
    tempDiv.innerHTML = content;

    const images = tempDiv.querySelectorAll('img');
    images.forEach((img) => {
      // Add lazy loading attributes
      if (img.src) {
        img.dataset.src = img.src;
        img.src = this.generatePlaceholder(img.width || 400, img.height || 300);
        img.classList.add('lazy');
      }

      // Add responsive attributes
      if (!img.loading) {
        img.loading = 'lazy';
      }

      if (!img.decoding) {
        img.decoding = 'async';
      }

      // Observe for lazy loading
      if (this.intersectionObserver) {
        this.intersectionObserver.observe(img);
      }
    });

    return tempDiv.innerHTML;
  }

  /**
   * Generate a placeholder image
   */
  generatePlaceholder(width, height) {
    const canvas = document.createElement('canvas');
    canvas.width = width;
    canvas.height = height;
    
    const ctx = canvas.getContext('2d');
    
    // Create a subtle gradient placeholder
    const gradient = ctx.createLinearGradient(0, 0, width, height);
    gradient.addColorStop(0, '#f0f0f0');
    gradient.addColorStop(1, '#e0e0e0');
    
    ctx.fillStyle = gradient;
    ctx.fillRect(0, 0, width, height);
    
    // Add a subtle pattern
    ctx.strokeStyle = '#d0d0d0';
    ctx.lineWidth = 1;
    for (let i = 0; i < width; i += 20) {
      ctx.moveTo(i, 0);
      ctx.lineTo(i, height);
    }
    for (let i = 0; i < height; i += 20) {
      ctx.moveTo(0, i);
      ctx.lineTo(width, i);
    }
    ctx.stroke();
    
    return canvas.toDataURL();
  }

  /**
   * Preload critical resources
   */
  preloadResources(landingPages) {
    if (!landingPages.length || typeof window === 'undefined') return;

    // Preload critical landing pages (high priority ones)
    const criticalPages = landingPages
      .filter(page => page.priority <= 3)
      .slice(0, 2); // Only preload top 2 critical pages

    criticalPages.forEach((page) => {
      this.preloadContent(page.content);
    });
  }

  /**
   * Preload content resources
   */
  preloadContent(content) {
    const tempDiv = document.createElement('div');
    tempDiv.innerHTML = content;

    // Preload images
    const images = tempDiv.querySelectorAll('img[src]');
    images.forEach((img) => {
      if (!this.imageCache.has(img.src)) {
        const preloadLink = document.createElement('link');
        preloadLink.rel = 'preload';
        preloadLink.as = 'image';
        preloadLink.href = img.src;
        document.head.appendChild(preloadLink);
        
        this.imageCache.set(img.src, true);
      }
    });

    // Preload external stylesheets
    const links = tempDiv.querySelectorAll('link[rel="stylesheet"]');
    links.forEach((link) => {
      if (!document.querySelector(`link[href="${link.href}"]`)) {
        const preloadLink = document.createElement('link');
        preloadLink.rel = 'preload';
        preloadLink.as = 'style';
        preloadLink.href = link.href;
        preloadLink.onload = () => {
          preloadLink.rel = 'stylesheet';
        };
        document.head.appendChild(preloadLink);
      }
    });
  }

  /**
   * Optimize content for rendering
   */
  optimizeContent(content, options = {}) {
    if (!content || typeof content !== 'string') return content;

    let optimizedContent = content;

    // Remove unnecessary whitespace
    if (options.minify !== false) {
      optimizedContent = optimizedContent
        .replace(/\s+/g, ' ')
        .replace(/>\s+</g, '><')
        .trim();
    }

    // Optimize images
    if (options.lazyImages !== false) {
      optimizedContent = this.optimizeImages(optimizedContent);
    }

    // Add performance hints
    if (options.performanceHints !== false) {
      optimizedContent = this.addPerformanceHints(optimizedContent);
    }

    return optimizedContent;
  }

  /**
   * Add performance hints to content
   */
  addPerformanceHints(content) {
    const tempDiv = document.createElement('div');
    tempDiv.innerHTML = content;

    // Add dns-prefetch for external domains
    const externalLinks = tempDiv.querySelectorAll('a[href^="http"]');
    const domains = new Set();
    
    externalLinks.forEach((link) => {
      try {
        const url = new URL(link.href);
        domains.add(url.hostname);
      } catch (e) {
        // Invalid URL, skip
      }
    });

    domains.forEach((domain) => {
      if (!document.querySelector(`link[rel="dns-prefetch"][href="//${domain}"]`)) {
        const prefetchLink = document.createElement('link');
        prefetchLink.rel = 'dns-prefetch';
        prefetchLink.href = `//${domain}`;
        document.head.appendChild(prefetchLink);
      }
    });

    return tempDiv.innerHTML;
  }

  /**
   * Debounce function for performance
   */
  debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
      const later = () => {
        clearTimeout(timeout);
        func(...args);
      };
      clearTimeout(timeout);
      timeout = setTimeout(later, wait);
    };
  }

  /**
   * Throttle function for performance
   */
  throttle(func, limit) {
    let inThrottle;
    return function executedFunction(...args) {
      if (!inThrottle) {
        func.apply(this, args);
        inThrottle = true;
        setTimeout(() => inThrottle = false, limit);
      }
    };
  }

  /**
   * Measure performance metrics
   */
  measurePerformance(label, startTime) {
    if (typeof performance === 'undefined') return;

    const endTime = performance.now();
    const duration = endTime - startTime;

    this.performanceMetrics[`${label}Times`] = this.performanceMetrics[`${label}Times`] || [];
    this.performanceMetrics[`${label}Times`].push(duration);

    // Log performance metrics in development
    if (process.env.NODE_ENV === 'development') {
      console.log(`⚡ ${label} took ${duration.toFixed(2)}ms`);
    }

    // Send to analytics if needed
    this.sendPerformanceMetric(label, duration);
  }

  /**
   * Send performance metric to analytics
   */
  sendPerformanceMetric(label, duration) {
    if (typeof window !== 'undefined' && window.gtag) {
      window.gtag('event', 'timing_complete', {
        name: `landing_page_${label}`,
        value: Math.round(duration),
      });
    }
  }

  /**
   * Get performance summary
   */
  getPerformanceSummary() {
    const summary = {};

    Object.entries(this.performanceMetrics).forEach(([key, times]) => {
      if (times.length > 0) {
        summary[key] = {
          count: times.length,
          average: times.reduce((a, b) => a + b, 0) / times.length,
          min: Math.min(...times),
          max: Math.max(...times),
        };
      }
    });

    return summary;
  }

  /**
   * Clear performance metrics
   */
  clearMetrics() {
    this.performanceMetrics = {
      loadTimes: [],
      renderTimes: [],
      interactionTimes: [],
    };
  }

  /**
   * Enable critical CSS inlining
   */
  inlineCriticalCSS() {
    // This would typically be done at build time
    // For runtime, we can optimize by moving critical styles to head
    const criticalStyles = `
      .landing-page-popup-backdrop,
      .landing-page-banner,
      .landing-page-fullpage {
        z-index: 9999;
      }
      
      .landing-page-popup {
        max-width: 600px;
      }
      
      @media (max-width: 480px) {
        .landing-page-popup {
          margin: 10px;
        }
      }
    `;

    if (!document.querySelector('#landing-page-critical-css')) {
      const styleElement = document.createElement('style');
      styleElement.id = 'landing-page-critical-css';
      styleElement.textContent = criticalStyles;
      document.head.appendChild(styleElement);
    }
  }

  /**
   * Optimize for Core Web Vitals
   */
  optimizeWebVitals() {
    // Largest Contentful Paint (LCP) optimization
    this.optimizeLCP();
    
    // First Input Delay (FID) optimization
    this.optimizeFID();
    
    // Cumulative Layout Shift (CLS) optimization
    this.optimizeCLS();
  }

  /**
   * Optimize Largest Contentful Paint
   */
  optimizeLCP() {
    // Preload critical resources
    this.inlineCriticalCSS();
    
    // Use resource hints for external resources
    if (typeof window !== 'undefined') {
      // Add preconnect for external domains
      const preconnectDomains = ['fonts.googleapis.com', 'fonts.gstatic.com'];
      preconnectDomains.forEach(domain => {
        if (!document.querySelector(`link[rel="preconnect"][href="https://${domain}"]`)) {
          const link = document.createElement('link');
          link.rel = 'preconnect';
          link.href = `https://${domain}`;
          link.crossOrigin = 'anonymous';
          document.head.appendChild(link);
        }
      });
    }
  }

  /**
   * Optimize First Input Delay
   */
  optimizeFID() {
    // Defer non-critical JavaScript
    if (typeof window !== 'undefined') {
      // Break up long tasks
      this.breakUpLongTasks();
    }
  }

  /**
   * Optimize Cumulative Layout Shift
   */
  optimizeCLS() {
    // Reserve space for dynamic content
    // This is handled in CSS with proper sizing
  }

  /**
   * Break up long tasks to improve FID
   */
  breakUpLongTasks() {
    const yieldToMain = () => {
      return new Promise(resolve => {
        setTimeout(resolve, 0);
      });
    };

    // Use this in long-running operations
    return yieldToMain;
  }

  /**
   * Clean up resources
   */
  cleanup() {
    if (this.intersectionObserver) {
      this.intersectionObserver.disconnect();
    }
    
    this.imageCache.clear();
    this.contentCache.clear();
    this.clearMetrics();
  }
}

// Create and export a singleton instance
const landingPageOptimizer = new LandingPageOptimizer();

export default landingPageOptimizer;

// Export the class for testing
export { LandingPageOptimizer };