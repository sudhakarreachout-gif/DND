"use client";

import { useEffect, useState, useRef } from "react";

export default function CustomCursor() {
  const dotRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);
  const [isHovering, setIsHovering] = useState(false);

  useEffect(() => {
    const dot = dotRef.current;
    const ring = ringRef.current;
    if (!dot || !ring) return;

    let mouseX = 0;
    let mouseY = 0;
    let ringX = 0;
    let ringY = 0;

    const onMouseMove = (e: MouseEvent) => {
      mouseX = e.clientX;
      mouseY = e.clientY;

      // Dot is immediate
      dot.style.transform = `translate3d(${mouseX}px, ${mouseY}px, 0) translate(-50%, -50%)`;
      
      // Check for clickable elements
      const target = e.target as HTMLElement;
      const isClickable = !!(
        target.tagName === "A" || 
        target.tagName === "BUTTON" || 
        target.closest("button") || 
        target.closest("a") ||
        window.getComputedStyle(target).cursor === "pointer"
      );
      
      setIsHovering(isClickable);
    };

    const animate = () => {
      // 0.1s lag implies social interpolation
      // ring moves toward mouse position by a factor per frame
      const lerp = 0.15; // Adjusted for roughly 0.1s feel @ 60fps
      ringX += (mouseX - ringX) * lerp;
      ringY += (mouseY - ringY) * lerp;

      ring.style.transform = `translate3d(${ringX}px, ${ringY}px, 0) translate(-50%, -50%)`;
      requestAnimationFrame(animate);
    };

    window.addEventListener("mousemove", onMouseMove);
    const animationId = requestAnimationFrame(animate);

    return () => {
      window.removeEventListener("mousemove", onMouseMove);
      cancelAnimationFrame(animationId);
    };
  }, []);

  return (
    <>
      <div 
        ref={dotRef} 
        id="custom-cursor-dot" 
        className="fixed top-0 left-0"
      />
      <div 
        ref={ringRef} 
        id="custom-cursor-ring" 
        className={`fixed top-0 left-0 ${isHovering ? "active" : ""}`}
      />
    </>
  );
}
