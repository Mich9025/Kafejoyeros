'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';

interface InstagramPost {
  id: string;
  image: string;
  caption: string;
  likes: number;
  comments: number;
  date: string;
  link?: string;
}

interface InstagramGridProps {
  title?: string;
  subtitle?: string;
  instagramHandle?: string;
  posts?: InstagramPost[];
}

export default function InstagramGrid({
  title = "Síguenos en Instagram",
  subtitle = "Descubre nuestras últimas creaciones y momentos especiales",
  instagramHandle = "@kafejoyeros",
  posts = [
    {
      id: "1",
      image: "/api/placeholder/400/400",
      caption: "Nueva colección de anillos de compromiso. Cada pieza cuenta una historia única de amor eterno.",
      likes: 245,
      comments: 18,
      date: "2024-01-15",
      link: "https://instagram.com/p/example1"
    },
    {
      id: "2",
      image: "/api/placeholder/400/400",
      caption: "Proceso artesanal de creación de un collar personalizado. De la idea al resultado final.",
      likes: 189,
      comments: 12,
      date: "2024-01-14",
      link: "https://instagram.com/p/example2"
    },
    {
      id: "3",
      image: "/api/placeholder/400/400",
      caption: "Aretes de esmeraldas colombianas. La belleza natural en su máxima expresión.",
      likes: 312,
      comments: 25,
      date: "2024-01-13",
      link: "https://instagram.com/p/example3"
    },
    {
      id: "4",
      image: "/api/placeholder/400/400",
      caption: "Detrás de escenas: nuestro taller de joyería. Donde la magia cobra vida.",
      likes: 156,
      comments: 8,
      date: "2024-01-12",
      link: "https://instagram.com/p/example4"
    },
    {
      id: "5",
      image: "/api/placeholder/400/400",
      caption: "Pulsera de oro rosa con detalles únicos. Elegancia en cada detalle.",
      likes: 278,
      comments: 21,
      date: "2024-01-11",
      link: "https://instagram.com/p/example5"
    },
    {
      id: "6",
      image: "/api/placeholder/400/400",
      caption: "Cliente feliz con su nueva joya personalizada. Tu sonrisa es nuestra mayor recompensa.",
      likes: 423,
      comments: 34,
      date: "2024-01-10",
      link: "https://instagram.com/p/example6"
    },
    // {
    //   id: "7",
    //   image: "/api/placeholder/400/400",
    //   caption: "Colección vintage: anillos con historia 📿 Piezas que trascienden el tiempo.",
    //   likes: 198,
    //   comments: 15,
    //   date: "2024-01-09",
    //   link: "https://instagram.com/p/example7"
    // },
    // {
    //   id: "8",
    //   image: "/api/placeholder/400/400",
    //   caption: "Nuevo diseño de collar con perlas naturales 🤍 Sofisticación y naturaleza en armonía.",
    //   likes: 267,
    //   comments: 19,
    //   date: "2024-01-08",
    //   link: "https://instagram.com/p/example8"
    // }
  ]
}: InstagramGridProps) {
  const [selectedPost, setSelectedPost] = useState<InstagramPost | null>(null);
  const [isVisible, setIsVisible] = useState(false);
  const [hoveredPost, setHoveredPost] = useState<string | null>(null);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  const formatNumber = (num: number): string => {
    if (num >= 1000) {
      return (num / 1000).toFixed(1) + 'k';
    }
    return num.toString();
  };

  const formatDate = (dateString: string): string => {
    const date = new Date(dateString);
    const now = new Date();
    const diffTime = Math.abs(now.getTime() - date.getTime());
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    
    if (diffDays === 1) return 'Hace 1 día';
    if (diffDays < 7) return `Hace ${diffDays} días`;
    if (diffDays < 30) return `Hace ${Math.floor(diffDays / 7)} semanas`;
    return `Hace ${Math.floor(diffDays / 30)} meses`;
  };

  return (
    <section id="instagram" className="py-20 bg-white relative overflow-hidden">
      {/* Decorative Background */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-10 left-10 w-32 h-32 border border-gold rotate-45"></div>
        <div className="absolute bottom-10 right-10 w-24 h-24 border border-champagne rotate-12"></div>
        <div className="absolute top-1/2 left-1/4 w-16 h-16 border border-gold/30 rounded-full"></div>
        <div className="absolute top-1/4 right-1/4 w-20 h-20 border border-champagne/40 rotate-45"></div>
      </div>

      <div className="container mx-auto px-6 relative z-10">
        {/* Header */}
        <div className={`text-center mb-16 transform transition-all duration-1000 ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
          <h2 className="font-serif text-4xl md:text-5xl lg:text-6xl text-[#171717] mb-4 uppercase font-title-tai-lue">
            {title}
          </h2>
          <div className="flex items-center justify-center mb-6">
            <div className="h-px bg-gradient-to-r from-transparent via-gold to-transparent w-24"></div>
            <div className="mx-4 w-2 h-2 border border-gold rotate-45"></div>
            <div className="h-px bg-gradient-to-r from-transparent via-gold to-transparent w-24"></div>
          </div>
          <p className=" font-title-tai-lue text-[#171717] text-lg md:text-xl max-w-2xl mx-auto mb-6">
            {subtitle}
          </p>
          <a
            href={`https://instagram.com/${instagramHandle.replace('@', '')}`}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-3 btn-outline-red px-6 py-3 rounded-full font-sans font-medium transition-all duration-300 hover:shadow-luxury"
          >
            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
              <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
            </svg>
            {instagramHandle}
          </a>
        </div>

        {/* Instagram Grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-4 md:gap-6">
          {posts.map((post, index) => (
            <div
              key={post.id}
              className={`relative group cursor-pointer transform transition-all duration-700 ${
                isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'
              }`}
              style={{ transitionDelay: `${index * 100 + 300}ms` }}
              onMouseEnter={() => setHoveredPost(post.id)}
              onMouseLeave={() => setHoveredPost(null)}
              onClick={() => setSelectedPost(post)}
            >
              <div className="relative overflow-hidden rounded-2xl aspect-square bg-gradient-to-br from-gold/10 to-champagne/20">
                <Image
                  src={post.image}
                  alt={post.caption}
                  width={400}
                  height={400}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                />
                
                {/* Overlay */}
                <div className={`absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent transition-opacity duration-300 ${
                  hoveredPost === post.id ? 'opacity-100' : 'opacity-0'
                }`}>
                  <div className="absolute bottom-4 left-4 right-4 text-white">
                    <div className="flex items-center gap-4 mb-2">
                      <div className="flex items-center gap-1">
                        <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                          <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/>
                        </svg>
                        <span className="text-sm font-sans">{formatNumber(post.likes)}</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                          <path d="M21,6H3A1,1 0 0,0 2,7V17A1,1 0 0,0 3,18H21A1,1 0 0,0 22,17V7A1,1 0 0,0 21,6M13.5,13.5H7.5V12H13.5V13.5M16.5,9.5H7.5V8H16.5V9.5Z"/>
                        </svg>
                        <span className="text-sm font-sans">{formatNumber(post.comments)}</span>
                      </div>
                    </div>
                    <p className="text-xs font-sans line-clamp-2 opacity-90">
                      {post.caption}
                    </p>
                  </div>
                </div>

                {/* Instagram Icon */}
                <div className="absolute top-3 right-3 w-8 h-8 bg-white/90 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <svg className="w-4 h-4 text-pink-500" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
                  </svg>
                </div>

                {/* Shimmer Effect */}
                <div className="absolute inset-0 shimmer opacity-0 group-hover:opacity-30"></div>
              </div>
            </div>
          ))}
        </div>

        {/* CTA Section */}
        <div className={`text-center mt-16 transform transition-all duration-1000 delay-1000 ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
          <div className="bg-white/60 backdrop-filter backdrop-blur-lg rounded-3xl p-8 max-w-xl mx-auto border border-[#540031]">
            <h3 className="uppercase text-2xl font-semibold text-[#171717] mb-4 font-title-tai-lue">
              ¡Únete a nuestra comunidad!
            </h3>
            <p className="text-charcoal/70 font-sans mb-6 font-title-tai-lue">
              Síguenos para ver nuestras últimas creaciones, procesos artesanales y momentos especiales.
            </p>
            <a
              href={`https://instagram.com/${instagramHandle.replace('@', '')}`}
              target="_blank"
              rel="noopener noreferrer"
              className="bg-button px-8 py-4 text-white font-sans font-medium rounded-full shadow-luxury hover:shadow-luxury-hover transition-all duration-300 inline-block"
            >
              Seguir en Instagram
            </a>
          </div>
        </div>
      </div>

      {/* Modal */}
      {selectedPost && (
        <div className="fixed inset-0 bg-black/90 backdrop-blur-sm z-50 flex items-center justify-center p-4" onClick={() => setSelectedPost(null)}>
          <div className="bg-white rounded-3xl max-w-4xl w-full max-h-[90vh] overflow-hidden flex flex-col md:flex-row" onClick={(e) => e.stopPropagation()}>
            <div className="md:w-2/3 relative">
              <Image
                src={selectedPost.image}
                alt={selectedPost.caption}
                width={800}
                height={800}
                className="w-full h-64 md:h-full object-cover"
              />
            </div>
            <div className="md:w-1/3 p-6 flex flex-col">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-gradient-luxury rounded-full flex items-center justify-center">
                    <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069z"/>
                    </svg>
                  </div>
                  <div>
                    <p className="font-sans font-semibold text-charcoal">{instagramHandle}</p>
                    <p className="text-xs text-charcoal/60 font-sans">{formatDate(selectedPost.date)}</p>
                  </div>
                </div>
                <button
                  onClick={() => setSelectedPost(null)}
                  className="w-8 h-8 bg-gray-100 text-charcoal rounded-full flex items-center justify-center hover:bg-gray-200 transition-colors"
                >
                  ×
                </button>
              </div>
              
              <div className="flex-1 overflow-y-auto">
                <p className="text-charcoal font-sans leading-relaxed mb-6">
                  {selectedPost.caption}
                </p>
              </div>
              
              <div className="border-t pt-4">
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-6">
                    <div className="flex items-center gap-2">
                      <svg className="w-5 h-5 text-red-500 fill-current" viewBox="0 0 24 24">
                        <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/>
                      </svg>
                      <span className="font-sans font-medium text-charcoal">{formatNumber(selectedPost.likes)}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <svg className="w-5 h-5 text-charcoal fill-current" viewBox="0 0 24 24">
                        <path d="M21,6H3A1,1 0 0,0 2,7V17A1,1 0 0,0 3,18H21A1,1 0 0,0 22,17V7A1,1 0 0,0 21,6M13.5,13.5H7.5V12H13.5V13.5M16.5,9.5H7.5V8H16.5V9.5Z"/>
                      </svg>
                      <span className="font-sans font-medium text-charcoal">{formatNumber(selectedPost.comments)}</span>
                    </div>
                  </div>
                </div>
                {selectedPost.link && (
                  <a
                    href={selectedPost.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn-luxury-outline w-full py-3 text-center font-sans font-medium rounded-full transition-all duration-300"
                  >
                    Ver en Instagram
                  </a>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}