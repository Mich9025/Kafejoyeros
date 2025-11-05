'use client';

import { useState, useEffect, Suspense, useMemo } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import React from 'react';

interface Service {
  id: number;
  title: string;
  description: string;
  image: string;
  additionalButtons?: {
    text: string;
    url: string;
    isExternal?: boolean;
  }[];
}

interface SelectedService {
  id: number;
  title: string;
  description: string;
  image: string;
  additionalButtons?: {
    text: string;
    url: string;
    isExternal?: boolean;
  }[];
}

// Componente hijo que maneja la lectura de searchParams dentro de un Suspense boundary
function PreselectService({
  services,
  setSelectedService,
}: {
  services: Service[];
  setSelectedService: (s: SelectedService) => void;
}) {
  const searchParams = useSearchParams();
  // Evita re-seleccionar después de cerrar el modal
  const hasPreselectedRef = React.useRef(false);

  useEffect(() => {
    if (hasPreselectedRef.current) return;
    hasPreselectedRef.current = true;
    const idParam = searchParams.get('serviceId');
    if (!idParam) return;
    const id = Number(idParam);
    const found = services.find((s) => s.id === id);
    if (found) {
      setSelectedService(found as SelectedService);
    }
  }, [searchParams, services, setSelectedService]);

  return null;
}

export default function ServiciosPage() {
  const [selectedService, setSelectedService] = useState<SelectedService | null>(null);

  // Memoiza la lista de servicios para evitar recrearla en cada render
  const services: Service[] = useMemo(
    () => [
    {
      id: 1,
      title: "Oro del cuál te sentirás orgulloso",
      description: "Opta por piezas elaboradas con metales preciosos extraídos de manera responsable, apoya el crecimiento de mineros artesanales locales y sus familias, y recibe joyas con mayor trazabilidad y menor impacto medio ambiental. Cada decisión consciente puede transformar vidas y proteger el futuro del planeta.",
      image: "https://yellowgreen-deer-888686.hostingersite.com/wp-content/uploads/2025/10/Copia-de-Batea-con-oro-Oro-Verde-c-Alejandro-Cock-295-scaled.png",
      additionalButtons: [
        {
          text: "Joyería Sostenible",
          url: "/blog/joyeria-sostenible-en-colombia",
          isExternal: false
        },
        {
          text: "Minería Responsable",
          url: "https://www.responsiblemines.org/",
          isExternal: true
        }
      ]
    },
    {
      id: 2,
      title: "Hecho a la medida",
      description: "Enaltecer el trabajo de nuestros artesanos preservando las técnicas heredadas por generaciones y velando porque el oficio perdure en el tiempo, es lo que da verdadero valor a cada una de nuestras piezas. A través de pequeñas producciones y diseños atemporales reafirmamos nuestro compromiso con una joyería responsable, consciente y profundamente humana.",
      image: "https://yellowgreen-deer-888686.hostingersite.com/wp-content/uploads/2025/10/trabajo-artesanal.jpg"
    },
    {
      id: 3,
      title: "Ser joyero por un día",
      description: "Nuestros artesanos no solo trabajan el metal, preservan una tradición viva, cuidando cada detalle con autenticidad y respeto. Y porque creemos que vivir el proceso transforma la manera en que se valora una joya, ofrecemos a nuestros clientes la oportunidad de ser joyeros por un día, una experiencia única para conectar con el origen, participar en la creación y dar forma a una pieza con historia propia",
      image: "https://yellowgreen-deer-888686.hostingersite.com/wp-content/uploads/2025/10/hecho-a-mano.jpg",
      additionalButtons: [
        {
          text: "Manos que Hablan",
          url: "/blog/manos-que-hablan",
          isExternal: false
        }
      ]
    },
    {
      id: 4,
      title: "Joyería Regenerativa",
      description: "Creemos que la joyería también puede sanar. Estamos comprometidos con darle un respiro al planeta y devolverle vida a los territorios que han sido impactados por la minería ilegal. Por eso, apoyamos iniciativas como BOSQUE NAGAL y MINGAKURI, que trabajan en la reforestación de zonas degradadas y en el fortalecimiento de comunidades campesinas locales, generando oportunidades sostenibles y restaurando ecosistemas vitales. Cada pieza que creamos no solo busca contar tu historia, sino también ser parte de una historia más grande,  la de una joyería consciente, regenerativa y con propósito. . AMAZONOMÍA",      image: "https://yellowgreen-deer-888686.hostingersite.com/wp-content/uploads/2025/10/joyeria-regenerativa.png",
      additionalButtons: [
        {
          text: "Instagram",
          url: "https://www.instagram.com/amazonomia_colombia/",
          isExternal: true
        }
      ]
    },
    {
      id: 5,
      title: "Anillos de Compromiso y Boda",
      description: "Los anillos de boda son nuestra especialidad. Te acompañamos en un proceso íntimo y personalizado, desde la elección de los materiales hasta el diseño final de tu pieza, asegurándonos de que cada anillo refleje la historia, estilo y esencia de quien lo va a llevar. Creamos joyas únicas, pensadas para durar toda la vida.",
      image: "https://yellowgreen-deer-888686.hostingersite.com/wp-content/uploads/2025/10/compromiso-foto.jpg",
      additionalButtons: [
        {
          text: "El Anillo de Compromiso Perfecto",
          url: "/blog/el-anillo-de-compromiso-perfecto",
          isExternal: false
        }
      ]
    }
  ], []);

  // Preselección del servicio ahora se maneja en el componente PreselectService dentro de Suspense

  const whyChooseUs = [
    {
      title: "Co-creación",
      description: "Trabajamos contigo en cada paso del proceso creativo"
    },
    {
      title: "Responsabilidad",
      description: "Materiales de origen responsable y prácticas sostenibles"
    },
    {
      title: "Artesanía",
      description: "Técnicas tradicionales preservadas por generaciones"
    },
    {
      title: "Trazabilidad",
      description: "Conoce el origen de cada material en tu joya"
    },
    {
      title: "Calidad",
      description: "Piedras certificadas y metales de la más alta pureza"
    },
    {
      title: "Historia",
      description: "Cada pieza cuenta una historia única y personal"
    }
  ];

  return (
    <>
      <Header logo={"https://yellowgreen-deer-888686.hostingersite.com/wp-content/uploads/2025/10/NOMBRE-SLOGAN-COLOR-2-JPG-Photoroom.png"} />
      
      <main className="min-h-screen bg-white">
        {/* Componente hijo envuelto en Suspense para usar useSearchParams sin error */}
        <Suspense fallback={null}>
          <PreselectService
            services={services}
            setSelectedService={(s) => setSelectedService(s)}
          />
        </Suspense>
        {/* Hero Section */}
        <section className="relative bg-gradient-to-br from-[#2c4026] via-[#171717]/20 to-[#2c4026] py-32 overflow-hidden">
          {/* Background Image with Parallax Effect */}
      <div className="absolute inset-0 z-0">
        
          <div            
            className={`absolute inset-0 transition-opacity duration-2000 ease-in-out`}
          >
            <Image
              src={"https://yellowgreen-deer-888686.hostingersite.com/wp-content/uploads/2025/10/Pic-130-scaled.jpg"}
              alt={"Hero background"}
              fill
              className="object-cover scale-110 animate-slow-zoom"              
            />
          </div>        
        
        {/* Elegant Overlay */}
        <div className="absolute inset-0 bg-gradient-to-br from-[#2c4026] via-[#171717]/20 to-[#2c4026]"></div>
        
        {/* Decorative Elements */}
         <div className="absolute top-20 left-20 w-32 h-32 animate-float">
          <Image 
            src="https://yellowgreen-deer-888686.hostingersite.com/wp-content/uploads/2025/10/GranitoCafe.svg" 
            alt="Decorative element" 
            fill
            className="w-full h-full object-contain opacity-60 filter brightness-110"
            style={{filter: 'sepia(100%) hue-rotate(15deg) brightness(3.5)'}}
          />
        </div>        
        <div className="absolute bottom-32 right-32 w-24 h-24 rotate-12 animate-float" style={{animationDelay: '1s'}}>
        <Image 
            src="https://yellowgreen-deer-888686.hostingersite.com/wp-content/uploads/2025/10/GranitoCafe.svg" 
            alt="Decorative element" 
            fill
            className="w-full h-full object-contain opacity-60 filter brightness-110"
            style={{filter: 'sepia(100%) hue-rotate(15deg) brightness(3.5)'}}
          />
        </div>
        <div className="absolute top-1/2 left-10 w-2 h-20 bg-gradient-to-b from-[#b0b0b0] to-transparent opacity-60"></div>
        <div className="absolute top-1/3 right-16 w-1 h-32 bg-gradient-to-b from-[#b0b0b0] to-transparent opacity-40"></div>
      </div>
          {/* <div className="absolute inset-0 bg-black/20"></div> */}
          <div className="container mx-auto px-4 relative z-10">
            <div className="text-center text-white">
              {/* <h1 className="mt-8 text-5xl md:text-7xl font-title-tai-lue font-bold mb-6 bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">
                NUESTROS SERVICIOS
              </h1> */}
              {/* <p className="text-xl md:text-2xl font-tai-lue text-gray-300 max-w-4xl mx-auto leading-relaxed mb-8">
                Una experiencia integral en joyería personalizada con enfoque en la artesanía responsable, 
                trazabilidad de materiales y la co-creación con nuestros clientes.
              </p> */}
              {/* <div className="mt-8 w-24 h-1 bg-gradient-to-r from-transparent via-white to-transparent mx-auto"></div> */}
            </div>
          </div>
          
          {/* Decorative elements */}
          <div className="absolute top-20 left-10 w-32 h-32 border border-white/10 rounded-full"></div>
          <div className="absolute bottom-20 right-10 w-48 h-48 border border-white/5 rounded-full"></div>
        </section>

        {/* Services Collage */}
        <section className="py-20">
          <div className="container mx-auto px-4">
            <div className="text-center mb-16">
              <h2 className="uppercase text-4xl md:text-5xl font-title-tai-lue font-bold text-gray-900 mb-6">
                Servicios Personalizados
              </h2>
              {/* <p className="text-xl text-gray-600 font-tai-lue max-w-3xl mx-auto">
                Haz clic en cada imagen para descubrir nuestros servicios únicos
              </p> */}
            </div>

            {/* Masonry Grid Layout */}
            <div className="grid grid-cols-12 grid-rows-8 gap-4 max-w-7xl mx-auto h-[800px]">
              {/* Service 1 - Oro del cuál te sentirás orgulloso - Large left */}
              <div 
                className="col-span-5 row-span-8 relative group cursor-pointer overflow-hidden rounded-2xl shadow-lg"
                onClick={() => setSelectedService(services[0])}
              >
                <Image
                  src={services[0].image}
                  alt={services[0].title}
                  fill
                  className="object-cover transition-transform duration-700 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent"></div>
                <div className="absolute bottom-6 left-6 right-6 text-white">
                  <h3 className="text-2xl font-bold mb-3 line-clamp-2">{services[0].title}</h3>
                  <p className="text-sm opacity-90 line-clamp-3">{services[0].description.substring(0, 120)}...</p>
                </div>
                <div className="absolute top-6 right-6 bg-black/50 rounded-full p-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0zM10 7v3m0 0v3m0-3h3m-3 0H7" />
                  </svg>
                </div>
              </div>

              {/* Service 2 - Hecho a la medida - Top right */}
              <div 
                className="col-span-7 row-span-4 relative group cursor-pointer overflow-hidden rounded-2xl shadow-lg"
                onClick={() => setSelectedService(services[1])}
              >
                <Image
                  src={services[1].image}
                  alt={services[1].title}
                  fill
                  className="object-cover transition-transform duration-700 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent"></div>
                <div className="absolute bottom-4 left-4 right-4 text-white">
                  <h3 className="text-xl font-bold mb-2 line-clamp-2">{services[1].title}</h3>
                  <p className="text-sm opacity-90 line-clamp-2">{services[1].description.substring(0, 100)}...</p>
                </div>
                <div className="absolute top-4 right-4 bg-black/50 rounded-full p-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0zM10 7v3m0 0v3m0-3h3m-3 0H7" />
                  </svg>
                </div>
              </div>

              {/* Service 3 - Ser joyero por un día - Bottom right small */}
              <div 
                className="col-span-3 row-span-4 relative group cursor-pointer overflow-hidden rounded-2xl shadow-lg"
                onClick={() => setSelectedService(services[2])}
              >
                <Image
                  src={services[2].image}
                  alt={services[2].title}
                  fill
                  className="object-cover transition-transform duration-700 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent"></div>
                <div className="absolute bottom-3 left-3 right-3 text-white">
                  <h3 className="text-lg font-bold mb-2 line-clamp-2">{services[2].title}</h3>
                  <p className="text-xs opacity-90 line-clamp-2">{services[2].description.substring(0, 80)}...</p>
                </div>
                <div className="absolute top-3 right-3 bg-black/50 rounded-full p-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0zM10 7v3m0 0v3m0-3h3m-3 0H7" />
                  </svg>
                </div>
              </div>

              {/* Service 4 - Joyería Regenerativa - Bottom right medium */}
              <div 
                className="col-span-4 row-span-4 relative group cursor-pointer overflow-hidden rounded-2xl shadow-lg"
                onClick={() => setSelectedService(services[3])}
              >
                <Image
                  src={services[3].image}
                  alt={services[3].title}
                  fill
                  className="object-cover transition-transform duration-700 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent"></div>
                <div className="absolute bottom-4 left-4 right-4 text-white">
                  <h3 className="text-xl font-bold mb-2 line-clamp-2">{services[3].title}</h3>
                  <p className="text-sm opacity-90 line-clamp-2">{services[3].description.substring(0, 90)}...</p>
                </div>
                <div className="absolute top-4 right-4 bg-black/50 rounded-full p-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0zM10 7v3m0 0v3m0-3h3m-3 0H7" />
                  </svg>
                </div>
              </div>
            </div>

            {/* Service 5 - Anillos de Compromiso y Boda - Separate row below */}
            <div className="mt-8 max-w-7xl mx-auto">
              <div 
                className="relative group cursor-pointer overflow-hidden rounded-2xl shadow-lg h-64"
                onClick={() => setSelectedService(services[4])}
              >
                <Image
                  src={services[4].image}
                  alt={services[4].title}
                  fill
                  className="object-cover transition-transform duration-700 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/40 to-transparent"></div>
                <div className="absolute inset-0 flex items-center">
                  <div className="text-white p-8 max-w-2xl">
                    <h3 className="text-3xl font-bold mb-4">{services[4].title}</h3>
                    <p className="text-lg opacity-90 leading-relaxed">{services[4].description.substring(0, 200)}...</p>
                  </div>
                </div>
                <div className="absolute top-6 right-6 bg-black/50 rounded-full p-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0zM10 7v3m0 0v3m0-3h3m-3 0H7" />
                  </svg>
                </div>
              </div>
            </div>


          </div>
        </section>

        {/* Why Choose Us Section */}
        <section className="py-20 bg-white">
          <div className="container mx-auto px-4">
            <div className="text-center mb-16">
              <h2 className="uppercase text-4xl md:text-5xl font-title-tai-lue font-bold text-[#171717] mb-6">
                ¿Por qué elegir Kafé Joyeros?
              </h2>
              <p className="text-xl text-[#171717] font-tai-lue max-w-4xl mx-auto leading-relaxed">
                No solo hacemos joyas, creamos piezas con historia, hechas a mano con metales de origen 
                responsable y piedras certificadas en un proceso trazable.
              </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {whyChooseUs.map((reason, index) => (
                <div 
                  key={index}
                  className="bg-white p-8 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 text-center group"
                  style={{ animationDelay: `${index * 100}ms` }}
                >
                  <div className="text-4xl mb-4 group-hover:scale-110 transition-transform duration-300">                    
                  </div>
                  <h3 className="text-xl font-title-tai-lue font-bold text-gray-900 mb-3">
                    {reason.title}
                  </h3>
                  <p className="text-gray-600 font-tai-lue leading-relaxed">
                    {reason.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Experience Section */}
        <section className="py-20 bg-[var(--cream)]">
          <div className="container mx-auto px-4 text-center">
            <h2 className="uppercase text-4xl md:text-5xl font-title-tai-lue font-bold mb-6 text-[var(--red)]">
              Una Experiencia Inolvidable
            </h2>
            <p className="text-xl font-tai-lue mb-8 max-w-4xl mx-auto leading-relaxed text-[#171717]">
              Si lo deseas, puedes vivir la experiencia de ser joyero por un día, participando en la creación 
              de tu propia joya. Una experiencia inolvidable, tan especial como la pieza que llevarás contigo.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link 
                href="/contacto"
                className="inline-flex items-center px-8 py-4 bg-[var(--red)] text-white font-semibold font-tai-lue rounded-full hover:bg-[var(--cream)] transition-all duration-300 shadow-lg hover:shadow-xl"
              >
                Agenda tu Consulta
                <svg className="ml-2 w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </Link>
              <Link 
                href="/blog"
                className="inline-flex items-center px-8 py-4 border-2 btn-outline-red text-white font-semibold font-tai-lue rounded-full hover:bg-white hover:text-red transition-all duration-300"
              >
                Conoce Más
              </Link>
            </div>
          </div>
        </section>

        {/* Process Overview */}
        <section className="py-20">
          <div className="container mx-auto px-4">
            <div className="text-center mb-16">
              <h2 className="uppercase text-4xl md:text-5xl font-title-tai-lue font-bold text-[#171717] mb-6">
                Nuestro Proceso
              </h2>
              <p className="text-xl text-gray-600 font-tai-lue max-w-3xl mx-auto">
                Te acompañamos en cada paso del camino, desde la primera idea hasta la entrega final.
              </p>
            </div>

            <div className="grid md:grid-cols-4 gap-8">
              {[
                { step: "01", title: "Consulta", description: "Conversamos sobre tus ideas, necesidades y presupuesto" },
                { step: "02", title: "Diseño", description: "Creamos bocetos y diseños personalizados para tu aprobación" },
                { step: "03", title: "Creación", description: "Nuestros artesanos dan vida a tu pieza con técnicas tradicionales" },
                { step: "04", title: "Entrega", description: "Recibe tu joya única con certificación y garantía" }
              ].map((phase, index) => (
                <div key={index} className="text-center group">
                  <div className="relative mb-6">
                    <div className="w-20 h-20 bg-[var(--red)] text-white rounded-full flex items-center justify-center text-2xl font-bold font-title-tai-lue mx-auto group-hover:scale-110 transition-transform duration-300">
                      {phase.step}
                    </div>
                    {index < 3 && (
                      <div className="hidden md:block absolute top-10 left-full w-full h-0.5 bg-gradient-to-r from-red to-green transform -translate-y-1/2"></div>
                    )}
                  </div>
                  <h3 className="text-xl font-title-tai-lue font-bold text-gray-900 mb-3">
                    {phase.title}
                  </h3>
                  <p className="text-gray-600 font-tai-lue leading-relaxed">
                    {phase.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Service Detail Modal */}
        {selectedService && (
          <div 
            className="fixed inset-0 bg-black/95 z-50 flex items-center justify-center p-4"
            onClick={() => setSelectedService(null)}
          >
            <div 
              className="relative bg-white rounded-3xl max-w-5xl w-full max-h-[90vh] overflow-hidden shadow-2xl"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Close Button */}
              <button
                onClick={() => setSelectedService(null)}
                className="absolute top-6 right-6 z-10 bg-black/20 hover:bg-black/30 text-white rounded-full p-3 transition-all duration-300"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>

              <div className="grid md:grid-cols-2 h-full">
                {/* Image Section */}
                <div className="relative h-64 md:h-full">
                  <Image
                    src={selectedService.image}
                    alt={selectedService.title}
                    fill
                    className="object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent"></div>
                  <div className="absolute bottom-6 left-6 text-white">
                    <h3 className="text-2xl md:text-3xl font-bold font-title-tai-lue mb-2">
                      {selectedService.title}
                    </h3>
                  </div>
                </div>
                
                {/* Content Section */}
                <div className="bg-[var(--cream)] flex-1 p-6 md:p-8 flex flex-col justify-between">
                  <div className="space-y-6">
                    <div>                      
                      <p className="text-gray-700 font-tai-lue leading-relaxed text-lg">
                        {selectedService.description}
                      </p>
                    </div>
                    
                    <div className="border-l-4 border-green pl-6">
                      <p className="text-sm text-gray-600 font-tai-lue italic">
                        {selectedService.id === 1 && 
                          "Cada gramo de oro cuenta una historia de responsabilidad y compromiso con las comunidades mineras."
                        }
                        {selectedService.id === 2 && 
                          "El verdadero lujo radica en la personalización y el trabajo artesanal que hace única cada pieza."
                        }
                        {selectedService.id === 3 && 
                          "Vive la magia de crear tu propia joya y conecta con el proceso ancestral de la joyería."
                        }
                        {selectedService.id === 4 && 
                          "Más que sostenibilidad, buscamos regenerar y sanar los territorios a través de la joyería consciente."
                        }
                        {selectedService.id === 5 && 
                          "Cada anillo de compromiso es único, como la historia de amor que representa."
                        }
                      </p>
                    </div>

                    {/* Service Features */}
                    <div>
                      <h5 className="font-bold font-title-tai-lue text-gray-900 mb-3">
                        Características destacadas:
                      </h5>
                      <ul className="space-y-2 text-gray-700 font-tai-lue">
                        {selectedService.id === 1 && (
                          <>
                            <li className="flex items-center"><span className="w-2 h-2 bg-green rounded-full mr-3"></span>Certificación Fairmined</li>
                            <li className="flex items-center"><span className="w-2 h-2 bg-green rounded-full mr-3"></span>Trazabilidad completa</li>
                            <li className="flex items-center"><span className="w-2 h-2 bg-green rounded-full mr-3"></span>Impacto social medible</li>
                          </>
                        )}
                        {selectedService.id === 2 && (
                          <>
                            <li className="flex items-center"><span className="w-2 h-2 bg-green rounded-full mr-3"></span>Diseño personalizado</li>
                            <li className="flex items-center"><span className="w-2 h-2 bg-green rounded-full mr-3"></span>Técnicas ancestrales</li>
                            <li className="flex items-center"><span className="w-2 h-2 bg-green rounded-full mr-3"></span>Piezas únicas</li>
                          </>
                        )}
                        {selectedService.id === 3 && (
                          <>
                            <li className="flex items-center"><span className="w-2 h-2 bg-green rounded-full mr-3"></span>Experiencia inmersiva</li>
                            <li className="flex items-center"><span className="w-2 h-2 bg-green rounded-full mr-3"></span>Guía de maestros artesanos</li>
                            <li className="flex items-center"><span className="w-2 h-2 bg-green rounded-full mr-3"></span>Certificado de participación</li>
                          </>
                        )}
                        {selectedService.id === 4 && (
                          <>
                            <li className="flex items-center"><span className="w-2 h-2 bg-green rounded-full mr-3"></span>Impacto regenerativo</li>
                            <li className="flex items-center"><span className="w-2 h-2 bg-green rounded-full mr-3"></span>Materiales circulares</li>
                            <li className="flex items-center"><span className="w-2 h-2 bg-green rounded-full mr-3"></span>Sanación territorial</li>
                          </>
                        )}
                        {selectedService.id === 5 && (
                          <>
                            <li className="flex items-center"><span className="w-2 h-2 bg-green rounded-full mr-3"></span>Proceso personalizado</li>
                            <li className="flex items-center"><span className="w-2 h-2 bg-green rounded-full mr-3"></span>Diamantes certificados</li>
                            <li className="flex items-center"><span className="w-2 h-2 bg-green rounded-full mr-3"></span>Garantía de por vida</li>
                          </>
                        )}
                      </ul>
                    </div>
                  </div>
                  
                  {/* CTA Buttons */}
                  <div className="mt-8 space-y-3">
                    {/* Additional Buttons */}
                    {selectedService.additionalButtons && selectedService.additionalButtons.length > 0 && (
                      <div className="flex flex-col sm:flex-row gap-3 mb-4">
                        {selectedService.additionalButtons.map((button, index) => (
                          <Link
                            key={index}
                            href={button.url}
                            target={button.isExternal ? "_blank" : "_self"}
                            rel={button.isExternal ? "noopener noreferrer" : ""}
                            className="flex-1 bg-white border-2 border-[var(--red)] text-[var(--red)] font-tai-lue font-medium py-3 px-4 rounded-full hover:bg-[var(--red)] hover:text-white transition-all duration-300 text-center flex items-center justify-center gap-2"
                            onClick={() => setSelectedService(null)}
                          >
                            {button.text}
                            {button.isExternal && (
                              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                              </svg>
                            )}
                          </Link>
                        ))}
                      </div>
                    )}
                    
                    {/* Main CTA Button */}
                    <Link
                      href="/contacto"
                      className="w-full bg-[var(--red)] text-white font-tai-lue font-medium py-4 px-6 rounded-full hover:shadow-lg transition-all duration-300 text-center block"
                      onClick={() => setSelectedService(null)}
                    >
                      Solicitar Información
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </main>

      <Footer logo={"https://yellowgreen-deer-888686.hostingersite.com/wp-content/uploads/2025/10/NOMBRE-SLOGAN-COLOR-1-JPG-Photoroom.png"} />
    </>
  );
}