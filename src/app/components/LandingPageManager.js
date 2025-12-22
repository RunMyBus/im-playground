/**
 * Landing Page Manager Component
 * Main component that handles fetching, displaying, and managing all landing pages
 */

'use client';

import React, { useState, useEffect, useCallback, useRef } from 'react';
import landingPageService from '../services/landingPageService';
import landingPageAnalytics from '../utils/landingPageAnalytics';
import landingPageOptimizer from '../utils/landingPageOptimizer';
import PopupLandingPage from './PopupLandingPage';
import BannerLandingPage from './BannerLandingPage';
import FullPageLandingPage from './FullPageLandingPage';

const LandingPageManager = () => {
  const [landingPages, setLandingPages] = useState([]);
  const [displayedPages, setDisplayedPages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState('home');
  const [error, setError] = useState(null);
  
  // Track which pages have been shown to avoid repeating them
  const shownPagesRef = useRef(new Set());
  const timeoutsRef = useRef(new Map());
  const mountedRef = useRef(true);

  /**
   * Get the display type for a landing page based on its properties
   */
  const getDisplayType = useCallback((landingPage) => {
    // Use displayType from API if available
    if (landingPage.displayType) {
      return landingPage.displayType;
    }
    
    // Fallback logic for backward compatibility
    const content = landingPage.content.toLowerCase();
    const title = landingPage.title.toLowerCase();
    
    // Full page takeover indicators
    if (title.includes('full') || title.includes('takeover') || landingPage.priority <= 2) {
      return 'full-page';
    }
    
    // Banner indicators
    if (title.includes('banner') || title.includes('announcement') || content.length < 200) {
      return 'banner';
    }
    
    // Default to popup for most cases
    return 'popup';
  }, []);

  /**
   * Fetch landing pages for current page
   */
  const fetchLandingPages = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      
      console.log('🔄 Starting to fetch landing pages for current page:', currentPage);
      const startTime = performance.now();
      const pages = await landingPageService.getLandingPagesForPage(currentPage);
      landingPageOptimizer.measurePerformance('load', startTime);
      
      if (mountedRef.current) {
        console.log(`📦 Processing ${pages.length} landing pages...`);
        
        // Optimize content for performance
        const optimizedPages = pages.map(page => {
          console.log('🔧 Processing page:', {
            id: page._id,
            title: page.title,
            displayType: page.displayType,
            content: page.content ? `${page.content.substring(0, 100)}...` : 'No content'
          });
          
          return {
            ...page,
            content: landingPageOptimizer.optimizeContent(page.content)
          };
        });
        
        setLandingPages(optimizedPages);
        
        // Preload resources for high-priority pages
        landingPageOptimizer.preloadResources(optimizedPages);
        
        console.log(`✅ Successfully loaded ${optimizedPages.length} landing pages for ${currentPage}`);
      }
    } catch (err) {
      console.error('❌ Error fetching landing pages:', err);
      if (mountedRef.current) {
        setError('Failed to load landing pages');
      }
    } finally {
      if (mountedRef.current) {
        setLoading(false);
      }
    }
  }, [currentPage]);

  /**
   * Get current page name from URL
   */
  const updateCurrentPage = useCallback(() => {
    const newPage = landingPageService.getCurrentPageName();
    if (newPage !== currentPage) {
      setCurrentPage(newPage);
      // Clear shown pages when navigating to a new page
      shownPagesRef.current.clear();
      setDisplayedPages([]);
    }
  }, [currentPage]);

  /**
   * Schedule a landing page to be displayed
   */
  const scheduleLandingPage = useCallback((landingPage, delay = 0) => {
    const timeoutId = setTimeout(() => {
      if (mountedRef.current && !shownPagesRef.current.has(landingPage._id)) {
        console.log(`⏰ Displaying landing page: ${landingPage.title}`);
        
        // Track the view
        landingPageService.trackView(landingPage._id);
        landingPageAnalytics.trackView(landingPage);
        
        // Add to displayed pages
        setDisplayedPages(prev => [...prev, {
          ...landingPage,
          displayType: getDisplayType(landingPage),
          timestamp: Date.now()
        }]);
        
        // Mark as shown
        shownPagesRef.current.add(landingPage._id);
        
        // Schedule automatic removal if displayDuration is set
        if (landingPage.displayDuration && landingPage.displayDuration > 0) {
          const removeTimeoutId = setTimeout(() => {
            closeLandingPage(landingPage._id, 'auto_timeout');
          }, landingPage.displayDuration);
          
          timeoutsRef.current.set(`remove_${landingPage._id}`, removeTimeoutId);
        }
      }
    }, delay);
    
    timeoutsRef.current.set(landingPage._id, timeoutId);
  }, [getDisplayType, closeLandingPage]);

  /**
   * Process landing pages and schedule them for display
   */
  const processLandingPages = useCallback(() => {
    if (!landingPages.length) return;
    
    // Sort by priority (1 is highest priority)
    const sortedPages = [...landingPages].sort((a, b) => {
      if (a.priority !== b.priority) {
        return a.priority - b.priority;
      }
      // If same priority, sort by creation date (newest first)
      return new Date(b.createdAt) - new Date(a.createdAt);
    });
    
    console.log(`🎯 Processing ${sortedPages.length} landing pages for display`);
    
    let delay = 1000; // Start with 1 second delay
    
    sortedPages.forEach((landingPage, index) => {
      if (!shownPagesRef.current.has(landingPage._id)) {
        // Schedule each landing page with increasing delay
        // Higher priority pages get less delay
        const pageDelay = delay + (index * 2000); // 2 seconds between each page
        scheduleLandingPage(landingPage, pageDelay);
      }
    });
  }, [landingPages, scheduleLandingPage]);

  /**
   * Close a specific landing page
   */
  const closeLandingPage = useCallback((landingPageId, dismissalMethod = 'close_button') => {
    console.log(`❌ Closing landing page: ${landingPageId}`);
    
    // Find the landing page for analytics
    const landingPage = displayedPages.find(page => page._id === landingPageId);
    if (landingPage) {
      landingPageAnalytics.trackDismissal(landingPage, dismissalMethod);
    }
    
    setDisplayedPages(prev => prev.filter(page => page._id !== landingPageId));
    
    // Clear associated timeouts
    if (timeoutsRef.current.has(landingPageId)) {
      clearTimeout(timeoutsRef.current.get(landingPageId));
      timeoutsRef.current.delete(landingPageId);
    }
    
    if (timeoutsRef.current.has(`remove_${landingPageId}`)) {
      clearTimeout(timeoutsRef.current.get(`remove_${landingPageId}`));
      timeoutsRef.current.delete(`remove_${landingPageId}`);
    }
  }, [displayedPages]);

  /**
   * Handle landing page click
   */
  const handleLandingPageClick = useCallback(async (landingPage) => {
    console.log(`👆 Landing page clicked: ${landingPage.title}`);
    
    // Track the click
    await landingPageService.trackClick(landingPage._id);
    landingPageAnalytics.trackClick(landingPage, 'button');
    
    // Track conversion if there's a target URL
    if (landingPage.targetUrl) {
      landingPageAnalytics.trackConversion(landingPage, 'click_through');
    }
    
    // Navigate if targetUrl is provided
    if (landingPage.targetUrl && typeof window !== 'undefined') {
      // Check if it's an external URL
      if (landingPage.targetUrl.startsWith('http')) {
        window.open(landingPage.targetUrl, '_blank', 'noopener,noreferrer');
      } else {
        window.location.href = landingPage.targetUrl;
      }
    }
    
    // Close the landing page after click
    closeLandingPage(landingPage._id, 'click_action');
  }, [closeLandingPage]);

  /**
   * Render a landing page based on its display type
   */
  const renderLandingPage = useCallback((landingPage) => {
    const commonProps = {
      key: `landing-page-${landingPage._id}`,
      landingPage,
      onClose: () => closeLandingPage(landingPage._id),
      onClick: () => handleLandingPageClick(landingPage),
    };

    switch (landingPage.displayType) {
      case 'full-page':
        return <FullPageLandingPage {...commonProps} />;
      case 'banner':
        return <BannerLandingPage {...commonProps} />;
      case 'popup':
      default:
        return <PopupLandingPage {...commonProps} />;
    }
  }, [closeLandingPage, handleLandingPageClick]);

  // Update current page on route changes
  useEffect(() => {
    updateCurrentPage();
    
    // Listen for route changes
    const handleRouteChange = () => {
      setTimeout(updateCurrentPage, 100); // Small delay to ensure route has changed
    };
    
    if (typeof window !== 'undefined') {
      window.addEventListener('popstate', handleRouteChange);
      // Also listen for pushState/replaceState (for programmatic navigation)
      const originalPushState = window.history.pushState;
      const originalReplaceState = window.history.replaceState;
      
      window.history.pushState = function(...args) {
        originalPushState.apply(window.history, args);
        handleRouteChange();
      };
      
      window.history.replaceState = function(...args) {
        originalReplaceState.apply(window.history, args);
        handleRouteChange();
      };
      
      return () => {
        window.removeEventListener('popstate', handleRouteChange);
        window.history.pushState = originalPushState;
        window.history.replaceState = originalReplaceState;
      };
    }
  }, [updateCurrentPage]);

  // Fetch landing pages when currentPage changes
  useEffect(() => {
    fetchLandingPages();
  }, [fetchLandingPages]);

  // Process landing pages when they're loaded
  useEffect(() => {
    if (!loading && landingPages.length > 0) {
      processLandingPages();
    }
  }, [loading, landingPages, processLandingPages]);

  // Cleanup timeouts on unmount
  useEffect(() => {
    // Optimize for Core Web Vitals
    landingPageOptimizer.optimizeWebVitals();
    
    return () => {
      mountedRef.current = false;
      // Clear all timeouts - copy the reference to avoid issues with stale closure
      // eslint-disable-next-line react-hooks/exhaustive-deps
      const timeouts = timeoutsRef.current;
      timeouts.forEach((timeoutId) => {
        clearTimeout(timeoutId);
      });
      timeouts.clear();
      
      // Clean up optimizer resources
      landingPageOptimizer.cleanup();
    };
  }, []);

  // Don't render anything if no landing pages to display
  if (loading) {
    console.log('⏳ Landing pages are still loading...');
    return null;
  }
  
  if (error) {
    console.error('❌ Landing page error:', error);
    // In development, show error message
    if (process.env.NODE_ENV === 'development') {
      return (
        <div style={{
          position: 'fixed',
          top: '10px',
          right: '10px',
          background: 'red',
          color: 'white',
          padding: '10px',
          borderRadius: '5px',
          zIndex: 99999
        }}>
          Landing Pages Error: {error}
        </div>
      );
    }
    return null;
  }
  
  if (displayedPages.length === 0) {
    console.log('📭 No landing pages to display');
    return null;
  }

  console.log(`🎬 Rendering ${displayedPages.length} landing pages:`, displayedPages.map(p => ({
    id: p._id,
    title: p.title,
    displayType: p.displayType
  })));

  return (
    <div className="landing-page-manager">
      {displayedPages.map(renderLandingPage)}
    </div>
  );
};

export default LandingPageManager;