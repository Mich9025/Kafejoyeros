import { Metadata } from 'next';
import Gallery from '@/components/Gallery';
import Image from 'next/image';
import Footer from '@/components/Footer';
import Header from '@/components/Header';



export const metadata: Metadata = {
  title: 'Editorial | Kafe Joyeros',
  description: 'Descubre nuestra filosofía de Lujo Consciente. Creemos firmemente que es posible hacer joyería de lujo con valores intangibles, con historias de esperanza, respeto por la tierra y admiración por quienes hacen parte del proceso.',
  keywords: ['editorial', 'lujo consciente', 'joyería', 'kafe joyeros', 'filosofía', 'valores'],
  openGraph: {
    title: 'Editorial | Kafe Joyeros',
    description: 'Descubre nuestra filosofía de Lujo Consciente y las historias detrás de cada pieza de joyería.',
    type: 'website',
  },
};

export default function EditorialPage() {
  return (
     <>
     <Header logo={"https://yellowgreen-deer-888686.hostingersite.com/wp-content/uploads/2025/10/NOMBRE-SLOGAN-COLOR-2-JPG-Photoroom.png"} />
    <main className="min-h-screen bg-white">      
      {/* Hero Section */}
        <section className="relative bg-gradient-to-br from-[#2c4026] via-[#171717]/20 to-[#2c4026] py-32 overflow-hidden">
          {/* Background Image with Parallax Effect */}
          <div className="absolute inset-0 z-0">
        
          <div            
            className={`absolute inset-0 transition-opacity duration-2000 ease-in-out`}
          >
            <Image
              src={"https://yellowgreen-deer-888686.hostingersite.com/wp-content/uploads/2025/10/hecho-a-mano.jpg"}
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
            className="w-full h-full object-contain opacity-60 filter brightness-110"
            style={{filter: 'sepia(100%) hue-rotate(15deg) brightness(3.5)'}}
          />
        </div>        
        <div className="absolute bottom-32 right-32 w-24 h-24 rotate-12 animate-float" style={{animationDelay: '1s'}}>
        <Image 
            src="https://yellowgreen-deer-888686.hostingersite.com/wp-content/uploads/2025/11/ICONO-2-PNG-scaled.png" 
            alt="Decorative element" 
            fill
            className="w-full h-full object-contain opacity-60 filter brightness-110"
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
                EDITORIAL
              </h1> */}
              {/* <p className="text-xl md:text-2xl font-tai-lue text-gray-300 max-w-4xl mx-auto leading-relaxed mb-8">
                Una experiencia integral en joyería personalizada con enfoque en la artesanía responsable, 
                trazabilidad de materiales y la co-creación con nuestros clientes.
              </p> */}
              {/* <div className="mt-8 w-24 h-1 bg-gradient-to-r from-transparent via-white to-transparent mx-auto"></div> */}
            </div>
          </div>
          
          {/* Decorative elements */}
          <div className="absolute top-20 left-10 w-32 h-32 border border-white/10 rounded-full"></div>
          <div className="absolute bottom-20 right-10 w-48 h-48 border border-white/5 rounded-full"></div>
        </section>     

      {/* Gallery Section */}
      <Gallery 
        title="Mini Drops"
        subtitle="Explora las piezas que representan nuestra filosofía de Lujo Consciente, cada joya cuenta una historia única de artesanía local."
      />         
    </main>
    <Footer logo={"https://yellowgreen-deer-888686.hostingersite.com/wp-content/uploads/2025/10/NOMBRE-SLOGAN-COLOR-1-JPG-Photoroom.png"} />   
  </>
  );
}