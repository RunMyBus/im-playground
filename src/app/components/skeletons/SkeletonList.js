"use client";

import React from "react";
import SkeletonCard from "./SkeletonCard";

export default function SkeletonList({ count = 6, imageHeight = 160, showBlogDetails = false }) {
  const items = Array.from({ length: count });
  return (
    <div className="row fade-in" aria-live="polite" aria-busy>
      {items.map((_, i) => (
        <div className="col-md-4 col-sm-6" key={i} style={{ marginBottom: showBlogDetails ? 0 : 16 }}>
          <SkeletonCard imageHeight={imageHeight} showBlogDetails={showBlogDetails} />
        </div>
      ))}
    </div>
  );
}
