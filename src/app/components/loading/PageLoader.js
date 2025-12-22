"use client";
import React from "react";
import "./PageLoader.css";

/**
 * Full Page Loader Component
 * Shows when navigating to pages that haven't been rendered yet
 * Lightweight, fast-loading, and provides immediate feedback
 */
const PageLoader = ({ 
  message = "Loading...",
  variant = "primary" // "primary" | "minimal"
}) => {
  
  if (variant === "minimal") {
    return (
      <div className="page-loader minimal">
        <div className="minimal-spinner"></div>
      </div>
    );
  }

  // Primary variant (default)
  return (
    <div className="page-loader primary">
      <div className="loader-content">
        <div className="spinner-dual">
          <div className="spinner-outer"></div>
          <div className="spinner-inner"></div>
        </div>
        <p className="loader-message">{message}</p>
      </div>
    </div>
  );
};

export default PageLoader;
