'use client';

import { useState, useEffect } from 'react';

interface LocationInfo {
  name: string;
  address: string;
  phone: string;
  email: string;
  hours: {
    [key: string]: string;
  };
  coordinates: {
    lat: number;
    lng: number;
  };
}

interface LocationMapProps {
  title?: string;
  subtitle?: string;
  location?: LocationInfo;
}

export default function LocationMap({
  title = "Visítanos",
  subtitle = "Te esperamos en nuestro taller para crear juntos la joya perfecta",
  location = {
    name: "Kafe Joyeros",
    address: "Calle Principal 123, Centro Histórico, Ciudad",
    phone: "+57 300 123 4567",
    email: "info@kafejoyeros.com",
    hours: {
      "Lunes - Viernes": "9:00 AM - 6:00 PM",
      "Sábados": "9:00 AM - 4:00 PM",
      "Domingos": "Cerrado"
    },
    coordinates: {
      lat: 4.6097,
      lng: -74.0817
    }
  }
}: LocationMapProps) {
  const [isVisible, setIsVisible] = useState(false);
  const [activeTab, setActiveTab] = useState('info');

  useEffect(() => {
    setIsVisible(true);
  }, []);

  // Fallback map URL for demo purposes
  const fallbackMapUrl = `https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3976.8234567890123!2d${location.coordinates.lng}!3d${location.coordinates.lat}!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zNMKwMzYnMzUuMCJOIDc0wrAwNCc1NC4xIlc!5e0!3m2!1ses!2sco!4v1234567890123!5m2!1ses!2sco`;

  return (
    <section id="ubicacion" className="py-20 bg-white relative overflow-hidden">
      {/* Decorative Background */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-10 left-10 w-48 h-48 border rotate-45"></div>
        <div className="absolute bottom-10 right-10 w-32 h-32 border border-champagne/30 rounded-full"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-64 h-64  rotate-12"></div>
      </div>

      <div className="container mx-auto px-6 relative z-10">
        {/* Header */}
        <div className={`text-center mb-16 transform transition-all duration-1000 ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
          <h2 className="uppercase font-title-tai-lue text-3xl md:text-4xl lg:text-5xl text-[#171717] mb-4">
            {title}
          </h2>
          <div className="flex items-center justify-center mb-6">
            <div className="h-px bg-gradient-to-r from-transparent via-button to-transparent w-24"></div>
            <div className="mx-4 w-2 h-2 border border-button rotate-45"></div>
            <div className="h-px bg-gradient-to-r from-transparent via-button to-transparent w-24"></div>
          </div>
          <p className="text-gray-700 text-lg md:text-xl font-tai-lue font-light max-w-2xl mx-auto">
            {subtitle}
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-12 items-stretch">
          {/* Location Information */}
          <div className={`h-full transform transition-all duration-1000 delay-300 ${isVisible ? 'translate-x-0 opacity-100' : '-translate-x-10 opacity-0'}`}>
            <div className="bg-white/60 backdrop-filter backdrop-blur-lg rounded-3xl p-8 shadow-lg shadow-black/20 h-full flex flex-col">
              {/* Tabs */}
              <div className="flex mb-8 bg-button/10 rounded-2xl p-1">
                <button
                  onClick={() => setActiveTab('info')}
                  className={`flex-1 py-3 px-4 rounded-xl font-tai-lue font-medium transition-all duration-300 ${
                    activeTab === 'info'
                      ? 'bg-button text-white shadow-md'
                      : 'text-gray-700 hover:text-gray-900'
                  }`}
                >
                  Información
                </button>
                <button
                  onClick={() => setActiveTab('hours')}
                  className={`flex-1 py-3 px-4 rounded-xl font-tai-lue font-medium transition-all duration-300 ${
                    activeTab === 'hours'
                      ? 'bg-button text-white shadow-md'
                      : 'text-gray-700 hover:text-gray-900'
                  }`}
                >
                  Horarios
                </button>
              </div>

              {/* Tab Content */}
              {activeTab === 'info' && (
                <div className="space-y-6 flex-1 flex flex-col">
                  <div>
                    {/* <h3 className="font-serif text-2xl font-semibold text-charcoal mb-6">
                      {location.name}
                    </h3> */}
                  </div>

                  <div className="space-y-4">
                    <div className="flex items-start gap-4">
                      <div className="w-12 h-12 bg-[#101828] rounded-full flex items-center justify-center flex-shrink-0">
                        <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                        </svg>
                      </div>
                      <div>
                        <h4 className="font-title-tai-lue font-semibold text-charcoal mb-1">Dirección</h4>
                        <p className="text-[#540031] font-title-tai-lue leading-relaxed">{location.address}</p>
                      </div>
                    </div>

                    <div className="flex items-start gap-4">
                      <div className="w-12 h-12 bg-[#101828] rounded-full flex items-center justify-center flex-shrink-0">
                        <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                        </svg>
                      </div>
                      <div>
                        <h4 className="font-title-tai-lue font-semibold text-charcoal mb-1">Teléfono</h4>
                        <a 
                          href={`tel:${location.phone}`}
                          className="text-[#540031] hover:text-[#540031]/80 font-title-tai-lue transition-colors duration-300"
                        >
                          {location.phone}
                        </a>
                      </div>
                    </div>

                    <div className="flex items-start gap-4">
                      <div className="w-12 h-12 bg-[#101828] rounded-full flex items-center justify-center flex-shrink-0">
                        <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                        </svg>
                      </div>
                      <div>
                        <h4 className="font-title-tai-lue font-semibold text-charcoal mb-1">Email</h4>
                        <a 
                          href={`mailto:${location.email}`}
                          className="text-[#540031] hover:text-[#540031]/80 font-title-tai-lue transition-colors duration-300"
                        >
                          {location.email}
                        </a>
                      </div>
                    </div>
                  </div>

                  <div className="pt-6 border-t border-button/20">
                    <div className="flex flex-col sm:flex-row gap-4">
                      <a
                        href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(location.address)}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="bg-button hover:bg-button-green px-6 py-3 text-white font-tai-lue font-medium rounded-full shadow-lg hover:shadow-xl transition-all duration-300 text-center"
                      >
                        Ver en Google Maps
                      </a>
                      <a
                        href={`https://waze.com/ul?q=${encodeURIComponent(location.address)}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="btn-outline-red text-button hover:bg-button hover:text-white px-6 py-3 font-tai-lue font-medium rounded-full transition-all duration-300 text-center"
                      >
                        Abrir en Waze
                      </a>
                    </div>
                  </div>
                </div>
              )}

              {activeTab === 'hours' && (
                <div className="space-y-6 flex-1 flex flex-col">
                  <h3 className="font-serif text-2xl font-semibold font-title-tai-lue text-charcoal">
                    Horarios de Atención
                  </h3>
                  
                  <div className="space-y-4">
                    {Object.entries(location.hours).map(([day, hours]) => (
                      <div key={day} className="flex justify-between items-center py-3 border-b last:border-b-0">
                        <span className="font-title-tai-lue font-medium text-charcoal">{day}</span>
                        <span className="font-title-tai-lue text-charcoal/70">{hours}</span>
                      </div>
                    ))}
                  </div>

                  <div className="bg-champagne/30 rounded-2xl p-6 mt-6">
                    <div className="flex items-start gap-3">
                      <div className="w-6 h-6 bg-blue-500 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                        <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                      </div>
                      <div>
                        <h4 className="font-title-tai-lue font-semibold text-charcoal mb-2">Citas Recomendadas</h4>
                        <p className="text-charcoal/70 font-title-tai-lue text-sm leading-relaxed">
                          Para una atención personalizada y garantizar disponibilidad, te recomendamos agendar una cita previa. 
                          Así podremos dedicarte el tiempo necesario para crear la joya perfecta.
                        </p>
                      </div>
                    </div>
                  </div>

                  <a
                    href="#contacto"
                    className="bg-button hover:bg-button-green w-full py-4 text-white font-tai-lue font-medium rounded-full shadow-lg hover:shadow-xl transition-all duration-300 text-center block"
                  >
                    Agendar Cita
                  </a>
                </div>
              )}
            </div>
          </div>

          {/* Map */}
          <div className={`h-full transform transition-all duration-1000 delay-500 ${isVisible ? 'translate-x-0 opacity-100' : 'translate-x-10 opacity-0'}`}>
            <div className="bg-white/60 backdrop-filter backdrop-blur-lg rounded-3xl overflow-hidden border shadow-lg shadow-black/20 h-full flex flex-col">
              <div className="flex-1 relative">
                <iframe
                  src={fallbackMapUrl}
                  width="100%"
                  height="100%"
                  style={{ border: 0 }}
                  allowFullScreen
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  className="rounded-t-3xl w-full h-full"
                  title={`Mapa de ${location.name}`}
                ></iframe>
                
                {/* Map Overlay */}
                <div className="absolute top-4 left-4 bg-white/90 backdrop-blur-lg rounded-2xl px-4 py-3 shadow-lg shadow-black/30">
                  <div className="flex items-center gap-3">
                    <div className="w-3 h-3 bg-red-500 rounded-full animate-pulse"></div>
                    <span className="font-title-tai-lue font-medium text-charcoal text-sm">{location.name}</span>
                  </div>
                </div>
              </div>
              
              <div className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <h4 className="font-serif text-lg font-semibold text-charcoal mb-1">
                      {location.name}
                    </h4>
                    <p className="text-[#540031] font-sans text-sm">
                      {location.address}
                    </p>
                  </div>
                  <a
                    href={`https://www.google.com/maps/dir/?api=1&destination=${encodeURIComponent(location.address)}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn-outline-red hover:bg-button hover:text-white px-2 py-2 font-title-tai-lue  rounded-full text-sm transition-all duration-300"
                  >
                    Cómo llegar
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Additional Info
        <div className={`mt-16 text-center transform transition-all duration-1000 delay-700 ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
          <div className="bg-white/60 backdrop-filter backdrop-blur-lg rounded-3xl p-8 max-w-4xl mx-auto border">
            <h3 className="font-serif text-2xl md:text-3xl font-semibold text-charcoal mb-6">
              ¿Por qué visitarnos?
            </h3>
            <div className="grid md:grid-cols-3 gap-8">
              <div className="text-center">
                <div className="w-16 h-16 bg-[#101828] rounded-full flex items-center justify-center mx-auto mb-4">
                  <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                  </svg>
                </div>
                <h4 className="font-serif text-lg font-semibold text-charcoal mb-2">Ver y Tocar</h4>
                <p className="text-charcoal/70 font-title-tai-lue text-sm">
                  Experimenta la calidad y belleza de nuestras joyas en persona
                </p>
              </div>
              <div className="text-center">
                <div className="w-16 h-16 bg-[#101828] rounded-full flex items-center justify-center mx-auto mb-4">
                  <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                  </svg>
                </div>
                <h4 className="font-serif text-lg font-semibold text-charcoal mb-2">Asesoría Personalizada</h4>
                <p className="text-charcoal/70 font-title-tai-lue text-sm">
                  Recibe consejos expertos para encontrar o crear la joya perfecta
                </p>
              </div>
              <div className="text-center">
                <div className="w-16 h-16 bg-[#101828] rounded-full flex items-center justify-center mx-auto mb-4">
                  <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z" />
                  </svg>
                </div>
                <h4 className="font-serif text-lg font-semibold text-charcoal mb-2">Taller Artesanal</h4>
                <p className="text-charcoal/70 font-title-tai-lue text-sm">
                  Conoce nuestro proceso de creación y la pasión detrás de cada pieza
                </p>
              </div>
            </div>
          </div>
        </div> */}
      </div>
    </section>
  );
}