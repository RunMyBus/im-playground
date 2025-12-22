import axios from 'axios';

/**
 * Dashboard Metrics API Utility
 * Handles API calls for dashboard metrics with authentication
 */
class DashboardMetricsAPI {
  constructor() {
    this.apiRoute = process.env.NEXT_PUBLIC_API_ROUTE;
  }

  /**
   * Get authentication headers
   */
  getAuthHeaders(token) {
    return {
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json'
    };
  }

  /**
   * Fetch all dashboard metrics (unfiltered)
   */
  async getAllMetrics(userId, token) {
    try {
      const response = await axios.post(
        `${this.apiRoute}/dashboard/metrics/all`,
        { userId },
        { headers: this.getAuthHeaders(token) }
      );

      return {
        success: true,
        data: response.data?.data || response.data
      };
    } catch (error) {
      console.error('Error fetching all metrics:', error);
      return {
        success: false,
        error: error.response?.data?.message || error.message || 'Failed to fetch metrics'
      };
    }
  }

  /**
   * Fetch filtered dashboard metrics
   */
  async getFilteredMetrics(userId, token, filter, startDate = null, endDate = null) {
    try {
      const requestData = {
        userId,
        filter,
        ...(startDate && { startDate }),
        ...(endDate && { endDate })
      };

      const response = await axios.post(
        `${this.apiRoute}/dashboard/metrics/filtered`,
        requestData,
        { headers: this.getAuthHeaders(token) }
      );

      return {
        success: true,
        data: response.data?.data || response.data
      };
    } catch (error) {
      console.error('Error fetching filtered metrics:', error);
      return {
        success: false,
        error: error.response?.data?.message || error.message || 'Failed to fetch filtered metrics'
      };
    }
  }

  /**
   * Fetch metrics based on filter parameters
   * Automatically chooses between all or filtered endpoint
   */
  async getMetrics(userId, token, filterParams = {}) {
    const { filter = 'all', startDate = null, endDate = null } = filterParams;

    // Use unfiltered endpoint for 'all' filter
    if (filter === 'all' || !filter) {
      return this.getAllMetrics(userId, token);
    }

    // Use filtered endpoint for specific date ranges
    return this.getFilteredMetrics(userId, token, filter, startDate, endDate);
  }

  /**
   * Get individual project metrics
   */
  async getISRProjects(userId, token) {
    try {
      const response = await axios.post(
        `${this.apiRoute}/dashboard/metrics/isr-projects`,
        { userId },
        { headers: this.getAuthHeaders(token) }
      );

      return {
        success: true,
        data: response.data
      };
    } catch (error) {
      console.error('Error fetching ISR projects:', error);
      return {
        success: false,
        error: error.response?.data?.message || error.message
      };
    }
  }

  /**
   * Get CSR project metrics
   */
  async getCSRProjects(userId, token) {
    try {
      const response = await axios.post(
        `${this.apiRoute}/dashboard/metrics/csr-projects`,
        { userId },
        { headers: this.getAuthHeaders(token) }
      );

      return {
        success: true,
        data: response.data
      };
    } catch (error) {
      console.error('Error fetching CSR projects:', error);
      return {
        success: false,
        error: error.response?.data?.message || error.message
      };
    }
  }

  /**
   * Get plants sold metrics
   */
  async getPlantsSold(userId, token) {
    try {
      const response = await axios.post(
        `${this.apiRoute}/dashboard/metrics/plants-sold`,
        { userId },
        { headers: this.getAuthHeaders(token) }
      );

      return {
        success: true,
        data: response.data
      };
    } catch (error) {
      console.error('Error fetching plants sold:', error);
      return {
        success: false,
        error: error.response?.data?.message || error.message
      };
    }
  }

  /**
   * Get revenue metrics
   */
  async getRevenue(userId, token) {
    try {
      const response = await axios.post(
        `${this.apiRoute}/dashboard/metrics/revenue`,
        { userId },
        { headers: this.getAuthHeaders(token) }
      );

      return {
        success: true,
        data: response.data
      };
    } catch (error) {
      console.error('Error fetching revenue:', error);
      return {
        success: false,
        error: error.response?.data?.message || error.message
      };
    }
  }
}

// Export singleton instance
const dashboardMetricsAPI = new DashboardMetricsAPI();
export default dashboardMetricsAPI;