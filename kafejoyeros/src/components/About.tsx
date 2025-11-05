'use client';

import { useState } from 'react';

interface AboutProps {
  title?: string;
  subtitle?: string;
}

// Función para generar iconos SVG de línea
const getValueIcon = (iconType: string) => {
  const iconProps = {
    className: "w-8 h-8",
    fill: "none",
    stroke: "currentColor",
    strokeWidth: "1.5",
    viewBox: "0 0 24 24"
  };

  switch (iconType) {
    case 'conscious':
      return (
        <svg {...iconProps}>
          <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
        </svg>
      );
    case 'traceability':
      return (
        <svg {...iconProps}>
          <path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      );
    case 'artisan':
      return (
        <svg {...iconProps}>
          <path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z" />
        </svg>
      );
    case 'sustainability':
      return (
        <svg {...iconProps}>
          <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5" />
        </svg>
      );
    default:
      return (
        <svg {...iconProps}>
          <circle cx="12" cy="12" r="10" />
        </svg>
      );
  }
};

export default function About({
  title = "Lujo Consciente desde 2017",
  subtitle = ""
}: AboutProps) {
  const [isVideoModalOpen, setIsVideoModalOpen] = useState(false);

  const values = [
    {
      icon: "conscious",
      title: "Lujo Consciente",
      description: "Cada pieza está impregnada de valores positivos, con un impacto social y medio ambiental responsable."
    },
    {
      icon: "traceability", 
      title: "Trazabilidad",
      description: "Conoce el origen de tu joya, desde las comunidades mineras hasta que llega a tus manos."
    },
    {
      icon: "artisan",
      title: "Técnica Ancestral",
      description: "Rescatamos y aplicamos técnicas tradicionales heredadas por generaciones de joyeros colombianos."
    },
    {
      icon: "sustainability",
      title: "Hecho a la Medida",
      description: "Evitamos la sobreproducción creando piezas personalizadas."
    }
  ];

  const stats = [
    { number: "2017", label: "Año de Fundación" },
    { number: "100%", label: "Oro y Plata Responsable" },
    { number: "Hecho a la Medida", label: "Modelo Sostenible" },
    { number: "Colombia", label: "Origen Artesanal" }
  ];

  return (
    <section className="py-16 lg:py-24 bg-white">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16">
          <h2 className="uppercase text-3xl sm:text-4xl lg:text-5xl font -light font-title-tai-lue text-gray-900 mb-4">
            {title}
          </h2>
          <p className="text-xl text-gray-600 font-tai-lue mb-6">
            {subtitle}
          </p>
          <div className="w-24 h-1 bg-button-cream mx-auto rounded-full"></div>
        </div>

        {/* Main Story */}
        <div className="max-w-4xl mx-auto text-center mb-16">
          <p className="text-lg text-gray-700 leading-relaxed mb-8 font-tai-lue">
            Kafé Joyeros nace en 2017 con el propósito de re interpretar la joyería tradicional, 
            romper con el estatus quo de una industria distante y crear una nueva forma de vivir el lujo, 
            <span className="font-semibold text-gray-900"> un lujo consciente, humano y conectado.</span>
          </p>
          
          <p className="text-lg text-gray-700 leading-relaxed font-tai-lue">
            Nuestro enfoque va más allá del objeto, buscamos que cada pieza esté impregnada de valores positivos, 
            con un impacto social y medio ambiental responsable. Creemos que la joyería también puede ser un acto de conciencia 
            y queremos que cada cliente pueda conectar con la historia de su joya.
          </p>
        </div>       
      </div>

      {/* Video Banner - Fuera del contenedor para ocupar 100% del ancho */}  
      <div className="mb-16 w-full">
        <div className="relative overflow-hidden w-full h-50 md:h-50 lg:h-64">
          <video
            className="w-full h-full object-cover"
            autoPlay
            loop
            muted
            playsInline
            preload="metadata"
            poster=""
          >
            <source 
              src="https://yellowgreen-deer-888686.hostingersite.com/wp-content/uploads/2025/10/Banner-Horizontal-KAFE-JOYEROS_Pantallas-Principal.mp4" 
              type="video/mp4" 
            />
            Tu navegador no soporta el elemento de video.
          </video>
          
          {/* Overlay decorativo */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent pointer-events-none"></div>
        </div>
        
        {/* Texto descriptivo del video */}
        <div className="text-center mt-6 container mx-auto px-4">
          <p className="text-gray-600 font-tai-lue text-sm">
            Descubre el proceso artesanal detrás de cada pieza única de Kafé Joyeros
          </p>
        </div>
      </div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Sección de dos columnas: Propuesta de Valor + Values Grid */}
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-start mb-16">
          {/* Columna Izquierda - Propuesta de Valor */}
          <div className="bg-gradient-to-r from-button-cream to-white rounded-2xl p-8 lg:p-10">
            <div className="text-left">
              <h3 className="uppercase text-2xl lg:text-3xl font-title-tai-lue text-[#171717] mb-6">
                Nuestra Propuesta de Valor
              </h3>
              <p className="text-gray-700 leading-relaxed mb-6 font-tai-lue">
                Kafé Joyeros es una marca para hombres y mujeres con consciencia ambiental que buscan 
                piezas de lujo con significado, joyas que los representen y que, al mismo tiempo generen 
                un impacto positivo en la sociedad y el medioambiente.
              </p>
              <p className="text-gray-700 leading-relaxed font-tai-lue">
                Conscientes de los desafíos ocultos en la cadena productiva de la joyería tradicional, 
                trabajamos bajo un modelo Made-To-Order con trazabilidad completa. Rescatamos técnicas 
                artesanales ancestrales, apoyamos a familias de mineros y joyeros colombianos y contribuimos 
                activamente a la reforestación de zonas afectadas por la minería ilegal.
              </p>
            </div>
          </div>

          {/* Columna Derecha - Values Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {values.map((value, index) => (
              <div 
                key={index}
                className="text-center p-6 rounded-xl bg-white border border-gray-100 hover:shadow-lg transition-all duration-300 hover:border-button-cream"
              >
                <div className="text-[#540031] mb-4 flex justify-center">{getValueIcon(value.icon)}</div>
                <h3 className="font-semibold font-title-tai-lue text-gray-900 mb-3 text-lg">
                  {value.title}
                </h3>
                <p className="text-gray-600 text-sm leading-relaxed font-tai-lue">
                  {value.description}
                </p>
              </div>
            ))}
          </div>
        </div>      

        {/* Co-creation Experience */}
        <div className="text-center">
          <h3 className="text-2xl lg:text-3xl font-title-tai-lue text-gray-900 mb-6">
            Una Experiencia de Co-creación
          </h3>
          <p className="text-lg text-gray-700 leading-relaxed mb-8 max-w-3xl mx-auto font-tai-lue">
            Kafé Joyeros es una experiencia de co-creación, donde cada persona puede participar en el diseño 
            de su pieza, vivir el proceso y llevar consigo algo más que una joya, 
            <span className="font-semibold text-button"> un símbolo de identidad, legado y transformación.</span>
          </p>
          
          {/* Video Call-to-Action con Play Button */}
          <div className="flex flex-col items-center space-y-6">
            {/* Botón de Play Grande con Animaciones */}
            <div 
              onClick={() => setIsVideoModalOpen(true)}
              className="relative cursor-pointer group"
            >
              {/* Círculos de animación */}
              <div className="absolute inset-0 rounded-full bg-button opacity-20 animate-ping"></div>
              <div className="absolute inset-2 rounded-full bg-button opacity-30 animate-pulse"></div>
              
              {/* Botón principal */}
              <div className="relative w-20 h-20 bg-button rounded-full flex items-center justify-center shadow-2xl group-hover:bg-button-green transition-all duration-300 group-hover:scale-110">
                {/* Icono de Play */}
                <svg
                  className="w-8 h-8 text-white ml-1"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M8 5v14l11-7z"/>
                </svg>
              </div>
            </div>

            {/* Texto descriptivo */}
            <div className="text-center">
              <h4 className="text-xl font-title-tai-lue text-gray-900 mb-2">
                Una Historia por Contar
              </h4>
              <p className="text-gray-600 font-tai-lue text-sm max-w-md">
                Descubre el proceso completo de co-creación y cómo cada pieza cuenta una historia única
              </p>
              <div className="mt-3 flex items-center text-gray-600 justify-center space-x-2 text-button">
                <svg
                  className="w-4 h-4"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z"
                  />
                </svg>
                <div 
                  onClick={() => setIsVideoModalOpen(true)}
                  className="relative cursor-pointer group"
                > <span className="text-sm font-title-tai-lue text-gray-600 font-medium">Ver Video</span></div>               
              </div>
            </div>
          </div>
        </div>

        {/* Modal del Video */}
        {isVideoModalOpen && (
          <div 
            className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-75 p-4"
            onClick={() => setIsVideoModalOpen(false)}
          >
            <div 
              className="relative w-full max-w-4xl bg-white rounded-2xl overflow-hidden shadow-2xl"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Botón de cerrar */}
              <button
                onClick={() => setIsVideoModalOpen(false)}
                className="absolute top-4 right-4 z-10 bg-black bg-opacity-50 text-white rounded-full p-2 hover:bg-opacity-75 transition-all duration-200"
              >
                <svg
                  className="w-6 h-6"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </button>

              {/* Video */}
              <div className="relative">
                <video
                  className="w-full h-auto"
                  controls
                  autoPlay
                  preload="metadata"
                  style={{
                    aspectRatio: '16/9'
                  }}
                >
                  <source 
                    src="https://yellowgreen-deer-888686.hostingersite.com/wp-content/uploads/2025/10/Video-Kafe-Joyeros.mp4" 
                    type="video/mp4" 
                  />
                  Tu navegador no soporta el elemento de video.
                </video>
              </div>

              {/* Título del video */}
              <div className="p-6 bg-white">
                <h4 className="text-xl font-title-tai-lue text-gray-900 mb-2">
                  Experiencia de Co-creación - Kafé Joyeros
                </h4>
                <p className="text-gray-600 font-tai-lue text-sm">
                  Descubre cómo participar en el diseño de tu pieza única y vivir el proceso completo de creación.
                </p>
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}