"use client";
import React from "react";

const LoaderWhite = () => {
  return (
    <div
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        width: "100%",
        height: "100%",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "rgba(255, 255, 255, 0.8)", // Semi-transparent white background
        zIndex: 9999,
      }}
    >
      <div
        style={{
          width: "50px",
          height: "50px",
          border: "5px solid rgba(0, 0, 0, 0.2)",
          borderTop: "5px solid black",
          borderRadius: "50%",
          animation: "spin 1s linear infinite",
        }}
      ></div>
      <style dangerouslySetInnerHTML={{
        __html: `
          @keyframes spin {
            0% {
              transform: rotate(0deg);
            }
            100% {
              transform: rotate(360deg);
            }
          }
        `
      }} />
    </div>
  );
};

export default LoaderWhite;
