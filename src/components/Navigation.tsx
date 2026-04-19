"use client";

import { useEffect, useState, useRef } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { animate, stagger } from "motion";

export default function Navigation() {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const pathname = usePathname();
  const overlayRef = useRef<HTMLDivElement>(null);
  const linksRef = useRef<HTMLDivElement>(null);

  // Scroll Listener
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Toggle Overlay
  const toggleMenu = () => setIsOpen(!isOpen);

  // ESC key to close
  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === "Escape") setIsOpen(false);
    };
    window.addEventListener("keydown", handleEsc);
    return () => window.removeEventListener("keydown", handleEsc);
  }, []);

  // Motion One: Curtain-drop reveal
  useEffect(() => {
    if (!overlayRef.current) return;

    if (isOpen) {
      animate(
        overlayRef.current as any,
        { clipPath: ["inset(0 0 100% 0)", "inset(0 0 0% 0)"] } as any,
        { duration: 0.6, easing: [0.16, 1, 0.3, 1] } as any
      );

      if (linksRef.current) {
        const links = linksRef.current.querySelectorAll(".nav-link-item");
        animate(
          links as any,
          { opacity: [0, 1], y: [40, 0] } as any,
          { delay: stagger(0.12), duration: 0.8, easing: [0.16, 1, 0.3, 1] } as any
        );
      }
    } else {
      animate(
        overlayRef.current as any,
        { clipPath: "inset(0 0 100% 0)" } as any,
        { duration: 0.6, easing: [0.16, 1, 0.3, 1] } as any
      );
    }
  }, [isOpen]);

  const navLinks = [
    { name: "Our Ethos", href: "/#ethos" },
    { name: "The Atelier", href: "/#atelier" },
    { name: "Our Services", href: "/services" },
    { name: "The Sanctuary", href: "/#gallery" },
  ];

  const isHomePage = pathname === "/";

  const handleLinkClick = (href: string, e: React.MouseEvent) => {
    setIsOpen(false);
    if (href.startsWith("/#") && isHomePage) {
      e.preventDefault();
      const id = href.replace("/#", "");
      const element = document.getElementById(id);
      if (element) {
        element.scrollIntoView({ behavior: "smooth" });
      }
    }
  };

  return (
    <>
      {/* Sleek Horizontal Top-Bar */}
      <nav
        className={`fixed top-0 left-0 w-full z-[200] transition-all duration-700 px-6 md:px-12 py-6 flex items-center justify-between
          ${isScrolled ? "bg-canvas/80 backdrop-blur-lg py-4 border-b border-gold/10 shadow-sm" : "bg-transparent"}
        `}
      >
        {/* Branding (Left) */}
        <Link
          href="/"
          className={`font-cinzel text-[22px] md:text-[26px] tracking-[0.2em] transition-colors duration-500
            ${isScrolled ? "text-text-primary" : "text-canvas md:text-text-primary"}
          `}
        >
          DND
        </Link>

        {/* Desktop Links (Center) */}
        <div className="hidden md:flex items-center gap-12 lg:gap-16">
          {navLinks.map((link) => (
            <Link
              key={link.name}
              href={link.href}
              onClick={(e) => handleLinkClick(link.href, e)}
              className="font-jost text-[11px] tracking-[0.35em] uppercase text-text-primary/70 hover:text-gold transition-colors duration-300 relative group"
            >
              {link.name}
              <span className="absolute -bottom-1 left-0 w-0 h-[0.5px] bg-gold transition-all duration-500 group-hover:w-full" />
            </Link>
          ))}
        </div>

        {/* Right Actions (CTA + Mobile Toggle) */}
        <div className="flex items-center gap-8">
          {/* Desktop CTA */}
          <Link
            href="/#booking"
            onClick={(e) => handleLinkClick("/#booking", e)}
            className={`hidden md:block px-8 py-3 border-[0.5px] border-gold text-[10px] tracking-[0.3em] uppercase transition-all duration-700
              ${isScrolled ? "bg-anchor text-canvas hover:bg-gold" : "bg-transparent text-text-primary hover:bg-gold hover:text-canvas"}
            `}
          >
            Reserve Time
          </Link>

          {/* Mobile Hamburger Toggle Only (md:hidden) */}
          <button
            onClick={toggleMenu}
            className="md:hidden group flex flex-col gap-1.5 p-2"
            aria-label="Toggle Menu"
          >
            <div className={`w-8 h-[0.5px] transition-all duration-500 ${isScrolled ? "bg-text-primary" : "bg-canvas md:bg-text-primary"} ${isOpen ? "rotate-45 translate-y-[3px] bg-canvas!" : ""}`} />
            <div className={`w-6 h-[0.5px] transition-all duration-500 ${isScrolled ? "bg-text-primary" : "bg-canvas md:bg-text-primary"} ${isOpen ? "-rotate-45 -translate-y-[3px] w-8 bg-canvas!" : "group-hover:w-8"}`} />
          </button>
        </div>
      </nav>

      {/* Full-Screen Mobile Overlay */}
      <div
        ref={overlayRef}
        className="fixed inset-0 bg-anchor z-[300] flex items-center justify-center overflow-hidden md:hidden"
        style={{ clipPath: "inset(0 0 100% 0)" }}
      >
        <span className="absolute top-10 right-10 text-[10px] tracking-[0.4em] uppercase text-gold/40 font-cinzel">
          MENU
        </span>

        <div ref={linksRef} className="flex flex-col items-center w-full max-w-2xl px-12">
          {[...navLinks, { name: "Reserve Time", href: "/#booking" }].map((link, i) => (
            <div key={link.name} className="nav-link-item w-full group">
              <div className="flex flex-col items-center">
                <Link
                  href={link.href}
                  onClick={(e) => handleLinkClick(link.href, e)}
                  className="nav-link w-full py-8 text-[28px] tracking-[0.06em] font-cinzel text-canvas text-center transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:translate-x-2"
                >
                  {link.name}
                </Link>
                {i !== navLinks.length && (
                  <div className="w-full h-[0.5px] bg-gold/15 transition-all duration-500 group-hover:bg-gold/60" />
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}
