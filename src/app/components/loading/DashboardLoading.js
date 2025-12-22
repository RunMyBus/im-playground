"use client";
import React from "react";
import "../skeletons/skeleton.css";

/**
 * Dashboard Loading Component
 * Combined loading state for dashboard with profile, stats, and content areas
 */
const DashboardLoading = () => {
  return (
    <div className="dashboard-loading">
      {/* Profile Section */}
      <div className="skeleton-profile">
        <div className="skeleton-profile-header">
          <div className="skeleton-avatar skeleton-shimmer"></div>
          <div className="skeleton-profile-info">
            <div className="skeleton-profile-name skeleton-shimmer"></div>
            <div className="skeleton-profile-subtitle skeleton-shimmer"></div>
          </div>
        </div>
        
        <div className="skeleton-profile-stats">
          <div className="skeleton-stat-item skeleton-shimmer"></div>
          <div className="skeleton-stat-item skeleton-shimmer"></div>
          <div className="skeleton-stat-item skeleton-shimmer"></div>
        </div>

        <div className="skeleton-profile-fields">
          <div className="skeleton-field">
            <div className="skeleton-field-label skeleton-shimmer"></div>
            <div className="skeleton-field-input skeleton-shimmer"></div>
          </div>
          <div className="skeleton-field">
            <div className="skeleton-field-label skeleton-shimmer"></div>
            <div className="skeleton-field-input skeleton-shimmer"></div>
          </div>
          <div className="skeleton-field">
            <div className="skeleton-field-label skeleton-shimmer"></div>
            <div className="skeleton-field-input skeleton-shimmer"></div>
          </div>
          <div className="skeleton-field">
            <div className="skeleton-field-label skeleton-shimmer"></div>
            <div className="skeleton-field-input skeleton-shimmer"></div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardLoading;
