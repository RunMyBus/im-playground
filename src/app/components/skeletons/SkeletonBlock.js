"use client";

import React from "react";

export default function SkeletonBlock({ width = "100%", height = 16, rounded = 6, className = "", style = {} }) {
  const mergedStyle = { width, height, borderRadius: rounded, ...style };
  return <div className={`skeleton ${className}`} style={mergedStyle} aria-hidden="true" />;
}
