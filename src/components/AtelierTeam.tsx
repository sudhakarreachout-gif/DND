"use client";

import Image from "next/image";

const teamMembers = [
  {
    name: "Arthi Varma",
    role: "Master Sculptor",
    description: "With over fifteen years of international experience, Ayaan is renowned for his architectural approach to form and texture. His signature philosophy centers on the dialogue between individual bone structure and movement, ensuring every cut is a unique expression of technical mastery and lived-in elegance.",
    image: "/assets/team-1.png"
  },
  {
    name: "Daniel George",
    role: "Artistry Director",
    description: "George brings a meticulous eye for tonal harmony and luminous textures to the DND sanctuary. Specializing in high-dimension editorial coloring, her work is a study in cinematic color theory, designed to elevate natural radiance while maintaining the profound health and integrity of your hair.",
    image: "/assets/team-2.png"
  },
  {
    name: "Rohani Shetty",
    role: "Wellness Curator",
    description: "Rohani leads our holistic wellness initiatives with a serene focus on botanical restoration. His curated treatments are designed as restorative rituals, blending ancestral wisdom with modern scientific precision to deliver profound results that extend far beyond the surface of the sanctuary.",
    image: "/assets/team-3.png"
  }
];

export default function AtelierTeam() {
  return (
    <section
      id="atelier"
      className="relative bg-canvas py-[160px] overflow-hidden"
    >
      <div className="max-w-[1320px] mx-auto px-6 md:px-20 mb-20 text-center md:text-left">
        <span className="section-label mb-4 block">OUR ARTISTRY</span>
        <h2 className="text-[36px] md:text-[54px] font-cinzel text-text-primary leading-[1.1] tracking-[0.04em]">
          The Atelier Team.
        </h2>
      </div>

      <div className="max-w-[1320px] mx-auto px-6 md:px-20">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-x-12 lg:gap-x-20 gap-y-24">
          {teamMembers.map((member, i) => (
            <div key={i} className="flex flex-col items-center md:items-start text-center md:text-left">
              {/* Portrait Frame */}
              <div className="editorial-frame relative aspect-[3/4.5] w-full mb-10 overflow-hidden shadow-sm">
                <Image
                  src={member.image}
                  alt={member.name}
                  fill
                  className="object-cover"
                />
              </div>

              {/* Content */}
              <div className="space-y-4 max-w-sm">
                <div className="space-y-1">
                  <h3 className="text-[20px] md:text-[24px] font-cinzel text-text-primary tracking-wide">
                    {member.name}
                  </h3>
                  <p className="text-[11px] font-jost font-medium tracking-[0.4em] text-gold uppercase">
                    {member.role}
                  </p>
                </div>
                <p className="text-[14px] font-light text-text-secondary leading-[1.8] tracking-[0.02em]">
                  {member.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
