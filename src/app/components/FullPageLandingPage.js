/**
 * Full Page Landing Page Component
 * Displays landing pages as full-screen takeovers
 */

'use client';

import React, { useEffect, useRef } from 'react';

const FullPageLandingPage = ({ landingPage, onClose, onClick }) => {
  const fullPageRef = useRef(null);
  const contentRef = useRef(null);

  useEffect(() => {
    // Prevent body scrolling
    document.body.style.overflow = 'hidden';
    
    // Focus on the full page component
    if (fullPageRef.current) {
      fullPageRef.current.focus();
    }

    // Cleanup on unmount
    return () => {
      document.body.style.overflow = '';
    };
  }, []);

  // Attach click handlers to buttons/links in content (all content types)
  useEffect(() => {
    const contentEl = contentRef.current;
    if (contentEl) {
      const handleContentClick = (e) => {
        const target = e.target.closest('button, a[href], img[style*="cursor: pointer"]');
        
        if (target) {
          console.log('🎯 Full-page content clicked:', target);
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

  const handleKeyPress = (e) => {
    if (e.key === 'Escape') {
      onClose('escape_key');
    }
  };

  const handleCloseClick = () => {
    onClose('close_button');
  };

  const handleAction = () => {
    onClick();
  };

  const handleSkip = () => {
    onClose('skip_button');
  };

  return (
    <div 
      ref={fullPageRef}
      className="landing-page-fullpage" 
      tabIndex={-1}
      onKeyDown={handleKeyPress}
      role="dialog"
      aria-modal="true"
      aria-labelledby="fullpage-title"
    >
      <div className="landing-page-fullpage-background">
        {/* Background pattern or image can go here */}
      </div>
      
      <div className="landing-page-fullpage-container">
        <button 
          className="landing-page-fullpage-close" 
          onClick={handleCloseClick}
          aria-label="Close full page"
        >
          <svg width="32" height="32" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M18 6L6 18" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            <path d="M6 6L18 18" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </button>
        
        <div className="landing-page-fullpage-content">
          {/* Check if content is template-generated (contains structured HTML with title/button) */}
          {landingPage.contentType === 'template' || 
           (landingPage.content && landingPage.content.includes('text-align: center') && landingPage.content.includes('clamp(')) ? (
            /* For template content, show only the generated HTML */
            <>
              <div className="landing-page-fullpage-body">
                <div 
                  ref={contentRef}
                  className="landing-page-fullpage-text"
                  dangerouslySetInnerHTML={{ __html: landingPage.content }}
                />
              </div>
              
              <div className="landing-page-fullpage-actions">
                <button 
                  className="landing-page-fullpage-button landing-page-fullpage-button-secondary"
                  onClick={handleSkip}
                >
                  Skip
                </button>
              </div>
            </>
          ) : (
            /* For regular HTML content, show title and content separately */
            <>
              <div className="landing-page-fullpage-header">
                <h1 id="fullpage-title" className="landing-page-fullpage-title">
                  {landingPage.title}
                </h1>
              </div>
              
              <div className="landing-page-fullpage-body">
                <div 
                  ref={contentRef}
                  className="landing-page-fullpage-text"
                  dangerouslySetInnerHTML={{ __html: landingPage.content }}
                />
              </div>
              
              <div className="landing-page-fullpage-actions">
                {landingPage.targetUrl && (
                  <button 
                    className="landing-page-fullpage-button landing-page-fullpage-button-primary"
                    onClick={handleAction}
                  >
                    {landingPage.buttonText || 'Learn More'}
                  </button>
                )}
                
                <button 
                  className="landing-page-fullpage-button landing-page-fullpage-button-secondary"
                  onClick={handleSkip}
                >
                  Skip
                </button>
              </div>
            </>
          )}
        </div>
      </div>
      
      {/* Progress indicator for timed display */}
      {landingPage.displayDuration && landingPage.displayDuration > 0 && (
        <div className="landing-page-fullpage-progress">
          <div 
            className="landing-page-fullpage-progress-bar"
            style={{
              animationDuration: `${landingPage.displayDuration}ms`
            }}
          />
        </div>
      )}
    </div>
  );
};

export default FullPageLandingPage;