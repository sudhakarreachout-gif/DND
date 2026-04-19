"use client";

import { useEffect, useRef } from "react";
import { animate, scroll, inView, stagger } from "motion";

export default function EthosSection() {
  const headlineRef = useRef<HTMLHeadingElement>(null);
  const sectionRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!headlineRef.current || !sectionRef.current) return;

    // Motion One: Parallax scroll() mapping [0, 1] to translateY [0, -40px]
    scroll(
      animate(headlineRef.current as any, { y: [0, -40] } as any, { easing: "linear" } as any),
      {
        target: sectionRef.current as any,
        offset: ["start end", "end start"]
      } as any
    );
  }, []);

  // Motion One: Staggered Reveals
  useEffect(() => {
    if (!contentRef.current) return;
    const items = contentRef.current.querySelectorAll(".reveal-item");
    
    return inView(contentRef.current as any, () => {
      animate(
        items as any,
        { opacity: [0, 1], y: [30, 0] } as any,
        { delay: stagger(0.12), duration: 0.8, easing: [0.16, 1, 0.3, 1] } as any
      );
    }, { amount: 0.2 });
  }, []);

  return (
    <section 
      ref={sectionRef}
      id="ethos"
      className="relative flex flex-col items-center justify-center bg-canvas px-6 py-[160px] md:py-[160px]"
    >
      <div ref={contentRef} className="max-w-[1320px] w-full flex flex-col items-center text-center">
        {/* Section Label (Utility Class) */}
        <span className="section-label reveal-item opacity-0">OUR ETHOS</span>

        {/* Scaled Display Headline with Parallax */}
        <h2 
          ref={headlineRef}
          className="reveal-item opacity-0 text-[42px] md:text-[72px] font-cinzel leading-[1.1] text-text-primary tracking-[0.04em] mb-10"
        >
          Quiet Opulence. <br /> Pristine Wellness.
        </h2>

        {/* 0.5px Gold Rule (Handled by Global HR Stylings) */}
        <hr className="reveal-item opacity-0 w-24 mb-10" />

        {/* Body Copy Refinement */}
        <div className="max-w-2xl mx-auto space-y-10">
          <p className="reveal-item opacity-0 text-[13px] md:text-[14px] font-light tracking-[0.15em] leading-[2.4] text-text-secondary uppercase">
            A sanctuary where every detail is a curated expression of refined beauty.
            The luminous alabaster halls of DND Salon & Spa.
          </p>
          <p className="reveal-item opacity-0 text-[13px] md:text-[14px] font-light tracking-[0.15em] leading-[2.4] text-text-secondary uppercase">
            Where the destination is the transformation.
          </p>
        </div>
      </div>
    </section>
  );
}
