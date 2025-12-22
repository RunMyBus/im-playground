/**
 * Banner Service
 * Service layer for fetching and managing banner data
 */

const API_BASE_URL = process.env.NEXT_PUBLIC_API_ROUTE || process.env.API_ROUTE;

const bannerService = {
  /**
   * Fetch all active web banners sorted by priority
   */
  async getAllActiveWebBanners(userId = null) {
    try {
      const response = await fetch(`${API_BASE_URL}/allactivewebbanners`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          userId: userId || ''
        }),
      });
      console.log("response", response);
      const data = await response.json();
      
      if (data.Status === true && data.Data) {
        // Ensure banners are sorted by priority (1 is highest priority)
        return data.Data.sort((a, b) => {
          if (a.priority !== b.priority) {
            return a.priority - b.priority;
          }
          // If same priority, sort by creation date (newest first)
          return new Date(b.createdAt) - new Date(a.createdAt);
        });
      }
      
      return [];
    } catch (error) {
      console.error('Error fetching active web banners:', error);
      return [];
    }
  },

  /**
   * Fetch all active app banners sorted by priority
   */
  async getAllActiveAppBanners(type = 'app') {
    try {
      const response = await fetch(`${API_BASE_URL}/allactivebanners`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          type: type
        }),
      });

      const data = await response.json();
      
      if (data.Status === true && data.Data) {
        // Ensure banners are sorted by priority (1 is highest priority)
        return data.Data.sort((a, b) => {
          if (a.priority !== b.priority) {
            return a.priority - b.priority;
          }
          // If same priority, sort by creation date (newest first)
          return new Date(b.createdAt) - new Date(a.createdAt);
        });
      }
      
      return [];
    } catch (error) {
      console.error('Error fetching active app banners:', error);
      return [];
    }
  },

  /**
   * Get single web banner detail (for backward compatibility)
   */
  async getWebBannerDetail(userId = null) {
    try {
      const response = await fetch(`${API_BASE_URL}/webbannerdetail`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          userId: userId || ''
        }),
      });

      const data = await response.json();
      
      if (data.Status === true && data.Data) {
        return data.Data;
      }
      
      return null;
    } catch (error) {
      console.error('Error fetching web banner detail:', error);
      return null;
    }
  },

  /**
   * Convert banner data to format expected by carousel component
   */
  formatBannersForCarousel(banners) {
    if (!Array.isArray(banners)) {
      return [];
    }

    return banners.map(banner => ({
      id: banner.banId || banner._id,
      title: banner.title || banner.ban_title,
      desktopImage: banner.desktopImage || banner.ban_image,
      mobileImage: banner.mobileImage || banner.ban_image,
      url: banner.url || '',
      priority: banner.priority || 1,
      displayDuration: banner.displayDuration || 5000,
      status: banner.status,
      createdAt: banner.createdAt
    }));
  },

  /**
   * Track banner view analytics (placeholder for future implementation)
   */
  async trackBannerView(bannerId) {
    try {
      // TODO: Implement banner view tracking
      console.log('Banner view tracked:', bannerId);
    } catch (error) {
      console.error('Error tracking banner view:', error);
    }
  },

  /**
   * Track banner click analytics (placeholder for future implementation)
   */
  async trackBannerClick(bannerId) {
    try {
      // TODO: Implement banner click tracking
      console.log('Banner click tracked:', bannerId);
    } catch (error) {
      console.error('Error tracking banner click:', error);
    }
  },

  /**
   * Track banner dismissal analytics (placeholder for future implementation)
   */
  async trackBannerDismissal(bannerId) {
    try {
      // TODO: Implement banner dismissal tracking
      console.log('Banner dismissal tracked:', bannerId);
    } catch (error) {
      console.error('Error tracking banner dismissal:', error);
    }
  }
};

export default bannerService;