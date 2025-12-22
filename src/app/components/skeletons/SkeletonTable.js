"use client";
import React from "react";
import "./skeleton.css";

/**
 * Skeleton Table Component
 * Used for loading states of table/list data (orders, certificates, etc.)
 */
const SkeletonTable = ({ rows = 5, columns = 4 }) => {
  return (
    <div className="skeleton-table">
      <div className="skeleton-table-header">
        {[...Array(columns)].map((_, index) => (
          <div key={index} className="skeleton-table-cell skeleton-shimmer"></div>
        ))}
      </div>
      {[...Array(rows)].map((_, rowIndex) => (
        <div key={rowIndex} className="skeleton-table-row">
          {[...Array(columns)].map((_, colIndex) => (
            <div
              key={colIndex}
              className="skeleton-table-cell skeleton-shimmer"
              style={{ width: colIndex === 0 ? "60%" : "100%" }}
            ></div>
          ))}
        </div>
      ))}
    </div>
  );
};

export default SkeletonTable;
