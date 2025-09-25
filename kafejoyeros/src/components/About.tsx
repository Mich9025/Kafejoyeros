'use client';

interface AboutProps {
  title?: string;
  subtitle?: string;
  description?: string;
  features?: Array<{
    icon: string;
    title: string;
    description: string;
  }>;
  image?: string;
  stats?: Array<{
    number: string;
    label: string;
  }>;
}

export default function About({
  title = "Nuestra Pasión por la Joyería",
  subtitle = "Tradición y Excelencia",
  description = "Con más de dos décadas de experiencia en el arte de la joyería, nos especializamos en crear piezas únicas que reflejan la personalidad y estilo de cada cliente. Nuestro compromiso con la calidad y la artesanía tradicional nos ha convertido en referentes en joyería artesanal.",
  features = [
    {
      icon: "✨",
      title: "Diseño Personalizado",
      description: "Cada pieza es diseñada exclusivamente según tus gustos y preferencias."
    },
    {
      icon: "💎",
      title: "Materiales Premium",
      description: "Utilizamos solo los mejores materiales: oro, plata y gemas certificadas."
    },
    {
      icon: "🔨",
      title: "Artesanía Tradicional",
      description: "Técnicas ancestrales combinadas con herramientas modernas de precisión."
    },
    {
      icon: "🏆",
      title: "Garantía de Calidad",
      description: "Cada joya viene con certificado de autenticidad y garantía extendida."
    }
  ],
  image = "https://images.unsplash.com/photo-1611652022419-a9419f74343d?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
  stats = [
    { number: "20+", label: "Años de Experiencia" },
    { number: "1000+", label: "Clientes Satisfechos" },
    { number: "500+", label: "Piezas Únicas" },
    { number: "100%", label: "Artesanal" }
  ]
}: AboutProps) {
  return (
    <section className="py-16 lg:py-24 bg-gradient-to-br from-gray-50 to-white">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 mb-4">
            {title}
          </h2>
          <p className="text-xl text-amber-600 font-medium mb-6">
            {subtitle}
          </p>
          <div className="w-24 h-1 bg-gradient-to-r from-amber-400 to-amber-600 mx-auto rounded-full"></div>
        </div>

        {/* Main Content */}
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center mb-16">
          {/* Text Content */}
          <div className="space-y-8">
            <p className="text-lg text-gray-700 leading-relaxed">
              {description}
            </p>

            {/* Features Grid */}
            <div className="grid sm:grid-cols-2 gap-6">
              {features.map((feature, index) => (
                <div 
                  key={index}
                  className="bg-white p-6 rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-300 border border-gray-100"
                >
                  <div className="text-3xl mb-3">{feature.icon}</div>
                  <h3 className="font-semibold text-gray-900 mb-2">
                    {feature.title}
                  </h3>
                  <p className="text-gray-600 text-sm leading-relaxed">
                    {feature.description}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* Image */}
          <div className="relative">
            <div className="relative overflow-hidden rounded-2xl shadow-2xl">
              <img
                src={image}
                alt="Artesano trabajando en joyería"
                className="w-full h-96 lg:h-[500px] object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent"></div>
            </div>
            
            {/* Decorative Elements */}
            <div className="absolute -top-4 -right-4 w-24 h-24 bg-gradient-to-br from-amber-400 to-amber-600 rounded-full opacity-20 animate-pulse"></div>
            <div className="absolute -bottom-4 -left-4 w-16 h-16 bg-gradient-to-br from-amber-400 to-amber-600 rounded-full opacity-30 animate-pulse"></div>
          </div>
        </div>

        {/* Stats Section */}
        <div className="bg-gradient-to-r from-amber-500 to-amber-600 rounded-2xl p-8 lg:p-12 text-white">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <div key={index} className="text-center">
                <div className="text-3xl lg:text-4xl font-bold mb-2">
                  {stat.number}
                </div>
                <div className="text-amber-100 font-medium">
                  {stat.label}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Call to Action */}
        <div className="text-center mt-12">
          <a
            href="/nosotros"
            className="inline-flex items-center px-8 py-4 bg-gray-900 text-white font-semibold rounded-full hover:bg-gray-800 transition-colors duration-300 shadow-lg hover:shadow-xl"
          >
            Conoce Nuestra Historia
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
    </section>
  );
}