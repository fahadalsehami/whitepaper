import React from 'react';

export default function SubchapterNumberSVG({ number, opacity = 0.15, size = 64, isLightTheme = false }: { number: string, opacity?: number, size?: number, isLightTheme?: boolean }) {
  return (
    <svg width={size} height={110} viewBox="0 0 110 110" fill="none" xmlns="http://www.w3.org/2000/svg">
      <text
        x="50%"
        y="55%"
        textAnchor="middle"
        dominantBaseline="middle"
        fontFamily="inherit"
        fontWeight="700"
        fontSize={size}
        stroke={isLightTheme ? "#000000" : "#fff"}
        strokeWidth={2.5}
        fill="none"
        opacity={opacity}
      >
        {number}
      </text>
    </svg>
  );
} 