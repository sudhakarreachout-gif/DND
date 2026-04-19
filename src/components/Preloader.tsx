"use client";

import { useEffect, useState, useRef } from "react";
import { animate } from "motion";
import Script from "next/script";

export default function Preloader() {
  const [isLoading, setIsLoading] = useState(true);
  const containerRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Lock scroll on mount
    document.body.style.overflow = "hidden";

    // Premium dwell time (2.5s)
    const timer = setTimeout(() => {
      exitSequence();
    }, 2800);

    return () => {
      document.body.style.overflow = "auto";
      clearTimeout(timer);
    };
  }, []);

  const exitSequence = async () => {
    if (!containerRef.current || !contentRef.current) return;

    // Fade out content first
    await animate(
      contentRef.current as any,
      { opacity: [1, 0], y: [0, -20] } as any,
      { duration: 0.8, easing: [0.16, 1, 0.3, 1] } as any
    ).finished;

    // Wipe up the whole container
    await animate(
      containerRef.current as any,
      { clipPath: ["inset(0% 0 0% 0)", "inset(0% 0 100% 0)"] } as any,
      { duration: 1.0, easing: [0.77, 0, 0.175, 1] } as any
    ).finished;

    setIsLoading(false);
    document.body.style.overflow = "auto";
  };

  if (!isLoading) return null;

  return (
    <>
      <Script 
        src="https://unpkg.com/@lottiefiles/dotlottie-wc@0.9.10/dist/dotlottie-wc.js" 
        type="module"
        strategy="beforeInteractive"
      />
      
      <div 
        ref={containerRef}
        className="fixed inset-0 z-[9999] bg-canvas flex flex-col items-center justify-center overflow-hidden"
        style={{ clipPath: "inset(0% 0 0% 0)" }}
      >
        <div 
          ref={contentRef}
          className="flex flex-col items-center space-y-12"
        >
          {/* BIG DND Branding */}
          <h1 className="text-[80px] md:text-[140px] font-cinzel text-text-primary tracking-[0.4em] opacity-40 select-none">
            DND
          </h1>

          {/* dotLottie Animation */}
          <div className="w-[240px] h-[240px] md:w-[320px] md:h-[320px] flex items-center justify-center">
            {/* @ts-ignore */}
            <dotlottie-wc 
              src="https://lottie.host/4d2674b1-9f22-41bd-97c8-6414644b0864/oG7ddxxgGb.lottie" 
              autoplay 
              loop 
              style={{ width: "100%", height: "100%" }}
            />
          </div>

          {/* Loading Statement */}
          <div className="space-y-4 text-center">
            <p className="text-[12px] md:text-[14px] font-jost font-light tracking-[0.6em] uppercase text-text-secondary animate-pulse">
              Articulating Sanctuary
            </p>
            <div className="w-12 h-[0.5px] bg-gold/40 mx-auto" />
          </div>
        </div>

        {/* Decorative Background Element */}
        <div className="absolute bottom-12 text-[10px] tracking-[0.4em] uppercase text-gold/20 font-cinzel">
          EST. 2026 DIGITAL FLAGSHIP
        </div>
      </div>
    </>
  );
}
