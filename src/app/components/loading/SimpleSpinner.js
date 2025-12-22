"use client";
import React from "react";
import "./simple-spinner.css";

/**
 * Simple Spinner Component
 * Minimal, clean loader for forms, buttons, and general loading states
 * 
 * @param {string} size - 'small' (16px), 'medium' (24px), 'large' (40px)
 * @param {string} color - 'primary' (#009933), 'white', 'gray'
 * @param {string} text - Optional loading text to display below spinner
 * @param {boolean} inline - Display inline with text (for buttons)
 */
const SimpleSpinner = ({ 
  size = "medium",
  color = "primary",
  text = "",
  inline = false
}) => {
  const spinnerClass = `simple-spinner simple-spinner--${size} simple-spinner--${color}`;
  
  if (inline) {
    return (
      <span className="simple-spinner-inline">
        <span className={spinnerClass}></span>
        {text && <span className="simple-spinner-text">{text}</span>}
      </span>
    );
  }

  return (
    <div className="simple-spinner-container">
      <span className={spinnerClass}></span>
      {text && <p className="simple-spinner-text">{text}</p>}
    </div>
  );
};

export default SimpleSpinner;
