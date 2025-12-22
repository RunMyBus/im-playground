"use client";
import React, { useState } from "react";
import { useTheme } from "@/app/providers/ThemeProvider";

export default function ThemeSwitcher({ variant = "inline" }) {
    const { theme, setTheme } = useTheme();
    const [hovered, setHovered] = useState(null);

    const themes = [
        { key: "light", icon: "☀️", label: "Light Mode" },
        { key: "dark", icon: "🌙", label: "Dark Mode" },
        // { key: "glass", icon: "🪟", label: "Glass Mode" },
    ];

    const wrapperStyle = {
        position: "relative",
        display: "flex",
        alignItems: "center",
        padding: "4px",
        background: "rgba(255,255,255,0.08)",
        borderRadius: "14px",
        gap: "6px",
        userSelect: "none",
        border: "1px solid rgba(255,255,255,0.15)",
        width: "75px",
    };

    const segmentStyle = {
        width: "28px",
        height: "28px",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        cursor: "pointer",
        fontSize: "15px",
        zIndex: 2,
    };

    const sliderStyle = {
        position: "absolute",
        width: "28px",
        height: "28px",
        borderRadius: "8px",
        background: "var(--accent, #4CAF50)",
        transition: "transform 0.25s cubic-bezier(0.42,0,0.58,1)",
        transform: `translateX(${themes.findIndex((t) => t.key === theme) * 34}px)`,
        boxShadow: "0 0 6px rgba(76,175,80,0.6)",
        zIndex: 1,
    };

    const tooltipStyle = {
        position: "absolute",
        top: "-28px",
        padding: "3px 6px",
        fontSize: "11px",
        background: "#111",
        borderRadius: "4px",
        color: "#fff",
        opacity: hovered ? 1 : 0,
        transform: "translateX(-50%)",
        left: hovered !== null ? `${hovered * 34 + 18}px` : 0,
        pointerEvents: "none",
        transition: "opacity 0.2s ease",
        whiteSpace: "nowrap",
    };

    return (
        <div style={wrapperStyle}>
            {/* Tooltip */}
            {hovered !== null && (
                <div style={tooltipStyle}>
                    {themes[hovered].label}
                </div>
            )}

            {/* Active sliding bg */}
            <div style={sliderStyle}></div>

            {themes.map((t, index) => (
                <div
                    key={t.key}
                    onClick={() => setTheme(t.key)}
                    onMouseEnter={() => setHovered(index)}
                    onMouseLeave={() => setHovered(null)}
                    aria-pressed={theme === t.key}
                    style={{
                        ...segmentStyle,
                        color: theme === t.key ? "#fff" : "#ccc",
                    }}
                >
                    {t.icon}
                </div>
            ))}
        </div>
    );
}
