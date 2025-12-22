"use client";
import React from "react";
import "../skeletons/skeleton.css";

/**
 * Projects Loading Component
 * Loading state for project list pages (ISR/CSR)
 */
const ProjectsLoading = ({ count = 3 }) => {
  return (
    <div className="projects-loading">
      {[...Array(count)].map((_, index) => (
        <div key={index} className="skeleton-card skeleton-card-horizontal" style={{ marginBottom: "60px" }}>
          <div className="skeleton-image skeleton-shimmer"></div>
          <div className="skeleton-content">
            <div className="skeleton-title skeleton-shimmer" style={{ width: "60%" }}></div>
            <div className="skeleton-text skeleton-shimmer" style={{ height: "20px", width: "40%", marginBottom: "15px" }}></div>
            <div className="skeleton-text skeleton-shimmer"></div>
            <div className="skeleton-text skeleton-shimmer"></div>
            <div className="skeleton-text skeleton-shimmer" style={{ width: "90%" }}></div>
            <div className="skeleton-button skeleton-shimmer"></div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default ProjectsLoading;
