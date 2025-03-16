/**
 * @module GlowingBackground
 * @description A component that renders a natural light cone from the top with smooth gradients in all directions
 * @copyright 2025 Pranav Patil
 */

import React from "react";

/**
 * Props for the GlowingBackground component
 */
interface GlowingBackgroundProps {
  /**
   * Intensity of the glow (0-1)
   * @default 0.15
   */
  intensity?: number;
  
  /**
   * Base color of the glow in RGB format
   * @default "100, 150, 255"
   */
  color?: string;
  
  /**
   * How wide the glow should be (percentage of screen width)
   * @default 80
   */
  width?: number;
  
  /**
   * How far down the screen the glow should reach (percentage of screen height)
   * @default 90
   */
  height?: number;
}

/**
 * A component that renders a natural light cone from the top with smooth gradients in all directions
 * 
 * @example
 * // Basic usage
 * <GlowingBackground />
 * 
 * @example
 * // With custom properties
 * <GlowingBackground 
 *   intensity={0.2}
 *   color="200, 100, 255"
 *   width={90}
 *   height={100}
 * />
 */
export default function GlowingBackground({
  intensity = 0.15,
  color = "100, 150, 255",
  width = 80,
  height = 90
}: GlowingBackgroundProps = {}) {
  return (
    <div 
      className="absolute inset-0 z-0 pointer-events-none overflow-hidden"
      aria-hidden="true"
    >
      {/* Main glow effect */}
      <div 
        className="absolute top-0 left-0 w-full h-full"
        style={{
          background: `
            radial-gradient(
              ellipse at top,
              rgba(${color}, ${intensity}) 0%,
              rgba(${color}, ${intensity * 0.7}) 25%,
              rgba(${color}, ${intensity * 0.4}) 50%,
              rgba(${color}, ${intensity * 0.1}) 75%,
              rgba(${color}, 0) 100%
            )
          `,
          width: "100%",
          height: `${height}%`,
          maxWidth: `${width}%`,
          marginLeft: `${(100 - width) / 2}%`,
          filter: "blur(40px)"
        }}
      />
      
      {/* Secondary softer glow for better blending */}
      <div 
        className="absolute top-0 left-0 w-full h-full"
        style={{
          background: `
            radial-gradient(
              circle at top,
              rgba(${color}, ${intensity * 0.8}) 0%,
              rgba(${color}, ${intensity * 0.4}) 30%,
              rgba(${color}, ${intensity * 0.2}) 60%,
              rgba(${color}, 0) 100%
            )
          `,
          width: "100%",
          height: `${height * 0.8}%`,
          maxWidth: `${width * 1.2}%`,
          marginLeft: `${(100 - width * 1.2) / 2}%`,
          filter: "blur(60px)"
        }}
      />
      
      {/* Top highlight for more intensity at the source */}
      <div 
        className="absolute top-0 left-0 w-full"
        style={{
          background: `
            radial-gradient(
              circle at top,
              rgba(${color}, ${intensity * 1.5}) 0%,
              rgba(${color}, ${intensity * 0.5}) 40%,
              rgba(${color}, 0) 70%
            )
          `,
          width: "100%",
          height: `${height * 0.4}%`,
          maxWidth: `${width * 0.7}%`,
          marginLeft: `${(100 - width * 0.7) / 2}%`,
          filter: "blur(30px)"
        }}
      />
    </div>
  );
}