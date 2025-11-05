'use client';

import { useState, useEffect } from 'react';
import { useParams } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { getPostBySlug, getFeaturedImage, type WordPressPost, type WordPressMedia } from '@/helpers/wordpress';

interface BlogPost {
  id: number;
  title: string;
  content: string;
  slug: string;
  date: string;
  featuredImage?: string;
  author: string;
  categories: string[];
  excerpt: string;
}

export default function BlogPostPage() {
  const params = useParams();
  const slug = params.slug as string;
  
  const [post, setPost] = useState<BlogPost | null>(null);
  const [loading, setLoading] = useState(true);
  const [relatedPosts, setRelatedPosts] = useState<BlogPost[]>([]);

  useEffect(() => {
    if (slug) {
      fetchPost(slug);
    }
  }, [slug]);

  const fetchPost = async (postSlug: string) => {
    try {
      setLoading(true);
      
      // Intentar obtener el post de WordPress
      const wordPressPost: WordPressPost | null = await getPostBySlug(postSlug);
      if (!wordPressPost) throw new Error('Post not found');
      
      let featuredImage = '';
      if (wordPressPost.featured_media) {
        try {
          const media: WordPressMedia | null = await getFeaturedImage(wordPressPost.featured_media);
          featuredImage = media?.source_url || '';
        } catch (error) {
          console.error('Error fetching featured image:', error);
        }
      }

      const processedPost: BlogPost = {
        id: wordPressPost.id,
        title: wordPressPost.title.rendered,
        content: wordPressPost.content.rendered,
        excerpt: wordPressPost.excerpt.rendered.replace(/<[^>]*>/g, '').substring(0, 200) + '...',
        slug: wordPressPost.slug,
        date: new Date(wordPressPost.date).toLocaleDateString('es-ES', {
          year: 'numeric',
          month: 'long',
          day: 'numeric'
        }),
        featuredImage,
        author: 'Kafé Joyeros',
        categories: ['Joyería', 'Artesanía']
      };

      setPost(processedPost);
      
    } catch (error) {
      console.error('Error fetching post:', error);
      
      // Fallback con contenido de ejemplo basado en el slug
      const fallbackPosts: { [key: string]: BlogPost } = {
        'arte-joyeria-regenerativa': {
          id: 1,
          title: 'El Arte de la Joyería Regenerativa',
          content: `
            <div class="prose prose-lg max-w-none">
              <p class="lead">La joyería regenerativa representa una revolución en nuestra industria, donde cada pieza no solo embellece, sino que también contribuye positivamente al medio ambiente y las comunidades locales.</p>
              
              <h2>¿Qué es la Joyería Regenerativa?</h2>
              <p>La joyería regenerativa va más allá de la sostenibilidad tradicional. Mientras que la sostenibilidad busca "no hacer daño", la regeneración busca activamente <strong>restaurar y mejorar</strong> los ecosistemas y comunidades donde trabajamos.</p>
              
              <h3>Nuestros Principios Fundamentales</h3>
              <ul>
                <li><strong>Extracción Responsable:</strong> Trabajamos únicamente con minas que implementan prácticas de restauración ecológica</li>
                <li><strong>Comercio Justo:</strong> Garantizamos precios justos y condiciones dignas para todos los artesanos</li>
                <li><strong>Impacto Positivo:</strong> Cada compra contribuye a proyectos de reforestación y educación</li>
                <li><strong>Transparencia Total:</strong> Conoce el origen de cada material en nuestras piezas</li>
              </ul>
              
              <h2>El Proceso de Transformación</h2>
              <p>Desde la extracción del oro hasta el acabado final, cada paso de nuestro proceso está diseñado para generar un impacto positivo:</p>
              
              <ol>
                <li><strong>Selección de Materiales:</strong> Oro reciclado y de minas certificadas</li>
                <li><strong>Diseño Consciente:</strong> Creaciones que honran la tradición y abrazan la innovación</li>
                <li><strong>Artesanía Experta:</strong> Técnicas ancestrales aplicadas por maestros joyeros</li>
                <li><strong>Acabado Perfecto:</strong> Cada pieza es única y cuenta una historia</li>
              </ol>
              
              <blockquote>
                <p>"No heredamos la tierra de nuestros ancestros, la tomamos prestada de nuestros hijos. Cada joya que creamos debe honrar esta responsabilidad."</p>
                <cite>— Filosofía Kafé Joyeros</cite>
              </blockquote>
              
              <h2>Impacto Medible</h2>
              <p>En los últimos tres años, nuestro programa de joyería regenerativa ha logrado:</p>
              <ul>
                <li>Restauración de 50 hectáreas de bosque nativo</li>
                <li>Apoyo directo a 200 familias de artesanos</li>
                <li>Reducción del 80% en nuestra huella de carbono</li>
                <li>Creación de 3 centros de capacitación comunitaria</li>
              </ul>
              
              <p>Cuando eliges una joya regenerativa, no solo adquieres una pieza hermosa, sino que te conviertes en parte de un movimiento que está transformando la industria joyera hacia un futuro más brillante y sostenible.</p>
            </div>
          `,
          excerpt: 'Descubre cómo nuestro enfoque en la joyería regenerativa está transformando la industria y creando un impacto positivo en el medio ambiente...',
          slug: 'arte-joyeria-regenerativa',
          date: '15 de enero de 2025',
          featuredImage: 'https://yellowgreen-deer-888686.hostingersite.com/wp-content/uploads/2025/10/joyeria-regenerativa.png',
          author: 'Kafé Joyeros',
          categories: ['Sostenibilidad', 'Artesanía']
        },
        'tecnicas-ancestrales-diseno-moderno': {
          id: 2,
          title: 'Técnicas Ancestrales en el Diseño Moderno',
          content: `
            <div class="prose prose-lg max-w-none">
              <p class="lead">En Kafé Joyeros, honramos las técnicas milenarias de orfebrería mientras abrazamos la innovación del diseño contemporáneo, creando piezas que son puentes entre el pasado y el futuro.</p>
              
              <h2>La Herencia de Nuestros Ancestros</h2>
              <p>Las técnicas de orfebrería que utilizamos han sido transmitidas de generación en generación durante más de 500 años. Cada método cuenta una historia, cada herramienta lleva consigo la sabiduría de maestros artesanos que perfeccionaron su arte a lo largo de los siglos.</p>
              
              <h3>Técnicas Tradicionales que Preservamos</h3>
              <ul>
                <li><strong>Filigrana:</strong> El arte de crear encajes de oro y plata con hilos finísimos</li>
                <li><strong>Repujado:</strong> Técnica de martillado que da forma y textura desde el reverso</li>
                <li><strong>Granulación:</strong> Decoración con pequeñas esferas de metal soldadas</li>
                <li><strong>Esmaltado:</strong> Aplicación de vidrios coloreados fundidos sobre metal</li>
              </ul>
              
              <h2>Innovación en el Siglo XXI</h2>
              <p>Mientras honramos el pasado, también abrazamos las posibilidades del presente. Nuestros diseñadores combinan estas técnicas ancestrales con:</p>
              
              <ul>
                <li>Diseño asistido por computadora para precisión milimétrica</li>
                <li>Nuevas aleaciones que mejoran la durabilidad</li>
                <li>Técnicas de acabado que realzan la belleza natural</li>
                <li>Engastes innovadores que maximizan el brillo de las gemas</li>
              </ul>
              
              <blockquote>
                <p>"La tradición no es adorar las cenizas, sino mantener vivo el fuego."</p>
                <cite>— Gustav Mahler</cite>
              </blockquote>
              
              <h2>El Proceso Creativo</h2>
              <p>Cada pieza nace de un diálogo entre tradición e innovación:</p>
              
              <ol>
                <li><strong>Inspiración:</strong> Encontramos belleza en formas naturales y patrones ancestrales</li>
                <li><strong>Diseño:</strong> Bocetos a mano se transforman en modelos digitales precisos</li>
                <li><strong>Selección de Técnicas:</strong> Elegimos los métodos que mejor expresen la visión</li>
                <li><strong>Creación:</strong> Manos expertas dan vida al diseño con herramientas centenarias</li>
                <li><strong>Refinamiento:</strong> Técnicas modernas perfeccionan cada detalle</li>
              </ol>
              
              <h2>Maestros Artesanos</h2>
              <p>Nuestro equipo incluye maestros joyeros con décadas de experiencia, algunos de ellos herederos directos de tradiciones familiares que se remontan al período colonial. Ellos son los guardianes de este conocimiento ancestral y los mentores de las nuevas generaciones.</p>
              
              <p>Cada pieza que sale de nuestro taller lleva consigo no solo la belleza del diseño, sino también el alma de estas tradiciones vivas, adaptadas para el mundo moderno pero fieles a su esencia original.</p>
            </div>
          `,
          excerpt: 'Exploramos cómo las técnicas tradicionales de orfebrería se fusionan con el diseño contemporáneo para crear piezas únicas...',
          slug: 'tecnicas-ancestrales-diseno-moderno',
          date: '10 de enero de 2025',
          featuredImage: 'https://yellowgreen-deer-888686.hostingersite.com/wp-content/uploads/2025/10/trabajo-artesanal.jpg',
          author: 'Kafé Joyeros',
          categories: ['Técnicas', 'Historia']
        },
        'compromiso-oro-responsable': {
          id: 3,
          title: 'El Compromiso con el Oro Responsable',
          content: `
            <div class="prose prose-lg max-w-none">
              <p class="lead">En Kafé Joyeros, cada gramo de oro que utilizamos cuenta una historia de responsabilidad, transparencia y respeto por las comunidades y el medio ambiente.</p>
              
              <h2>¿Qué es el Oro Responsable?</h2>
              <p>El oro responsable va mucho más allá de la simple extracción. Es un compromiso integral que abarca desde las condiciones laborales justas hasta la restauración ambiental, pasando por el desarrollo comunitario y la transparencia en toda la cadena de suministro.</p>
              
              <h3>Nuestros Estándares de Oro Responsable</h3>
              <ul>
                <li><strong>Certificación RJC:</strong> Cumplimos con los estándares del Responsible Jewellery Council</li>
                <li><strong>Trazabilidad Completa:</strong> Conocemos el origen de cada gramo de oro</li>
                <li><strong>Auditorías Regulares:</strong> Inspecciones independientes de nuestros proveedores</li>
                <li><strong>Impacto Social Positivo:</strong> Contribución directa al desarrollo comunitario</li>
              </ul>
              
              <h2>El Viaje del Oro: De la Mina a la Joya</h2>
              <p>Seguimos cada paso del oro desde su extracción hasta convertirse en una hermosa joya:</p>
              
              <h3>1. Extracción Responsable</h3>
              <p>Trabajamos únicamente con minas que:</p>
              <ul>
                <li>Garantizan condiciones laborales seguras y dignas</li>
                <li>Pagan salarios justos a todos los trabajadores</li>
                <li>Implementan prácticas de restauración ambiental</li>
                <li>Respetan los derechos de las comunidades locales</li>
              </ul>
              
              <h3>2. Refinación Ética</h3>
              <p>Nuestros refinadores certificados aseguran que:</p>
              <ul>
                <li>No se mezcle oro de fuentes cuestionables</li>
                <li>Se mantengan los más altos estándares ambientales</li>
                <li>Se preserve la trazabilidad en todo momento</li>
              </ul>
              
              <h3>3. Transformación Artesanal</h3>
              <p>En nuestros talleres, el oro responsable se convierte en arte:</p>
              <ul>
                <li>Técnicas tradicionales que minimizan el desperdicio</li>
                <li>Reciclaje del 100% de los residuos de oro</li>
                <li>Procesos que respetan el medio ambiente</li>
              </ul>
              
              <blockquote>
                <p>"El verdadero valor del oro no está en su precio, sino en la historia de responsabilidad que cuenta."</p>
                <cite>— Misión Kafé Joyeros</cite>
              </blockquote>
              
              <h2>Oro Reciclado: Una Segunda Vida</h2>
              <p>Además del oro de nueva extracción, trabajamos extensivamente con oro reciclado:</p>
              
              <ul>
                <li><strong>Joyas Heredadas:</strong> Transformamos piezas familiares en nuevos diseños</li>
                <li><strong>Oro Industrial:</strong> Recuperamos oro de componentes electrónicos</li>
                <li><strong>Residuos de Taller:</strong> Cada limadura es recuperada y reutilizada</li>
              </ul>
              
              <h2>Impacto Comunitario</h2>
              <p>Nuestro compromiso con el oro responsable genera impacto real:</p>
              
              <ul>
                <li>Apoyo a 15 cooperativas mineras en Colombia</li>
                <li>Financiamiento de 3 escuelas en comunidades mineras</li>
                <li>Programas de capacitación técnica para 500 mineros</li>
                <li>Proyectos de reforestación en áreas mineras restauradas</li>
              </ul>
              
              <h2>Certificaciones y Transparencia</h2>
              <p>Mantenemos las más altas certificaciones internacionales:</p>
              
              <ul>
                <li><strong>RJC Chain of Custody:</strong> Trazabilidad certificada</li>
                <li><strong>Fairmined:</strong> Oro de comercio justo</li>
                <li><strong>SCS Global Services:</strong> Auditorías de sostenibilidad</li>
                <li><strong>ISO 14001:</strong> Gestión ambiental</li>
              </ul>
              
              <p>Cuando eliges una joya de Kafé Joyeros, no solo adquieres una pieza hermosa, sino que apoyas un sistema que valora a las personas y protege el planeta. Cada compra es un voto por un futuro más responsable y brillante.</p>
            </div>
          `,
          excerpt: 'Conoce nuestro compromiso con la extracción responsable de metales preciosos y cómo esto impacta en cada pieza que creamos...',
          slug: 'compromiso-oro-responsable',
          date: '5 de enero de 2025',
          featuredImage: 'https://yellowgreen-deer-888686.hostingersite.com/wp-content/uploads/2025/10/compromiso-foto.jpg',
          author: 'Kafé Joyeros',
          categories: ['Responsabilidad', 'Materiales']
        }
      };
      
      const fallbackPost = fallbackPosts[postSlug] || fallbackPosts['arte-joyeria-regenerativa'];
      setPost(fallbackPost);
      
      // Simular posts relacionados
      const related = Object.values(fallbackPosts)
        .filter(p => p.slug !== postSlug)
        .slice(0, 3);
      setRelatedPosts(related);
      
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <>
        {/* <Header logo={"https://yellowgreen-deer-888686.hostingersite.com/wp-content/uploads/2025/10/NOMBRE-SLOGAN-COLOR-4-JPG-Photoroom.png"} /> */}
        <main className="min-h-screen bg-white">
          <div className="container mx-auto px-4 py-20">
            <div className="animate-pulse">
              <div className="h-8 bg-gray-200 rounded w-3/4 mb-4"></div>
              <div className="h-4 bg-gray-200 rounded w-1/2 mb-8"></div>
              <div className="h-96 bg-gray-200 rounded mb-8"></div>
              <div className="space-y-4">
                <div className="h-4 bg-gray-200 rounded"></div>
                <div className="h-4 bg-gray-200 rounded"></div>
                <div className="h-4 bg-gray-200 rounded w-3/4"></div>
              </div>
            </div>
          </div>
        </main>
        <Footer logo={"https://yellowgreen-deer-888686.hostingersite.com/wp-content/uploads/2025/10/NOMBRE-SLOGAN-COLOR-1-JPG-Photoroom.png"} />
      </>
    );
  }

  if (!post) {
    return (
      <>
        {/* <Header logo={"https://yellowgreen-deer-888686.hostingersite.com/wp-content/uploads/2025/10/NOMBRE-SLOGAN-COLOR-4-JPG-Photoroom.png"} /> */}
        <main className="min-h-screen bg-white flex items-center justify-center">
          <div className="text-center">
            <h1 className="text-4xl font-title-tai-lue font-bold text-gray-900 mb-4">
              Artículo no encontrado
            </h1>
            <p className="text-gray-600 font-tai-lue mb-8">
              Lo sentimos, no pudimos encontrar el artículo que buscas.
            </p>
            <Link 
              href="/blog"
              className="inline-flex items-center px-6 py-3 bg-red text-white rounded-full hover:bg-green transition-colors duration-300 font-semibold font-tai-lue"
            >
              Volver al Blog
            </Link>
          </div>
        </main>
        <Footer logo={"https://yellowgreen-deer-888686.hostingersite.com/wp-content/uploads/2025/10/NOMBRE-SLOGAN-COLOR-1-JPG-Photoroom.png"} />
      </>
    );
  }

  return (
    <>
      {/* <Header logo={"https://yellowgreen-deer-888686.hostingersite.com/wp-content/uploads/2025/10/NOMBRE-SLOGAN-COLOR-4-JPG-Photoroom.png"} /> */}
      
      <main className="min-h-screen bg-white">
        {/* Breadcrumb */}
        <nav className="bg-gray-50 py-4">
          <div className="container mx-auto px-4">
            <div className="flex items-center space-x-2 text-sm font-tai-lue">
              <Link href="/" className="bg-button font-tai-lue text-white px-6 py-2 rounded-full font-medium transition-all duration-200 shadow-luxury hover:shadow-luxury-hover">
                Inicio
              </Link>
              <span className="text-gray-400">/</span>
              <Link href="/blog" className="text-gray-500 hover:text-red transition-colors">
                Blog
              </Link>
              <span className="text-gray-400">/</span>
              <span className="text-gray-900 font-semibold">{post.title}</span>
            </div>
          </div>
        </nav>

        {/* Article Header */}
        <article className="py-12">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto">
              {/* Meta Information */}
              <div className="flex items-center space-x-4 text-sm text-gray-500 font-tai-lue mb-6">
                <time>{post.date}</time>
                <span>•</span>
                <span>{post.author}</span>
                <span>•</span>
                <div className="flex space-x-2">
                  {post.categories.map((category, index) => (
                    <span key={index} className="px-2 py-1 bg-gray-100 rounded-full text-xs">
                      {category}
                    </span>
                  ))}
                </div>
              </div>

              {/* Title */}
              <h1 className="text-4xl md:text-5xl font-title-tai-lue font-bold text-gray-900 mb-6 leading-tight">
                {post.title}
              </h1>

              {/* Excerpt */}
              {/* <p className="text-xl text-gray-600 font-tai-lue leading-relaxed mb-8">
                {post.excerpt}
              </p> */}

              {/* Featured Image */}
              {post.featuredImage && (
                <div className="relative h-96 md:h-[500px] rounded-2xl overflow-hidden mb-12 shadow-2xl">
                  <Image
                    src={post.featuredImage}
                    alt={post.title}
                    fill
                    className="object-cover"
                  />
                </div>
              )}

              {/* Content */}
              <div 
                className="prose prose-lg max-w-none font-tai-lue"
                dangerouslySetInnerHTML={{ __html: post.content }}
                style={{
                  lineHeight: '1.8',
                  fontSize: '1.1rem',
                  color: '#171717'
                }}
              />

              {/* Share Section */}
              <div className="mt-12 pt-8 border-t border-gray-200">
                <h3 className="text-lg font-title-tai-lue font-semibold text-gray-900 mb-4">
                  Comparte este artículo
                </h3>
                <div className="flex space-x-4">
                  <button className="flex items-center space-x-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-3.179 0-5.515 2.966-4.797 6.045-4.091-.205-7.719-2.165-10.148-5.144-1.29 2.213-.669 5.108 1.523 6.574-.806-.026-1.566-.247-2.229-.616-.054 2.281 1.581 4.415 3.949 4.89-.693.188-1.452.232-2.224.084.626 1.956 2.444 3.379 4.6 3.419-2.07 1.623-4.678 2.348-7.29 2.04 2.179 1.397 4.768 2.212 7.548 2.212 9.142 0 14.307-7.721 13.995-14.646.962-.695 1.797-1.562 2.457-2.549z"/>
                    </svg>
                    <span>Twitter</span>
                  </button>
                  <button className="flex items-center space-x-2 px-4 py-2 bg-blue-800 text-white rounded-lg hover:bg-blue-900 transition-colors">
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                    </svg>
                    <span>Facebook</span>
                  </button>
                  <button className="flex items-center space-x-2 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors">
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893A11.821 11.821 0 0020.885 3.488"/>
                    </svg>
                    <span>WhatsApp</span>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </article>

        {/* Related Posts */}
        {relatedPosts.length > 0 && (
          <section className="py-16 bg-gray-50">
            <div className="container mx-auto px-4">
              <div className="max-w-6xl mx-auto">
                <h2 className="text-3xl font-title-tai-lue font-bold text-gray-900 mb-8 text-center">
                  Artículos Relacionados
                </h2>
                <div className="grid md:grid-cols-3 gap-8">
                  {relatedPosts.map((relatedPost) => (
                    <article key={relatedPost.id} className="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300">
                      <div className="relative h-48 overflow-hidden">
                        <Image
                          src={relatedPost.featuredImage || 'https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?w=600&h=400&fit=crop'}
                          alt={relatedPost.title}
                          fill
                          className="object-cover hover:scale-105 transition-transform duration-300"
                        />
                      </div>
                      <div className="p-6">
                        <h3 className="text-lg font-title-tai-lue font-semibold text-gray-900 mb-2 line-clamp-2">
                          {relatedPost.title}
                        </h3>
                        <p className="text-gray-600 font-tai-lue text-sm mb-4 line-clamp-3">
                          {relatedPost.excerpt}
                        </p>
                        <Link 
                          href={`/blog/${relatedPost.slug}`}
                          className="inline-flex items-center text-[var(--red)] font-semibold font-tai-lue hover:text-[var(--green)] transition-colors duration-300"
                        >
                          Leer más
                          <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                          </svg>
                        </Link>
                      </div>
                    </article>
                  ))}
                </div>
              </div>
            </div>
          </section>
        )}

        {/* CTA Section */}
        <section className="py-16 bg-[var(--cream)] text-white">
          <div className="container mx-auto px-4 text-center">
            <h2 className="text-[#171717] text-3xl md:text-4xl font-title-tai-lue font-bold mb-4">
              ¿Te gustó este artículo?
            </h2>
            <p className="text-gray-500 text-xl text-gray-300 font-tai-lue mb-8 max-w-2xl mx-auto">
              Descubre nuestras piezas únicas y vive la experiencia de la joyería artesanal
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link 
                href="/servicios"
                className="px-8 py-3 bg-red text-[var(--red)] rounded-full hover:bg-green transition-colors duration-300 font-semibold font-tai-lue"
              >
                Ver Nuestros Servicios
              </Link>
              <Link 
                href="/blog"
                className="px-8 py-3 btn-outline-red text-white rounded-full hover:bg-white hover:text-gray-900 transition-colors duration-300 font-semibold font-tai-lue"
              >
                Más Artículos
              </Link>
            </div>
          </div>
        </section>
      </main>

      <Footer logo={"https://yellowgreen-deer-888686.hostingersite.com/wp-content/uploads/2025/10/NOMBRE-SLOGAN-COLOR-1-JPG-Photoroom.png"} />
    </>
  );
}