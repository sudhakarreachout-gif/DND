"use client";

import { useState, useRef, useEffect } from "react";
import Image from "next/image";
import { animate, inView, stagger } from "motion";

const images = [
  { 
    src: "/assets/hero-1.png", 
    label: "01 — LUMINOUS",
    story: "A study in multi-tonal light. This global transition mirrors the golden hour, designed to move with the singular rhythm of the client."
  },
  { 
    src: "/assets/hero-3.png", 
    label: "02 — SANCTUARY",
    story: "Precision in stillness. Our spa environment is an architectural dialogue between ivory stone and soft, diffused warmth." 
  },
  { 
    src: "/assets/service-hair.png", 
    label: "03 — MASTERY",
    story: "Every cut is a structural assessment. Here, form follows function, creating a silhouette that is both effortless and deliberate."
  },
  { 
    src: "/assets/hero-2.png", 
    label: "04 — ORGANIC",
    story: "We believe in the artistry of the environment. Our signature floral installations are refreshed daily, grounding the sanctuary in organic life."
  },
  { 
    src: "/assets/service-nails.png", 
    label: "05 — GEOMETRY",
    story: "The geometry of elegance. Minimalist blush tones meet architectural precision, defining the DND approach to modern detail."
  },
  { 
    src: "/assets/service-spa.png", 
    label: "06 — CHROMA",
    story: "Color theory in action. We curate shades that don't just sit on the hair—they articulate the underlying health and texture."
  },
];

export default function MasonryGallery() {
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [originRect, setOriginRect] = useState<DOMRect | null>(null);
  const lightboxRef = useRef<HTMLDivElement>(null);
  const overlayRef = useRef<HTMLDivElement>(null);
  const gridRef = useRef<HTMLDivElement>(null);

  const handleImageClick = (src: string, e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    setOriginRect(rect);
    setSelectedImage(src);
  };

  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === "Escape") setSelectedImage(null);
    };
    window.addEventListener("keydown", handleEsc);
    return () => window.removeEventListener("keydown", handleEsc);
  }, []);

  // Motion One: Staggered Reveals
  useEffect(() => {
    if (!gridRef.current) return;
    const items = gridRef.current.querySelectorAll(".gallery-item");
    
    return inView(gridRef.current as any, () => {
      animate(
        items as any,
        { opacity: [0, 1], y: [40, 0] } as any,
        { delay: stagger(0.12), duration: 0.8, easing: [0.16, 1, 0.3, 1] } as any
      );
    }, { amount: 0.1 } as any);
  }, []);

  useEffect(() => {
    if (selectedImage && originRect && lightboxRef.current && overlayRef.current) {
      animate(overlayRef.current as any, { opacity: [0, 1] } as any, { duration: 0.5 } as any);
      
      const targetWidth = Math.min(window.innerWidth * 0.85, 1100);
      const targetHeight = Math.min(window.innerHeight * 0.8, 800);
      
      animate(
        lightboxRef.current as any,
        {
          top: [originRect.top + "px", "50%"],
          left: [originRect.left + "px", "50%"],
          width: [originRect.width + "px", targetWidth + "px"],
          height: [originRect.height + "px", targetHeight + "px"],
          transform: ["translate(0, 0)", "translate(-50%, -50%)"],
        } as any,
        { duration: 0.7, easing: [0.16, 1, 0.3, 1] } as any
      );
    }
  }, [selectedImage, originRect]);

  return (
    <section id="gallery" className="bg-canvas py-[160px] px-6 md:px-20">
      <div className="max-w-[1320px] mx-auto">
        <div className="mb-32 text-center md:text-left">
            <span className="section-label">THE SANCTUARY</span>
            <h2 className="text-[36px] md:text-[54px] font-cinzel text-text-primary leading-[1.1] tracking-[0.04em]">
              Capturing Stillness.
            </h2>
        </div>

        {/* Standardized 3:4 Editorial Grid */}
        <div 
          ref={gridRef} 
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-12 lg:gap-x-16 gap-y-24"
        >
          {images.map((image, i) => (
            <div
              key={i}
              className="gallery-item flex flex-col opacity-0 group cursor-pointer"
              onClick={(e) => handleImageClick(image.src, e)}
            >
                {/* 3:4 Frame */}
                <div className="editorial-frame relative aspect-[3/4] w-full overflow-hidden mb-8 transition-transform duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-[1.01]">
                    <Image
                        src={image.src}
                        alt={`Gallery identification ${i + 1}`}
                        fill
                        className="object-cover transition-transform duration-1000 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-105"
                    />
                    {/* Subtle Overlay Fade */}
                    <div className="absolute inset-0 bg-anchor/5 opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
                </div>

                {/* Editorial Story - Permanent Integration */}
                <div className="space-y-4 pr-4">
                  <span className="text-[10px] font-jost font-medium tracking-[0.45em] text-gold uppercase block">
                    {image.label}
                  </span>
                  <p className="text-[13px] font-jost font-light text-text-secondary leading-[1.8] tracking-[0.02em]">
                    {image.story}
                  </p>
                </div>
            </div>
          ))}
        </div>
      </div>

      {selectedImage && (
        <div className="fixed inset-0 z-[500] flex items-center justify-center pointer-events-none">
          <div
            ref={overlayRef}
            onClick={() => setSelectedImage(null)}
            className="absolute inset-0 bg-anchor/90 backdrop-blur-md opacity-0 pointer-events-auto"
          />
          <div
            ref={lightboxRef}
            className="fixed z-[501] editorial-frame overflow-hidden pointer-events-auto"
            style={{ 
              top: originRect?.top, 
              left: originRect?.left, 
              width: originRect?.width, 
              height: originRect?.height,
              transform: "translate(0, 0)"
            }}
          >
            <Image
              src={selectedImage}
              alt="Selected Gallery Image"
              fill
              className="object-cover"
            />
          </div>
          <button 
            onClick={() => setSelectedImage(null)}
            className="fixed bottom-12 text-canvas text-[10px] tracking-[0.45em] z-[502] pointer-events-auto uppercase font-jost bg-transparent border-none outline-none cursor-pointer hover:text-gold transition-colors"
          >
            ESC TO CLOSE
          </button>
        </div>
      )}
    </section>
  );
}
