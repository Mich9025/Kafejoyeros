'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';

interface Service {
  id: number;
  title: string;
  description: string;
  image: string;
  link: string;
}

interface ServicesProps {
  services?: Service[];
}

export default function Services({
  services = [
    {
      id: 1,
      title: "Oro del cuál te sentirás orgulloso",
      description: "Opta por piezas elaboradas con metales preciosos extraídos de manera responsable, apoya el crecimiento de mineros artesanales locales y sus familias, y recibe joyas con mayor trazabilidad y menor impacto medio ambiental.",
      image: "https://api.kafejoyeros.com/wp-content/uploads/2025/10/Copia-de-Batea-con-oro-Oro-Verde-c-Alejandro-Cock-295-scaled.png",
      link: "/servicios?serviceId=1"
    },
    {
      id: 2,
      title: "Hecho a la medida",
      description: "Enaltecer el trabajo de nuestros artesanos preservando las técnicas heredadas por generaciones y velando porque el oficio perdure en el tiempo, es lo que da verdadero valor a cada una de nuestras piezas.",
      image: "https://api.kafejoyeros.com/wp-content/uploads/2025/10/trabajo-artesanal.jpg",
      link: "/servicios?serviceId=2"
    },
    {
      id: 3,
      title: "Ser joyero por un día.",
      description: "Nuestros artesanos no solo trabajan el metal, preservan una tradición viva, cuidando cada detalle con autenticidad y respeto.",
      image: "https://api.kafejoyeros.com/wp-content/uploads/2025/10/hecho-a-mano.jpg",
      link: "/servicios?serviceId=3"
    },
    {
      id: 4,
      title: "Hagamos juntos parte de una joyería regenerativa",
      description: "Creemos que la joyería también puede sanar. Estamos comprometidos con darle un respiro al planeta y devolverle vida a los territorios que han sido impactados por la minería ilegal.",
      image: "https://api.kafejoyeros.com/wp-content/uploads/2025/10/joyeria-regenerativa.png",
      link: "/servicios?serviceId=4"
    },
    {
      id: 5,
      title: "Nuestro compromiso es hacer el tuyo inolvidable",
      description: "Los anillos de boda son nuestra especialidad. Te acompañamos en un proceso íntimo y personalizado, desde la elección de los materiales hasta el diseño final de tu pieza, asegurándonos de que cada anillo refleje la historia, estilo y esencia de quien lo va a llevar.",
      image: "https://api.kafejoyeros.com/wp-content/uploads/2025/10/compromiso-foto.jpg",
      link: "/servicios?serviceId=5"
    }
  ]
}: ServicesProps) {
  const [currentSlide, setCurrentSlide] = useState(0);
  const router = useRouter();

  // Auto-play del carrusel
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % services.length);
    }, 15000);

    return () => clearInterval(timer);
  }, [services.length]);

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % services.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + services.length) % services.length);
  };

  const goToSlide = (index: number) => {
    setCurrentSlide(index);
  };

  return (
    <section className="py-20 bg-white">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header Section */}
        <div className="text-center mb-16">
          <h2 className="font-title-tai-lue text-4xl md:text-5xl font-bold text-gray-900 mb-6 uppercase">
            Nuestros Servicios
          </h2>
          <p className="font-tai-lue text-gray-700 max-w-4xl mx-auto leading-relaxed">
            Cada servicio está pensado para acompañarte desde la idea hasta la entrega final, con asesoría experta en materiales, diseño y carga emocional.
          </p>
        </div>

        {/* Carousel Container */}
        <div className="relative h-[80vh] max-w-6xl mx-auto rounded-3xl overflow-hidden shadow-2xl">
      {/* Slides */}
      {services.map((service, index) => (
        <div
          key={service.id}
          aria-hidden={index !== currentSlide}
          className={`absolute inset-0 transition-opacity duration-1000 ${
            index === currentSlide ? 'opacity-100' : 'opacity-0 pointer-events-none'
          }`}
        >
          {/* Imagen de fondo difuminada */}
          <div className="absolute inset-0">
            <Image
              src={service.image}
              alt={service.title}
              fill
              className="object-cover grayscale opacity-25"
              priority={index === 0}
            />
            <div className="absolute inset-0 bg-black/10 "></div>
          </div>

          {/* Contenido */}
          <div className="relative h-full flex flex-col">
            {/* Título centrado en la parte superior */}
            <div className="pt-12 pb-6">
              <div className="px-8">
                <h3 className="text-3xl lg:text-4xl font-title-tai-lue font-bold leading-tight text-white text-center uppercase">
                  {service.title}
                </h3>
              </div>
            </div>

            {/* Contenido principal centrado */}
            <div className="flex-1 flex items-center">
              <div className="px-8 w-full">
                <div className="grid lg:grid-cols-2 gap-8 items-center">
                  {/* Imagen principal */}
                  <div className="relative">
                    <div className="relative overflow-hidden rounded-2xl shadow-2xl">
                      <Image
                        src={service.image}
                        alt={service.title}
                        width={400}
                        height={400}
                        className="w-full h-[50vh] object-cover"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent"></div>
                    </div>
                  </div>

                  {/* Contenido de texto */}
                  <div className="text-white space-y-6">
                    <div className="space-y-4">
                      <p className="text-lg lg:text-xl font-tai-lue leading-relaxed opacity-90">
                        {service.description}
                      </p>
                    </div>

                    {/* Botón */}
                    <div className="">
                      <button
                        onClick={() => router.push("servicios?serviceId=" + service.id)}
                        className="inline-flex items-center px-8 py-4 bg-button text-white font-semibold font-tai-lue rounded-full hover:bg-button-green transition-all duration-300 shadow-lg hover:shadow-xl hover:scale-105"
                      >
                        Conocer Más
                        <svg
                          className="ml-2 w-5 h-5"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M17 8l4 4m0 0l-4 4m4-4H3"
                          />
                        </svg>
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      ))}

          {/* Controles de navegación */}
          <div className="absolute inset-y-0 left-4 flex items-center">
            <button
              onClick={prevSlide}
              className="p-3 rounded-full bg-white/20 backdrop-blur-sm text-white hover:bg-white/30 transition-all duration-300"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
            </button>
          </div>

          <div className="absolute inset-y-0 right-4 flex items-center">
            <button
              onClick={nextSlide}
              className="p-3 rounded-full bg-white/20 backdrop-blur-sm text-white hover:bg-white/30 transition-all duration-300"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </button>
          </div>

          {/* Indicadores */}
          <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2">
            <div className="flex space-x-3">
              {services.map((_, index) => (
                <button
                  key={index}
                  onClick={() => goToSlide(index)}
                  className={`w-3 h-3 rounded-full transition-all duration-300 ${
                    index === currentSlide
                      ? 'bg-white scale-125'
                      : 'bg-white/50 hover:bg-white/75'
                  }`}
                />
              ))}
            </div>
          </div>

          {/* Contador de slides */}
          <div className="absolute top-8 right-8 text-white">
            <div className="bg-black/30 backdrop-blur-sm rounded-full px-4 py-2">
              <span className="font-tai-lue text-sm">
                {currentSlide + 1} / {services.length}
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}