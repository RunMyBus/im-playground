/**
 * Landing Page Analytics Utility
 * Advanced tracking and analytics for landing page performance
 */

class LandingPageAnalytics {
  constructor() {
    this.events = [];
    this.sessionId = this.generateSessionId();
    this.userId = this.getUserId();
    this.startTime = Date.now();
  }

  /**
   * Generate a unique session ID
   */
  generateSessionId() {
    return `session_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
  }

  /**
   * Get user ID from session storage or generate anonymous ID
   */
  getUserId() {
    if (typeof window === 'undefined') return null;
    
    try {
      // Try to get from your existing session storage
      const sessionData = localStorage.getItem('loginResponse');
      if (sessionData) {
        const data = JSON.parse(sessionData);
        return data?.Data?.userId || 'anonymous';
      }
      
      // Generate or get anonymous user ID
      let anonymousId = localStorage.getItem('anonymous_user_id');
      if (!anonymousId) {
        anonymousId = `anon_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
        localStorage.setItem('anonymous_user_id', anonymousId);
      }
      
      return anonymousId;
    } catch (error) {
      console.warn('Error getting user ID for analytics:', error);
      return 'anonymous';
    }
  }

  /**
   * Track a landing page view
   */
  trackView(landingPage, additionalData = {}) {
    const event = {
      type: 'view',
      landingPageId: landingPage._id,
      landingPageTitle: landingPage.title,
      displayType: landingPage.displayType || 'popup',
      priority: landingPage.priority,
      page: this.getCurrentPage(),
      url: typeof window !== 'undefined' ? window.location.href : '',
      timestamp: Date.now(),
      sessionId: this.sessionId,
      userId: this.userId,
      userAgent: typeof navigator !== 'undefined' ? navigator.userAgent : '',
      viewportSize: this.getViewportSize(),
      deviceType: this.getDeviceType(),
      ...additionalData
    };

    this.events.push(event);
    this.sendEvent(event);
    
    console.log('📊 Landing page view tracked:', {
      id: landingPage._id,
      title: landingPage.title,
      type: landingPage.displayType
    });
  }

  /**
   * Track a landing page click
   */
  trackClick(landingPage, clickTarget = 'button', additionalData = {}) {
    const event = {
      type: 'click',
      landingPageId: landingPage._id,
      landingPageTitle: landingPage.title,
      displayType: landingPage.displayType || 'popup',
      clickTarget: clickTarget, // button, close, background, etc.
      targetUrl: landingPage.targetUrl || '',
      page: this.getCurrentPage(),
      url: typeof window !== 'undefined' ? window.location.href : '',
      timestamp: Date.now(),
      sessionId: this.sessionId,
      userId: this.userId,
      timeToClick: this.getTimeToClick(landingPage._id),
      ...additionalData
    };

    this.events.push(event);
    this.sendEvent(event);
    
    console.log('🎯 Landing page click tracked:', {
      id: landingPage._id,
      title: landingPage.title,
      target: clickTarget,
      timeToClick: event.timeToClick
    });
  }

  /**
   * Track landing page dismissal
   */
  trackDismissal(landingPage, dismissalMethod = 'close_button', additionalData = {}) {
    const event = {
      type: 'dismissal',
      landingPageId: landingPage._id,
      landingPageTitle: landingPage.title,
      displayType: landingPage.displayType || 'popup',
      dismissalMethod: dismissalMethod, // close_button, background_click, auto_timeout, escape_key
      page: this.getCurrentPage(),
      url: typeof window !== 'undefined' ? window.location.href : '',
      timestamp: Date.now(),
      sessionId: this.sessionId,
      userId: this.userId,
      timeViewed: this.getTimeViewed(landingPage._id),
      ...additionalData
    };

    this.events.push(event);
    this.sendEvent(event);
    
    console.log('❌ Landing page dismissal tracked:', {
      id: landingPage._id,
      title: landingPage.title,
      method: dismissalMethod,
      timeViewed: event.timeViewed
    });
  }

  /**
   * Track conversion (when user completes desired action)
   */
  trackConversion(landingPage, conversionType = 'click_through', value = null, additionalData = {}) {
    const event = {
      type: 'conversion',
      landingPageId: landingPage._id,
      landingPageTitle: landingPage.title,
      displayType: landingPage.displayType || 'popup',
      conversionType: conversionType,
      value: value,
      page: this.getCurrentPage(),
      url: typeof window !== 'undefined' ? window.location.href : '',
      timestamp: Date.now(),
      sessionId: this.sessionId,
      userId: this.userId,
      timeToConversion: this.getTimeToClick(landingPage._id),
      ...additionalData
    };

    this.events.push(event);
    this.sendEvent(event);
    
    console.log('💰 Landing page conversion tracked:', {
      id: landingPage._id,
      title: landingPage.title,
      type: conversionType,
      value: value
    });
  }

  /**
   * Get current page name
   */
  getCurrentPage() {
    if (typeof window === 'undefined') return 'unknown';
    
    const path = window.location.pathname;
    if (path === '/') return 'home';
    return path.replace('/', '').split('/')[0] || 'unknown';
  }

  /**
   * Get viewport size
   */
  getViewportSize() {
    if (typeof window === 'undefined') return { width: 0, height: 0 };
    
    return {
      width: window.innerWidth,
      height: window.innerHeight
    };
  }

  /**
   * Get device type
   */
  getDeviceType() {
    if (typeof window === 'undefined') return 'unknown';
    
    const width = window.innerWidth;
    if (width <= 480) return 'mobile';
    if (width <= 768) return 'tablet';
    return 'desktop';
  }

  /**
   * Calculate time to click from first view
   */
  getTimeToClick(landingPageId) {
    const viewEvent = this.events.find(e => 
      e.type === 'view' && 
      e.landingPageId === landingPageId
    );
    
    if (viewEvent) {
      return Date.now() - viewEvent.timestamp;
    }
    
    return 0;
  }

  /**
   * Calculate time viewed from first view
   */
  getTimeViewed(landingPageId) {
    const viewEvent = this.events.find(e => 
      e.type === 'view' && 
      e.landingPageId === landingPageId
    );
    
    if (viewEvent) {
      return Date.now() - viewEvent.timestamp;
    }
    
    return 0;
  }

  /**
   * Send event to analytics backend
   */
  async sendEvent(event) {
    try {
      // Send to your analytics backend
      // This could be Google Analytics, your own analytics API, etc.
      
      // For now, we'll just log it and optionally send to a webhook
      if (process.env.NEXT_PUBLIC_ANALYTICS_WEBHOOK) {
        await fetch(process.env.NEXT_PUBLIC_ANALYTICS_WEBHOOK, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(event),
        });
      }

      // Send to Google Analytics if gtag is available
      if (typeof window !== 'undefined' && window.gtag) {
        window.gtag('event', event.type, {
          event_category: 'landing_page',
          event_label: event.landingPageTitle,
          custom_parameter_landing_page_id: event.landingPageId,
          custom_parameter_display_type: event.displayType,
          custom_parameter_page: event.page,
        });
      }
    } catch (error) {
      console.warn('Error sending analytics event:', error);
    }
  }

  /**
   * Get session analytics summary
   */
  getSessionSummary() {
    const views = this.events.filter(e => e.type === 'view');
    const clicks = this.events.filter(e => e.type === 'click');
    const dismissals = this.events.filter(e => e.type === 'dismissal');
    const conversions = this.events.filter(e => e.type === 'conversion');

    return {
      sessionId: this.sessionId,
      userId: this.userId,
      sessionDuration: Date.now() - this.startTime,
      totalViews: views.length,
      totalClicks: clicks.length,
      totalDismissals: dismissals.length,
      totalConversions: conversions.length,
      clickThroughRate: views.length > 0 ? (clicks.length / views.length * 100).toFixed(2) : 0,
      conversionRate: views.length > 0 ? (conversions.length / views.length * 100).toFixed(2) : 0,
      averageTimeToClick: this.calculateAverageTimeToClick(),
      mostViewedTypes: this.getMostViewedTypes(),
      events: this.events
    };
  }

  /**
   * Calculate average time to click
   */
  calculateAverageTimeToClick() {
    const clickEvents = this.events.filter(e => e.type === 'click' && e.timeToClick > 0);
    if (clickEvents.length === 0) return 0;
    
    const totalTime = clickEvents.reduce((sum, event) => sum + event.timeToClick, 0);
    return Math.round(totalTime / clickEvents.length);
  }

  /**
   * Get most viewed display types
   */
  getMostViewedTypes() {
    const viewEvents = this.events.filter(e => e.type === 'view');
    const typeCounts = {};
    
    viewEvents.forEach(event => {
      const type = event.displayType || 'popup';
      typeCounts[type] = (typeCounts[type] || 0) + 1;
    });
    
    return Object.entries(typeCounts)
      .sort(([,a], [,b]) => b - a)
      .reduce((obj, [type, count]) => {
        obj[type] = count;
        return obj;
      }, {});
  }

  /**
   * Clear session data
   */
  clearSession() {
    this.events = [];
    this.sessionId = this.generateSessionId();
    this.startTime = Date.now();
    console.log('🧹 Analytics session cleared');
  }

  /**
   * Export analytics data for debugging or reporting
   */
  exportData() {
    const data = {
      summary: this.getSessionSummary(),
      rawEvents: this.events
    };
    
    const blob = new Blob([JSON.stringify(data, null, 2)], { 
      type: 'application/json' 
    });
    
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `landing-page-analytics-${this.sessionId}.json`;
    a.click();
    
    URL.revokeObjectURL(url);
  }
}

// Create and export a singleton instance
const landingPageAnalytics = new LandingPageAnalytics();

export default landingPageAnalytics;

// Export the class for testing or manual instantiation
export { LandingPageAnalytics };