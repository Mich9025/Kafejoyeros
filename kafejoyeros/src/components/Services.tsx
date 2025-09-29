'use client';

import Image from 'next/image';

const getServiceIcon = (iconType: string) => {
  const iconProps = {
    className: "w-6 h-6",
    fill: "none",
    stroke: "currentColor",
    strokeWidth: 2,
    strokeLinecap: "round" as const,
    strokeLinejoin: "round" as const
  };

  switch (iconType) {
    case 'design':
      return (
        <svg {...iconProps} viewBox="0 0 24 24">
          <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
        </svg>
      );
    case 'repair':
      return (
        <svg {...iconProps} viewBox="0 0 24 24">
          <path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z" />
        </svg>
      );
    case 'gem':
      return (
        <svg {...iconProps} viewBox="0 0 24 24">
          <path d="M6 3h12l4 6-10 12L2 9l4-6z" />
          <path d="M11 3L8 9l4 12 4-12-3-6" />
          <path d="M2 9h20" />
        </svg>
      );
    default:
      return (
        <svg {...iconProps} viewBox="0 0 24 24">
          <circle cx="12" cy="12" r="10" />
        </svg>
      );
  }
};

interface Service {
  id: number;
  title: string;
  description: string;
  icon: string;
  image: string;
  features: string[];
  price?: string;
}

interface ServicesProps {
  title?: string;
  subtitle?: string;
  services?: Service[];
}

export default function Services({
  title = "Nuestros Servicios",
  subtitle = "Especialistas en cada detalle de tu joya perfecta",
  services = [
    {
      id: 1,
      title: "Diseño Personalizado",
      description: "Creamos piezas únicas basadas en tus ideas y preferencias, desde el concepto inicial hasta la joya terminada.",
      icon: "design",
      image: "https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80",
      features: [
        "Consulta personalizada",
        "Bocetos y renders 3D",
        "Selección de materiales",
        "Seguimiento del proceso"
      ],
      price: "Desde $500"
    },
    {
      id: 2,
      title: "Reparación y Restauración",
      description: "Devolvemos la vida a tus joyas favoritas con técnicas especializadas y cuidado artesanal.",
      icon: "repair",
      image: "https://images.unsplash.com/photo-1611652022419-a9419f74343d?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80",
      features: [
        "Evaluación gratuita",
        "Reparación de cadenas",
        "Cambio de piedras",
        "Pulido y acabados"
      ],
      price: "Desde $50"
    },
    {
      id: 3,
      title: "Engastado de Piedras",
      description: "Montamos tus gemas preciosas con la técnica y seguridad que merecen, realzando su belleza natural.",
      icon: "gem",
      image: "https://images.unsplash.com/photo-1506630448388-4e683c67ddb0?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80",
      features: [
        "Engaste de precisión",
        "Certificación de gemas",
        "Diseños exclusivos",
        "Garantía de seguridad"
      ],
      price: "Desde $200"
    }
  ]
}: ServicesProps) {
  return (
    <section className="py-16 lg:py-24 bg-white">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold font-serif text-gray-900 mb-4">
            {title}
          </h2>
          <p className="text-xl font-serif text-gray-600 max-w-3xl mx-auto leading-relaxed">
            {subtitle}
          </p>
          <div className="w-24 h-1 bg-gradient-to-r from-gray-700 to-gray-900 mx-auto mt-6 rounded-full"></div>
        </div>

        {/* Services Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service) => (
            <div
              key={service.id}
              className="group bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 overflow-hidden border border-gray-100 hover:border-gray-300"
            >
              {/* Image */}
              <div className="relative h-48 overflow-hidden">
                <Image
                  src={service.image}
                  alt={service.title}
                  width={400}
                  height={192}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent"></div>
                <div className="absolute top-4 left-4 text-gray-800 w-12 h-12 flex items-center justify-center">
                  {getServiceIcon(service.icon)}
                </div>
                {service.price && (
                  <div className="absolute top-4 right-4 bg-gray-700 text-white px-3 py-1 rounded-full text-sm font-semibold">
                    {service.price}
                  </div>
                )}
              </div>

              {/* Content */}
              <div className="p-6">
                <h3 className="text-xl font-bold font-serif text-gray-900 mb-3 group-hover:text-gray-700 transition-colors duration-300">
                  {service.title}
                </h3>
                
                <p className="text-gray-600 mb-4 leading-relaxed">
                  {service.description}
                </p>

                {/* Features */}
                <ul className="space-y-2 mb-6">
                  {service.features.map((feature, index) => (
                    <li key={index} className="flex items-center text-sm text-gray-600">
                      <svg
                        className="w-4 h-4 text-gray-600 mr-2 flex-shrink-0"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                      >
                        <path
                          fillRule="evenodd"
                          d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                          clipRule="evenodd"
                        />
                      </svg>
                      {feature}
                    </li>
                  ))}
                </ul>

                {/* CTA Button */}
                <button className="w-full btn-luxury text-white py-3 rounded-lg font-semibold transition-all duration-300 shadow-luxury hover:shadow-luxury-hover">
                  Solicitar Cotización
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Bottom CTA */}
        <div className="text-center mt-16">
          <div className="bg-white border border-gray-100 rounded-2xl p-8 lg:p-12">
            <h3 className="text-2xl lg:text-3xl font-bold font-serif text-gray-900 mb-4">
              ¿No encuentras lo que buscas?
            </h3>
            <p className="text-gray-600 mb-6 max-w-2xl mx-auto">
              Contáctanos para servicios personalizados. Nuestro equipo de expertos está listo para ayudarte con cualquier proyecto especial.
            </p>
            <a
              href="/contacto"
              className="inline-flex items-center px-8 py-4 btn-luxury text-white font-semibold rounded-full transition-all duration-300 shadow-luxury hover:shadow-luxury-hover"
            >
              Contactar Especialista
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
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}