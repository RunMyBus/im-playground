/**
 * Banner Manager Component
 * Manages the display of multiple web banners using the carousel component
 */

'use client';

import React, { useState, useEffect, useCallback } from 'react';
import MultipleBannerCarousel from './MultipleBannerCarousel';
import bannerService from '../services/bannerService';

const BannerManager = ({ 
  userId = null, 
  enableWebBanners = true,
  enableAppBanners = false 
}) => {
  const [banners, setBanners] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isVisible, setIsVisible] = useState(true);

  /**
   * Fetch all active banners
   */
  const fetchBanners = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      
      let allBanners = [];

      // Fetch web banners if enabled
      if (enableWebBanners) {
        const webBanners = await bannerService.getAllActiveWebBanners(userId);
        allBanners = [...allBanners, ...webBanners];
      }

      // Fetch app banners if enabled
      if (enableAppBanners) {
        const appBanners = await bannerService.getAllActiveAppBanners('app');
        const formattedAppBanners = bannerService.formatBannersForCarousel(appBanners);
        allBanners = [...allBanners, ...formattedAppBanners];
      }

      // Sort all banners by priority
      allBanners.sort((a, b) => {
        if (a.priority !== b.priority) {
          return a.priority - b.priority;
        }
        return new Date(b.createdAt) - new Date(a.createdAt);
      });

      setBanners(allBanners);
      
      // Track that banners were loaded
      allBanners.forEach(banner => {
        bannerService.trackBannerView(banner.id || banner.banId);
      });
      
    } catch (err) {
      console.error('Error fetching banners:', err);
      setError('Failed to load banners');
    } finally {
      setLoading(false);
    }
  }, [userId, enableWebBanners, enableAppBanners]);

  /**
   * Initial fetch on component mount
   */
  useEffect(() => {
    fetchBanners();
  }, [fetchBanners]);

  /**
   * Handle individual banner close
   */
  const handleBannerClose = useCallback((closedBanner) => {
    // Remove the closed banner from the banners array
    setBanners(prevBanners => 
      prevBanners.filter(banner => 
        (banner.id || banner.banId) !== (closedBanner.id || closedBanner.banId)
      )
    );
    
    // Track banner dismissal
    if (closedBanner.id || closedBanner.banId) {
      bannerService.trackBannerDismissal(closedBanner.id || closedBanner.banId);
    }
  }, []);

  /**
   * Handle all banners close
   */
  const handleAllBannersClose = useCallback(() => {
    setBanners([]);
    setIsVisible(false);
  }, []);

  /**
   * Handle banner click tracking
   */
  const handleBannerClick = useCallback((banner) => {
    bannerService.trackBannerClick(banner.id || banner.banId);
  }, []);

  // Don't render anything if loading, has error, not visible, or no banners
  if (loading || error || !isVisible || !banners || banners.length === 0) {
    return null;
  }

  return (
    <MultipleBannerCarousel
      banners={banners}
      onBannerClick={handleBannerClick}
      onBannerClose={handleBannerClose}
      onAllBannersClose={handleAllBannersClose}
    />
  );
};

export default BannerManager;