/**
 * Landing Page Service - FIXED VERSION
 * Handles all API calls related to landing pages with enhanced debugging
 */

const API_BASE_URL = process.env.NEXT_PUBLIC_API_ROUTE;

class LandingPageService {
  constructor() {
    this.cache = new Map();
    this.cacheTimeout = 5 * 60 * 1000; // 5 minutes
  }

  /**
   * Get cache key for a request
   */
  getCacheKey(page, active = true) {
    return `landing_pages_${page}_${active}`;
  }

  /**
   * Check if cache is valid
   */
  isCacheValid(timestamp) {
    return Date.now() - timestamp < this.cacheTimeout;
  }

  /**
   * Get landing pages from cache or API with multiple endpoint fallbacks
   */
  async getLandingPagesForPage(page = 'home', useCache = true) {
    console.log('🚀 Fetching ALL active landing pages for debugging...');
    console.log('🔗 API Base URL:', API_BASE_URL);
    
    try {
      // Try multiple endpoints to ensure we get data
      const endpoints = [
        `${API_BASE_URL}/landingpages?isActive=true`,
        `${API_BASE_URL}/public/landingpages/${page}`,
        `${API_BASE_URL}/landingpages`,
      ];
      
      for (const endpoint of endpoints) {
        try {
          console.log(`🎯 Trying endpoint: ${endpoint}`);
          
          const response = await fetch(endpoint, {
            method: 'GET',
            headers: {
              'Content-Type': 'application/json',
            },
            cache: 'no-store',
          });

          console.log(`📡 Response status: ${response.status} for ${endpoint}`);

          if (!response.ok) {
            console.warn(`⚠️ HTTP error! status: ${response.status} for ${endpoint}`);
            continue; // Try next endpoint
          }

          const result = await response.json();
          console.log(`📊 API Response from ${endpoint}:`, result);
          
          if (result.success && result.data && Array.isArray(result.data)) {
            if (result.data.length > 0) {
              console.log(`✅ Found ${result.data.length} landing pages:`, result.data.map(p => ({
                id: p._id,
                title: p.title,
                displayType: p.displayType || 'popup',
                priority: p.priority,
                isActive: p.isActive,
                showOnPages: p.showOnPages
              })));
              
              // Filter active pages if needed
              const activePages = result.data.filter(p => p.isActive !== false);
              console.log(`🎯 Returning ${activePages.length} active pages`);
              return activePages;
            } else {
              console.warn(`⚠️ Empty data array from ${endpoint}`);
            }
          } else {
            console.warn(`⚠️ Invalid response format from ${endpoint}:`, result);
          }
        } catch (endpointError) {
          console.error(`❌ Error with endpoint ${endpoint}:`, endpointError.message);
          continue; // Try next endpoint
        }
      }
      
      console.error('❌ All endpoints failed or returned no data');
      return [];
      
    } catch (error) {
      console.error('❌ General error fetching landing pages:', error);
      
      // Test if API is reachable at all
      try {
        const testResponse = await fetch(`${API_BASE_URL}/`);
        console.log('🔍 API base URL test:', testResponse.ok ? 'Reachable' : 'Not reachable');
      } catch (testError) {
        console.error('❌ API base URL not reachable:', testError.message);
        console.log('💡 Make sure your API server is running on port 3045');
      }
      
      return [];
    }
  }

  /**
   * Get all active landing pages
   */
  async getAllActiveLandingPages() {
    try {
      const response = await fetch(`${API_BASE_URL}/landingpages?isActive=true`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
        cache: 'no-store',
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const result = await response.json();
      
      if (result.success && result.data) {
        return result.data;
      } else {
        return [];
      }
    } catch (error) {
      console.error('❌ Error fetching all landing pages:', error);
      return [];
    }
  }

  /**
   * Track a view for a landing page
   */
  async trackView(landingPageId) {
    try {
      console.log('👀 Tracking view for landing page:', landingPageId);
      
      const response = await fetch(`${API_BASE_URL}/landingpage/${landingPageId}/view`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const result = await response.json();
      return result.success;
    } catch (error) {
      console.error('❌ Error tracking view:', error);
      return false;
    }
  }

  /**
   * Track a click for a landing page
   */
  async trackClick(landingPageId) {
    try {
      console.log('👆 Tracking click for landing page:', landingPageId);
      
      const response = await fetch(`${API_BASE_URL}/landingpage/${landingPageId}/click`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const result = await response.json();
      return result.success;
    } catch (error) {
      console.error('❌ Error tracking click:', error);
      return false;
    }
  }

  /**
   * Clear cache
   */
  clearCache() {
    this.cache.clear();
    console.log('🧹 Landing page cache cleared');
  }

  /**
   * Clear cache for specific page
   */
  clearCacheForPage(page) {
    const cacheKey = this.getCacheKey(page);
    this.cache.delete(cacheKey);
    console.log(`🧹 Cache cleared for page: ${page}`);
  }

  /**
   * Get current page name from URL
   */
  getCurrentPageName() {
    if (typeof window === 'undefined') return 'home';
    
    const path = window.location.pathname;
    
    // Map routes to page names
    const pageMap = {
      '/': 'home',
      '/about': 'about', 
      '/our-story': 'about',
      '/governance': 'about',
      '/projects': 'projects',
      '/isr-projects': 'projects',
      '/csr-projects': 'projects',
      '/blog': 'blog',
      '/contact': 'contact',
    };

    // Check for exact matches first
    if (pageMap[path]) {
      return pageMap[path];
    }

    // Check for partial matches
    for (const [route, pageName] of Object.entries(pageMap)) {
      if (path.startsWith(route) && route !== '/') {
        return pageName;
      }
    }

    return 'all'; // Show on all pages if no specific match
  }

  /**
   * Preload landing pages for common pages
   */
  async preloadCommonPages() {
    const commonPages = ['home', 'about', 'projects', 'blog'];
    
    try {
      await Promise.allSettled(
        commonPages.map(page => this.getLandingPagesForPage(page))
      );
      console.log('🎯 Preloaded landing pages for common pages');
    } catch (error) {
      console.error('❌ Error preloading landing pages:', error);
    }
  }
}

// Create and export a singleton instance
const landingPageService = new LandingPageService();

export default landingPageService;

// Export the class for testing or manual instantiation
export { LandingPageService };