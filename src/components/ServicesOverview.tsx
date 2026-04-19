"use client";

import Image from "next/image";
import Link from "next/link";

const overviewServices = [
  {
    title: "Hair Artistry",
    description: "Architectural cuts and luminous coloring tailored to your essence.",
    image: "/assets/service-hair.png",
  },
  {
    title: "Nail Rituals",
    description: "Precision artistry in rose gold and minimal blush tones.",
    image: "/assets/service-nails.png",
  },
  {
    title: "Skin Therapy",
    description: "Botanical sanctuary treatments for profound facial stillness.",
    image: "/assets/service-spa.png",
  }
];

export default function ServicesOverview() {
  return (
    <section className="bg-canvas py-[160px]">
      <div className="max-w-[1320px] mx-auto px-6 md:px-20">
        
        {/* Header */}
        <div className="text-center md:text-left mb-24 max-w-2xl">
          <span className="section-label mb-6">OUR SERVICES</span>
          <h2 className="text-[36px] md:text-[54px] font-cinzel text-text-primary leading-[1.1] tracking-[0.04em] mb-6">
            Curated Treatments. <br /> Elevated Care.
          </h2>
          <p className="text-[14px] md:text-[16px] font-light text-text-secondary leading-loose tracking-[0.05em]">
            Every service at DND is designed as a ritual — not just a treatment. 
            A dedicated moment of mastery focused entirely on your restoration.
          </p>
        </div>

        {/* 3-Column Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-x-12 lg:gap-x-20 gap-y-16">
          {overviewServices.map((service, i) => (
            <div key={i} className="group">
              <div className="editorial-frame relative aspect-[3/4] w-full mb-10 overflow-hidden">
                <Image
                  src={service.image}
                  alt={service.title}
                  fill
                  className="object-cover transition-transform duration-1000 group-hover:scale-105"
                />
              </div>
              <div className="space-y-3">
                <h3 className="text-[18px] md:text-[20px] font-cinzel text-text-primary tracking-widest uppercase">
                  {service.title}
                </h3>
                <p className="text-[14px] font-light text-text-secondary leading-relaxed tracking-[0.02em]">
                  {service.description}
                </p>
                <div className="pt-4">
                  <Link 
                    href="/services" 
                    className="text-[11px] font-jost tracking-[0.3em] uppercase text-gold hover:text-text-primary transition-colors duration-500"
                  >
                    View Details
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Global CTA Button */}
        <div className="mt-24 flex justify-center">
          <Link 
            href="/services" 
            className="px-12 py-4 border-[0.5px] border-gold text-[11px] tracking-[0.4em] uppercase transition-all duration-700 hover:bg-gold hover:text-canvas"
          >
            Discover the Full Collection
          </Link>
        </div>
      </div>
    </section>
  );
}
