"use client";

import { useEffect, useRef } from "react";
import { servicesData } from "@/lib/services-data";
import Footer from "@/components/Footer";
import { animate, inView, stagger } from "motion";

export default function ServicesPage() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!containerRef.current) return;
    const sections = containerRef.current.querySelectorAll(".reveal-section");

    // Motion One: staggered reveal for major sections
    sections.forEach((section) => {
      inView(section as any, (element) => {
        animate(
          element as any,
          { opacity: [0, 1], y: [40, 0] } as any,
          { duration: 0.8, easing: [0.16, 1, 0.3, 1] } as any
        );
      }, { amount: 0.2 } as any);
    });
  }, []);

  const renderServiceSection = (category: any, index: number) => (
    <div key={index} className="space-y-12">
      <h3 className="text-[28px] md:text-[36px] font-cinzel text-text-primary text-center tracking-[0.05em]">
        {category.title}
      </h3>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-x-16 gap-y-12">
        {category.items.map((item: any, i: number) => (
          <div key={i} className="space-y-2 group">
            <div className="flex justify-between items-baseline gap-4">
              <h4 className="text-[14px] md:text-[16px] font-jost font-medium tracking-[0.05em] uppercase text-text-primary group-hover:text-gold transition-colors duration-300">
                {item.name}
              </h4>
              <span className="text-[13px] md:text-[14px] font-jost font-semibold text-text-primary/70">
                {item.price}
              </span>
            </div>
            <p className="text-[13px] font-light text-text-secondary leading-relaxed tracking-[0.02em]">
              {item.description}
            </p>
          </div>
        ))}
      </div>
    </div>
  );

  return (
    <main className="min-h-screen bg-canvas pt-32">
      <div ref={containerRef} className="max-w-4xl mx-auto px-6 md:px-12 pb-32">
        
        {/* Intro Section */}
        <section className="reveal-section opacity-0 text-center space-y-8 mb-32">
          <span className="section-label">SERVICES & PRICING</span>
          <h2 className="text-[42px] md:text-[64px] font-cinzel text-text-primary tracking-[0.02em] leading-tight">
            {servicesData.intro.headline}
          </h2>
          <p className="text-[14px] md:text-[16px] font-light text-text-secondary max-w-2xl mx-auto leading-loose tracking-[0.05em]">
            {servicesData.intro.text}
          </p>
        </section>

        {/* Special Promotions */}
        <section className="reveal-section opacity-0 mb-32">
          <div className="bg-anchor/5 p-12 md:p-16 border border-gold/10">
            <h3 className="section-label mb-8 text-center">LIMITED TIME</h3>
            <div className="space-y-6 text-center max-w-xl mx-auto">
              <h4 className="text-[20px] font-cinzel text-text-primary tracking-widest uppercase">
                {servicesData.promotions[0].name}
              </h4>
              <p className="text-[14px] font-light text-text-secondary italic">
                {servicesData.promotions[0].description}
              </p>
              <p className="text-[18px] font-semibold text-gold">
                {servicesData.promotions[0].price}
              </p>
            </div>
          </div>
        </section>

        {/* Women's Section */}
        <section className="reveal-section opacity-0 space-y-24 mb-32">
          <div className="space-y-4 text-center">
            <h2 className="text-[40px] md:text-[54px] font-cinzel text-text-primary">Women</h2>
            <div className="w-12 h-[1px] bg-gold mx-auto" />
          </div>
          <div className="space-y-24">
            {servicesData.women.map((cat, i) => renderServiceSection(cat, i))}
          </div>
          
          <div className="pt-12 text-center">
            <a 
              href="/#booking"
              className="inline-block px-12 py-5 bg-anchor text-canvas font-jost text-[12px] uppercase tracking-[0.3em] transition-all duration-500 hover:bg-gold hover:-translate-y-1 active:translate-y-0"
            >
              Reserve Women&apos;s Time
            </a>
          </div>
        </section>

        <hr className="border-t border-gold/10 my-24" />

        {/* Men's Section */}
        <section className="reveal-section opacity-0 space-y-24">
          <div className="space-y-4 text-center">
            <h2 className="text-[40px] md:text-[54px] font-cinzel text-text-primary">Men</h2>
            <div className="w-12 h-[1px] bg-gold mx-auto" />
          </div>
          <div className="space-y-24">
            {servicesData.men.map((cat, i) => renderServiceSection(cat, i))}
          </div>

          <div className="pt-12 text-center">
            <a 
              href="/#booking"
              className="inline-block px-12 py-5 bg-anchor text-canvas font-jost text-[12px] uppercase tracking-[0.3em] transition-all duration-500 hover:bg-gold hover:-translate-y-1 active:translate-y-0"
            >
              Reserve Men&apos;s Time
            </a>
          </div>
        </section>

      </div>
      <Footer />
    </main>
  );
}
