'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';

interface HeroProps {
  logoUrl?: string;
  subtitle?: string;
  description?: string;
  backgroundImages?: string[];
  primaryCTA?: {
    text: string;
    href: string;
  };
  secondaryCTA?: {
    text: string;
    href: string;
  };
}

export default function Hero({
  logoUrl = "https://yellowgreen-deer-888686.hostingersite.com/wp-content/uploads/2025/10/NOMBRE-SLOGAN-COLOR-2-JPG-Photoroom.png",
  subtitle = "Lujo consciente hecho a mano en Colombia.",
  description = "Piezas atemporales que entrelazan historias con propósito y celebran la maestría artesanal.",
  backgroundImages = [
    "https://yellowgreen-deer-888686.hostingersite.com/wp-content/uploads/2025/10/Pic-113-scaled.jpg",
    "https://yellowgreen-deer-888686.hostingersite.com/wp-content/uploads/2025/10/0DBD3315-D87C-4ED7-83F6-3D4F1BF6354B.jpg",
    "https://yellowgreen-deer-888686.hostingersite.com/wp-content/uploads/2025/10/Pic-75-scaled.jpg"
  ],
  primaryCTA = { text: "Explorar Editorial", href: "#galeria" },
  secondaryCTA = { text: "Contacta con nosotros", href: "#contacto" }
}: HeroProps) {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    setIsLoaded(true);
    const interval = setInterval(() => {
      setCurrentImageIndex((prev) => (prev + 1) % backgroundImages.length);
    }, 6000);

    return () => clearInterval(interval);
  }, [backgroundImages.length]);

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background Images with Parallax Effect */}
      <div className="absolute inset-0 z-0">
        {backgroundImages.map((image, index) => (
          <div
            key={index}
            className={`absolute inset-0 transition-opacity duration-2000 ease-in-out ${
              index === currentImageIndex ? 'opacity-100' : 'opacity-0'
            }`}
          >
            <Image
              src={image}
              alt={`Hero background ${index + 1}`}
              fill
              className="object-cover scale-110 animate-slow-zoom"
              priority={index === 0}
            />
          </div>
        ))}
        
        {/* Elegant Overlay */}
        <div className="absolute inset-0 bg-gradient-to-br from-[#2c4026] via-[#171717]/20 to-[#2c4026]"></div>
        
        {/* Decorative Elements */}
        <div className="absolute top-20 left-20 w-32 h-32 border border-[#b0b0b0] rotate-45 animate-float"></div>
        <div className="absolute bottom-32 right-32 w-24 h-24 border border-champagne/40 rotate-12 animate-float" style={{animationDelay: '1s'}}></div>
        <div className="absolute top-1/2 left-10 w-2 h-20 bg-gradient-to-b from-[#b0b0b0] to-transparent opacity-60"></div>
        <div className="absolute top-1/3 right-16 w-1 h-32 bg-gradient-to-b from-[#b0b0b0] to-transparent opacity-40"></div>
      </div>

      {/* Main Content */}
      <div className="relative z-10 text-center px-6 max-w-6xl mx-auto">
        <div className={`transform transition-all duration-1500 ${isLoaded ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
          {/* Subtitle */}
          <p className="text-[#F2E1D8] text-lg md:text-xl font-tai-lue font-light tracking-widest uppercase mb-4 animate-fade-in-up">
            {subtitle}
          </p>
          
          {/* Main Logo */}
          <div className="mb-6 flex justify-center">
            <Image
              src={logoUrl}
              alt="Kafe Joyeros Logo"
              width={600}
              height={200}
              className="max-w-full h-auto object-contain filter drop-shadow-2xl"
              priority
            />
          </div>
          
          {/* Decorative Line */}
          <div className="flex items-center justify-center mb-8">
            <div className="h-px bg-gradient-to-r from-transparent via-[#2c4026] to-transparent w-32"></div>
            <div className="mx-4 w-3 h-3 border border-[#2c4026] rotate-45"></div>
            <div className="h-px bg-gradient-to-r from-transparent via-[#2c4026] to-transparent w-32"></div>
          </div>
          
          {/* Description */}
          <p className="text-[#F2E1D8] text-lg md:text-xl font-tai-lue font-light leading-relaxed max-w-3xl mx-auto mb-12 animate-fade-in-up" style={{animationDelay: '0.3s'}}>
            {description}
          </p>
          
          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-6 justify-center items-center animate-fade-in-up" style={{animationDelay: '0.6s'}}>
            <a
              href={primaryCTA.href}
              className="bg-button px-8 py-4 text-white font-tai-lue font-medium text-lg rounded-full shadow-luxury hover:shadow-luxury-hover transition-all duration-300"
            >
              {primaryCTA.text}
            </a>
            <a
              href={secondaryCTA.href}
              className="btn-outline-general px-8 py-4 font-tai-lue font-medium text-lg rounded-full transition-all duration-300"
            >
              {secondaryCTA.text}
            </a>
          </div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-10 animate-bounce">
        <div className="flex flex-col items-center text-champagne/70">
          <span className="text-sm font-tai-lue tracking-wider uppercase mb-2">Descubrir</span>
          <div className="w-px h-12 bg-gradient-to-b from-[#F2E1D8] to-transparent"></div>
          <div className="w-2 h-2 border border-[#F2E1D8] rotate-45 mt-2"></div>
        </div>
      </div>

      {/* Image Indicators */}
      <div className="absolute bottom-8 right-8 z-10 flex space-x-3">
        {backgroundImages.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentImageIndex(index)}
            className={`w-3 h-3 rounded-full border transition-all duration-300 ${
              index === currentImageIndex
                ? 'bg-[#F2E1D8] border-[#F2E1D8] shadow-lg'
                : 'border-[#F2E1D8] hover:border-gold/70'
            }`}
          />
        ))}
      </div>

      <style jsx>{`
        @keyframes slow-zoom {
          0% { transform: scale(1.1); }
          100% { transform: scale(1.2); }
        }
        .animate-slow-zoom {
          animation: slow-zoom 20s ease-in-out infinite alternate;
        }
      `}</style>
    </section>
  );
}