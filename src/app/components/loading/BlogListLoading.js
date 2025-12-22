"use client";
import React from "react";

/**
 * Blog List Loading Component
 * Loading state for blog/newsroom listing pages
 * Updated to match Gallery and Dashboard skeleton UI style
 */
const BlogListLoading = ({ count = 6 }) => {
  return (
    <>
      <style jsx>{`
        @keyframes shimmer {
          0% {
            background-position: -1000px 0;
          }
          100% {
            background-position: 1000px 0;
          }
        }
        .skeleton-shimmer {
          background: linear-gradient(
            90deg,
            #f0f0f0 0%,
            #f8f8f8 50%,
            #f0f0f0 100%
          );
          background-size: 1000px 100%;
          animation: shimmer 2s infinite linear;
        }
      `}</style>
      
      {[...Array(count)].map((_, i) => (
        <div key={i} className="col-md-4" style={{ marginBottom: '30px' }}>
          <div style={{
            borderRadius: '16px',
            overflow: 'hidden',
            boxShadow: '0 2px 10px rgba(0,0,0,0.08)',
            background: '#fff',
            height: '100%'
          }}>
            {/* Skeleton Image */}
            <div className="skeleton-shimmer" style={{
              height: '220px',
              width: '100%'
            }}></div>
            
            {/* Skeleton Content */}
            <div style={{ padding: '20px' }}>
              {/* Title skeleton */}
              <div className="skeleton-shimmer" style={{
                height: '24px',
                borderRadius: '4px',
                width: '85%',
                marginBottom: '12px'
              }}></div>
              
              {/* Description lines */}
              <div className="skeleton-shimmer" style={{
                height: '14px',
                borderRadius: '4px',
                width: '100%',
                marginBottom: '8px'
              }}></div>
              <div className="skeleton-shimmer" style={{
                height: '14px',
                borderRadius: '4px',
                width: '95%',
                marginBottom: '8px'
              }}></div>
              <div className="skeleton-shimmer" style={{
                height: '14px',
                borderRadius: '4px',
                width: '70%',
                marginBottom: '16px'
              }}></div>
              
              {/* Button skeleton */}
              <div className="skeleton-shimmer" style={{
                height: '40px',
                borderRadius: '20px',
                width: '120px'
              }}></div>
            </div>
          </div>
        </div>
      ))}
    </>
  );
};

export default BlogListLoading;
