"use client";

import React from "react";
import Spinner from "./Spinner";

export default function LoadingButton({
  loading = false,
  children,
  onClick,
  type = "button",
  variant = "primary",
  disabled,
  spinnerSize = 16,
  className = "",
  ariaLabel,
}) {
  const variantClass = variant === "secondary" ? "im-loading-button--secondary" : "";
  return (
    <button
      type={type}
      className={`im-loading-button ${variantClass} ${className}`}
      onClick={onClick}
      disabled={disabled || loading}
      aria-busy={loading}
      aria-live="polite"
      aria-label={ariaLabel}
   >
      {loading && <Spinner size={spinnerSize} />}
      <span>{loading ? "Processing..." : children}</span>
      <span className="im-sr-only">{loading ? "Loading" : ""}</span>
    </button>
  );
}
