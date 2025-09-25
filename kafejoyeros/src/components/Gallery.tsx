'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';

interface GalleryItem {
  id: number;
  title: string;
  category: string;
  image: string;
  description?: string;
  price?: string;
  materials?: string[];
}

interface GalleryProps {
  title?: string;
  subtitle?: string;
  items?: GalleryItem[];
}

export default function Gallery({
  title = "Colección Exclusiva",
  subtitle = "Cada pieza es una obra maestra única",
  items = [
    {
      id: 1,
      title: "Anillo Eternidad",
      category: "anillos",
      image: "/api/placeholder/400/400",
      description: "Elegante anillo con diamantes en oro blanco",
      price: "Consultar",
      materials: ["Oro blanco 18k", "Diamantes"]
    },
    {
      id: 2,
      title: "Collar Celestial",
      category: "collares",
      image: "/api/placeholder/400/400",
      description: "Collar con perlas naturales y detalles en oro",
      price: "Consultar",
      materials: ["Oro amarillo 18k", "Perlas naturales"]
    },
    {
      id: 3,
      title: "Aretes Luminosos",
      category: "aretes",
      image: "/api/placeholder/400/400",
      description: "Aretes con esmeraldas y diamantes",
      price: "Consultar",
      materials: ["Platino", "Esmeraldas", "Diamantes"]
    },
    {
      id: 4,
      title: "Pulsera Elegancia",
      category: "pulseras",
      image: "/api/placeholder/400/400",
      description: "Pulsera artesanal con detalles únicos",
      price: "Consultar",
      materials: ["Oro rosa 18k", "Zafiros"]
    },
    {
      id: 5,
      title: "Anillo Vintage",
      category: "anillos",
      image: "/api/placeholder/400/400",
      description: "Diseño vintage con rubíes",
      price: "Consultar",
      materials: ["Oro amarillo", "Rubíes"]
    },
    {
      id: 6,
      title: "Collar Perlas",
      category: "collares",
      image: "/api/placeholder/400/400",
      description: "Collar clásico de perlas cultivadas",
      price: "Consultar",
      materials: ["Perlas cultivadas", "Oro blanco"]
    }
  ]
}: GalleryProps) {
  const [selectedCategory, setSelectedCategory] = useState('todos');
  const [selectedItem, setSelectedItem] = useState<GalleryItem | null>(null);
  const [isVisible, setIsVisible] = useState(false);

  const categories = ['todos', ...Array.from(new Set(items.map(item => item.category)))];
  
  const filteredItems = selectedCategory === 'todos' 
    ? items 
    : items.filter(item => item.category === selectedCategory);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  const categoryNames: { [key: string]: string } = {
    'todos': 'Todas las Piezas',
    'anillos': 'Anillos',
    'collares': 'Collares',
    'aretes': 'Aretes',
    'pulseras': 'Pulseras'
  };

  return (
    <section id="galeria" className="py-20 bg-gradient-champagne relative overflow-hidden">
      {/* Decorative Background Elements */}
      <div className="absolute top-0 left-0 w-full h-full opacity-10">
        <div className="absolute top-20 left-10 w-64 h-64 border border-gold/20 rotate-45"></div>
        <div className="absolute bottom-20 right-10 w-48 h-48 border border-champagne/30 rotate-12"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 border border-gold/10 rounded-full"></div>
      </div>

      <div className="container mx-auto px-6 relative z-10">
        {/* Header */}
        <div className={`text-center mb-16 transform transition-all duration-1000 ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
          <h2 className="font-serif text-4xl md:text-5xl lg:text-6xl font-bold text-gradient-luxury mb-4">
            {title}
          </h2>
          <div className="flex items-center justify-center mb-6">
            <div className="h-px bg-gradient-to-r from-transparent via-gold to-transparent w-24"></div>
            <div className="mx-4 w-2 h-2 border border-gold rotate-45"></div>
            <div className="h-px bg-gradient-to-r from-transparent via-gold to-transparent w-24"></div>
          </div>
          <p className="text-charcoal/80 text-lg md:text-xl font-sans font-light max-w-2xl mx-auto">
            {subtitle}
          </p>
        </div>

        {/* Category Filter */}
        <div className={`flex flex-wrap justify-center gap-4 mb-12 transform transition-all duration-1000 delay-300 ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => setSelectedCategory(category)}
              className={`px-6 py-3 rounded-full font-sans font-medium transition-all duration-300 ${
                selectedCategory === category
                  ? 'btn-luxury text-white shadow-luxury'
                  : 'bg-white/80 text-charcoal hover:bg-gold/20 border border-gold/30'
              }`}
            >
              {categoryNames[category] || category}
            </button>
          ))}
        </div>

        {/* Gallery Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredItems.map((item, index) => (
            <div
              key={item.id}
              className={`card-luxury rounded-2xl overflow-hidden cursor-pointer group transform transition-all duration-700 ${
                isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'
              }`}
              style={{ transitionDelay: `${index * 100 + 500}ms` }}
              onClick={() => setSelectedItem(item)}
            >
              <div className="relative overflow-hidden">
                <Image
                  src={item.image}
                  alt={item.title}
                  width={400}
                  height={400}
                  className="w-full h-80 object-cover transition-transform duration-700 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                <div className="absolute bottom-4 left-4 right-4 text-white transform translate-y-4 group-hover:translate-y-0 opacity-0 group-hover:opacity-100 transition-all duration-300">
                  <h3 className="font-serif text-xl font-semibold mb-1">{item.title}</h3>
                  <p className="text-sm font-sans">{item.description}</p>
                </div>
                
                {/* Shimmer Effect */}
                <div className="absolute inset-0 shimmer opacity-0 group-hover:opacity-100"></div>
              </div>
              
              <div className="p-6">
                <div className="flex justify-between items-start mb-3">
                  <h3 className="font-serif text-xl font-semibold text-charcoal">{item.title}</h3>
                  <span className="text-gold font-sans font-medium">{item.price}</span>
                </div>
                <p className="text-charcoal/70 font-sans text-sm mb-3">{item.description}</p>
                {item.materials && (
                  <div className="flex flex-wrap gap-2">
                    {item.materials.map((material, idx) => (
                      <span
                        key={idx}
                        className="px-3 py-1 bg-champagne/50 text-charcoal/80 text-xs font-sans rounded-full"
                      >
                        {material}
                      </span>
                    ))}
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>

        {/* CTA Section */}
        <div className={`text-center mt-16 transform transition-all duration-1000 delay-1000 ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
          <div className="bg-white/60 backdrop-filter backdrop-blur-lg rounded-3xl p-8 max-w-2xl mx-auto border border-gold/20">
            <h3 className="font-serif text-2xl md:text-3xl font-semibold text-charcoal mb-4">
              ¿Buscas algo único?
            </h3>
            <p className="text-charcoal/70 font-sans mb-6">
              Creamos piezas personalizadas que reflejan tu estilo y personalidad. 
              Cada diseño es una colaboración entre tu visión y nuestra artesanía.
            </p>
            <a
              href="#contacto"
              className="btn-luxury px-8 py-4 text-white font-sans font-medium rounded-full shadow-luxury hover:shadow-luxury-hover transition-all duration-300 inline-block"
            >
              Solicitar Diseño Personalizado
            </a>
          </div>
        </div>
      </div>

      {/* Modal */}
      {selectedItem && (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4" onClick={() => setSelectedItem(null)}>
          <div className="bg-white rounded-3xl max-w-2xl w-full max-h-[90vh] overflow-y-auto" onClick={(e) => e.stopPropagation()}>
            <div className="relative">
              <Image
                src={selectedItem.image}
                alt={selectedItem.title}
                width={800}
                height={600}
                className="w-full h-96 object-cover rounded-t-3xl"
              />
              <button
                onClick={() => setSelectedItem(null)}
                className="absolute top-4 right-4 w-10 h-10 bg-black/50 text-white rounded-full flex items-center justify-center hover:bg-black/70 transition-colors"
              >
                ×
              </button>
            </div>
            <div className="p-8">
              <h3 className="font-serif text-3xl font-bold text-charcoal mb-4">{selectedItem.title}</h3>
              <p className="text-charcoal/70 font-sans text-lg mb-6">{selectedItem.description}</p>
              {selectedItem.materials && (
                <div className="mb-6">
                  <h4 className="font-sans font-semibold text-charcoal mb-3">Materiales:</h4>
                  <div className="flex flex-wrap gap-2">
                    {selectedItem.materials.map((material, idx) => (
                      <span
                        key={idx}
                        className="px-4 py-2 bg-champagne text-charcoal font-sans rounded-full"
                      >
                        {material}
                      </span>
                    ))}
                  </div>
                </div>
              )}
              <div className="flex justify-between items-center">
                <span className="text-2xl font-serif font-bold text-gold">{selectedItem.price}</span>
                <a
                  href="#contacto"
                  className="btn-luxury px-6 py-3 text-white font-sans font-medium rounded-full"
                  onClick={() => setSelectedItem(null)}
                >
                  Consultar Disponibilidad
                </a>
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}