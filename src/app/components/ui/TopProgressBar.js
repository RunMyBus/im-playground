"use client";

import React, { useEffect, useRef } from "react";
import { usePathname, useSearchParams } from "next/navigation";

// Lightweight top progress bar for route transitions (no external deps)
export default function TopProgressBar() {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const barRef = useRef(null);
  const timerRef = useRef(null);

  useEffect(() => {
    // on route change start
    if (barRef.current) {
      barRef.current.style.width = "0%";
      barRef.current.style.opacity = "1";
      // simulate progress
      let progress = 0;
      clearInterval(timerRef.current);
      timerRef.current = setInterval(() => {
        progress = Math.min(progress + Math.random() * 20, 85);
        if (barRef.current) barRef.current.style.width = `${progress}%`;
      }, 200);
    }

    // on route change complete
    const complete = () => {
      if (barRef.current) {
        barRef.current.style.width = "100%";
        setTimeout(() => {
          if (barRef.current) {
            barRef.current.style.opacity = "0";
            barRef.current.style.width = "0%";
          }
        }, 250);
      }
      clearInterval(timerRef.current);
    };

    // complete shortly after render
    const id = setTimeout(complete, 600);
    return () => {
      clearTimeout(id);
      clearInterval(timerRef.current);
    };
  }, [pathname, searchParams]);

  return <div className="im-topbar" ref={barRef} aria-hidden="true" />;
}
