"use client";

import { useState, useRef, useEffect } from "react";
import { animate, inView } from "motion";

const steps = [
  {
    id: "treatment",
    question: "What are we treating today?",
    options: ["Hair", "Nails", "Spa", "All of the above"],
  },
  {
    id: "date",
    question: "When shall we expect you?",
    type: "date",
  },
  {
    id: "contact",
    question: "How may we address you?",
    type: "contact", // Custom handling for name + phone
  },
];

export default function BookingForm() {
  const [currentStep, setCurrentStep] = useState(0);
  const [formData, setFormData] = useState({
    treatment: "",
    date: "",
    name: "",
    phone: "",
  });

  const sectionRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  // Motion One: Scroll reveal for section
  useEffect(() => {
    if (!sectionRef.current) return;
    return inView(sectionRef.current, () => {
      setIsVisible(true);
      return () => setIsVisible(false);
    }, { amount: 0.3 });
  }, []);

  // Motion One: Step transition animation
  useEffect(() => {
    if (!contentRef.current) return;

    // Physical motion transition: Fade + Slide Up
    animate(
      contentRef.current as any,
      { opacity: [0, 1], y: [30, 0] } as any,
      { duration: 0.8, easing: [0.16, 1, 0.3, 1] } as any
    );
  }, [currentStep]);

  const nextStep = () => {
    if (currentStep < steps.length - 1) {
      setCurrentStep(currentStep + 1);
    }
  };

  const handleOptionSelect = (option: string) => {
    setFormData({ ...formData, treatment: option });
    setTimeout(nextStep, 600); // Cinematic delay
  };

  return (
    <section 
      id="booking"
      ref={sectionRef}
      className={`relative min-h-screen flex items-center justify-center transition-colors duration-1000 ease-in-out ${
        isVisible ? "bg-anchor" : "bg-canvas"
      }`}
    >
      <div className="max-w-2xl w-full px-8 text-center">
        <div ref={contentRef}>
          <h2 className={`text-[32px] md:text-[48px] font-cinzel mb-20 leading-tight transition-colors duration-1000 ${
            isVisible ? "text-canvas" : "text-text-primary"
          }`}>
            {steps[currentStep].question}
          </h2>

          {/* Step 1: Options (Pill Buttons) */}
          {steps[currentStep].id === "treatment" && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              {steps[currentStep].options?.map((option) => (
                <button
                  key={option}
                  onClick={() => handleOptionSelect(option)}
                  className={`px-10 py-5 rounded-full border-[0.5px] transition-all duration-500 text-[11px] tracking-[0.3em] font-jost uppercase ${
                    formData.treatment === option 
                      ? "bg-gold border-gold text-canvas" 
                      : isVisible 
                        ? "border-canvas/20 text-canvas hover:border-gold hover:text-gold" 
                        : "border-divider text-text-primary hover:border-gold hover:text-gold"
                  }`}
                >
                  {option}
                </button>
              ))}
            </div>
          )}

          {/* Step 2: Date Picker */}
          {steps[currentStep].id === "date" && (
            <div className="flex flex-col items-center">
              <input
                type="date"
                onChange={(e) => {
                  setFormData({ ...formData, date: e.target.value });
                  setTimeout(nextStep, 800);
                }}
                className={`bg-transparent border-none text-2xl md:text-5xl font-cinzel text-center outline-none focus:ring-0 transition-colors ${
                  isVisible ? "text-canvas" : "text-text-primary"
                }`}
                style={{ 
                  boxShadow: "0 1px 0 0 rgba(212, 175, 55, 0.4)",
                }}
              />
            </div>
          )}

          {/* Step 3: Contact */}
          {steps[currentStep].id === "contact" && (
            <div className="flex flex-col gap-12 max-w-md mx-auto">
              <input
                type="text"
                placeholder="Your Name"
                className={`bg-transparent border-none text-xl md:text-2xl font-cinzel text-center outline-none transition-colors placeholder:text-text-secondary/30 ${
                  isVisible ? "text-canvas" : "text-text-primary"
                }`}
                style={{ boxShadow: "0 1px 0 0 rgba(212, 175, 55, 0.4)" }}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              />
              <input
                type="tel"
                placeholder="Phone Number"
                className={`bg-transparent border-none text-xl md:text-2xl font-cinzel text-center outline-none transition-colors placeholder:text-text-secondary/30 ${
                  isVisible ? "text-canvas" : "text-text-primary"
                }`}
                style={{ boxShadow: "0 1px 0 0 rgba(212, 175, 55, 0.4)" }}
                onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
              />
              <button
                onClick={() => alert("Appointment Requested. We will contact you shortly.")}
                className="mt-10 px-14 py-6 border-[0.5px] border-gold text-[12px] text-gold hover:bg-gold hover:text-canvas transition-all duration-700 uppercase tracking-[0.4em] font-jost"
              >
                Reserve My Time
              </button>
            </div>
          )}
        </div>

        {/* Step Progress */}
        <div className="mt-24 flex justify-center gap-3">
          {steps.map((_, i) => (
            <div 
              key={i}
              className={`w-1 h-1 rounded-full transition-all duration-700 ${
                i === currentStep ? "bg-gold scale-150" : "bg-gold/20"
              }`}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
