"use client";

import React, { useState, useEffect, useCallback } from "react";
import useEmblaCarousel from "embla-carousel-react";
import styles from "./LandingPageCarousel.module.css";

export default function LandingPageCarousel() {
  const [emblaRef, emblaApi] = useEmblaCarousel({ loop: true });
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [scrollSnaps, setScrollSnaps] = useState([]);
  const [landingPages, setLandingPages] = useState([]);
  const [isVisible, setIsVisible] = useState(false);
  const [loading, setLoading] = useState(true);
  const [sessionClosed, setSessionClosed] = useState(false);
  const [debugInfo, setDebugInfo] = useState('');

  const apiRoute = process.env.NEXT_PUBLIC_API_ROUTE;

  // Function to decode HTML entities
  const decodeHtmlEntities = (text) => {
    if (typeof window === 'undefined') return text; // Server-side safety
    const textarea = document.createElement('textarea');
    textarea.innerHTML = text;
    return textarea.value;
  };

  // Debug logging
  useEffect(() => {
    console.log('LandingPageCarousel mounted');
    console.log('API Route:', apiRoute);
    setDebugInfo(`API Route: ${apiRoute}, Loading: ${loading}`);
  }, [apiRoute, loading]);

  // Check if carousel was closed in this session
  useEffect(() => {
    if (typeof window === 'undefined') return; // Server-side safety
    const wasClosedInSession = sessionStorage.getItem('landingCarouselClosed');
    if (wasClosedInSession === 'true') {
      console.log('Carousel was closed in this session');
      setSessionClosed(true);
      setLoading(false);
    }
  }, []);

  // Fetch landing pages from API
  useEffect(() => {
    if (sessionClosed) return; // Don't fetch if closed in this session
    
    const fetchLandingPages = async () => {
      try {
        console.log('Fetching landing pages from:', `${apiRoute}/landingpages?isActive=true`);
        const response = await fetch(`${apiRoute}/landingpages?isActive=true`);
        console.log('Response status:', response.status);
        
        if (response.ok) {
          const result = await response.json();
          console.log('API response:', result);
          
          // The API returns data in 'data' property, not 'landingPages'
          if (result.success && result.data && result.data.length > 0) {
            console.log('Found landing pages:', result.data.length);
            setLandingPages(result.data);
            setIsVisible(true);
          } else {
            console.log('No landing pages found or inactive');
          }
        } else {
          console.error('API request failed with status:', response.status);
        }
      } catch (error) {
        console.error('Error fetching landing pages:', error);
      } finally {
        setLoading(false);
      }
    };

    if (apiRoute) {
      fetchLandingPages();
    }
  }, [apiRoute, sessionClosed]);

  const scrollTo = useCallback(
    (index) => {
      if (emblaApi) {
        console.log('Scrolling to index:', index);
        emblaApi.scrollTo(index);
      }
    },
    [emblaApi]
  );

  const scrollPrev = useCallback(() => {
    if (emblaApi) {
      console.log('Scrolling to previous');
      emblaApi.scrollPrev();
    }
  }, [emblaApi]);

  const scrollNext = useCallback(() => {
    if (emblaApi) {
      console.log('Scrolling to next');
      emblaApi.scrollNext();
    }
  }, [emblaApi]);

  const onSelect = useCallback(() => {
    if (!emblaApi) return;
    const newIndex = emblaApi.selectedScrollSnap();
    console.log('Selected index changed to:', newIndex);
    setSelectedIndex(newIndex);
  }, [emblaApi]);

  // Initialize Embla carousel
  useEffect(() => {
    if (!emblaApi) return;

    console.log('Setting up Embla carousel');
    onSelect();
    setScrollSnaps(emblaApi.scrollSnapList());
    emblaApi.on("select", onSelect);
    emblaApi.on("reInit", onSelect);

    return () => {
      emblaApi.off("select", onSelect);
      emblaApi.off("reInit", onSelect);
    };
  }, [emblaApi, onSelect]);

  // Re-initialize when landing pages change
  useEffect(() => {
    if (emblaApi && landingPages.length > 0) {
      console.log('Reinitializing carousel with', landingPages.length, 'pages');
      emblaApi.reInit();
    }
  }, [emblaApi, landingPages]);

  // Autoplay functionality
  useEffect(() => {
    if (!emblaApi || landingPages.length <= 1) return;
    
    const currentPage = landingPages[selectedIndex];
    const duration = currentPage?.displayDuration || 5000;
    
    console.log('Setting up autoplay with duration:', duration);
    const autoplay = setInterval(() => {
      scrollNext();
    }, duration);
    
    return () => clearInterval(autoplay);
  }, [emblaApi, selectedIndex, landingPages, scrollNext]);

  const handleClose = () => {
    setIsVisible(false);
    setSessionClosed(true);
    // Remember that user closed it in this session
    if (typeof window !== 'undefined') {
      sessionStorage.setItem('landingCarouselClosed', 'true');
    }
  };

  const handlePageClick = (page) => {
    if (page.redirectUrl || page.targetUrl) {
      const url = page.redirectUrl || page.targetUrl;
      window.open(url, '_blank');
    }
  };

  // Don't render if loading, closed in session, or no pages available
  if (loading) {
    return null; // Remove debug display
  }

  if (sessionClosed) {
    return null;
  }

  if (!isVisible || landingPages.length === 0) {
    return null; // Remove debug display
  }

  return (
    <div className={styles.overlay}>
      <div className={styles.wrapper} ref={emblaRef}>
        {/* Close button */}
        <button
          aria-label="Close"
          className={styles.closeButton}
          onClick={handleClose}
        >
          ×
        </button>

        <div className={styles.container}>
          {landingPages.map((page, index) => (
            <div 
              className={styles.slide} 
              key={page._id || index}
              onClick={(e) => {
                e.stopPropagation();
                handlePageClick(page);
              }}
            >
              <div className={styles.content}>
                {/* Render HTML content */}
                <div 
                  className={styles.htmlContent}
                  dangerouslySetInnerHTML={{ __html: decodeHtmlEntities(page.content) }}
                />
                
                {/* Show title if available */}
                {page.title && (
                  <div className={styles.titleOverlay}>
                    <h3 className={styles.title}>{page.title}</h3>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>

        {/* Navigation arrows - only show if more than 1 page */}
        {landingPages.length > 1 && (
          <>
            <button
              aria-label="Previous"
              className={`${styles.navButton} ${styles.prev}`}
              onClick={(e) => {
                e.stopPropagation();
                scrollPrev();
              }}
              type="button"
            >
              ‹
            </button>

            <button
              aria-label="Next"
              className={`${styles.navButton} ${styles.next}`}
              onClick={(e) => {
                e.stopPropagation();
                scrollNext();
              }}
              type="button"
            >
              ›
            </button>
          </>
        )}

        {/* Dots - only show if more than 1 page */}
        {landingPages.length > 1 && (
          <div className={styles.dots}>
            {landingPages.map((_, index) => (
              <button
                key={index}
                className={`${styles.dot} ${
                  index === selectedIndex ? styles.dotActive : ""
                }`}
                onClick={(e) => {
                  e.stopPropagation();
                  scrollTo(index);
                }}
                aria-label={`Go to slide ${index + 1}`}
                type="button"
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}