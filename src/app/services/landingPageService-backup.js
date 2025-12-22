/**
 * Landing Page Service
 * Handles all API calls related to landing pages
 */

const API_BASE_URL = process.env.NEXT_PUBLIC_API_ROUTE || 'http://localhost:3045';

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
   * Get landing pages from cache or API
   */
  async getLandingPagesForPage(page = 'home', useCache = true) {
    // For debugging: show all landing pages on all pages
    
    try {
      // First try to get all active landing pages
      const response = await fetch(`${API_BASE_URL}/landingpages?isActive=true`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
        cache: 'no-store',
      });

      if (!response.ok) {
        console.error(`❌ HTTP error! status: ${response.status}`);
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const result = await response.json();
      console.log('📊 API Response:', result);
      
      if (result.success && result.data && result.data.length > 0) {
        console.log(`✅ Found ${result.data.length} active landing pages:`, result.data.map(p => ({
          id: p._id,
          title: p.title,
          displayType: p.displayType,
          priority: p.priority,
          showOnPages: p.showOnPages
        })));
        
        return result.data;
      } else {
        console.warn('⚠️ API returned no active landing pages:', result);
        
        // Try to get all landing pages (including inactive ones) for debugging
        const allResponse = await fetch(`${API_BASE_URL}/landingpages`, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
          },
        });
        
        if (allResponse.ok) {
          const allResult = await allResponse.json();
          console.log('📊 All landing pages (including inactive):', allResult);
        }
        
        return [];
      }
    } catch (error) {
      console.error('❌ Error fetching landing pages:', error);
      console.error('❌ API URL:', `${API_BASE_URL}/landingpages?isActive=true`);
      
      // Test if API is reachable
      try {
        const testResponse = await fetch(`${API_BASE_URL}/`);
        console.log('� API base URL test:', testResponse.ok ? 'Reachable' : 'Not reachable');
      } catch (testError) {
        console.error('❌ API base URL not reachable:', testError.message);
      }
      
      return [];
    }
  }

  /**
   * Get all active landing pages with enhanced debugging and proper error handling
   */
  async getAllActiveLandingPages() {
    const API_URL = `${API_BASE_URL}/landingpages?isActive=true`;
    
    console.log('� [LandingPageService] Starting comprehensive API call...');
    console.log('🔍 [LandingPageService] API_BASE_URL:', API_BASE_URL);
    console.log('🔍 [LandingPageService] Full API_URL:', API_URL);
    console.log('🔍 [LandingPageService] Environment:', process.env.NODE_ENV);
    console.log('🔍 [LandingPageService] Browser location:', typeof window !== 'undefined' ? window.location.origin : 'SSR');
    
    try {
      // Test base API connectivity first
      console.log('🧪 [LandingPageService] Testing base API connectivity...');
      try {
        const baseResponse = await fetch(`${API_BASE_URL}/`, {
          method: 'GET',
          cache: 'no-store',
        });
        console.log('🧪 [LandingPageService] Base API test:', baseResponse.ok ? 'Connected' : `Failed (${baseResponse.status})`);
      } catch (baseError) {
        console.error('❌ [LandingPageService] Base API unreachable:', baseError.message);
      }
      
      // Create AbortController for timeout
      const controller = new AbortController();
      const timeoutId = setTimeout(() => {
        controller.abort();
        console.error('⏰ [LandingPageService] Request timeout after 15 seconds');
      }, 15000);
      
      console.log('📡 [LandingPageService] Making landing pages API request...');
      
      const response = await fetch(API_URL, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        },
        cache: 'no-store',
        signal: controller.signal
      });
      
      clearTimeout(timeoutId);
      
      console.log('📨 [LandingPageService] Response received:');
      console.log('📨 [LandingPageService] Status:', response.status, response.statusText);
      console.log('📨 [LandingPageService] Headers:', Object.fromEntries(response.headers.entries()));
      
      if (!response.ok) {
        const errorText = await response.text();
        console.error('❌ [LandingPageService] HTTP Error:', response.status, errorText);
        throw new Error(`HTTP ${response.status}: ${response.statusText} - ${errorText}`);
      }
      
      console.log('🔍 [LandingPageService] Parsing JSON response...');
      const result = await response.json();
      
      console.log('📊 [LandingPageService] Parsed response:');
      console.log('📊 [LandingPageService] Success:', result.success);
      console.log('📊 [LandingPageService] Message:', result.message);
      console.log('📊 [LandingPageService] Data type:', typeof result.data);
      console.log('📊 [LandingPageService] Data is array:', Array.isArray(result.data));
      console.log('📊 [LandingPageService] Data length:', result.data ? result.data.length : 'No data property');
      console.log('📊 [LandingPageService] Count:', result.count);
      
      if (result.success && result.data && Array.isArray(result.data)) {
        console.log(`✅ [LandingPageService] Successfully received ${result.data.length} landing pages:`);
        result.data.forEach((page, index) => {
          console.log(`  ${index + 1}. "${page.title || 'Untitled'}" (ID: ${page._id}, Active: ${page.isActive}, Priority: ${page.priority}, Type: ${page.displayType || 'N/A'})`);
        });
        return result.data;
      } else {
        console.warn('⚠️ [LandingPageService] Invalid or empty response:', result);
        return [];
      }
      
    } catch (error) {
      console.error('❌ [LandingPageService] Complete error details:');
      console.error('❌ [LandingPageService] Error name:', error.name);
      console.error('❌ [LandingPageService] Error message:', error.message);
      console.error('❌ [LandingPageService] Error stack:', error.stack);
      
      // Specific error handling
      if (error.name === 'AbortError') {
        console.error('❌ [LandingPageService] Request was aborted due to timeout');
      } else if (error.message.includes('fetch')) {
        console.error('❌ [LandingPageService] Network error - check if backend server is running');
      } else if (error.message.includes('JSON')) {
        console.error('❌ [LandingPageService] Invalid JSON response from server');
      }
      
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