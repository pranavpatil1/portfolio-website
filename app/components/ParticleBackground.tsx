/**
 * @module ParticleBackground
 * @description A lightweight component that renders floating snow-like particles using canvas
 * @copyright 2025 Pranav Patil
 */

import { useEffect, useRef } from "react";

/**
 * Particle interface for the floating snow-like elements
 */
interface Particle {
  x: number;
  y: number;
  size: number;
  speedX: number;
  speedY: number;
  opacity: number;
}

/**
 * Props for the ParticleBackground component
 */
interface ParticleBackgroundProps {
  /**
   * Number of particles to render
   * @default 50
   */
  particleCount?: number;
  
  /**
   * Maximum size of particles in pixels
   * @default 4
   */
  maxSize?: number;
  
  /**
   * Minimum size of particles in pixels
   * @default 1
   */
  minSize?: number;
  
  /**
   * Maximum opacity of particles (0-1)
   * @default 0.5
   */
  maxOpacity?: number;
  
  /**
   * Minimum opacity of particles (0-1)
   * @default 0.2
   */
  minOpacity?: number;
}

/**
 * A lightweight component that renders floating snow-like particles using canvas at 30 FPS
 * Uses refs to manage particles and animation state to avoid unnecessary re-renders
 */
export default function ParticleBackground({
  particleCount = 50,
  maxSize = 4,
  minSize = 1,
  maxOpacity = 0.5,
  minOpacity = 0.2
}: ParticleBackgroundProps = {}) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const particlesRef = useRef<Particle[]>([]);
  const animationRef = useRef<number | null>(null);
  const lastUpdateTimeRef = useRef<number>(0);
  const FPS = 30;
  const frameDelay = 1000 / FPS;
  
  // Initialize particles and set up animation
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    
    // Initialize canvas
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    
    // Set canvas dimensions
    const resizeCanvas = () => {
      if (canvas) {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
      }
    };
    
    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);
    
    // Initialize particles
    particlesRef.current = [];
    for (let i = 0; i < particleCount; i++) {
      particlesRef.current.push({
        x: Math.random() * window.innerWidth,
        y: Math.random() * window.innerHeight,
        size: Math.random() * (maxSize - minSize) + minSize,
        speedX: Math.random() * 0.5 - 0.25,
        speedY: Math.random() * 0.5 - 0.1,
        opacity: Math.random() * (maxOpacity - minOpacity) + minOpacity
      });
    }
    
    // Animation function
    const animate = (timestamp: number) => {
      if (!ctx || !canvas) return;
      
      // Throttle to target FPS
      if (timestamp - lastUpdateTimeRef.current < frameDelay) {
        animationRef.current = requestAnimationFrame(animate);
        return;
      }
      
      lastUpdateTimeRef.current = timestamp;
      
      // Clear canvas
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      // Update and draw particles
      particlesRef.current.forEach(particle => {
        // Draw particle
        ctx.beginPath();
        ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(255, 255, 255, ${particle.opacity})`;
        ctx.fill();
        
        // Update position
        particle.x += particle.speedX;
        particle.y += particle.speedY;
        
        // Wrap around screen
        if (particle.x < 0) particle.x = canvas.width;
        if (particle.x > canvas.width) particle.x = 0;
        if (particle.y < 0) particle.y = canvas.height;
        if (particle.y > canvas.height) particle.y = 0;
      });
      
      animationRef.current = requestAnimationFrame(animate);
    };
    
    // Start animation
    animationRef.current = requestAnimationFrame(animate);
    
    // Cleanup
    return () => {
      window.removeEventListener('resize', resizeCanvas);
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, [particleCount, maxSize, minSize, maxOpacity, minOpacity]);
  
  return (
    <canvas 
      ref={canvasRef} 
      className="absolute top-0 left-0 w-full h-full z-10 pointer-events-none"
      aria-hidden="true"
    />
  );
}