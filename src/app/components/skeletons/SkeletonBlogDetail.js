"use client";
import React from "react";
import "./skeleton.css";

/**
 * Skeleton Blog Detail Component
 * Used for loading states of blog/article detail pages
 */
const SkeletonBlogDetail = () => {
  return (
    <div className="skeleton-blog-detail">
      <div className="skeleton-blog-title skeleton-shimmer"></div>
      <div className="skeleton-blog-meta skeleton-shimmer"></div>
      <div className="skeleton-blog-image skeleton-shimmer"></div>
      <div className="skeleton-blog-content">
        <div className="skeleton-text skeleton-shimmer"></div>
        <div className="skeleton-text skeleton-shimmer"></div>
        <div className="skeleton-text skeleton-shimmer" style={{ width: "90%" }}></div>
        <div className="skeleton-text skeleton-shimmer"></div>
        <div className="skeleton-text skeleton-shimmer" style={{ width: "85%" }}></div>
        <div className="skeleton-text skeleton-shimmer"></div>
      </div>
    </div>
  );
};

export default SkeletonBlogDetail;
