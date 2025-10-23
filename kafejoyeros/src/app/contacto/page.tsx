"use client";

import { DynamicForm } from "@/components/ui/dynamic-form";
import { z } from "zod";
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { useState, useEffect } from 'react';
import Image from 'next/image';

// Location information
const location = {
  name: "Kafe Joyeros",
  address: "Cl. 77 # 20C-51, Barrios Unidos, Bogotá, D.C., Colombia",
  phone: "+57 300 123 4567",
  email: "info@kafejoyeros.com",
  hours: {
    "Lunes - Viernes": "9:00 AM - 6:00 PM",
    "Sábados": "9:00 AM - 4:00 PM",
    "Domingos": "Cerrado"
  },
  coordinates: {
    lat: 4.666139396473907,
    lng: -74.06245606268749
  }
};

// LocationMapContent component
function LocationMapContent() {
  const [isVisible, setIsVisible] = useState(false);
  const [activeTab, setActiveTab] = useState('info');

  useEffect(() => {
    setIsVisible(true);
  }, []);

  // Map URL for the specific location
  const mapUrl = "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d497.0743266229076!2d-74.06245606268749!3d4.666139396473907!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x8e3f9a587dcfc70b%3A0xda157dbdacfc2ce9!2zQ2wuIDc3ICMgMjBDLTUxLCBCYXJyaW9zIFVuaWRvcywgQm9nb3TDoSwgRC5DLiwgQm9nb3TDoSwgQm9nb3TDoSwgRC5DLg!5e0!3m2!1sen!2sco!4v1759872115898!5m2!1sen!2sco";

  return (
    <div className="space-y-8">
      {/* Tabs Section */}
      <div className={`transform transition-all duration-1000 delay-300 ${isVisible ? 'translate-x-0 opacity-100' : '-translate-x-10 opacity-0'}`}>
        <div className="bg-white/60 backdrop-filter backdrop-blur-lg rounded-3xl p-8 shadow-lg shadow-black/20">
          {/* Tabs */}
          <div className="flex mb-8 bg-gray-100 rounded-2xl p-1">
            <button
              onClick={() => setActiveTab('info')}
              className={`flex-1 py-3 px-4 rounded-xl font-medium transition-all duration-300 ${
                activeTab === 'info'
                  ? 'bg-[var(--red)] text-white shadow-md'
                  : 'text-gray-700 hover:text-[var(--red)]'
              }`}
            >
              Información
            </button>
            <button
              onClick={() => setActiveTab('hours')}
              className={`flex-1 py-3 px-4 rounded-xl font-medium transition-all duration-300 ${
                activeTab === 'hours'
                  ? 'bg-[var(--red)] text-white shadow-md'
                  : 'text-gray-700 hover:text-[var(--red)]'
              }`}
            >
              Horarios
            </button>
          </div>

          {/* Tab Content */}
          {activeTab === 'info' && (
            <div className="space-y-6">
              <div className="space-y-4">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-[#101828] rounded-full flex items-center justify-center flex-shrink-0">
                    <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                    </svg>
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900 mb-1">Dirección</h4>
                    <p className="text-gray-600 leading-relaxed">{location.address}</p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-[#101828] rounded-full flex items-center justify-center flex-shrink-0">
                    <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                    </svg>
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900 mb-1">Teléfono</h4>
                    <a 
                      href={`tel:${location.phone}`}
                      className="text-gray-600 hover:text-gray-800 transition-colors duration-300"
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
                    <h4 className="font-semibold text-gray-900 mb-1">Email</h4>
                    <a 
                      href={`mailto:${location.email}`}
                      className="text-gray-600 hover:text-gray-800 transition-colors duration-300"
                    >
                      {location.email}
                    </a>
                  </div>
                </div>
              </div>

              <div className="pt-6 border-t border-gray-200">
                <div className="flex flex-col sm:flex-row gap-4">
                  <a
                    href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(location.address)}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="bg-[var(--red)] hover:bg-[var(--red)] px-6 py-3 text-white font-medium rounded-full shadow-lg hover:shadow-xl transition-all duration-300 text-center"
                  >
                    Ver en Google Maps
                  </a>
                  <a
                    href={`https://waze.com/ul?q=${encodeURIComponent(location.address)}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn-outline-red px-6 py-3 font-medium rounded-full transition-all duration-300 text-center"
                  >
                    Abrir en Waze
                  </a>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'hours' && (
            <div className="space-y-6">
              <h3 className="text-2xl font-semibold text-gray-900">
                Horarios de Atención
              </h3>
              
              <div className="space-y-4">
                {Object.entries(location.hours).map(([day, hours]) => (
                  <div key={day} className="flex justify-between items-center py-3 border-b border-gray-200 last:border-b-0">
                    <span className="font-medium text-gray-900">{day}</span>
                    <span className="text-gray-600">{hours}</span>
                  </div>
                ))}
              </div>

              <div className="bg-blue-50 rounded-2xl p-6 mt-6">
                <div className="flex items-start gap-3">
                  <div className="w-6 h-6 bg-blue-500 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                    <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900 mb-2">Citas Recomendadas</h4>
                    <p className="text-gray-700 text-sm leading-relaxed">
                      Para una atención personalizada y garantizar disponibilidad, te recomendamos agendar una cita previa. 
                      Así podremos dedicarte el tiempo necesario para crear la joya perfecta.
                    </p>
                  </div>
                </div>
              </div>

              <button
                onClick={() => document.querySelector('#contacto')?.scrollIntoView({ behavior: 'smooth' })}
                className="bg-[var(--red)] hover:bg-[var(--red)] w-full py-4 text-white font-medium rounded-full shadow-lg hover:shadow-xl transition-all duration-300 text-center"
              >
                Agendar Cita
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Map Section */}
      <div className={`transform transition-all duration-1000 delay-500 ${isVisible ? 'translate-x-0 opacity-100' : '-translate-x-10 opacity-0'}`}>
        <div className="bg-white rounded-2xl overflow-hidden border shadow-lg">
          <div className="relative h-[400px]">
            <iframe
              src={mapUrl}
              width="100%"
              height="100%"
              style={{ border: 0 }}
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              className="w-full h-full"
              title={`Mapa de ${location.name}`}
            ></iframe>
            
            {/* Map Overlay */}
            <div className="absolute top-4 left-4 bg-white/90 backdrop-blur-lg rounded-2xl px-4 py-3 shadow-lg">
              <div className="flex items-center gap-3">
                <div className="w-3 h-3 bg-red-500 rounded-full animate-pulse"></div>
                <span className="font-medium text-gray-900 text-sm">{location.name}</span>
              </div>
            </div>
          </div>
          
          <div className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <h4 className="text-lg font-semibold text-gray-900 mb-1">
                  {location.name}
                </h4>
                <p className="text-gray-600 text-sm">
                  {location.address}
                </p>
              </div>
              <a
                href={`https://www.google.com/maps/dir/?api=1&destination=${encodeURIComponent(location.address)}`}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-outline-red px-4 py-2 font-medium rounded-full text-sm transition-all duration-300"
              >
                Cómo llegar
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

// Componente para cada item del FAQ
interface FAQItemProps {
  question: string;
  answer: string;
  isOpen: boolean;
  onToggle: () => void;
}

function FAQItem({ question, answer, isOpen, onToggle }: FAQItemProps) {
  return (
    <div className="border border-gray-200 rounded-lg overflow-hidden">
      <button
        onClick={onToggle}
        className="w-full px-6 py-4 text-left bg-gray-50 hover:bg-gray-100 transition-colors duration-200 flex justify-between items-center"
      >
        <span className="font-semibold text-[var(--green)] text-lg">{question}</span>
        <svg
          className={`w-5 h-5 text-[var(--red)] transform transition-transform duration-200 ${
            isOpen ? 'rotate-180' : ''
          }`}
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
        </svg>
      </button>
      <div
        className={`overflow-hidden transition-all duration-300 ease-in-out ${
          isOpen ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
        }`}
      >
        <div className="px-6 py-4 bg-white">
          <p className="text-gray-700 leading-relaxed">{answer}</p>
        </div>
      </div>
    </div>
  );
}

export default function ContactoPage() {
  // Estado para manejar el acordeón de FAQ
  const [openFAQ, setOpenFAQ] = useState<string | null>(null);

  // Define form fields
  const formFields = [
    {
      name: "nombre",
      label: "Nombre",
      type: "text" as const,
      placeholder: "Ingresa tu nombre completo",
      required: true,
      span: "half" as const,
      className: "bg-white text-xs text-[#171717] placeholder:text-xs",
    },
    {
      name: "ubicacion",
      label: "Ubicación",
      type: "text" as const,
      placeholder: "Ciudad, País",
      required: true,
      span: "half" as const,
      className: "bg-white text-sm text-[#171717] placeholder:text-xs",
    },
    {
      name: "email",
      label: "Correo electrónico",
      type: "email" as const,
      placeholder: "tu@email.com",
      required: true,
      span: "half" as const,
      validation: z.string().email("Ingresa un correo electrónico válido"),
      className: "bg-white text-sm text-[#171717] placeholder:text-xs",
    },
    {
      name: "telefono",
      label: "Teléfono",
      type: "tel" as const,
      placeholder: "Ingresa tu número de teléfono",
      required: true,
      span: "half" as const,
      className: "bg-white text-sm text-[#171717] placeholder:text-xs",
    },
    {
      name: "presupuesto",
      label: "Presupuesto",
      type: "select" as const,
      placeholder: "Selecciona tu rango de presupuesto",
      required: true,
      span: "full" as const,
      className: "bg-white text-[#171717] text-sm placeholder:text-xs",
      options: [
        { value: "2000000-4800000", label: "De $2.000.000 hasta $4.800.000 COP" },
        { value: "4900000-9900000", label: "De $4.900.000 hasta $9.900.000 COP" },
        { value: "10000000+", label: "Más de $10.000.000 COP" },
      ],
    },
    {
      name: "contacto_preferido",
      label: "Método de contacto preferido",
      type: "select" as const,
      placeholder: "¿Cómo prefieres que te contactemos?",
      required: true,
      span: "full" as const,
      className: "bg-white text-[#171717] text-sm placeholder:text-xs",
      options: [
        { value: "whatsapp", label: "WhatsApp" },
        { value: "email", label: "Correo electrónico" },
      ],
    },
    {
      name: "preguntas",
      label: "¿Tienes preguntas o comentarios adicionales?",
      type: "textarea" as const,
      placeholder: "Cuéntanos más sobre lo que tienes en mente...",
      required: false,
      span: "full" as const,
      className: "bg-white text-sm text-[#171717] placeholder:text-xs",
    },
    {
      name: "como_nos_conociste",
      label: "¿Cómo supiste de nosotros? (opcional)",
      type: "select" as const,
      placeholder: "Selecciona una opción",
      required: false,
      span: "full" as const,
      className: "bg-white text-[#171717] text-sm placeholder:text-xs",
      options: [
        { value: "instagram", label: "Redes sociales: Instagram" },
        { value: "facebook", label: "Redes sociales: Facebook" },
        { value: "recomendacion_amigo", label: "Recomendación: Amigo/a" },
        { value: "recomendacion_familiar", label: "Recomendación: Familiar" },
        { value: "recomendacion_empresa", label: "Recomendación: Empresa" },
        { value: "evento_feria", label: "Evento/Feria" },
        { value: "google", label: "Buscador: Google" },
        { value: "otro_buscador", label: "Buscador: Otro" },
        { value: "otro", label: "Otro" },
      ],
    },
  ];

  // Form validation schema
  const formSchema = z.object({
    nombre: z.string().min(1, "El nombre es obligatorio"),
    ubicacion: z.string().min(1, "La ubicación es obligatoria"),
    email: z.string().email("Ingresa un correo electrónico válido"),
    telefono: z.string().min(1, "El teléfono es obligatorio"),
    presupuesto: z.string().min(1, "Selecciona un rango de presupuesto"),
    contacto_preferido: z.string().min(1, "Selecciona un método de contacto"),
    preguntas: z.string().optional(),
    como_nos_conociste: z.string().optional(),
  });

  // Handle form submission
  const handleSubmit = async (data: z.infer<typeof formSchema>) => {
    try {
      console.log("Datos del formulario:", data);
      
      // Here you would typically send the data to your backend
      // For now, we'll just simulate a successful submission
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      // You can integrate with your preferred email service or backend API here
      alert("¡Gracias por contactarnos! Te responderemos pronto.");
    } catch (error) {
      console.error("Error al enviar el formulario:", error);
      alert("Hubo un error al enviar el formulario. Por favor, inténtalo de nuevo.");
    }
  };

  return (
    <>
      <Header 
        logo={"https://yellowgreen-deer-888686.hostingersite.com/wp-content/uploads/2025/10/NOMBRE-SLOGAN-COLOR-2-JPG-Photoroom.png"}         
      />
      
      <main className="min-h-screen bg-white">
        {/* Header Section */}
       {/* Hero Section */}
        <section className="relative bg-gradient-to-br from-[#2c4026] via-[#171717]/20 to-[#2c4026] py-32 overflow-hidden">
          {/* Background Image with Parallax Effect */}
      <div className="absolute inset-0 z-0">
        
          <div            
            className={`absolute inset-0 transition-opacity duration-2000 ease-in-out`}
          >
            <Image
              src={"https://yellowgreen-deer-888686.hostingersite.com/wp-content/uploads/2025/10/Pic-47-scaled.jpg"}
              alt={"Hero background"}
              fill
              className="object-cover scale-110 animate-slow-zoom"              
            />
          </div>        
        
        {/* Elegant Overlay */}
        <div className="absolute inset-0 bg-gradient-to-br from-[#2c4026] via-[#171717]/20 to-[#2c4026]"></div>
        
        {/* Decorative Elements */}
        <div className="absolute top-20 left-20 w-32 h-32 border border-[#b0b0b0] rotate-45 animate-float"></div>
        <div className="absolute bottom-32 right-32 w-24 h-24 border border-champagne/40 rotate-12 animate-float" style={{animationDelay: '1s'}}></div>
        <div className="absolute top-1/2 left-10 w-2 h-20 bg-gradient-to-b from-[#b0b0b0] to-transparent opacity-60"></div>
        <div className="absolute top-1/3 right-16 w-1 h-32 bg-gradient-to-b from-[#b0b0b0] to-transparent opacity-40"></div>
      </div>
          <div className="absolute inset-0 bg-black/20"></div>
          <div className="container mx-auto px-4 relative z-10">
            <div className="text-center text-white">
              <h1 className="mt-8 text-5xl md:text-7xl font-title-tai-lue font-bold mb-6 bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">
                CONTACTANOS
              </h1>
              {/* <p className="text-xl md:text-2xl font-tai-lue text-gray-300 max-w-4xl mx-auto leading-relaxed mb-8">
                Una experiencia integral en joyería personalizada con enfoque en la artesanía responsable, 
                trazabilidad de materiales y la co-creación con nuestros clientes.
              </p> */}
              <div className="mt-8 w-24 h-1 bg-gradient-to-r from-transparent via-white to-transparent mx-auto"></div>
            </div>
          </div>
          
          {/* Decorative elements */}
          <div className="absolute top-20 left-10 w-32 h-32 border border-white/10 rounded-full"></div>
          <div className="absolute bottom-20 right-10 w-48 h-48 border border-white/5 rounded-full"></div>
        </section>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
          {/* Contact Form */}
          <div>
            <div className="bg-[#b0b0b0] rounded-2xl shadow-xl p-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">
                Cuéntanos sobre tu proyecto
              </h2>
              <DynamicForm
                fields={formFields}
                onSubmit={async (rawData) => {
                  // Cast raw form data to expected shape
                  const data = rawData as z.infer<typeof formSchema>;
                  await handleSubmit(data);
                }}
                schema={formSchema}
                submitText="Enviar mensaje"
                loadingText="Enviando..."
                successMessage="¡Mensaje enviado!"
                submitClassName="w-full p-2 btn-outline-red rounded-full hover:bg-gray disabled:opacity-50"
                successDescription="Te contactaremos pronto para conversar sobre tu proyecto."
                retryText="Enviar otro mensaje"
                className="space-y-6"
              />
            </div>
          </div>

          {/* Location Information with Tabs */}
          <div className="h-full">
            <LocationMapContent />
          </div>
        </div>
      </div>
      {/* FAQ */}
      <div id="faq" className="bg-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-[var(--green)] mb-4 font-tai-lue">
              Preguntas Frecuentes
            </h2>
            <div className="w-24 h-1 bg-[var(--red)] mx-auto mb-6"></div>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Encuentra respuestas a las preguntas más comunes sobre nuestros servicios y procesos
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            {/* Columna 1 */}
            <div className="space-y-4">
              <FAQItem
                question="¿Qué es Kafé Joyeros?"
                answer="Kafé Joyeros es una iniciativa que busca reinterpretar la joyería tradicional. Ofrecemos asesoría personalizada y elaboramos piezas atemporales que describan a la persona que las lleva puestas, pero sobre todo que quien las use se sienta feliz. Nuestro objetivo es que cada joya cuente una historia. Queremos que quienes lleguen a nosotros se lleven más que una pieza de joyería, una experiencia que les permita materializar una pieza única que lo acompañe toda la vida. Además, brindamos la oportunidad de vivir la experiencia de ser joyero por un día. Recibirás una mini cátedra de iniciación a la joyería de la mano de un maestro artesano y podrás participar en dos procesos fundamentales: Fundición (donde aprenderás a realizar aleaciones de metales) y Laminado (una etapa clave en el moldeado del metal)."
                isOpen={openFAQ === 'faq1'}
                onToggle={() => setOpenFAQ(openFAQ === 'faq1' ? null : 'faq1')}
              />
              
              <FAQItem
                question="¿Qué tipo de joyas hacen?"
                answer="Hacemos todo tipo de joyas, desde pendientes hasta mancuernas, lo que se nos ocurra y que se pueda trabajar en oro/plata lo hacemos posible, pero nuestra especialidad son las piezas para bodas."
                isOpen={openFAQ === 'faq2'}
                onToggle={() => setOpenFAQ(openFAQ === 'faq2' ? null : 'faq2')}
              />
              
              <FAQItem
                question="¿En qué materiales trabajan?"
                answer="Nuestras piezas son elaboradas a mano por joyeros artesanos en oro de 18 quilates y/o plata 925 y piedras preciosas como diamante, esmeralda, zafiro y rubí."
                isOpen={openFAQ === 'faq3'}
                onToggle={() => setOpenFAQ(openFAQ === 'faq3' ? null : 'faq3')}
              />
              
              <FAQItem
                question="¿Cómo elegir el anillo de compromiso?"
                answer="Es común pensar primero en un diamante al buscar un anillo de compromiso, pero hoy en día muchas otras piedras se imponen como opciones igual de hermosas y más asequibles. Tómate el tiempo necesario para elegir, el anillo de compromiso es símbolo de una promesa de amor para toda la vida y debe reflejar la esencia de quien lo va a usar."
                isOpen={openFAQ === 'faq4'}
                onToggle={() => setOpenFAQ(openFAQ === 'faq4' ? null : 'faq4')}
              />
            </div>

            {/* Columna 2 */}
            <div className="space-y-4">
              <FAQItem
                question="¿Qué piedra elegir?"
                answer="La elección depende directamente del estilo de la persona que llevará el anillo. El Diamante: Representa perfección, firmeza y rectitud, es la piedra clásica por excelencia, ideal para personas sobrias y tradicionales. La Esmeralda: Simboliza abundancia y equilibrio. Es perfecta para quienes se atreven a arriesgar, una piedra de vanguardia. Zafiro: Símbolo de sabiduría y éxito. Ideal para personas sofisticadas y amantes de la moda. Rubí: Representa confianza e inteligencia. Es la piedra de la pasión, ideal para almas rebeldes."
                isOpen={openFAQ === 'faq5'}
                onToggle={() => setOpenFAQ(openFAQ === 'faq5' ? null : 'faq5')}
              />
              
              <FAQItem
                question="¿Cómo es el proceso de compra?"
                answer="1) Solicitud de cotización: Nos compartes tu historia y tu idea. 2) Propuesta formal: En un máximo de 5 días hábiles te enviaremos una propuesta. 3) Reserva de tu orden: Una vez aprobada la propuesta económica, deberás reservar tu orden con un abono del 70% del valor total. 4) Elaboración: Durante el proceso, te compartiremos render con la pieza en 3D. La entrega se realizará entre 15 y 20 días hábiles. 5) Entrega y pago final: Al momento de la entrega deberás cancelar el 30% restante. Para diseños totalmente personalizados, el proceso puede tardar hasta 3 meses."
                isOpen={openFAQ === 'faq6'}
                onToggle={() => setOpenFAQ(openFAQ === 'faq6' ? null : 'faq6')}
              />
              
              <FAQItem
                question="¿Dónde están ubicados?"
                answer="Estamos en Bogotá D.C., Colombia. Atendemos únicamente con cita previa en nuestro estudio, donde podrás co-diseñar tu pieza, conocer de cerca nuestro trabajo y, si lo deseas, vivir la experiencia de ser joyero por un día."
                isOpen={openFAQ === 'faq7'}
                onToggle={() => setOpenFAQ(openFAQ === 'faq7' ? null : 'faq7')}
              />
              
              <FAQItem
                question="¿Tienen un catálogo?"
                answer="No hay un catálogo porque no trabajamos piezas en serie. Cada joya que hacemos está hecha especialmente para una persona; sin embargo, puedes ver gran parte de lo que hemos creado hasta ahora en nuestro sitio web y redes sociales."
                isOpen={openFAQ === 'faq8'}
                onToggle={() => setOpenFAQ(openFAQ === 'faq8' ? null : 'faq8')}
              />
            </div>
          </div>
        </div>
      </div>

      {/* Call to Action Section */}
      <div className="bg-[var(--cream)] py-16">
        <div className="max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">
            ¿Listo para comenzar tu historia?
          </h2>
          <p className="text-xl text-gray-600 mb-8">
            Cada anillo que creamos es único, como la historia de amor que representa. 
            Permítenos ser parte de tu momento especial.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="https://wa.me/57XXXXXXXXX"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-white bg-[var(--red)] hover:bg-[var(--red)] transition-colors"
            >
              Escribir por WhatsApp
            </a>
            <a
              href="mailto:info@kafejoyeros.com"
              className="inline-flex items-center justify-center px-6 py-3 btn-outline-red text-base font-medium rounded-md transition-colors"
            >
              Enviar email
            </a>
          </div>
        </div>
      </div>
      </main>

      <Footer logo={"https://yellowgreen-deer-888686.hostingersite.com/wp-content/uploads/2025/10/NOMBRE-SLOGAN-COLOR-1-JPG-Photoroom.png"} />
    </>
  );
}