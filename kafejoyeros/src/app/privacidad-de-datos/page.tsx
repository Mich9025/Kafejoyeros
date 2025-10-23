'use client';

import { useState, useEffect } from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { getPageById, type WordPressPage } from '@/helpers/wordpress';

interface PrivacyPage {
  id: number;
  title: string;
  content: string;
  slug: string;
  date: string;
}

export default function PrivacidadDeDatosPage() {
  const [page, setPage] = useState<PrivacyPage | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchPrivacyPage();
  }, []);

  const fetchPrivacyPage = async () => {
    try {
      setLoading(true);
      setError(null);
      
      // Obtener la página con ID 3 desde WordPress
      const wordPressPage: WordPressPage = await getPageById(3);
      
      const processedPage: PrivacyPage = {
        id: wordPressPage.id,
        title: wordPressPage.title.rendered,
        content: wordPressPage.content.rendered,
        slug: wordPressPage.slug,
        date: new Date(wordPressPage.date).toLocaleDateString('es-ES', {
          year: 'numeric',
          month: 'long',
          day: 'numeric'
        })
      };

      setPage(processedPage);
      
    } catch (error) {
      console.error('Error fetching privacy page:', error);
      setError('No se pudo cargar la página de política de privacidad');
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
    <div className='bg-[var(--cream)]'>
      <Header darkBackground={true} logo={"https://yellowgreen-deer-888686.hostingersite.com/wp-content/uploads/2025/10/NOMBRE-SLOGAN-COLOR-2-JPG-Photoroom.png"} />
    </div>
    
    <div className="min-h-screen bg-white">
      
      
      <main className="pt-24">
        {/* Hero Section */}
        <section className="py-20 bg-white">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto text-center">
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-700 mb-6 font-tai-lue">
                {loading ? 'Cargando...' : page?.title || 'Política de Privacidad de Datos'}
              </h1>
              {/* <div className="w-24 h-1 bg-[var(--red)] mx-auto mb-6"></div> */}
              {/* <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                Información sobre cómo recopilamos, utilizamos y protegemos sus datos personales
              </p> */}
              {page?.date && (
                <p className="text-sm text-gray-500 mt-4">
                  Última actualización: {page.date}
                </p>
              )}
            </div>
          </div>
        </section>

        {/* Content Section */}
        <section className="py-20">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto">
              {loading && (
                <div className="flex justify-center items-center py-20">
                  <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[var(--red)]"></div>
                </div>
              )}

              {error && (
                <div className="text-center py-20">
                  <div className="bg-red-50 border border-red-200 rounded-lg p-8">
                    <svg className="w-16 h-16 text-red-400 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    <h3 className="text-lg font-semibold text-red-800 mb-2">Error al cargar el contenido</h3>
                    <p className="text-red-600">{error}</p>
                    <button 
                      onClick={fetchPrivacyPage}
                      className="mt-4 px-6 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors duration-200"
                    >
                      Intentar de nuevo
                    </button>
                  </div>
                </div>
              )}

              {!loading && !error && page && (
                <div className="prose prose-lg max-w-none">
                  <div 
                    className="wordpress-content"
                    dangerouslySetInnerHTML={{ __html: page.content }}
                  />
                </div>
              )}

              {!loading && !error && !page && (
                <div className="text-center py-20">
                  <div className="bg-gray-50 border border-gray-200 rounded-lg p-8">
                    <svg className="w-16 h-16 text-gray-400 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                    </svg>
                    <h3 className="text-lg font-semibold text-gray-800 mb-2">Contenido no disponible</h3>
                    <p className="text-gray-600">La página de política de privacidad no está disponible en este momento.</p>
                  </div>
                </div>
              )}
            </div>
          </div>
        </section>

        {/* Contact Section */}
        {!loading && !error && page && (
          <section className="py-16 bg-gray-50">
            <div className="container mx-auto px-4">
              <div className="max-w-4xl mx-auto text-center">
                <h2 className="text-3xl font-bold text-[var(--dark-green)] mb-6 font-tai-lue">
                  ¿Tienes preguntas sobre nuestra política de privacidad?
                </h2>
                <p className="text-lg text-gray-600 mb-8">
                  Si tienes alguna duda sobre cómo manejamos tus datos personales, no dudes en contactarnos.
                </p>
                <a 
                  href="/contacto"
                  className="inline-flex items-center px-8 py-3 bg-[var(--red)] text-white font-semibold rounded-lg hover:bg-red-700 transition-colors duration-300"
                >
                  Contactar
                  <svg className="w-5 h-5 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                  </svg>
                </a>
              </div>
            </div>
          </section>
        )}
      </main>

      <Footer logo={"https://yellowgreen-deer-888686.hostingersite.com/wp-content/uploads/2025/10/NOMBRE-SLOGAN-COLOR-1-JPG-Photoroom.png"} />   
    </div>
    </>
  );
}