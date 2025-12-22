/**
 * Popup Landing Page Component
 * Displays landing pages as modal popups in the center of the screen
 */

'use client';

import React, { useEffect, useRef } from 'react';

const PopupLandingPage = ({ landingPage, onClose, onClick }) => {
  const popupRef = useRef(null);
  const contentRef = useRef(null);

  useEffect(() => {
    // Add body class to prevent scrolling when popup is open
    document.body.classList.add('popup-open');
    document.body.classList.add('modal-open');
    
    // Focus on popup for accessibility
    if (popupRef.current) {
      popupRef.current.focus();
    }

    // Cleanup on unmount
    return () => {
      document.body.classList.remove('popup-open');
      document.body.classList.remove('modal-open');
    };
  }, []);

  // Attach click handlers to buttons/links in content (both template and HTML types)
  useEffect(() => {
    const contentEl = contentRef.current;
    if (contentEl) {
      const handleContentClick = (e) => {
        // Find the closest button or link element
        const target = e.target.closest('button, a[href], img[style*="cursor: pointer"]');
        
        if (target) {
          console.log('🎯 Content button/link/image clicked:', target);
          e.preventDefault();
          e.stopPropagation();
          
          // Call the onClick handler
          if (onClick && typeof onClick === 'function') {
            console.log('✅ Calling onClick handler for tracking...');
            onClick();
          } else {
            console.warn('⚠️ onClick handler not available or not a function');
          }
        }
      };
      
      // Add event listener to the container instead of individual elements
      contentEl.addEventListener('click', handleContentClick, true);
      
      return () => {
        contentEl.removeEventListener('click', handleContentClick, true);
      };
    }
  }, [onClick]);

  const handleBackdropClick = (e) => {
    if (e.target === e.currentTarget) {
      onClose('background_click');
    }
  };

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

  return (
    <div 
      className="landing-page-popup-backdrop" 
      onClick={handleBackdropClick}
      onKeyDown={handleKeyPress}
      role="dialog"
      aria-modal="true"
      aria-labelledby="popup-title"
    >
      <div 
        ref={popupRef}
        className="landing-page-popup"
        tabIndex={-1}
      >
        <button 
          className="landing-page-popup-close" 
          onClick={handleCloseClick}
          aria-label="Close popup"
        >
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M18 6L6 18" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            <path d="M6 6L18 18" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </button>
        
        <div className="landing-page-popup-content">
          {/* Check if content is template-generated (contains structured HTML with title/button) */}
          {landingPage.contentType === 'template' || 
           (landingPage.content && landingPage.content.includes('text-align: center') && landingPage.content.includes('clamp(')) ? (
            /* For template content, show only the generated HTML */
            <div 
              ref={contentRef}
              className="landing-page-popup-body"
              dangerouslySetInnerHTML={{ __html: landingPage.content }}
            />
          ) : (
            /* For regular HTML content, show title and content separately */
            <>
              <h2 id="popup-title" className="landing-page-popup-title">
                {landingPage.title}
              </h2>
              
              <div 
                ref={contentRef}
                className="landing-page-popup-body"
                dangerouslySetInnerHTML={{ __html: landingPage.content }}
              />
              
              {landingPage.targetUrl && (
                <div className="landing-page-popup-actions">
                  <button 
                    className="landing-page-popup-button"
                    onClick={handleAction}
                  >
                    {landingPage.buttonText || 'Learn More'}
                  </button>
                </div>
              )}
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default PopupLandingPage;