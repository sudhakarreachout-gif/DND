export interface ServiceItem {
  name: string;
  description: string;
  price: string;
}

export interface ServiceCategory {
  title: string;
  items: ServiceItem[];
}

export const servicesData = {
  intro: {
    headline: "The Art of Consultation",
    text: "Every journey at DND begins with a personalized sanctuary assessment. Our designers evaluate your unique architectural features and hair health to curate a bespoke treatment plan that mirrors your personal mastery."
  },
  promotions: [
    {
      name: "Weekly Blowout Special",
      description: "A signature floral-infused wash and high-gloss styling to elevate your weekend.",
      price: "₹1,500"
    }
  ],
  women: [
    {
      title: "Cut & Styling",
      items: [
        { name: "Designer Haircut", description: "Precision sculpting including luxury wash and blowout.", price: "₹2,500" },
        { name: "Signature Blowout", description: "Bespoke styling for occasional elegance.", price: "₹1,800" },
        { name: "Updo & Artistry", description: "Event-ready structural styling.", price: "₹3,500+" }
      ]
    },
    {
      title: "Color Artistry",
      items: [
        { name: "Global Transformation", description: "Full head color with high-dimension finish.", price: "₹6,500+" },
        { name: "Editorial Balayage", description: "Hand-painted sun-kissed textures.", price: "₹9,500+" },
        { name: "Root Refinement", description: "Maintenance of your singular shade.", price: "₹3,500" }
      ]
    },
    {
      title: "Treatments & Add-ons",
      items: [
        { name: "Keratin Smooth", description: "Botanical-infused protein treatment.", price: "₹8,000+" },
        { name: "Olaplex Bond Repair", description: "Structural restoration for colored hair.", price: "₹2,500" },
        { name: "Scalp Sanctuary", description: "Exfoliating detox and hydration.", price: "₹2,000" }
      ]
    }
  ],
  men: [
    {
      title: "Cut & Styling",
      items: [
        { name: "Architectural Cut", description: "Precision grooming and styling.", price: "₹1,500" },
        { name: "Beard Sculpture", description: "Detailed shaping and hot towel finish.", price: "₹800" }
      ]
    },
    {
      title: "Color & Wellness",
      items: [
        { name: "Camo Color", description: "Subtle grey blending for a natural finish.", price: "₹2,500" },
        { name: "Global Restoration", description: "Full tone enrichment.", price: "₹4,000" },
        { name: "Scalp Detox", description: "Botanical treatment for hair health.", price: "₹1,200" }
      ]
    }
  ]
};
