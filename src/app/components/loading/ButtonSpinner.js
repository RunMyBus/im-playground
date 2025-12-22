"use client";
import React from "react";
import "./spinner.css";

/**
 * Button Spinner Component
 * Used for loading states within buttons (form submission, login, checkout, etc.)
 */
const ButtonSpinner = ({ 
  text = "Loading...",
  className = "",
  disabled = true 
}) => {
  return (
    <button 
      className={`btn-with-spinner ${className}`} 
      disabled={disabled}
    >
      <span className="btn-spinner"></span>
      <span className="btn-spinner-text">{text}</span>
    </button>
  );
};

export default ButtonSpinner;
