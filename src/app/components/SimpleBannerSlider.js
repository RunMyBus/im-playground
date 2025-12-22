/**
 * Simple Banner Slider Component
 * Displays one banner at a time with navigation buttons
 * No purple backgrounds or overlay text - just clean banner display with navigation
 */

'use client';

import React, { useState, useEffect, useCallback } from 'react';
import S3Image from './S3Image';
import bannerService from '../services/bannerService';

const SimpleBannerSlider = ({ userId = null }) => {
  const [banners, setBanners] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  /**
   * Fetch all active banners
   */
  const fetchBanners = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      
      const webBanners = await bannerService.getAllActiveWebBanners(userId);
      
      if (webBanners && webBanners.length > 0) {
        setBanners(webBanners);
        
        // Track banner views
        webBanners.forEach(banner => {
          bannerService.trackBannerView(banner.banId || banner.id);
        });
      }
      
    } catch (err) {
      console.error('Error fetching banners:', err);
      setError('Failed to load banners');
    } finally {
      setLoading(false);
    }
  }, [userId]);

  /**
   * Initial fetch on component mount
   */
  useEffect(() => {
    fetchBanners();
  }, [fetchBanners]);

  /**
   * Handle navigation
   */
  const goToPrevious = useCallback(() => {
    setCurrentIndex((prevIndex) => 
      prevIndex === 0 ? banners.length - 1 : prevIndex - 1
    );
  }, [banners.length]);

  const goToNext = useCallback(() => {
    setCurrentIndex((prevIndex) => 
      prevIndex === banners.length - 1 ? 0 : prevIndex + 1
    );
  }, [banners.length]);

  /**
   * Handle banner click
   */
  const handleBannerClick = useCallback((banner) => {
    if (banner.url) {
      // Track banner click
      bannerService.trackBannerClick(banner.banId || banner.id);
      
      if (banner.url.startsWith('http')) {
        window.open(banner.url, '_blank', 'noopener,noreferrer');
      } else {
        window.location.href = banner.url;
      }
    }
  }, []);

  // Don't render anything if loading or no banners
  if (loading || error) {
    return null;
  }

  // If no banners, don't render anything
  if (!banners || banners.length === 0) {
    return null;
  }

  const currentBanner = banners[currentIndex];
  console.log('current',currentBanner);

  return (
    <section className="simple-banner-slider">
      <div 
        className="simple-banner-content" 
        onClick={() => handleBannerClick(currentBanner)}
        style={{ cursor: currentBanner.url ? 'pointer' : 'default' }}
      >
        <S3Image
          src={currentBanner.desktopImage}
          className="for-desktop"
          alt={currentBanner.title || "banner"}
          fill
        />
        <S3Image
          src={currentBanner.mobileImage}
          className="for-mobile"
          alt={currentBanner.title || "banner"}
          fill
        />
      </div>
      
      {/* Navigation buttons - only show if more than one banner */}
      {banners.length > 1 && (
        <>
          <button
            className="simple-banner-nav simple-banner-prev"
            onClick={goToPrevious}
            aria-label="Previous banner"
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M15 18L9 12L15 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </button>
          <button
            className="simple-banner-nav simple-banner-next"
            onClick={goToNext}
            aria-label="Next banner"
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M9 18L15 12L9 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </button>
          
          {/* Dots indicator */}
          <div className="simple-banner-dots">
            {banners.map((_, index) => (
              <button
                key={index}
                className={`simple-banner-dot ${index === currentIndex ? 'active' : ''}`}
                onClick={() => setCurrentIndex(index)}
                aria-label={`Go to banner ${index + 1}`}
              />
            ))}
          </div>
        </>
      )}
    </section>
  );
};

export default SimpleBannerSlider;