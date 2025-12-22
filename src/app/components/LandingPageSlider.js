/**
 * Landing Page Slider Component
 * Displays all active landing pages/popups in a slider/carousel format
 * with navigation controls, auto-advance, and priority-based ordering
 */

'use client';

import React, { useState, useEffect, useCallback, useRef } from 'react';
import landingPageService from '../services/landingPageService';
import landingPageAnalytics from '../utils/landingPageAnalytics';
import PopupLandingPage from './PopupLandingPage';
import BannerLandingPage from './BannerLandingPage';
import FullPageLandingPage from './FullPageLandingPage';
import LANDING_PAGE_SLIDER_CONFIG from '../config/landingPageSliderConfig';

const LandingPageSlider = ({
  autoAdvance = LANDING_PAGE_SLIDER_CONFIG.autoAdvance,
  autoAdvanceDelay = LANDING_PAGE_SLIDER_CONFIG.autoAdvanceDelay,
  transitionSpeed = LANDING_PAGE_SLIDER_CONFIG.transitionSpeed,
  showNavigationDots = LANDING_PAGE_SLIDER_CONFIG.showNavigationDots,
  showNavigationArrows = LANDING_PAGE_SLIDER_CONFIG.showNavigationArrows,
  enableManualNavigation = LANDING_PAGE_SLIDER_CONFIG.enableManualNavigation
}) => {
  const [landingPages, setLandingPages] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isVisible, setIsVisible] = useState(true);
  const [isPaused, setIsPaused] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  // Refs for managing timers and component state
  const autoAdvanceTimerRef = useRef(null);
  const mountedRef = useRef(true);
  const transitionRef = useRef(false);
  const rawPagesRef = useRef([]);

  // Detect viewport for mobile/desktop selection
  useEffect(() => {
    const compute = () => {
      if (typeof window !== 'undefined') {
        setIsMobile(window.innerWidth <= 768);
      }
    };
    compute();
    if (typeof window !== 'undefined') {
      window.addEventListener('resize', compute);
      return () => window.removeEventListener('resize', compute);
    }
  }, []);

  /**
   * Get the display type for a landing page based on its properties
   */
  const getDisplayType = useCallback((landingPage) => {
    if (landingPage.displayType) {
      return landingPage.displayType;
    }
    
    // Fallback logic
    const content = landingPage.content?.toLowerCase() || '';
    const title = landingPage.title?.toLowerCase() || '';
    
    if (title.includes('full') || title.includes('takeover') || landingPage.priority <= 2) {
      return 'full-page';
    }
    
    if (title.includes('banner') || title.includes('announcement') || content.length < 200) {
      return 'banner';
    }
    
    return 'popup';
  }, []);

  /**
   * Fetch all active landing pages with enhanced error handling
   */
  const fetchLandingPages = useCallback(async (retryCount = 0) => {
    
    if (!mountedRef.current) {
      console.log('⚠️ [LandingPageSlider] Component unmounted, skipping fetch');
      return;
    }
    
    try {
      console.log('🔄 [LandingPageSlider] Setting loading state and fetching...');
      setLoading(true);
      setError(null);
      
      console.log('📡 [LandingPageSlider] Calling landingPageService.getAllActiveLandingPages()...');
      const pages = await landingPageService.getAllActiveLandingPages();
      
      console.log('📦 [LandingPageSlider] Raw API response received:');
      console.log('📦 [LandingPageSlider] Type:', typeof pages);
      console.log('📦 [LandingPageSlider] Is array:', Array.isArray(pages));
      console.log('📦 [LandingPageSlider] Length:', pages ? pages.length : 'null/undefined');
      console.log('📦 [LandingPageSlider] First item:', pages && pages[0] ? pages[0] : 'No first item');
      
      // Check if component is still mounted before updating state
      if (!mountedRef.current) {
        console.log(' [LandingPageSlider] Component unmounted during fetch, aborting');
        return;
      }
      
      // Handle successful API response
      if (Array.isArray(pages)) {
        console.log(` [LandingPageSlider] Valid array received with ${pages.length} items`);
        
        if (pages.length > 0) {
          console.log(' [LandingPageSlider] Processing landing pages...');
          
          // Sort by priority (1 is highest priority) then by creation date
          const sortedPages = pages
            .map((page, index) => {
              console.log(`  Processing page ${index + 1}: "${page.title}" (ID: ${page._id})`);
              return {
                ...page,
                displayType: getDisplayType(page)
              };
            })
            .sort((a, b) => {
              // Primary sort: priority (ascending - 1 is highest)
              if (a.priority !== b.priority) {
                return (a.priority || 999) - (b.priority || 999);
              }
              // Secondary sort: creation date (newest first)
              return new Date(b.createdAt) - new Date(a.createdAt);
            });

          console.log(`🎯 [LandingPageSlider] Final sorted pages (${sortedPages.length}):`, 
            sortedPages.map((p, i) => `${i + 1}. "${p.title}" (Priority: ${p.priority}, Type: ${p.displayType})`)
          );

          // Keep a copy of the raw sorted pages
          rawPagesRef.current = sortedPages;

          // Apply device-based filtering and variant selection
          const selectedForDevice = selectVariantsForDevice(sortedPages, isMobile);

          // Update component state
          console.log('🔄 [LandingPageSlider] Updating component state...');
          setLandingPages(selectedForDevice);
          setCurrentIndex(0);
          setIsVisible(true); // Ensure visibility is set
          
          console.log('✅ [LandingPageSlider] State updated successfully!');

          // Track views (don't await to avoid blocking)
          sortedPages.forEach((page, index) => {
            try {
              landingPageService.trackView(page._id);
              if (typeof landingPageAnalytics !== 'undefined') {
                landingPageAnalytics.trackView(page);
              }
              console.log(`�️ [LandingPageSlider] Tracked view for page ${index + 1}: ${page.title}`);
            } catch (trackError) {
              console.warn(`⚠️ [LandingPageSlider] Failed to track view for page: ${page.title}`, trackError);
            }
          });
          
        } else {
          console.log('� [LandingPageSlider] Empty array received - no landing pages available');
          setLandingPages([]);
          
          if (process.env.NODE_ENV === 'development') {
            setError('No active landing pages found. The API is working but returned no data. You may need to create test data in the database.');
          }
        }
      } else {
        console.error('❌ [LandingPageSlider] Invalid response type - expected array, got:', typeof pages);
        setLandingPages([]);
        setError('Invalid API response format');
      }
      
    } catch (err) {
      console.error('❌ [LandingPageSlider] Error in fetchLandingPages:');
      console.error('❌ [LandingPageSlider] Error type:', err.constructor.name);
      console.error('❌ [LandingPageSlider] Error message:', err.message);
      console.error('❌ [LandingPageSlider] Full error:', err);
      
      if (mountedRef.current) {
        // Handle retry logic
        const shouldRetry = retryCount < 3 && 
          (err.message.includes('fetch') || 
           err.message.includes('ECONNREFUSED') || 
           err.message.includes('timeout') ||
           err.message.includes('NetworkError'));
           
        if (shouldRetry) {
          console.log(`🔄 [LandingPageSlider] Retrying in ${(retryCount + 1) * 2} seconds (attempt ${retryCount + 1}/3)...`);
          setTimeout(() => {
            if (mountedRef.current) {
              fetchLandingPages(retryCount + 1);
            }
          }, (retryCount + 1) * 2000);
          return; // Don't set loading to false if we're retrying
        } else {
          console.log(`❌ [LandingPageSlider] Max retries reached or non-retryable error`);
          setError(`Failed to load landing pages${retryCount > 0 ? ` (after ${retryCount} retries)` : ''}: ${err.message}`);
          setLandingPages([]);
        }
      }
    } finally {
      // Always set loading to false when we're done (unless retrying)
      if (mountedRef.current) {
        console.log('🔄 [LandingPageSlider] Setting loading to false');
        setLoading(false);
      }
    }
  }, [getDisplayType, mountedRef, isMobile]);

  // Helper: select variant and filter by device flags
  const selectVariantsForDevice = (pages, isMobileView) => {
    try {
      const filtered = pages.filter(p => {
        const mobileOk = p.showOnMobile !== false; // default true when undefined
        const desktopOk = p.showOnDesktop !== false; // default true when undefined
        return isMobileView ? mobileOk : desktopOk;
      });

      return filtered.map(p => {
        if (isMobileView) {
          const next = { ...p };
          if (p.mobileContent) next.content = p.mobileContent;
          if (p.mobileTemplateData) {
            next.buttonText = p.mobileTemplateData.buttonText || p.buttonText;
            next.targetUrl = p.mobileTemplateData.buttonUrl || p.targetUrl;
          }
          return next;
        }
        return { ...p };
      });
    } catch (e) {
      console.warn('⚠️ Failed to apply device variant selection, returning original pages', e);
      return pages;
    }
  };

  /**
   * Navigate to specific slide
   */
  const goToSlide = useCallback((index) => {
    if (transitionRef.current || !landingPages.length) return;
    
    const validIndex = Math.max(0, Math.min(index, landingPages.length - 1));
    if (validIndex !== currentIndex) {
      transitionRef.current = true;
      setCurrentIndex(validIndex);
      
      // Track manual navigation
      if (landingPages[validIndex]) {
        landingPageAnalytics.trackView(landingPages[validIndex]);
      }
      
      // Reset transition flag after animation
      setTimeout(() => {
        transitionRef.current = false;
      }, transitionSpeed);
    }
  }, [currentIndex, landingPages, transitionSpeed]);

  /**
   * Navigate to previous slide
   */
  const goToPrevious = useCallback(() => {
    if (!enableManualNavigation) return;
    const prevIndex = currentIndex === 0 ? landingPages.length - 1 : currentIndex - 1;
    goToSlide(prevIndex);
  }, [currentIndex, landingPages.length, enableManualNavigation, goToSlide]);

  /**
   * Navigate to next slide
   */
  const goToNext = useCallback(() => {
    if (!enableManualNavigation && !autoAdvance) return;
    const nextIndex = currentIndex === landingPages.length - 1 ? 0 : currentIndex + 1;
    goToSlide(nextIndex);
  }, [currentIndex, landingPages.length, enableManualNavigation, autoAdvance, goToSlide]);

  /**
   * Start auto-advance timer
   */
  const startAutoAdvance = useCallback(() => {
    if (!autoAdvance || isPaused || landingPages.length <= 1) return;
    
    clearTimeout(autoAdvanceTimerRef.current);
    autoAdvanceTimerRef.current = setTimeout(() => {
      if (mountedRef.current && !isPaused) {
        goToNext();
      }
    }, autoAdvanceDelay);
  }, [autoAdvance, isPaused, landingPages.length, autoAdvanceDelay, goToNext]);

  /**
   * Stop auto-advance timer
   */
  const stopAutoAdvance = useCallback(() => {
    clearTimeout(autoAdvanceTimerRef.current);
  }, []);

  /**
   * Handle landing page close
   */
  const closeLandingPage = useCallback((landingPageId, dismissalMethod = 'close_button') => {
    console.log(`❌ Closing landing page: ${landingPageId}`);
    
    const landingPage = landingPages.find(page => page._id === landingPageId);
    if (landingPage) {
      landingPageAnalytics.trackDismissal(landingPage, dismissalMethod);
    }

    // Remove the landing page from the list
    const updatedPages = landingPages.filter(page => page._id !== landingPageId);
    setLandingPages(updatedPages);

    // Adjust current index if necessary
    if (updatedPages.length === 0) {
      setIsVisible(false);
    } else if (currentIndex >= updatedPages.length) {
      setCurrentIndex(Math.max(0, updatedPages.length - 1));
    } else if (landingPageId === landingPages[currentIndex]?._id && currentIndex > 0) {
      setCurrentIndex(currentIndex - 1);
    }
  }, [landingPages, currentIndex]);

  /**
   * Close all landing pages
   */
  const closeAllLandingPages = useCallback(() => {
    console.log('❌ Closing all landing pages');
    
    landingPages.forEach(page => {
      landingPageAnalytics.trackDismissal(page, 'close_all');
    });
    
    setLandingPages([]);
    setIsVisible(false);
  }, [landingPages]);

  /**
   * Handle landing page click
   */
  const handleLandingPageClick = useCallback(async (landingPage) => {
    console.log(`👆 Landing page clicked: ${landingPage.title}`);
    
    // Track the click
    await landingPageService.trackClick(landingPage._id);
    landingPageAnalytics.trackClick(landingPage, 'button');
    
    if (landingPage.targetUrl) {
      landingPageAnalytics.trackConversion(landingPage, 'click_through');
      
      if (typeof window !== 'undefined') {
        if (landingPage.targetUrl.startsWith('http')) {
          window.open(landingPage.targetUrl, '_blank', 'noopener,noreferrer');
        } else {
          window.location.href = landingPage.targetUrl;
        }
      }
    }
    
    // Optionally close the landing page after click
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

  // Fetch landing pages on component mount
  useEffect(() => {
    fetchLandingPages();
    return () => {
      mountedRef.current = false;
    };
  }, [fetchLandingPages]);

  // Re-apply device selection when viewport changes
  useEffect(() => {
    if (rawPagesRef.current && rawPagesRef.current.length) {
      const adjusted = selectVariantsForDevice(rawPagesRef.current, isMobile);
      setLandingPages(adjusted);
      setCurrentIndex(0);
    }
  }, [isMobile]);

  // Manage auto-advance timer
  useEffect(() => {
    if (autoAdvance && landingPages.length > 1 && isVisible) {
      startAutoAdvance();
    }
    
    return () => {
      stopAutoAdvance();
    };
  }, [autoAdvance, landingPages.length, isVisible, currentIndex, startAutoAdvance, stopAutoAdvance]);

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      clearTimeout(autoAdvanceTimerRef.current);
    };
  }, []);

  // Enhanced render condition with forced visibility in development
  const shouldRender = process.env.NODE_ENV === 'development' ? 
    (!loading && !error && landingPages && landingPages.length > 0) :
    (!loading && !error && isVisible && landingPages && landingPages.length > 0);
    
  if (!shouldRender) {
    console.log('🚫 LandingPageSlider not rendering:', {
      loading,
      error,
      isVisible,
      landingPagesCount: landingPages?.length || 0,
      development: process.env.NODE_ENV === 'development'
    });
    return null;
  }

  console.log(`🎬 LandingPageSlider: Rendering ${landingPages.length} pages, current: ${currentIndex}`);

  const currentLandingPage = landingPages[currentIndex];

  return (
    <div 
      className="landing-page-slider"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
    >
      {/* Main landing page content */}
      <div className="landing-page-slider-content">
        {renderLandingPage(currentLandingPage)}
      </div>

      {/* Navigation controls - ALWAYS show in development mode for testing */}
      {(landingPages.length > 1 || process.env.NODE_ENV === 'development') && (
        <>
          {/* Debug info */}
          {process.env.NODE_ENV === 'development' && (
            <div style={{
              position: 'fixed',
              top: '10px',
              right: '10px',
              background: 'rgba(0,0,0,0.8)',
              color: 'white',
              padding: '10px',
              borderRadius: '4px',
              fontSize: '12px',
              zIndex: 10002
            }}>
              <div>Pages: {landingPages.length}</div>
              <div>Current: {currentIndex + 1}</div>
              <div>Visible: {isVisible ? 'Yes' : 'No'}</div>
              <div>Loading: {loading ? 'Yes' : 'No'}</div>
              <div>Error: {error || 'None'}</div>
              <button 
                onClick={() => fetchLandingPages(0)}
                style={{
                  marginTop: '5px',
                  marginRight: '5px',
                  padding: '2px 6px',
                  fontSize: '10px',
                  background: '#007acc',
                  color: 'white',
                  border: 'none',
                  borderRadius: '2px',
                  cursor: 'pointer'
                }}
              >
                Refresh Pages
              </button>
              <button 
                onClick={() => {
                  setLoading(false);
                  setError(null);
                  setLandingPages([]);
                  console.log('🔄 Manual state reset');
                }}
                style={{
                  marginTop: '5px',
                  padding: '2px 6px',
                  fontSize: '10px',
                  background: '#dc2626',
                  color: 'white',
                  border: 'none',
                  borderRadius: '2px',
                  cursor: 'pointer'
                }}
              >
                Reset State
              </button>
            </div>
          )}

          {/* Navigation arrows */}
          {(showNavigationArrows && enableManualNavigation) && (
            <>
              <button
                className="landing-page-nav landing-page-nav-prev"
                onClick={goToPrevious}
                aria-label="Previous landing page"
                style={{ 
                  opacity: landingPages.length === 1 ? 0.7 : 1,
                  display: 'flex',
                  zIndex: 10001
                }}
              >
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M15 18L9 12L15 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </button>
              <button
                className="landing-page-nav landing-page-nav-next"
                onClick={goToNext}
                aria-label="Next landing page"
                style={{ 
                  opacity: landingPages.length === 1 ? 0.5 : 1,
                  display: 'flex'
                }}
              >
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M9 18L15 12L9 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </button>
            </>
          )}

          {/* Navigation dots */}
          {(showNavigationDots && enableManualNavigation) && (
            <div className="landing-page-dots" style={{ zIndex: 10001 }}>
              {landingPages.map((page, index) => (
                <button
                  key={index}
                  className={`landing-page-dot ${index === currentIndex ? 'active' : ''}`}
                  onClick={() => goToSlide(index)}
                  aria-label={`Go to landing page ${index + 1}: ${page.title}`}
                  title={page.title}
                />
              ))}
            </div>
          )}

          {/* Close all button */}
          <button
            className="landing-page-close-all"
            onClick={closeAllLandingPages}
            aria-label="Close all landing pages"
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M18 6L6 18" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M6 6L18 18" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
            <span className="close-all-text">Close All</span>
          </button>

          {/* Progress indicator */}
          <div className="landing-page-counter">
            {currentIndex + 1} / {landingPages.length}
          </div>
        </>
      )}
    </div>
  );
};

export default LandingPageSlider;