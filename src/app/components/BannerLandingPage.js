/**
 * Banner Landing Page Component
 * Displays landing pages as banners at top, bottom, or side of the screen
 */

'use client';

import React, { useState, useEffect, useRef } from 'react';

const BannerLandingPage = ({ landingPage, onClose, onClick }) => {
  const [position, setPosition] = useState('top');
  const [isVisible, setIsVisible] = useState(false);
  const bannerRef = useRef(null);
  const contentRef = useRef(null);

  useEffect(() => {
    // Determine banner position based on content or title
    const title = landingPage.title.toLowerCase();
    const content = landingPage.content.toLowerCase();
    
    if (title.includes('bottom') || content.includes('bottom')) {
      setPosition('bottom');
    } else if (title.includes('side') || content.includes('side')) {
      setPosition('side');
    } else {
      setPosition('top'); // Default
    }

    // Animate in
    setTimeout(() => setIsVisible(true), 100);
  }, [landingPage]);

  // Attach click handlers to buttons/links in content (all content types)
  useEffect(() => {
    const contentEl = contentRef.current;
    if (contentEl) {
      const handleContentClick = (e) => {
        const target = e.target.closest('button, a[href], img[style*="cursor: pointer"]');
        
        if (target) {
          console.log('🎯 Banner content clicked:', target);
          e.preventDefault();
          e.stopPropagation();
          
          if (onClick && typeof onClick === 'function') {
            console.log('✅ Calling onClick handler for click tracking...');
            onClick();
          } else {
            console.warn('⚠️ onClick handler not available or not a function');
          }
        }
      };
      
      contentEl.addEventListener('click', handleContentClick, true);
      
      return () => {
        contentEl.removeEventListener('click', handleContentClick, true);
      };
    }
  }, [onClick]);

  // Prevent scrolling inside the banner; pass wheel/touch scroll to window instead
  useEffect(() => {
    const el = bannerRef.current;
    if (!el) return;

    let lastTouchY = 0;

    const onWheel = (e) => {
      // Prevent any internal scrollbars inside banner
      e.preventDefault();
      // Scroll the page instead
      window.scrollBy({ top: e.deltaY, behavior: 'auto' });
    };

    const onTouchStart = (e) => {
      if (e.touches && e.touches.length > 0) {
        lastTouchY = e.touches[0].clientY;
      }
    };

    const onTouchMove = (e) => {
      if (!(e.touches && e.touches.length > 0)) return;
      const currentY = e.touches[0].clientY;
      const deltaY = lastTouchY - currentY;
      lastTouchY = currentY;
      // Prevent scrolling within the banner
      e.preventDefault();
      // Scroll the page
      window.scrollBy({ top: deltaY, behavior: 'auto' });
    };

    // Use passive: false so we can call preventDefault
    el.addEventListener('wheel', onWheel, { passive: false });
    el.addEventListener('touchstart', onTouchStart, { passive: true });
    el.addEventListener('touchmove', onTouchMove, { passive: false });

    return () => {
      el.removeEventListener('wheel', onWheel);
      el.removeEventListener('touchstart', onTouchStart);
      el.removeEventListener('touchmove', onTouchMove);
    };
  }, [bannerRef]);

  const handleClose = () => {
    setIsVisible(false);
    // Wait for animation to complete before removing from DOM
    setTimeout(() => onClose('close_button'), 300);
  };

  const handleAction = () => {
    onClick();
  };

  const getBannerClasses = () => {
    const baseClasses = 'landing-page-banner';
    const positionClass = `landing-page-banner-${position}`;
    const visibilityClass = isVisible ? 'landing-page-banner-visible' : '';
    
    return `${baseClasses} ${positionClass} ${visibilityClass}`.trim();
  };

  return (
    <div ref={bannerRef} className={getBannerClasses()} role="banner" aria-live="polite">
      <div className="landing-page-banner-content">
        {/* Check if content is template-generated (contains structured HTML with title/button) */}
        {landingPage.contentType === 'template' || 
         (landingPage.content && landingPage.content.includes('text-align: center') && landingPage.content.includes('clamp(')) ? (
          /* For template content, show only the generated HTML */
          <>
            <div 
              ref={contentRef}
              className="landing-page-banner-text"
              dangerouslySetInnerHTML={{ __html: landingPage.content }}
            />
            <div className="landing-page-banner-actions">
              <button 
                className="landing-page-banner-close" 
                onClick={handleClose}
                aria-label="Close banner"
              >
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M18 6L6 18" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  <path d="M6 6L18 18" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </button>
            </div>
          </>
        ) : (
          /* For regular HTML content, show title and content separately */
          <>
            <div className="landing-page-banner-text">
              <h3 className="landing-page-banner-title">
                {landingPage.title}
              </h3>
              <div 
                ref={contentRef}
                className="landing-page-banner-body"
                dangerouslySetInnerHTML={{ __html: landingPage.content }}
              />
            </div>
            
            <div className="landing-page-banner-actions">
              {landingPage.targetUrl && (
                <button 
                  className="landing-page-banner-button"
                  onClick={handleAction}
                >
                  {landingPage.buttonText || 'Learn More'}
                </button>
              )}
              
              <button 
                className="landing-page-banner-close" 
                onClick={handleClose}
                aria-label="Close banner"
              >
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M18 6L6 18" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  <path d="M6 6L18 18" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default BannerLandingPage;