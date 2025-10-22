'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';

interface Certification {
  id: number;
  name: string;
  logo: string;
  description: string;
  className?: string;
}

interface BannerProps {
  bannerText?: string;
  bannerSubtext?: string;
  certifications?: Certification[];
}

export default function Banner({
  bannerText = "Calidad Certificada",
  bannerSubtext = "Gracias a Fairmined, los joyeros que buscan prácticas responsables pueden ofrecer a sus clientes metales certificados, con trazabilidad garantizada desde la mina hasta sus manos.",
  certifications = [
    {
      id: 1,
      name: "Fairmined",
      logo: "https://yellowgreen-deer-888686.hostingersite.com/wp-content/uploads/2025/10/Fairmined-Marcas-licenciatarias-2.png",
      description: "Oro responsable y ético"
    },
    {
      id: 2,
      name: "Bosque Nagal",
      logo: "https://yellowgreen-deer-888686.hostingersite.com/wp-content/uploads/2025/10/Copia-de-LOGO-BOSQUE-NAGAL.png",
      description: "Compromiso ambiental"
    },
    {
      id: 3,
      name: "Certificación Artesanal",
      logo: "https://yellowgreen-deer-888686.hostingersite.com/wp-content/uploads/2025/10/RSP160011Retailer-Lock-Up-V1-PRINT-8-5x11-V2-03-1-scaled.png",
      description: "Calidad artesanal garantizada",
      className: "invert"
    }
  ]
}: BannerProps) {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  return (
    <section className="relative overflow-hidden">
      {/* Banner Background Image */}
      <div className="relative">
        <Image
          src="https://yellowgreen-deer-888686.hostingersite.com/wp-content/uploads/2025/10/Banner-esp_5-scaled.png"
          alt="Banner Kafé Joyeros"
          width={1920}
          height={600}
          className="w-full h-auto object-cover"
          priority
        />
        
        {/* Banner Content */}
        <div className="absolute inset-0 flex items-center justify-center">
          <div className={`text-center transform transition-all duration-1000 ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>            
          </div>
        </div>
      </div>

      {/* Subtitle below banner */}
      <div className="py-8 bg-white">
        <div className="container mx-auto px-4">
          <div className={`text-center transform transition-all duration-1000 delay-300 ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
            <p className="text-gray-700  font-tai-lue font-light max-w-3xl mx-auto">
              {bannerSubtext}
            </p>
          </div>
        </div>
      </div>

      {/* Certifications Section */}
      <div className="py-16 bg-white">
        <div className="container mx-auto px-6">
          <div className={`transform transition-all duration-1000 delay-500 ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto">
              {certifications.map((cert, index) => (
                <div
                  key={cert.id}
                  className={`text-center group transform transition-all duration-700 ${
                    isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'
                  }`}
                  style={{ transitionDelay: `${index * 200 + 700}ms` }}
                >
                  {/* Logo Container */}
                  <div className="relative w-48 h-48 mx-auto mb-6 group-hover:scale-110 transition-transform duration-300">
                    <Image
                      src={cert.logo}
                      alt={cert.name}
                      width={250}
                      height={250}
                      className={`w-full h-full object-contain ${cert.className || ''}`}
                    />
                  </div>                  
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}