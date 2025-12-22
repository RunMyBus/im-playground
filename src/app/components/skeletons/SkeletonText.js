"use client";

import React from "react";
import SkeletonBlock from "./SkeletonBlock";

export default function SkeletonText({ lines = 3, lineHeight = 14, gap = 8, width = "100%" }) {
  const arr = Array.from({ length: lines });
  return (
    <div role="status" aria-label="Loading content" className="fade-in">
      {arr.map((_, i) => (
        <SkeletonBlock
          key={i}
          height={lineHeight}
          width={i === lines - 1 ? (typeof width === "string" ? width : width) : "100%"}
          style={{ marginBottom: i === lines - 1 ? 0 : gap }}
        />)
      )}
    </div>
  );
}
