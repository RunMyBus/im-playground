"use client";
import React from "react";
import "./skeleton.css";

/**
 * Skeleton Stats Component
 * Used for loading states of dashboard statistics and metrics
 */
const SkeletonStats = ({ count = 3 }) => {
  return (
    <div className="skeleton-stats-container">
      {[...Array(count)].map((_, index) => (
        <div key={index} className="skeleton-stat-box">
          <div className="skeleton-stat-value skeleton-shimmer"></div>
          <div className="skeleton-stat-label skeleton-shimmer"></div>
        </div>
      ))}
    </div>
  );
};

export default SkeletonStats;
