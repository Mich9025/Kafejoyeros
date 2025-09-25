'use client';

import { useState, useEffect, useRef } from 'react';
import Image from 'next/image';

interface Review {
  id: string;
  name: string;
  avatar?: string;
  rating: number;
  date: string;
  text: string;
  verified?: boolean;
}

interface GoogleReviewsProps {
  title?: string;
  subtitle?: string;
  googleRating?: number;
  totalReviews?: number;
  reviews?: Review[];
}

export default function GoogleReviews({
  title = "Lo que dicen nuestros clientes",
  subtitle = "Experiencias reales de personas que confiaron en nosotros",
  googleRating = 4.9,
  totalReviews = 127,
  reviews = [
    {
      id: "1",
      name: "María González",
      avatar: "/api/placeholder/60/60",
      rating: 5,
      date: "2024-01-15",
      text: "Increíble experiencia. El anillo de compromiso que diseñaron para mí superó todas mis expectativas. La atención al detalle y la calidad son excepcionales. Definitivamente recomiendo Kafe Joyeros.",
      verified: true
    },
    {
      id: "2",
      name: "Carlos Rodríguez",
      avatar: "/api/placeholder/60/60",
      rating: 5,
      date: "2024-01-12",
      text: "Servicio personalizado de primera clase. Me ayudaron a crear un collar único para mi esposa y el resultado fue perfecto. El equipo es muy profesional y conocedor.",
      verified: true
    },
    {
      id: "3",
      name: "Ana Martínez",
      avatar: "/api/placeholder/60/60",
      rating: 5,
      date: "2024-01-10",
      text: "La mejor joyería de la ciudad. Compré unos aretes de esmeraldas y la calidad es impresionante. Además, el precio fue muy justo para la calidad recibida.",
      verified: true
    },
    {
      id: "4",
      name: "Luis Fernández",
      avatar: "/api/placeholder/60/60",
      rating: 4,
      date: "2024-01-08",
      text: "Excelente trabajo en la reparación de una joya familiar. Muy cuidadosos con las piezas antiguas y el resultado fue perfecto. Volveré sin duda.",
      verified: true
    },
    {
      id: "5",
      name: "Isabella Torres",
      avatar: "/api/placeholder/60/60",
      rating: 5,
      date: "2024-01-05",
      text: "Diseño personalizado increíble. Trabajaron conmigo para crear exactamente lo que tenía en mente. El proceso fue transparente y el resultado superó mis expectativas.",
      verified: true
    },
    {
      id: "6",
      name: "Roberto Silva",
      avatar: "/api/placeholder/60/60",
      rating: 5,
      date: "2024-01-03",
      text: "Atención excepcional y productos de alta calidad. Me asesoraron perfectamente para elegir el regalo ideal. Muy satisfecho con la compra.",
      verified: true
    }
  ]
}: GoogleReviewsProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isVisible, setIsVisible] = useState(false);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  const reviewsPerView = {
    mobile: 1,
    tablet: 2,
    desktop: 3
  };

  useEffect(() => {
    setIsVisible(true);
  }, []);

  useEffect(() => {
    if (isAutoPlaying) {
      intervalRef.current = setInterval(() => {
        setCurrentIndex((prevIndex) => {
          const maxIndex = Math.max(0, reviews.length - reviewsPerView.desktop);
          return prevIndex >= maxIndex ? 0 : prevIndex + 1;
        });
      }, 5000);
    }

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, [isAutoPlaying, reviews.length, reviewsPerView.desktop]);

  const nextReview = () => {
    setIsAutoPlaying(false);
    setCurrentIndex((prevIndex) => {
      const maxIndex = Math.max(0, reviews.length - reviewsPerView.desktop);
      return prevIndex >= maxIndex ? 0 : prevIndex + 1;
    });
  };

  const prevReview = () => {
    setIsAutoPlaying(false);
    setCurrentIndex((prevIndex) => {
      const maxIndex = Math.max(0, reviews.length - reviewsPerView.desktop);
      return prevIndex <= 0 ? maxIndex : prevIndex - 1;
    });
  };

  const goToReview = (index: number) => {
    setIsAutoPlaying(false);
    setCurrentIndex(index);
  };

  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }, (_, index) => (
      <svg
        key={index}
        className={`w-4 h-4 ${index < rating ? 'text-yellow-400 fill-current' : 'text-gray-300'}`}
        viewBox="0 0 24 24"
      >
        <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
      </svg>
    ));
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
    <section id="reviews" className="py-20 bg-gradient-to-br from-white to-cream relative overflow-hidden">
      {/* Decorative Background */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-20 right-20 w-40 h-40 border border-gold/30 rounded-full"></div>
        <div className="absolute bottom-20 left-20 w-32 h-32 border border-champagne/40 rotate-45"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-64 h-64 border border-gold/20 rotate-12"></div>
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
          <p className="text-charcoal/80 text-lg md:text-xl font-sans font-light max-w-2xl mx-auto mb-8">
            {subtitle}
          </p>

          {/* Google Rating Summary */}
          <div className="flex items-center justify-center gap-6 mb-8">
            <div className="flex items-center gap-3 bg-white/60 backdrop-blur-lg rounded-2xl px-6 py-4 border border-gold/20">
              <Image
                src="/api/placeholder/40/40"
                alt="Google"
                width={40}
                height={40}
                className="w-8 h-8"
              />
              <div className="text-left">
                <div className="flex items-center gap-2">
                  <span className="font-serif text-2xl font-bold text-charcoal">{googleRating}</span>
                  <div className="flex">
                    {renderStars(Math.floor(googleRating))}
                  </div>
                </div>
                <p className="text-sm text-charcoal/70 font-sans">{totalReviews} reseñas</p>
              </div>
            </div>
          </div>
        </div>

        {/* Reviews Carousel */}
        <div className="relative">
          <div className="overflow-hidden">
            <div 
              className="flex transition-transform duration-500 ease-in-out"
              style={{ transform: `translateX(-${currentIndex * (100 / reviewsPerView.desktop)}%)` }}
            >
              {reviews.map((review, index) => (
                <div
                  key={review.id}
                  className="w-full md:w-1/2 lg:w-1/3 flex-shrink-0 px-3"
                >
                  <div className={`card-luxury rounded-2xl p-6 h-full transform transition-all duration-700 ${
                    isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'
                  }`}
                  style={{ transitionDelay: `${index * 100 + 500}ms` }}
                  >
                    {/* Review Header */}
                    <div className="flex items-start gap-4 mb-4">
                      <div className="relative">
                        <Image
                          src={review.avatar || "/api/placeholder/60/60"}
                          alt={review.name}
                          width={60}
                          height={60}
                          className="w-12 h-12 rounded-full object-cover border-2 border-gold/20"
                        />
                        {review.verified && (
                          <div className="absolute -bottom-1 -right-1 w-5 h-5 bg-blue-500 rounded-full flex items-center justify-center">
                            <svg className="w-3 h-3 text-white fill-current" viewBox="0 0 24 24">
                              <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z"/>
                            </svg>
                          </div>
                        )}
                      </div>
                      <div className="flex-1">
                        <h4 className="font-sans font-semibold text-charcoal mb-1">{review.name}</h4>
                        <div className="flex items-center gap-2 mb-1">
                          <div className="flex">
                            {renderStars(review.rating)}
                          </div>
                          <span className="text-sm text-charcoal/60 font-sans">{formatDate(review.date)}</span>
                        </div>
                      </div>
                    </div>

                    {/* Review Text */}
                    <blockquote className="text-charcoal/80 font-sans leading-relaxed italic">
                      &ldquo;{review.text}&rdquo;
                    </blockquote>

                    {/* Google Badge */}
                    <div className="flex items-center justify-between mt-4 pt-4 border-t border-gold/20">
                      <div className="flex items-center gap-2">
                        <Image
                          src="/api/placeholder/20/20"
                          alt="Google"
                          width={20}
                          height={20}
                          className="w-4 h-4"
                        />
                        <span className="text-xs text-charcoal/60 font-sans">Google Reviews</span>
                      </div>
                      {review.verified && (
                        <span className="text-xs text-blue-600 font-sans font-medium">Verificado</span>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Navigation Arrows */}
          <button
            onClick={prevReview}
            className="absolute left-0 top-1/2 transform -translate-y-1/2 -translate-x-4 w-12 h-12 bg-white/90 backdrop-blur-lg rounded-full shadow-luxury flex items-center justify-center text-charcoal hover:bg-white transition-all duration-300 hover:scale-110"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
          </button>
          <button
            onClick={nextReview}
            className="absolute right-0 top-1/2 transform -translate-y-1/2 translate-x-4 w-12 h-12 bg-white/90 backdrop-blur-lg rounded-full shadow-luxury flex items-center justify-center text-charcoal hover:bg-white transition-all duration-300 hover:scale-110"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </button>
        </div>

        {/* Dots Indicator */}
        <div className="flex justify-center mt-8 gap-2">
          {Array.from({ length: Math.max(1, reviews.length - reviewsPerView.desktop + 1) }, (_, index) => (
            <button
              key={index}
              onClick={() => goToReview(index)}
              className={`w-3 h-3 rounded-full transition-all duration-300 ${
                currentIndex === index 
                  ? 'bg-gold shadow-lg' 
                  : 'bg-gold/30 hover:bg-gold/50'
              }`}
            />
          ))}
        </div>

        {/* CTA Section */}
        <div className={`text-center mt-16 transform transition-all duration-1000 delay-1000 ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
          <div className="bg-white/60 backdrop-filter backdrop-blur-lg rounded-3xl p-8 max-w-2xl mx-auto border border-gold/20">
            <h3 className="font-serif text-2xl md:text-3xl font-semibold text-charcoal mb-4">
              ¿Quieres ser el próximo cliente satisfecho?
            </h3>
            <p className="text-charcoal/70 font-sans mb-6">
              Únete a más de {totalReviews} clientes que han confiado en nosotros para crear sus joyas especiales.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a
                href="#contacto"
                className="btn-luxury px-8 py-4 text-white font-sans font-medium rounded-full shadow-luxury hover:shadow-luxury-hover transition-all duration-300"
              >
                Solicitar Consulta
              </a>
              <a
                href="https://www.google.com/search?q=kafe+joyeros+reviews"
                target="_blank"
                rel="noopener noreferrer"
                className="btn-luxury-outline px-8 py-4 font-sans font-medium rounded-full transition-all duration-300"
              >
                Ver todas las reseñas
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}