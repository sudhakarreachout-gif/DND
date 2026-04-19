"use client";

import { useEffect, useState, useRef } from "react";
import Image from "next/image";
import { animate, stagger } from "motion";

const images = [
  "/assets/hero-1.png",
  "/assets/hero-2.png",
  "/assets/hero-3.png",
];

export default function HeroSection() {
  const [currentImage, setCurrentImage] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentImage((prev) => (prev + 1) % images.length);
    }, 6000);
    return () => clearInterval(timer);
  }, []);

  // Motion One: Cross-fade transition
  useEffect(() => {
    if (!containerRef.current) return;
    const imgs = containerRef.current.querySelectorAll(".hero-img");
    
    imgs.forEach((img, i) => {
      animate(
        img as any,
        { 
          opacity: i === currentImage ? 1 : 0,
          scale: i === currentImage ? 1 : 1.05 
        } as any,
        { duration: 2.5, easing: [0.25, 0.46, 0.45, 0.94] } as any
      );
    });
  }, [currentImage]);

  // Motion One: Sudden but smooth text reveal on mount
  useEffect(() => {
    if (!textRef.current) return;
    const items = textRef.current.querySelectorAll(".hero-reveal");
    
    animate(
      items as any,
      { opacity: [0, 1], y: [40, 0] } as any,
      { delay: stagger(0.2), duration: 1.2, easing: [0.16, 1, 0.3, 1] } as any
    );
  }, []);

  return (
    <section className="relative w-full h-[100svh] overflow-hidden bg-canvas flex items-center justify-center">
      {/* Cinematic Image Sequence */}
      <div ref={containerRef} className="absolute inset-0">
        {images.map((src, i) => (
          <div 
            key={src}
            className="hero-img absolute inset-0 w-full h-full opacity-0"
          >
            <Image
              src={src}
              alt={`DND Salon Experience ${i + 1}`}
              fill
              priority={i === 0}
              className="object-cover w-full h-full"
            />
            {/* Soft Overlay for text legibility */}
            <div className="absolute inset-0 bg-anchor/20 mix-blend-multiply" />
          </div>
        ))}
      </div>

      {/* Hero Content Overlays */}
      <div ref={textRef} className="relative z-10 text-center px-6">
        <h1 className="hero-reveal opacity-0 text-[48px] md:text-[84px] font-cinzel text-canvas tracking-[0.08em] leading-tight mb-6">
          DND <br className="md:hidden" /> SALON & SPA
        </h1>
        <p className="hero-reveal opacity-0 text-[12px] md:text-[14px] font-jost text-canvas/80 tracking-[0.5em] uppercase">
          Floral Artistry. Pristine Wellness.
        </p>
      </div>
      
      {/* Scroll Indicator (Purely Graphical) */}
      <div className="absolute bottom-12 left-1/2 -translate-x-1/2 flex flex-col items-center z-20">
        <div className="w-[0.5px] h-16 bg-gold/40 relative overflow-hidden">
          <div 
            className="absolute top-0 w-full h-1/2 bg-gold animate-bounce"
            id="hero-scroll-bar"
          />
        </div>
      </div>
    </section>
  );
}
