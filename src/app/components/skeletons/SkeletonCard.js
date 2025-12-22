"use client";

import React from "react";
import SkeletonBlock from "./SkeletonBlock";
import SkeletonText from "./SkeletonText";

export default function SkeletonCard({ imageHeight = 160, showBlogDetails = false }) {
  if (showBlogDetails) {
    // Enhanced blog skeleton with more visible sections matching actual blog card
    return (
      <div 
        className="fade-in blog-skeleton-card" 
        style={{ 
          background: "#fff", 
          borderRadius: 8, 
          overflow: "hidden",
          boxShadow: "6px 4px 20px 0px #00000024",
          marginTop: "30px",
          minHeight: "390px"
        }}
      >
        {/* Image placeholder */}
        <div style={{ width: "100%", height: imageHeight, backgroundColor: "#e0e0e0", position: "relative" }}>
          <SkeletonBlock height={imageHeight} rounded={0} />
        </div>
        
        {/* Content section matching actual blog structure */}
        <div style={{ padding: 15 }}>
          {/* Title placeholder - showing "TITLE" text */}
          <div style={{ marginBottom: 15 }}>
            <div style={{ 
              backgroundColor: "#f0f0f0", 
              height: 24, 
              borderRadius: 4,
              marginBottom: 8,
              width: "90%",
              display: "flex",
              alignItems: "center",
              paddingLeft: 10,
              fontWeight: 600,
              fontSize: 14,
              color: "#bbb"
            }}>
              TITLE
            </div>
            <SkeletonBlock height={20} width="85%" style={{ marginBottom: 6 }} />
            <SkeletonBlock height={20} width="60%" />
          </div>
          
          {/* Description/Short Description placeholder */}
          <div style={{ marginTop: 15, marginBottom: 15 }}>
            <div style={{ 
              backgroundColor: "#f5f5f5", 
              height: 18, 
              borderRadius: 4,
              marginBottom: 8,
              width: "95%",
              display: "flex",
              alignItems: "center",
              paddingLeft: 10,
              fontSize: 12,
              color: "#ccc"
            }}>
              DESCRIPTION
            </div>
            <SkeletonBlock height={14} width="100%" style={{ marginBottom: 6 }} />
            <SkeletonBlock height={14} width="95%" style={{ marginBottom: 6 }} />
            <SkeletonBlock height={14} width="70%" />
          </div>
          
          {/* Date and read time placeholders */}
          <div style={{ display: "flex", justifyContent: "space-between", marginTop: 20, paddingTop: 10, borderTop: "1px solid #f0f0f0" }}>
            <div style={{ display: "flex", alignItems: "center", gap: 5 }}>
              <span style={{ fontSize: 12, color: "#ddd" }}>📅</span>
              <SkeletonBlock height={14} width="85px" />
            </div>
            <div style={{ display: "flex", alignItems: "center", gap: 5 }}>
              <span style={{ fontSize: 12, color: "#ddd" }}>⏱️</span>
              <SkeletonBlock height={14} width="75px" />
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Default skeleton card
  return (
    <div className="fade-in" style={{ background: "#fff", borderRadius: 8, padding: 12, boxShadow: "0 1px 4px rgba(0,0,0,0.08)", height: "100%" }}>
      <SkeletonBlock height={imageHeight} rounded={8} />
      <div style={{ height: 12 }} />
      <SkeletonText lines={2} />
      <div style={{ height: 8 }} />
      <SkeletonBlock height={12} width="60%" />
    </div>
  );
}
