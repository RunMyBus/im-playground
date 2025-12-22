'use client';

import React, { useState, useEffect, useCallback, useRef } from 'react';
import landingPageService from '../services/landingPageService';
import { usePathname } from 'next/navigation';
import { getSignedUrl } from '@/utils/s3ImageHelper';

const LandingPageViewer = () => {
  const pathname = usePathname();
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isClosed, setIsClosed] = useState(false);
  const [landingPages, setLandingPages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [processedContent, setProcessedContent] = useState('');
  const [shouldShow, setShouldShow] = useState(false);
  const contentRef = useRef(null);

const isHomePage = pathname === '/';

  useEffect(() => {
    if (isHomePage) {
      const timer = setTimeout(() => {
        setShouldShow(true);
      }, 5000);
      return () => clearTimeout(timer);
    } else {
      setShouldShow(false);
    }
  }, [isHomePage]);

  useEffect(() => {
    if (!isHomePage) {
      // Remove modal-open class if not on home page
      document.body.classList.remove('modal-open');
      return;
    }
    
    const shouldLockScroll = !loading && !isClosed && landingPages.length > 0 && !error && shouldShow;
    
    if (shouldLockScroll) {
      document.body.classList.add('modal-open');
    } else {
      document.body.classList.remove('modal-open');
    }
    
    return () => {
      // Clean up on unmount
      document.body.classList.remove('modal-open');
    };
  }, [isHomePage, loading, isClosed, landingPages.length, error, shouldShow]);

  // Fetch landing pages from API
  useEffect(() => {
    // Don't fetch landing pages if not on home page
    if (!isHomePage) {
      setLoading(false);
      setLandingPages([]);
      return;
    }

    const fetchLandingPages = async () => {
      try {
        //console.log('🚀 [LandingPageViewer] Starting to fetch landing pages...');
        setLoading(true);
        setError(null);
        
        const pages = await landingPageService.getAllActiveLandingPages();
        
        if (pages && Array.isArray(pages) && pages.length > 0) {
          // Sort by priority
          const sortedPages = pages.sort((a, b) => (a.priority || 1) - (b.priority || 1));
          setLandingPages(sortedPages);
          //console.log(`✅ [LandingPageViewer] Successfully loaded ${sortedPages.length} landing pages`);
        } else {
          //console.warn('⚠️ [LandingPageViewer] No pages received, component will not render');
          setLandingPages([]);
        }
      } catch (err) {
        //console.error('❌ [LandingPageViewer] Error fetching landing pages:', err);
        setError(err.message);
        // landingPageService already handles fallback, so we should still have data
        setLandingPages([]);
      } finally {
        setLoading(false);
      }
    };

    fetchLandingPages();
  }, [isHomePage]);

  // Track views when landing pages are displayed
  useEffect(() => {
    if (!isHomePage || landingPages.length === 0 || loading) return;
    
    const currentPage = landingPages[currentIndex];
    if (currentPage && currentPage._id) {
      landingPageService.trackView(currentPage._id).catch(err => {
       // console.warn('⚠️ [LandingPageViewer] Failed to track view:', err);
      });
    }
  }, [currentIndex, landingPages, loading, isHomePage]);

  /**
   * Decode HTML entities from API response and clean template content
   */
  const decodeHTMLEntities = (text) => {
    if (typeof window === 'undefined' || !text) return text;
    
    try {
      let cleanedText = text;
      
      // Check if this looks like template-generated content (contains clamp() and lots of inline styles)
      const isTemplateContent = cleanedText.includes('clamp(') && cleanedText.includes('style="');
      
      if (isTemplateContent) {
        // Clean up template-generated content by removing escaped characters
        cleanedText = cleanedText
          .replace(/\\n/g, '')  // Remove literal \n characters
          .replace(/\\"/g, '"') // Replace escaped quotes with regular quotes
          .replace(/\\\//g, '/') // Replace escaped slashes
          .replace(/\\t/g, '')   // Remove literal \t characters
          .trim();
        
      }
      
      // Create a temporary element to decode HTML entities
      const textarea = document.createElement('textarea');
      textarea.innerHTML = cleanedText;
      const decoded = textarea.value;
      
      
      return decoded;
    } catch (error) {
  
      return text;
    }
  };

  // Process content to replace s3:// URLs with signed URLs
  useEffect(() => {
    const currentLandingPage = landingPages[currentIndex];
    if (!currentLandingPage?.content) {
      setProcessedContent('');
      return;
    }

    const processContent = async () => {
      let content = decodeHTMLEntities(currentLandingPage.content);
      
      // Find all s3:// URLs
      const s3Regex = /src=["']s3:\/\/([^"']+)["']/g;
      const matches = [...content.matchAll(s3Regex)];
      
      if (matches.length === 0) {
        setProcessedContent(content);
        return;
      }

      // Fetch signed URLs
      const replacements = await Promise.all(matches.map(async (match) => {
        const fullMatch = match[0];
        const key = match[1];
        const signedUrl = await getSignedUrl(key);
        return { fullMatch, signedUrl };
      }));

      // Replace in content
      let newContent = content;
      for (const { fullMatch, signedUrl } of replacements) {
        if (signedUrl) {
          const quote = fullMatch.includes('"') ? '"' : "'";
          newContent = newContent.replace(fullMatch, `src=${quote}${signedUrl}${quote}`);
        }
      }
      
      setProcessedContent(newContent);
    };

    processContent();
  }, [currentIndex, landingPages]);

  /**
   * Navigate to specific slide
   */
  const goToSlide = useCallback((index) => {
    if (!landingPages.length) return;
    
    const validIndex = Math.max(0, Math.min(index, landingPages.length - 1));
    if (validIndex !== currentIndex) {
      setCurrentIndex(validIndex);
      console.log(`🎬 Navigated to slide ${validIndex + 1}`);
    }
  }, [currentIndex, landingPages.length]);

  /**
   * Navigate to previous slide
   */
  const goToPrevious = useCallback(() => {
    const prevIndex = currentIndex === 0 ? landingPages.length - 1 : currentIndex - 1;
    goToSlide(prevIndex);
  }, [currentIndex, landingPages.length, goToSlide]);

  /**
   * Navigate to next slide
   */
  const goToNext = useCallback(() => {
    const nextIndex = currentIndex === landingPages.length - 1 ? 0 : currentIndex + 1;
    goToSlide(nextIndex);
  }, [currentIndex, landingPages.length, goToSlide]);

  /**
   * Handle landing page action click
   */
  const handleAction = useCallback(async (landingPage) => {
    console.log(`👆 Action clicked: ${landingPage.title}`);
    
    // Track the click
    if (landingPage._id) {
      try {
        await landingPageService.trackClick(landingPage._id);
        console.log('✅ Click tracked successfully for landing page:', landingPage._id);
      } catch (err) {
        console.warn('⚠️ Failed to track click:', err);
      }
    }
    
    if (landingPage.targetUrl) {
      if (landingPage.targetUrl.startsWith('http')) {
        window.open(landingPage.targetUrl, '_blank', 'noopener,noreferrer');
      } else {
        window.location.href = landingPage.targetUrl;
      }
    }
  }, []);

  // Attach click handlers to all clickable elements in the content
  useEffect(() => {
    const contentEl = contentRef.current;
    if (contentEl && landingPages.length > 0 && !loading) {
      const currentLandingPage = landingPages[currentIndex];
      
      const handleContentClick = async (e) => {
        // Find the closest clickable element
        const target = e.target.closest('button, a[href], img[style*="cursor: pointer"]');
        
        if (target) {
          console.log('🎯 Landing page content clicked:', target);
          e.preventDefault();
          e.stopPropagation();
          
          // Track the click
          if (currentLandingPage && currentLandingPage._id) {
            try {
              await landingPageService.trackClick(currentLandingPage._id);
              console.log('✅ Click tracked successfully for landing page:', currentLandingPage._id);
            } catch (err) {
              console.warn('⚠️ Failed to track click:', err);
            }
          }
          
          // Handle navigation
          let targetUrl = null;
          
          if (target.tagName === 'A') {
            targetUrl = target.getAttribute('href');
          } else if (target.closest('a[href]')) {
            targetUrl = target.closest('a[href]').getAttribute('href');
          } else if (currentLandingPage && currentLandingPage.targetUrl) {
            targetUrl = currentLandingPage.targetUrl;
          }
          
          if (targetUrl) {
            if (targetUrl.startsWith('http')) {
              window.open(targetUrl, '_blank', 'noopener,noreferrer');
            } else {
              window.location.href = targetUrl;
            }
          }
        }
      };
      
      contentEl.addEventListener('click', handleContentClick, true);
      
      return () => {
        contentEl.removeEventListener('click', handleContentClick, true);
      };
    }
  }, [currentIndex, landingPages, loading]);

  // Handle keyboard navigation
  useEffect(() => {
    const handleKeyPress = (e) => {
      if (landingPages.length <= 1) return;
      
      switch(e.key) {
        case 'ArrowLeft':
          e.preventDefault();
          goToPrevious();
          break;
        case 'ArrowRight':
          e.preventDefault();
          goToNext();
          break;
        case 'Escape':
          setIsClosed(true);
          break;
      }
    };

    window.addEventListener('keydown', handleKeyPress);
    return () => window.removeEventListener('keydown', handleKeyPress);
  }, [goToPrevious, goToNext, landingPages.length]);

  // Don't render if loading, no data, error, closed, or delay not met
  if (loading || isClosed || error || !shouldShow) {
    if (loading) console.log('⏳ [LandingPageViewer] Loading landing pages...');
    if (error) console.error('❌ [LandingPageViewer] Error state:', error);
    if (!shouldShow && !loading && !error && !isClosed) console.log('⏳ [LandingPageViewer] Waiting for delay...');
    return null;
  }

  if (landingPages.length === 0) {

    return null;
  }

  const currentLandingPage = landingPages[currentIndex];
  
  if (!currentLandingPage) {
   
    return null;
  }



  return (
    <div style={{
      position: 'fixed',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      background: 'rgba(0, 0, 0, 0.8)',
      zIndex: 10000,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      fontFamily: 'system-ui, -apple-system, sans-serif'
    }}>
      {/* Main Content Container */}
      <div className="landing-page-modal" style={{
        position: 'relative',
        width: '50%',
        maxWidth: '800px',
        maxHeight: '75vh',
        background: 'transparent',
        borderRadius: '25px',
        boxShadow: 'none',
        overflow: 'hidden',
        animation: 'slideIn 0.3s ease-out'
      }}>
        {/* Navigation Controls */}
        {landingPages.length > 1 && (
          <>

{/* Left Arrow */}
<button
  onClick={goToPrevious}
  style={{
    position: "absolute",
    left: "8px",
    top: "50%",
    transform: "translateY(-50%)",
    zIndex: 10001,
    background: "rgba(0, 0, 0, 0.6)",
    color: "white",
    border: "none",
    borderRadius: "50%",
    width: "45px",
    height: "45px",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    cursor: "pointer",
    fontSize: "24px",
    transition: "all 0.2s ease",
    boxShadow: "0 4px 10px rgba(0,0,0,0.3)",
  }}
  onMouseEnter={(e) => {
    e.currentTarget.style.background = "rgba(0, 0, 0, 0.85)";
    e.currentTarget.style.transform = "translateY(-50%) scale(1.1)";
  }}
  onMouseLeave={(e) => {
    e.currentTarget.style.background = "rgba(0, 0, 0, 0.6)";
    e.currentTarget.style.transform = "translateY(-50%) scale(1)";
  }}
  title="Previous (← Arrow Key)"
>
  ◀
</button>

{/* Right Arrow */}
<button
  onClick={goToNext}
  style={{
    position: "absolute",
    right: "8px",
    top: "50%",
    transform: "translateY(-50%)",
    zIndex: 10001,
    background: "rgba(0, 0, 0, 0.6)",
    color: "white",
    border: "none",
    borderRadius: "50%",
    width: "45px",
    height: "45px",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    cursor: "pointer",
    fontSize: "24px",
    transition: "all 0.2s ease",
    boxShadow: "0 4px 10px rgba(0,0,0,0.3)",
  }}
  onMouseEnter={(e) => {
    e.currentTarget.style.background = "rgba(0, 0, 0, 0.85)";
    e.currentTarget.style.transform = "translateY(-50%) scale(1.1)";
  }}
  onMouseLeave={(e) => {
    e.currentTarget.style.background = "rgba(0, 0, 0, 0.6)";
    e.currentTarget.style.transform = "translateY(-50%) scale(1)";
  }}
  title="Next (→ Arrow Key)"
>
  ▶
</button>

          </>
        )}

        {/* Page Counter */}
        {landingPages.length > 1 && (
          <div style={{
            position: 'absolute',
            top: '8px',
            left: '8px',
            background: 'rgba(0, 0, 0, 0.7)',
            color: 'white',
            padding: '8px 12px',
            borderRadius: '20px',
            fontSize: '12px',
            zIndex: 10001,
            fontWeight: '500'
          }}>
            {currentIndex + 1} / {landingPages.length}
          </div>
        )}

        {/* Close Button */}
        <button
          onClick={() => setIsClosed(true)}
          style={{
            position: 'absolute',
            top: '8px',
            right: '8px',
            background: 'rgba(0, 0, 0, 0.7)',
            color: 'white',
            border: 'none',
            borderRadius: '50%',
            width: '40px',
            height: '40px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            cursor: 'pointer',
            fontSize: '34px',
            fontFamily: 'Arial, sans-serif',
            lineHeight: '1',
            zIndex: 10001,
            transition: 'all 0.2s ease'
          }}
          onMouseEnter={(e) => {
            e.target.style.background = 'rgba(220, 38, 38, 0.9)';
          }}
          onMouseLeave={(e) => {
            e.target.style.background = 'rgba(0, 0, 0, 0.7)';
          }}
          title="Close (ESC)"
        >
          ×
        </button>

        {/* HTML Content */}
        <div 
          ref={contentRef}
          style={{
            padding: '0px 0px 0px',
            maxHeight: 'calc(90vh - 100px)',
            overflow: 'hidden',
            position: 'relative',
            background: 'white',
          }}>
          {/* Check if content is template-generated to avoid duplicate display */}
          {currentLandingPage.contentType === 'template' || 
           (currentLandingPage.content && currentLandingPage.content.includes('text-align: center') && currentLandingPage.content.includes('clamp(')) ? (
            /* For template content, show only the generated HTML */
            <div 
              style={{
                minHeight: '200px',
                lineHeight: '1.6'
              }}
              dangerouslySetInnerHTML={{ __html: processedContent }}
            />
          ) : (
            /* For regular HTML content, show content without title */
            <>
              {/* Render HTML Content */}
              <div 
                style={{
                  minHeight: '200px',
                  lineHeight: '1.6'
                }}
                dangerouslySetInnerHTML={{ __html: processedContent }}
              />

              {/* Action Button */}
              {currentLandingPage.targetUrl && (
                <div style={{
                  textAlign: 'center',
                  marginTop: '30px'
                }}>
                  <button
                    onClick={() => handleAction(currentLandingPage)}
                    style={{
                      background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                      color: 'white',
                      border: 'none',
                      padding: '12px 30px',
                      borderRadius: '45px',
                      fontSize: '16px',
                      fontWeight: '600',
                      cursor: 'pointer',
                      transition: 'all 0.3s ease',
                      boxShadow: '0 4px 15px rgba(102, 126, 234, 0.3)'
                    }}
                    onMouseEnter={(e) => {
                      e.target.style.transform = 'translateY(-2px)';
                      e.target.style.boxShadow = '0 6px 20px rgba(102, 126, 234, 0.4)';
                    }}
                    onMouseLeave={(e) => {
                      e.target.style.transform = 'translateY(0)';
                      e.target.style.boxShadow = '0 4px 15px rgba(102, 126, 234, 0.3)';
                    }}
                  >
                    {currentLandingPage.buttonText || 'Learn More'}
                  </button>
                </div>
              )}
            </>
          )}
        </div>

        {/* Dots Navigation */}
        {landingPages.length > 1 && (
          <div style={{
            position: 'absolute',
            bottom: '8px',
            left: '50%',
            transform: 'translateX(-50%)',
            display: 'flex',
            gap: '8px',
            background: 'rgba(0, 0, 0, 0.7)',
            padding: '8px 16px',
            borderRadius: '20px',
            zIndex: 10001
          }}>
            {landingPages.map((_, index) => (
              <button
                key={index}
                onClick={() => goToSlide(index)}
                style={{
                  width: '0px',
                  height: '10px',
                  borderRadius: '50%',
                  border: 'none',
                  background: index === currentIndex ? 'white' : 'rgba(255, 255, 255, 0.4)',
                  cursor: 'pointer',
                  transition: 'all 0.2s ease'
                }}
                title={`Go to ${landingPages[index].title}`}
              />
            ))}
          </div>
        )}
      </div>

      {/* CSS Animations and Responsive Styles */}
      <style jsx global>{`
        @keyframes slideIn {
          from {
            opacity: 0;
            transform: scale(0.9) translateY(20px);
          }
          to {
            opacity: 1;
            transform: scale(1) translateY(0);
          }
        }

        /* Responsive Image Display */
        .desktop-only {
          display: block !important;
        }
        
        .mobile-only {
          display: none !important;
        }

        @media (max-width: 768px) {
          .desktop-only {
            display: none !important;
          }
          
          .mobile-only {
            display: block !important;
          }

          /* Increase outer container size for mobile */
          .landing-page-modal {
            width: 90% !important;
            max-width: none !important;
            max-height: 90vh !important;
            min-height: auto !important;
          }
        }

        /* Landing page images container */
        .landing-page-images {
          text-align: center;
        }

        .landing-page-images img {
          max-width: 100%;
          height: auto;
          cursor: pointer;
        }

        .landing-page-images .desktop-image,
        .landing-page-images .mobile-image {
          width: 100%;
        }

        .landing-page-images a {
          display: block;
          width: 100%;
        }

        /* Mobile specific styling - remove constraints to match desktop behavior */
        @media (max-width: 768px) {
          .landing-page-images .mobile-image {
            width: 100%;
            height: auto;
            margin: 0;
            padding: 0;
            display: block;
          }
          
          .landing-page-images .mobile-image a {
            display: block;
            width: 100%;
            height: auto;
          }
          
          .landing-page-images .mobile-image img {
            width: 100%;
            height: auto;
            object-fit: contain;
            border-radius: 0;
            max-width: 100%;
          }
        }
      `}</style>
    </div>
  );
};

export default LandingPageViewer;