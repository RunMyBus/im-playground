/**
 * Multiple Banner Carousel Component
 * Displays multiple active web banners in a carousel/slider format
 * Allows users to navigate through all active promotional/notification banners
 */

'use client';

import React, { useState, useEffect, useCallback, useRef } from 'react';
import Image from 'next/image';

const MultipleBannerCarousel = ({ banners = [], onBannerClose }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isVisible, setIsVisible] = useState(false);
  const [isDragging, setIsDragging] = useState(false);
  const [activeBanners, setActiveBanners] = useState([]);
  
  const carouselRef = useRef(null);
  const dragStartX = useRef(0);
  const dragCurrentX = useRef(0);

  // Initialize active banners from props
  useEffect(() => {
    if (banners && banners.length > 0) {
      setActiveBanners([...banners]);
      setIsVisible(true);
      setCurrentIndex(0);
    } else {
      setIsVisible(false);
    }
  }, [banners]);

  // Hide carousel if no active banners remain
  useEffect(() => {
    if (activeBanners.length === 0) {
      setIsVisible(false);
    }
  }, [activeBanners]);

  // Handle manual navigation
  const goToSlide = useCallback((index) => {
    setCurrentIndex(index);
  }, []);

  const goToPrevious = useCallback(() => {
    setCurrentIndex((prevIndex) => 
      prevIndex === 0 ? activeBanners.length - 1 : prevIndex - 1
    );
  }, [activeBanners.length]);

  const goToNext = useCallback(() => {
    setCurrentIndex((prevIndex) => 
      prevIndex === activeBanners.length - 1 ? 0 : prevIndex + 1
    );
  }, [activeBanners.length]);

  // Handle banner click
  const handleBannerClick = useCallback((banner) => {
    if (banner.url) {
      if (banner.url.startsWith('http')) {
        window.open(banner.url, '_blank', 'noopener,noreferrer');
      } else {
        window.location.href = banner.url;
      }
    }
  }, []);

  // Handle individual banner close
  const handleBannerClose = useCallback((bannerIndex) => {
    const bannerToRemove = activeBanners[bannerIndex];
    const updatedBanners = activeBanners.filter((_, index) => index !== bannerIndex);
    
    setActiveBanners(updatedBanners);
    
    // Notify parent component if callback provided
    if (onBannerClose && bannerToRemove) {
      onBannerClose(bannerToRemove);
    }
    
    // Adjust current index if necessary
    if (updatedBanners.length === 0) {
      setIsVisible(false);
    } else if (currentIndex >= updatedBanners.length) {
      setCurrentIndex(Math.max(0, updatedBanners.length - 1));
    } else if (bannerIndex <= currentIndex && currentIndex > 0) {
      setCurrentIndex(currentIndex - 1);
    }
  }, [activeBanners, currentIndex, onBannerClose]);

  // Handle close all banners
  const handleCloseAll = useCallback(() => {
    setActiveBanners([]);
    setIsVisible(false);
  }, []);

  // Touch and mouse drag functionality
  const handleDragStart = useCallback((e) => {
    setIsDragging(true);
    
    const clientX = e.type === 'mousedown' ? e.clientX : e.touches[0].clientX;
    dragStartX.current = clientX;
    dragCurrentX.current = clientX;

    if (e.type === 'mousedown') {
      document.addEventListener('mousemove', handleDragMove);
      document.addEventListener('mouseup', handleDragEnd);
    }
  }, [handleDragMove, handleDragEnd]);

  const handleDragMove = useCallback((e) => {
    if (!isDragging) return;
    
    e.preventDefault();
    const clientX = e.type === 'mousemove' ? e.clientX : e.touches[0].clientX;
    dragCurrentX.current = clientX;
  }, [isDragging]);

  const handleDragEnd = useCallback(() => {
    if (!isDragging) return;
    
    const dragDistance = dragCurrentX.current - dragStartX.current;
    const threshold = 50;
    
    if (Math.abs(dragDistance) > threshold) {
      if (dragDistance > 0) {
        goToPrevious();
      } else {
        goToNext();
      }
    }
    
    setIsDragging(false);

    document.removeEventListener('mousemove', handleDragMove);
    document.removeEventListener('mouseup', handleDragEnd);
  }, [isDragging, goToPrevious, goToNext, handleDragMove]);

  // Keyboard navigation
  useEffect(() => {
    const handleKeyPress = (e) => {
      if (!isVisible) return;
      
      switch (e.key) {
        case 'ArrowLeft':
          e.preventDefault();
          goToPrevious();
          break;
        case 'ArrowRight':
          e.preventDefault();
          goToNext();
          break;
        case 'Escape':
          e.preventDefault();
          handleCloseAll();
          break;
      }
    };

    if (isVisible) {
      document.addEventListener('keydown', handleKeyPress);
    }

    return () => {
      document.removeEventListener('keydown', handleKeyPress);
    };
  }, [isVisible, goToPrevious, goToNext, handleCloseAll]);

  // Don't render if no banners or not visible
  if (!activeBanners || activeBanners.length === 0 || !isVisible) {
    return null;
  }

  const currentBanner = activeBanners[currentIndex];

  return (
    <div className="multiple-banner-carousel" role="banner" aria-live="polite">
      <div 
        className="banner-carousel-container"
        ref={carouselRef}
        onMouseDown={handleDragStart}
        onTouchStart={handleDragStart}
        onTouchMove={handleDragMove}
        onTouchEnd={handleDragEnd}
      >
        {/* Main banner content */}
        <div className="banner-content" onClick={() => handleBannerClick(currentBanner)}>
          <div className="banner-image-container">
            <Image
              src={currentBanner.desktopImage}
              alt={currentBanner.title}
              className="banner-image desktop-banner"
              fill
              priority
              style={{ objectFit: 'cover' }}
            />
            <Image
              src={currentBanner.mobileImage}
              alt={currentBanner.title}
              className="banner-image mobile-banner"
              fill
              priority
              style={{ objectFit: 'cover' }}
            />
          </div>
          
          <div className="banner-overlay">
            <div className="banner-text">
              <h3 className="banner-title">{currentBanner.title}</h3>
              {currentBanner.url && (
                <div className="banner-cta">
                  <span className="cta-text">Click to learn more</span>
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M7 17L17 7" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    <path d="M7 7H17V17" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Navigation controls */}
        {activeBanners.length > 1 && (
          <>
            {/* Previous/Next buttons */}
            <button
              className="carousel-nav carousel-nav-prev"
              onClick={(e) => { e.stopPropagation(); goToPrevious(); }}
              aria-label="Previous banner"
            >
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M15 18L9 12L15 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </button>
            
            <button
              className="carousel-nav carousel-nav-next"
              onClick={(e) => { e.stopPropagation(); goToNext(); }}
              aria-label="Next banner"
            >
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M9 18L15 12L9 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </button>

            {/* Dots indicator */}
            <div className="carousel-dots">
              {activeBanners.map((_, index) => (
                <button
                  key={index}
                  className={`carousel-dot ${index === currentIndex ? 'active' : ''}`}
                  onClick={(e) => { e.stopPropagation(); goToSlide(index); }}
                  aria-label={`Go to banner ${index + 1}`}
                />
              ))}
            </div>
          </>
        )}

        {/* Individual banner close button */}
        <button
          className="banner-close-individual"
          onClick={(e) => { e.stopPropagation(); handleBannerClose(currentIndex); }}
          aria-label="Close this banner"
          title="Close this banner"
        >
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M18 6L6 18" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            <path d="M6 6L18 18" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </button>

        {/* Close all button (only show if multiple banners) */}
        {activeBanners.length > 1 && (
          <button
            className="banner-close-all"
            onClick={(e) => { e.stopPropagation(); handleCloseAll(); }}
            aria-label="Close all banners"
            title="Close all banners"
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M18 6L6 18" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M6 6L18 18" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
            <span className="close-all-text">Close All</span>
          </button>
        )}

        {/* Banner counter */}
        {activeBanners.length > 1 && (
          <div className="banner-counter">
            <span>{currentIndex + 1} / {activeBanners.length}</span>
          </div>
        )}
      </div>
    </div>
  );
};

export default MultipleBannerCarousel;