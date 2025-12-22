"use client";
import React from "react";
import "./spinner.css";

/**
 * Enhanced Loading Spinner Component
 * Multiple variants for different use cases
 */
const Spinner = ({ 
  size = "medium", 
  variant = "primary", 
  fullScreen = false,
  overlay = false,
  message = ""
}) => {
  
  const getSpinnerClass = () => {
    let classes = "spinner";
    
    // Size classes
    if (size === "small") classes += " spinner-small";
    else if (size === "large") classes += " spinner-large";
    
    // Variant classes
    if (variant === "secondary") classes += " spinner-secondary";
    else if (variant === "success") classes += " spinner-success";
    
    return classes;
  };

  if (fullScreen) {
    return (
      <div className="spinner-fullscreen">
        <div className={getSpinnerClass()}></div>
        {message && <p className="spinner-message">{message}</p>}
      </div>
    );
  }

  if (overlay) {
    return (
      <div className="spinner-overlay">
        <div className={getSpinnerClass()}></div>
        {message && <p className="spinner-message">{message}</p>}
      </div>
    );
  }

  return (
    <div className="spinner-container">
      <div className={getSpinnerClass()}></div>
      {message && <p className="spinner-message">{message}</p>}
    </div>
  );
};

export default Spinner;
