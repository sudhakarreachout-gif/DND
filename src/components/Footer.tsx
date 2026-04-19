"use client";

import { useEffect, useRef } from "react";
import { animate, inView, stagger } from "motion";

export default function Footer() {
  const footerRef = useRef<HTMLElement>(null);

  useEffect(() => {
    if (!footerRef.current) return;
    const items = footerRef.current.querySelectorAll(".footer-item");

    return inView(footerRef.current as any, () => {
      animate(
        items as any,
        { opacity: [0, 1], y: [20, 0] } as any,
        { delay: stagger(0.12), duration: 0.8, easing: [0.16, 1, 0.3, 1] } as any
      );
    }, { amount: 0.2 } as any);
  }, []);

  return (
    <footer 
      ref={footerRef}
      className="bg-canvas py-24 px-6 md:px-20 border-t border-gold/10"
    >
      <div className="max-w-[1320px] mx-auto grid grid-cols-1 md:grid-cols-4 gap-16 md:gap-8">
        
        {/* Branding Column */}
        <div className="md:col-span-2 space-y-6 footer-item opacity-0">
          <h3 className="text-[24px] md:text-[32px] font-cinzel text-text-primary tracking-[0.05em]">
            DND <br /> SALON & SPA
          </h3>
          <p className="text-[12px] font-light text-text-secondary tracking-[0.1em] uppercase max-w-[300px] leading-relaxed">
            The destination is the transformation. A floral sanctuary in the heart of the city.
          </p>
        </div>

        {/* Contact info */}
        <div className="footer-item opacity-0 space-y-6">
          <h4 className="text-[10px] tracking-[0.4em] font-cinzel text-gold uppercase">Contact</h4>
          <div className="space-y-4">
            <p className="text-[13px] font-light text-text-primary leading-loose">
              Shop no 2, Ground Floor, <br />
              Sunshine KAY Golden Square, <br />
              Kokapet, Hyderabad 500075
            </p>
            <p className="text-[13px] font-light text-text-primary">
              +91 97334 34343
            </p>
            <p className="text-[13px] font-light text-text-primary underline underline-offset-8 decoration-gold/30">
              concierge@dndsalon.com
            </p>
          </div>
        </div>

        {/* Social / Links */}
        <div className="footer-item opacity-0 space-y-6">
          <h4 className="text-[10px] tracking-[0.4em] font-cinzel text-gold uppercase">Social</h4>
          <div className="flex flex-col space-y-4">
            <a 
              href="https://www.instagram.com/dndluxurysalon/" 
              target="_blank"
              rel="noopener noreferrer"
              className="text-[13px] font-light text-text-primary hover:text-gold transition-colors duration-300 tracking-[0.05em]"
            >
              Instagram
            </a>
            {["Pinterest", "Journal", "Careers"].map((link) => (
              <a 
                key={link}
                href="#" 
                className="text-[13px] font-light text-text-primary hover:text-gold transition-colors duration-300 tracking-[0.05em]"
              >
                {link}
              </a>
            ))}
          </div>
        </div>

      </div>

      {/* Attribution / Legals */}
      <div className="max-w-[1320px] mx-auto mt-24 pt-10 border-t border-gold/5 flex flex-col md:flex-row justify-between items-center gap-6 footer-item opacity-0">
        <p className="text-[10px] uppercase tracking-[0.2em] text-text-secondary/50 font-light">
          &copy; 2026 DND Salon & Spa. All Rights Reserved.
        </p>
        <div className="flex gap-10">
          <a href="#" className="text-[10px] uppercase tracking-[0.2em] text-text-secondary/50 font-light hover:text-gold transition-colors">Privacy</a>
          <a href="#" className="text-[10px] uppercase tracking-[0.2em] text-text-secondary/50 font-light hover:text-gold transition-colors">Terms</a>
        </div>
      </div>
    </footer>
  );
}
