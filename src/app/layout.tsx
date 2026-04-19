import type { Metadata } from "next";
import { Cinzel, Jost } from "next/font/google";
import "./globals.css";
import CustomCursor from "@/components/CustomCursor";
import Navigation from "@/components/Navigation";
import Preloader from "@/components/Preloader";

const cinzel = Cinzel({
  variable: "--font-cinzel",
  subsets: ["latin"],
  display: "swap",
});

const jost = Jost({
  variable: "--font-jost",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "DND Salon & Spa | Luxury Floral Sanctuary & Wellness Flagship",
  description: "Experience DND Salon & Spa — a 2026 digital flagship defined by architectural beauty, pristine wellness, and the art of floral sanctuary. Professional hair, nail, and spa services.",
  keywords: ["luxury salon", "spa", "wellness sanctuary", "floral artistry", "premium beauty", "DND Salon"],
  openGraph: {
    title: "DND Salon & Spa | Luxury Sanctuary",
    description: "Architectural beauty and pristine wellness in a floral sanctuary.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${cinzel.variable} ${jost.variable}`}>
      <body className="antialiased font-jost">
        <Preloader />
        <CustomCursor />
        <Navigation />
        {children}
      </body>
    </html>
  );
}
