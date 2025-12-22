"use client";
import React from "react";
import "../skeletons/skeleton.css";

/**
 * Gallery Loading Component
 * Loading state for gallery pages with tabs, images, videos, news
 */
const GalleryLoading = ({ activeTab = "albums" }) => {
  const renderAlbumsSkeleton = () => (
    <div style={{
      display: 'grid',
      gridTemplateColumns: 'repeat(auto-fill, minmax(260px, 1fr))',
      gap: '20px',
      padding: '20px 0'
    }}>
      {[...Array(6)].map((_, index) => (
        <div key={index} className="skeleton-card" style={{ minHeight: '300px' }}>
          <div className="skeleton-image skeleton-shimmer" style={{ height: '220px' }}></div>
          <div className="skeleton-content">
            <div className="skeleton-title skeleton-shimmer" style={{ width: '80%' }}></div>
          </div>
        </div>
      ))}
    </div>
  );

  const renderImagesSkeleton = () => (
    <div style={{
      display: 'grid',
      gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))',
      gap: '15px',
      padding: '20px 0'
    }}>
      {[...Array(15)].map((_, index) => (
        <div key={index} className="skeleton-card" style={{ minHeight: '200px' }}>
          <div className="skeleton-image skeleton-shimmer" style={{ height: '200px' }}></div>
        </div>
      ))}
    </div>
  );

  const renderVideosSkeleton = () => (
    <div style={{
      display: 'grid',
      gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))',
      gap: '20px',
      padding: '20px 0'
    }}>
      {[...Array(9)].map((_, index) => (
        <div key={index} className="skeleton-card" style={{ minHeight: '250px' }}>
          <div className="skeleton-image skeleton-shimmer" style={{ height: '150px', borderRadius: '8px' }}></div>
          <div className="skeleton-content">
            <div className="skeleton-title skeleton-shimmer" style={{ width: '90%' }}></div>
            <div className="skeleton-text skeleton-shimmer" style={{ width: '70%' }}></div>
          </div>
        </div>
      ))}
    </div>
  );

  const renderNewsSkeleton = () => (
    <div style={{
      display: 'grid',
      gridTemplateColumns: 'repeat(auto-fill, minmax(220px, 1fr))',
      gap: '20px',
      padding: '20px 0'
    }}>
      {[...Array(6)].map((_, index) => (
        <div key={index} className="skeleton-card" style={{ minHeight: '500px' }}>
          <div className="skeleton-content" style={{ padding: '16px 16px 8px' }}>
            <div className="skeleton-title skeleton-shimmer" style={{ width: '100%', height: '35px' }}></div>
          </div>
          <div className="skeleton-image skeleton-shimmer" style={{ height: '220px' }}></div>
          <div className="skeleton-content">
            <div className="skeleton-text skeleton-shimmer"></div>
            <div className="skeleton-text skeleton-shimmer" style={{ width: '85%' }}></div>
            <div style={{ marginTop: '10px' }}>
              {[...Array(3)].map((_, i) => (
                <div key={i} className="skeleton-text skeleton-shimmer" style={{ 
                  height: '40px', 
                  marginBottom: '6px',
                  borderRadius: '6px'
                }}></div>
              ))}
            </div>
          </div>
        </div>
      ))}
    </div>
  );

  const renderPressSkeleton = () => (
    <div style={{
      display: 'grid',
      gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))',
      gap: '20px',
      padding: '20px 0'
    }}>
      {[...Array(9)].map((_, index) => (
        <div key={index} className="skeleton-card" style={{ minHeight: '400px' }}>
          <div className="skeleton-image skeleton-shimmer" style={{ height: '300px' }}></div>
          <div className="skeleton-content">
            <div className="skeleton-text skeleton-shimmer"></div>
            <div className="skeleton-text skeleton-shimmer" style={{ width: '60%' }}></div>
            <div className="skeleton-button skeleton-shimmer" style={{ width: '120px', marginTop: '10px' }}></div>
          </div>
        </div>
      ))}
    </div>
  );

  return (
    <div className="gallery-loading" style={{ padding: '20px 0' }}>
      {activeTab === "albums" && renderAlbumsSkeleton()}
      {activeTab === "images" && renderImagesSkeleton()}
      {activeTab === "videos" && renderVideosSkeleton()}
      {activeTab === "news" && renderNewsSkeleton()}
      {activeTab === "press" && renderPressSkeleton()}
    </div>
  );
};

export default GalleryLoading;
