'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { getPosts, getPostsWithPagination, getFeaturedImage, type WordPressPost, type WordPressMedia } from '@/helpers/wordpress';

interface BlogPost {
  id: number;
  title: string;
  excerpt: string;
  slug: string;
  date: string;
  featuredImage?: string;
  author: string;
  categories: string[];
}
export default function BlogPage() {
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const postsPerPage = 9;

  useEffect(() => {
    fetchPosts(currentPage);
  }, [currentPage]);

  const fetchPosts = async (page: number) => {
    try {
      setLoading(true);
      
      // Obtener posts de WordPress con información de paginación
      const { posts: wordPressPosts, totalPages: wpTotalPages } = await getPostsWithPagination({
        per_page: postsPerPage,
        page: page,
        orderby: 'date',
        order: 'desc'
      });

      // Procesar posts y obtener imágenes destacadas
      const processedPosts = await Promise.all(
        wordPressPosts.map(async (post: WordPressPost) => {
          let featuredImage = '';
          
          if (post.featured_media) {
            try {
              const media: WordPressMedia | null = await getFeaturedImage(post.featured_media);
              featuredImage = media?.source_url || '';
            } catch (error) {
              console.error('Error fetching featured image:', error);
            }
          }

          return {
            id: post.id,
            title: post.title.rendered,
            excerpt: post.excerpt.rendered.replace(/<[^>]*>/g, '').substring(0, 150) + '...',
            slug: post.slug,
            date: new Date(post.date).toLocaleDateString('es-ES', {
              year: 'numeric',
              month: 'long',
              day: 'numeric'
            }),
            featuredImage,
            author: 'Kafé Joyeros',
            categories: ['Joyería', 'Artesanía']
          };
        })
      );

      setPosts(processedPosts);
      
      // Usar el total de páginas real de WordPress
      setTotalPages(wpTotalPages);
      
    } catch (error) {
      console.error('Error fetching posts:', error);
      
      // No mostrar contenido de respaldo, solo posts vacíos
      setPosts([]);
      setTotalPages(0);
    } finally {
      setLoading(false);
    }
  };

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <>
      <Header logo={"https://yellowgreen-deer-888686.hostingersite.com/wp-content/uploads/2025/10/NOMBRE-SLOGAN-COLOR-2-JPG-Photoroom.png"} />
      
      <main className="min-h-screen bg-white">
        {/* Hero Section */}
        <section className="relative bg-gradient-to-br from-gray-900 via-gray-800 to-black py-32 overflow-hidden">
          
             {/* Background Image with Parallax Effect */}
      <div className="absolute inset-0 z-0">
        
          <div            
            className={`absolute inset-0 transition-opacity duration-2000 ease-in-out`}
          >
            <Image
              src={"https://yellowgreen-deer-888686.hostingersite.com/wp-content/uploads/2025/10/piedras-certificadas.jpg"}
              alt={"Hero background"}
              fill
              unoptimized={true}
              className="object-cover scale-110 animate-slow-zoom"              
            />
          </div>        
        
        {/* Elegant Overlay */}
        <div className="absolute inset-0 bg-gradient-to-br from-[#2c4026] via-[#171717]/20 to-[#2c4026]"></div>
        
        {/* Decorative Elements */}
        <div className="absolute top-20 left-20 w-32 h-32 animate-float">
                  <Image 
                    src="https://yellowgreen-deer-888686.hostingersite.com/wp-content/uploads/2025/11/ICONO-2-PNG-scaled.png" 
                    alt="Decorative element" 
                    fill
                    className="w-full h-full object-contain opacity-20 filter brightness-110"
                    style={{filter: 'sepia(100%) hue-rotate(15deg) brightness(3.5)'}}
                  />
                </div>         
                <div className="absolute bottom-32 right-32 w-24 h-24 rotate-12 animate-float" style={{animationDelay: '1s'}}>
                <Image 
                    src="https://yellowgreen-deer-888686.hostingersite.com/wp-content/uploads/2025/11/ICONO-2-PNG-scaled.png" 
                    alt="Decorative element" 
                    fill
                    className="w-full h-full object-contain opacity-20 filter brightness-110"
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
                Blog
              </h1> */}
              {/* <p className="text-xl md:text-2xl font-tai-lue text-gray-300 max-w-3xl mx-auto leading-relaxed">
                Descubre historias, técnicas y secretos del mundo de la joyería artesanal
              </p> */}
              {/* <div className="mt-8 w-24 h-1 bg-gradient-to-r from-transparent via-white to-transparent mx-auto"></div> */}
            </div>
          </div>
          
          {/* Decorative elements */}
          <div className="absolute top-20 left-10 w-32 h-32 border border-white/10 rounded-full"></div>
          <div className="absolute bottom-20 right-10 w-48 h-48 border border-white/5 rounded-full"></div>
        </section>

        {/* Blog Posts Grid */}
        <section className="py-20">
          <div className="container mx-auto px-4">
            {loading ? (
              // Loading skeleton
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                {Array.from({ length: 6 }).map((_, index) => (
                  <div key={index} className="bg-white rounded-2xl shadow-lg overflow-hidden animate-pulse">
                    <div className="h-64 bg-gray-200"></div>
                    <div className="p-6">
                      <div className="h-4 bg-gray-200 rounded mb-4"></div>
                      <div className="h-6 bg-gray-200 rounded mb-4"></div>
                      <div className="h-20 bg-gray-200 rounded mb-4"></div>
                      <div className="h-4 bg-gray-200 rounded w-1/2"></div>
                    </div>
                  </div>
                ))}
              </div>
            ) : posts.length === 0 ? (
              // Empty state when no posts are available
              <div className="text-center py-20">
                <div className="max-w-md mx-auto">
                  <div className="mb-8">
                    <svg className="w-24 h-24 mx-auto text-gray-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9a2 2 0 00-2-2h-2m-4-3H9M7 16h6M7 8h6v4H7V8z" />
                    </svg>
                  </div>
                  <h3 className="text-2xl font-title-tai-lue font-bold text-gray-900 mb-4">
                    No hay entradas de blog disponibles
                  </h3>
                  <p className="text-gray-600 font-tai-lue">
                    Actualmente no hay contenido disponible. Vuelve pronto para ver nuestras últimas publicaciones.
                  </p>
                </div>
              </div>
            ) : (
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                {posts.map((post, index) => (
                  <article 
                    key={post.id} 
                    className="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 group"
                    style={{ animationDelay: `${index * 100}ms` }}
                  >
                    {/* Featured Image */}
                    <div className="relative h-64 overflow-hidden">
                      <Image
                        src={post.featuredImage || 'https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?w=600&h=400&fit=crop'}
                        alt={post.title}
                        fill
                        unoptimized={true}
                        className="object-cover group-hover:scale-110 transition-transform duration-500"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                      
                      {/* Categories */}
                      <div className="absolute top-4 left-4">
                        <div className="flex flex-wrap gap-2">
                          {post.categories.slice(0, 2).map((category, idx) => (
                            <span 
                              key={idx}
                              className="px-3 py-1 bg-white/90 backdrop-blur-sm text-gray-800 text-xs font-semibold rounded-full"
                            >
                              {category}
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>

                    {/* Content */}
                    <div className="p-6">
                      {/* Date and Author */}
                      <div className="flex items-center text-sm text-gray-500 mb-3 font-tai-lue">
                        <time>{post.date}</time>
                        <span className="mx-2">•</span>
                        <span>{post.author}</span>
                      </div>

                      {/* Title */}
                      <h2 className="text-xl font-title-tai-lue font-bold text-gray-900 mb-3 line-clamp-2 group-hover:text-red transition-colors duration-300">
                        {post.title}
                      </h2>

                      {/* Excerpt */}
                      <p className="text-gray-600 font-tai-lue leading-relaxed mb-4 line-clamp-3">
                        {post.excerpt}
                      </p>

                      {/* Read More Link */}
                      <Link 
                        href={`/blog/${post.slug}`}
                        className="inline-flex items-center text-[var(--red)] font-semibold font-tai-lue hover:text-green transition-colors duration-300 group/link"
                      >
                        Leer más
                        <svg 
                          className="w-4 h-4 ml-2 transform group-hover/link:translate-x-1 transition-transform duration-300" 
                          fill="none" 
                          stroke="currentColor" 
                          viewBox="0 0 24 24"
                        >
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                        </svg>
                      </Link>
                    </div>
                  </article>
                ))}
              </div>
            )}

            {/* Pagination */}
            {!loading && totalPages > 1 && (
              <div className="flex justify-center mt-16">
                <nav className="flex items-center space-x-2">
                  {/* Previous Button */}
                  <button
                    onClick={() => handlePageChange(currentPage - 1)}
                    disabled={currentPage === 1}
                    className="px-4 py-2 text-gray-500 hover:text-gray-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors duration-200"
                  >
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                    </svg>
                  </button>

                  {/* Page Numbers */}
                  {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                    <button
                      key={page}
                      onClick={() => handlePageChange(page)}
                      className={`px-4 py-2 rounded-lg font-medium transition-all duration-200 ${
                        currentPage === page
                          ? 'bg-red text-white shadow-lg'
                          : 'text-gray-600 hover:text-gray-900 hover:bg-gray-100'
                      }`}
                    >
                      {page}
                    </button>
                  ))}

                  {/* Next Button */}
                  <button
                    onClick={() => handlePageChange(currentPage + 1)}
                    disabled={currentPage === totalPages}
                    className="px-4 py-2 text-gray-500 hover:text-gray-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors duration-200"
                  >
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </button>
                </nav>
              </div>
            )}
          </div>
        </section>

        {/* Newsletter Section */}
        <section className="py-20 bg-gradient-to-r from-[var(--cream)] to-[var(--cream)]">
          <div className="container mx-auto px-4 text-center">
            <h2 className="text-3xl md:text-4xl font-title-tai-lue font-bold text-gray-900 mb-4">
              Mantente al día
            </h2>
            <p className="text-xl text-gray-600 font-tai-lue mb-8 max-w-2xl mx-auto">
              Suscríbete a nuestro newsletter y recibe las últimas noticias sobre joyería artesanal
            </p>
            <div className="max-w-md mx-auto flex">
              <input
                type="email"
                placeholder="Tu correo electrónico"
                className="flex-1 px-6 py-3 border border-gray-300 rounded-l-full focus:outline-[var(--red)] focus:ring-2 focus:ring-red focus:border-transparent font-tai-lue placeholder:text-black"
              />
              <button className="px-8 py-3 btn-outline-red text-white rounded-r-full hover:bg-[var(--green)] transition-colors duration-300 font-semibold font-tai-lue">
                Suscribirse
              </button>
            </div>
          </div>
        </section>
      </main>

      <Footer logo={"https://yellowgreen-deer-888686.hostingersite.com/wp-content/uploads/2025/10/NOMBRE-SLOGAN-COLOR-1-JPG-Photoroom.png"} />
    </>
  );
}