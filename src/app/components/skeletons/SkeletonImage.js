"use client";
import React from "react";
import "./skeleton.css";

/**
 * Image Skeleton Component
 * Skeleton placeholder that mimics image dimensions and layout
 * Used in galleries, grids, and image-heavy sections
 * 
 * @param {number} count - Number of skeleton images to display
 * @param {string} aspectRatio - '1:1' (square), '16:9', '4:3', '3:4' (portrait)
 * @param {string} gridCols - CSS grid-template-columns value
 * @param {string} gap - Gap between items (default: '15px')
 */
const SkeletonImage = ({ 
  count = 1,
  aspectRatio = "1:1",
  gridCols = "repeat(auto-fill, minmax(200px, 1fr))",
  gap = "15px"
}) => {
  // Calculate padding-bottom percentage for aspect ratio
  const getAspectRatioPadding = () => {
    switch (aspectRatio) {
      case "16:9":
        return "56.25%"; // (9/16) * 100
      case "4:3":
        return "75%";    // (3/4) * 100
      case "3:4":
        return "133.33%"; // (4/3) * 100
      case "1:1":
      default:
        return "100%";   // Square
    }
  };

  const paddingBottom = getAspectRatioPadding();

  if (count === 1) {
    return (
      <div 
        className="skeleton-image-wrapper"
        style={{ paddingBottom }}
      >
        <div className="skeleton-image skeleton-shimmer"></div>
      </div>
    );
  }

  return (
    <div 
      className="skeleton-image-grid"
      style={{
        display: 'grid',
        gridTemplateColumns: gridCols,
        gap: gap,
        padding: '20px 0'
      }}
    >
      {[...Array(count)].map((_, index) => (
        <div 
          key={index}
          className="skeleton-image-wrapper"
          style={{ paddingBottom }}
        >
          <div className="skeleton-image skeleton-shimmer"></div>
        </div>
      ))}
    </div>
  );
};

export default SkeletonImage;
