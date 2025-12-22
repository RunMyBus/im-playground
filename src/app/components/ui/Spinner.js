"use client";

import React from "react";

export default function Spinner({ size = 18, className = "" }) {
  const style = {
    width: size,
    height: size,
  };
  return <span className={`im-spinner ${className}`} style={style} aria-hidden="true" />;
}
