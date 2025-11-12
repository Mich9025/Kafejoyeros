'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

interface SelectedImage {
  src: string;
  alt: string;
  title: string;
}

export default function NosotrosPage() {
  const [isVisible, setIsVisible] = useState(false);
  const [selectedImage, setSelectedImage] = useState<SelectedImage | null>(null);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  return (
    <>
      <Header logo={"https://yellowgreen-deer-888686.hostingersite.com/wp-content/uploads/2025/10/NOMBRE-SLOGAN-COLOR-2-JPG-Photoroom.png"} />
      <main className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
        {/* Background Video */}
        <div className="absolute inset-0 z-0">
          <video
            autoPlay
            muted
            loop
            playsInline
            className="w-full h-full object-cover"
          >
            <source
              src="https://yellowgreen-deer-888686.hostingersite.com/wp-content/uploads/2025/10/Video-Kafe-Joyeros.mp4"
              type="video/mp4"
            />
            {/* Fallback image if video fails to load */}
            <Image
              src="https://yellowgreen-deer-888686.hostingersite.com/wp-content/uploads/2025/10/Banner-esp_5-scaled.png"
              alt="Kafé Joyeros - Nosotros"
              fill
              className="object-cover"
              priority
            />
          </video>
          <div className="absolute inset-0 bg-black/40"></div>
        </div>

        {/* Hero Content */}
        <div className="relative z-10 text-center text-white px-4 sm:px-6 lg:px-8 max-w-4xl mx-auto">
          {/* <h1 className={`text-4xl md:text-6xl lg:text-7xl font-bold font-title-tai-lue mb-6 transition-all duration-1000 ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
          }`}>
            NOSOTROS
          </h1> */}
          
          {/* <div className={`h-px bg-gradient-to-r from-transparent via-white to-transparent w-32 mx-auto mb-8 transition-all duration-1000 delay-300 ${
            isVisible ? 'opacity-100 scale-x-100' : 'opacity-0 scale-x-0'
          }`}></div> */}
          
          {/* <p className={`text-xl md:text-2xl font-tai-lue font-light leading-relaxed transition-all duration-1000 delay-500 ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
          }`}>
            Reinterpretando la joyería tradicional desde 2017, creamos piezas impregnadas de valores positivos con impacto social y medioambiental medible.
          </p> */}
        </div>

        {/* Scroll Indicator */}
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-10 animate-bounce">
          <div className="flex flex-col items-center text-white/70">
            <span className="text-sm font-tai-lue tracking-wider uppercase mb-2">Conoce nuestra historia</span>
            <div className="w-px h-12 bg-gradient-to-b from-white to-transparent"></div>
            <div className="w-2 h-2 border border-white rotate-45 mt-2"></div>
          </div>
        </div>
      </section>

      {/* Historia y Propósito */}
      <section className="py-20 lg:py-32 bg-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-6xl mx-auto">
            <div className="grid lg:grid-cols-2 gap-16 items-center">
              <div className="space-y-8">
                <div>
                  <h2 className="uppercase text-2xl md:text-3xl lg:text-4xl font-bold font-title-tai-lue text-gray-900 mb-6">
                    Nuestra Historia
                  </h2>
                  <div className="h-1 w-20 bg-gradient-to-r from-green to-red mb-8"></div>
                </div>
                
                <div className="space-y-6 font-tai-lue text-gray-700 leading-relaxed">
                  <p className="text-lg">
                    <strong className="text-green">Kafé Joyeros nace en 2017</strong> con el propósito de reinterpretar la joyería tradicional y romper con el estatus quo que limita la conexión entre el cliente y lo que hay detrás de un mostrador.
                  </p>
                  
                  <p className="text-lg">
                    Creamos piezas impregnadas de valores positivos, con <strong className="text-green">impacto social y medioambiental medible</strong>. Cada joya ofrece trazabilidad desde el origen, permitiendo al consumidor conectar con cada eslabón de la cadena, desde la mina hasta sus manos.
                  </p>
                  
                  <p className="text-lg">
                    Trabajamos de la mano con <strong className="text-green">comunidades mineras artesanales y de pequeña escala en Colombia</strong>, que extraen oro y plata de manera responsable.
                  </p>
                </div>
              </div>
              
              <div className="relative">
                {/* Collage de imágenes */}
                <div className="grid grid-cols-1 gap-4 h-[500px]">
                  {/* Imagen principal - ocupa toda la columna izquierda */}
                  <div className="relative overflow-hidden rounded-2xl shadow-xl">
                    <Image
                      src="https://yellowgreen-deer-888686.hostingersite.com/wp-content/uploads/2025/10/Pic-112-scaled.jpg"
                      alt="Joyería regenerativa"
                      width={1000}
                      height={500}
                      className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
                    />
                  </div>
                  
                  {/* Columna derecha con 3 imágenes apiladas */}
                  {/* <div className="flex flex-col gap-4">
                    <div className="relative overflow-hidden rounded-xl shadow-lg flex-1">
                      <Image
                        src="https://yellowgreen-deer-888686.hostingersite.com/wp-content/uploads/2025/10/Pic-113-scaled.jpg"
                        alt="Proceso artesanal"
                        width={300}
                        height={150}
                        className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
                      />
                    </div>
                    
                    <div className="relative overflow-hidden rounded-xl shadow-lg flex-1">
                      <Image
                        src="https://yellowgreen-deer-888686.hostingersite.com/wp-content/uploads/2025/10/Pic-75-scaled.jpg"
                        alt="Artesanos trabajando"
                        width={300}
                        height={150}
                        className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
                      />
                    </div>
                    
                    <div className="relative overflow-hidden rounded-xl shadow-lg flex-1">
                      <Image
                        src="https://yellowgreen-deer-888686.hostingersite.com/wp-content/uploads/2025/10/0DBD3315-D87C-4ED7-83F6-3D4F1BF6354B.jpg"
                        alt="Joyería artesanal"
                        width={300}
                        height={150}
                        className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
                      />
                    </div>
                  </div> */}
                </div>
                
                {/* Badge del año */}
                {/* <div className="absolute -bottom-6 -right-6 w-24 h-24 bg-green rounded-full flex items-center justify-center text-white font-bold text-xl shadow-xl z-10">
                  2017
                </div> */}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Certificación Fairmined */}
      <section className="py-20 lg:py-32" style={{ backgroundColor: 'var(--green)' }}>
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-6xl mx-auto">
            <div className="grid lg:grid-cols-2 gap-16 items-center">
              <div className="lg:order-2 space-y-8">
                <div>
                  <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold font-title-tai-lue text-white mb-6">
                    Certificación Fairmined
                  </h2>
                  <div className="h-1 w-20 bg-gradient-to-r from-white to-red mb-8"></div>
                </div>
                
                <div className="space-y-6 font-tai-lue text-white/90 leading-relaxed">
                  <p className="text-lg">
                    En <strong className="text-white">2019 nos convertimos en licenciatarios con sello Fairmined</strong>, ofreciendo metales certificados provenientes de minas nacionales, extraídos por mineros comprometidos con la reducción del impacto ambiental.
                  </p>
                  
                  <p className="text-lg">
                    También valoramos el uso de <strong className="text-white">metales circulares</strong>, provenientes de joyas antiguas o residuos tecnológicos, siempre que su trazabilidad esté asegurada, como una alternativa viable hacia una joyería responsable.
                  </p>
                </div>
              </div>
              
              <div className="lg:order-1 relative">
                <div className="relative overflow-hidden rounded-2xl shadow-2xl bg-white p-8">
                  <Image
                    src="https://yellowgreen-deer-888686.hostingersite.com/wp-content/uploads/2025/10/Fairmined-Marcas-licenciatarias-2.png"
                    alt="Certificación Fairmined"
                    width={400}
                    height={200}
                    className="w-full h-auto object-contain"
                  />
                </div>
                <div className="absolute -top-6 -left-6 w-24 h-24 bg-red rounded-full flex items-center justify-center text-white font-bold text-xl">
                  2019
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Filosofía y Valores */}
      <section className="py-20 lg:py-32 bg-gray-50">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto text-center mb-16">
            <h2 className="uppercase text-3xl md:text-4xl lg:text-5xl font-bold font-title-tai-lue text-gray-900 mb-6">
              Nuestra Filosofía
            </h2>
            <div className="h-1 w-20 bg-gradient-to-r from-green to-red mx-auto mb-8"></div>
            <p className="text-xl font-tai-lue text-gray-700 leading-relaxed">
              Desde nuestro modelo de producción buscamos reducir el exceso de stock y fomentar la personalización. Creemos en el lujo a escala humana, en el detalle pensado, en el diseño que conecta.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* Valor 1 */}
            <div className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-shadow duration-300">
              <div className="w-16 h-16 bg-green rounded-full flex items-center justify-center mb-6">
                <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                </svg>
              </div>
              <h3 className="text-xl font-bold font-title-tai-lue text-gray-900 mb-4">Artesanía Ancestral</h3>
              <p className="font-tai-lue text-gray-700 leading-relaxed">
                Rescatamos técnicas heredadas por generaciones con el fin de enaltecer y preservar el oficio ancestral de nuestros joyeros artesanos.
              </p>
            </div>

            {/* Valor 2 */}
            <div className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-shadow duration-300">
              <div className="w-16 h-16 bg-green rounded-full flex items-center justify-center mb-6">
                <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" />
                </svg>
              </div>
              <h3 className="text-xl font-bold font-title-tai-lue text-gray-900 mb-4">Historias Únicas</h3>
              <p className="font-tai-lue text-gray-700 leading-relaxed">
                Cada pieza que creamos cuenta una historia, la de quienes están detrás de ella y la de quien decide llevarla.
              </p>
            </div>

            {/* Valor 3 */}
            <div className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-shadow duration-300">
              <div className="w-16 h-16 bg-green rounded-full flex items-center justify-center mb-6">
                <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9v-9m0-9v9" />
                </svg>
              </div>
              <h3 className="text-xl font-bold font-title-tai-lue text-gray-900 mb-4">Responsabilidad</h3>
              <p className="font-tai-lue text-gray-700 leading-relaxed">
                Cuidamos cada detalle, incluso el embalaje. Nuestras piezas se entregan en empaque eco amigable.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Nuestras Piezas */}
      <section className="py-20 lg:py-32 bg-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-6xl mx-auto">
            <div className="grid lg:grid-cols-2 gap-16 items-center">
              <div className="space-y-8">
                <div>
                  <h2 className="uppercase text-2xl md:text-3xl lg:text-4xl font-bold font-title-tai-lue text-gray-900 mb-6">
                    Nuestras Piezas
                  </h2>
                  <div className="h-1 w-20 bg-gradient-to-r from-green to-red mb-8"></div>
                </div>
                
                <div className="space-y-6 font-tai-lue text-gray-700 leading-relaxed">
                  <p className="text-lg">
                    Nuestras piezas son elaboradas en <strong className="text-green">oro 18 quilates y/o plata 925</strong>, donde el color y carácter de las piedras preciosas juegan un papel fundamental en el diseño.
                  </p>
                  
                  <p className="text-lg">
                    Diseñamos joyas <strong className="text-green">personalizadas, sobrias y atemporales</strong>, con altos estándares de calidad en los materiales. Al ser piezas hechas a mano, cada joya lleva consigo la huella del trabajo artesanal.
                  </p>
                  
                  <p className="text-lg">
                    <strong className="text-green">No trabajamos piezas en serie</strong>. Cada joya corresponde a una persona en especial, pensada y creada bajo el modelo made-to-order, lo que garantiza exclusividad y evita la sobreproducción.
                  </p>
                </div>

                <div className="grid grid-cols-2 gap-6 pt-8">
                  <div className="text-center">
                    <div className="text-3xl font-bold font-title-tai-lue text-green mb-2">18k</div>
                    <div className="font-tai-lue text-gray-600">Oro de alta calidad</div>
                  </div>
                  <div className="text-center">
                    <div className="text-3xl font-bold font-title-tai-lue text-green mb-2">925</div>
                    <div className="font-tai-lue text-gray-600">Plata sterling</div>
                  </div>
                </div>
              </div>
              
              <div className="relative">
                {/* Collage interactivo de imágenes */}
                <div className="grid grid-cols-1 gap-3 h-[600px]">
                  {/* Imagen principal superior izquierda */}
                  <div 
                    className="relative overflow-hidden rounded-xl shadow-lg cursor-pointer group row-span-2"
                    onClick={() => setSelectedImage({
                      src: "https://yellowgreen-deer-888686.hostingersite.com/wp-content/uploads/2025/10/compromiso-foto.jpg",
                      alt: "Compromiso artesanal",
                      title: "Nuestro Compromiso"
                    })}
                  >
                    <Image
                      src="https://yellowgreen-deer-888686.hostingersite.com/wp-content/uploads/2025/10/compromiso-foto.jpg"
                      alt="Compromiso artesanal"
                      width={300}
                      height={500}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-all duration-300 flex items-center justify-center">
                      <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-300 text-white text-center">
                        <div className="text-lg font-bold mb-2">Nuestro Compromiso</div>
                        <div className="text-sm">Click para ampliar</div>
                      </div>
                    </div>
                  </div>
                  
                  {/* Columna derecha con 4 imágenes */}
                  {/* <div className="grid grid-rows-2 gap-3">
                    <div 
                      className="relative overflow-hidden rounded-lg shadow-md cursor-pointer group"
                      onClick={() => setSelectedImage({
                        src: "https://yellowgreen-deer-888686.hostingersite.com/wp-content/uploads/2025/10/trabajo-artesanal.jpg",
                        alt: "Trabajo artesanal",
                        title: "Trabajo Artesanal"
                      })}
                    >
                      <Image
                        src="https://yellowgreen-deer-888686.hostingersite.com/wp-content/uploads/2025/10/trabajo-artesanal.jpg"
                        alt="Trabajo artesanal"
                        width={300}
                        height={120}
                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                      />
                      <div className="absolute inset-0 bg-black/0 group-hover:bg-black/30 transition-all duration-300 flex items-center justify-center">
                        <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-300 text-white text-center">
                          <div className="text-sm font-bold">Trabajo Artesanal</div>
                        </div>
                      </div>
                    </div>
                    
                    <div 
                      className="relative overflow-hidden rounded-lg shadow-md cursor-pointer group"
                      onClick={() => setSelectedImage({
                        src: "https://yellowgreen-deer-888686.hostingersite.com/wp-content/uploads/2025/10/hecho-a-mano.jpg",
                        alt: "Hecho a mano",
                        title: "Hecho a Mano"
                      })}
                    >
                      <Image
                        src="https://yellowgreen-deer-888686.hostingersite.com/wp-content/uploads/2025/10/hecho-a-mano.jpg"
                        alt="Hecho a mano"
                        width={300}
                        height={120}
                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                      />
                      <div className="absolute inset-0 bg-black/0 group-hover:bg-black/30 transition-all duration-300 flex items-center justify-center">
                        <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-300 text-white text-center">
                          <div className="text-sm font-bold">Hecho a Mano</div>
                        </div>
                      </div>
                    </div>
                  </div> */}
                  
                  {/* Fila inferior con 2 imágenes */}
                  {/* <div 
                    className="relative overflow-hidden rounded-lg shadow-md cursor-pointer group"
                    onClick={() => setSelectedImage({
                      src: "https://yellowgreen-deer-888686.hostingersite.com/wp-content/uploads/2025/10/Copia-de-Batea-con-oro-Oro-Verde-c-Alejandro-Cock-295-scaled.png",
                      alt: "Oro responsable",
                      title: "Oro Responsable"
                    })}
                  >
                    <Image
                      src="https://yellowgreen-deer-888686.hostingersite.com/wp-content/uploads/2025/10/Copia-de-Batea-con-oro-Oro-Verde-c-Alejandro-Cock-295-scaled.png"
                      alt="Oro responsable"
                      width={300}
                      height={120}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-black/0 group-hover:bg-black/30 transition-all duration-300 flex items-center justify-center">
                      <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-300 text-white text-center">
                        <div className="text-sm font-bold">Oro Responsable</div>
                      </div>
                    </div>
                  </div> */}
                  
                  {/* <div 
                    className="relative overflow-hidden rounded-lg shadow-md cursor-pointer group"
                    onClick={() => setSelectedImage({
                      src: "https://yellowgreen-deer-888686.hostingersite.com/wp-content/uploads/2025/10/joyeria-regenerativa.png",
                      alt: "Joyería regenerativa",
                      title: "Joyería Regenerativa"
                    })}
                  >
                    <Image
                      src="https://yellowgreen-deer-888686.hostingersite.com/wp-content/uploads/2025/10/joyeria-regenerativa.png"
                      alt="Joyería regenerativa"
                      width={300}
                      height={120}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-black/0 group-hover:bg-black/30 transition-all duration-300 flex items-center justify-center">
                      <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-300 text-white text-center">
                        <div className="text-sm font-bold">Joyería Regenerativa</div>
                      </div>
                    </div>
                  </div> */}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Certificaciones y Trazabilidad */}
      <section className="py-20 lg:py-32" style={{ backgroundColor: 'var(--green)' }}>
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto text-center mb-16">
            <h2 className="uppercase text-3xl md:text-4xl lg:text-5xl font-bold font-title-tai-lue text-white mb-6">
              Certificaciones y Trazabilidad
            </h2>
            <div className="h-1 w-20 bg-gradient-to-r from-white to-red mx-auto mb-8"></div>
            <p className="text-xl font-tai-lue text-white/90 leading-relaxed">
              Nos tomamos en serio la trazabilidad, y nos interesamos en conocer el origen de nuestros materiales, porque creemos que una joya consciente no solo debe brillar, también debe ser transparente en su historia.
            </p>
          </div>

          <div className="grid md:grid-cols-3 lg:grid-cols-3 gap-8">
            {/* Certificación 1 */}
            <div className="bg-white rounded-2xl p-6 text-center shadow-lg">
              <div className="mb-4">
                <Image
                  src="https://yellowgreen-deer-888686.hostingersite.com/wp-content/uploads/2025/10/Fairmined-Marcas-licenciatarias-2.png"
                  alt="Fairmined"
                  width={250

                  }
                  height={60}
                  className="mx-auto h-28 w-auto object-contain"
                />
              </div>
              <h3 className="font-bold font-title-tai-lue text-gray-900 mb-2">Fairmined</h3>
              <p className="font-tai-lue text-gray-600 text-sm">Oro y plata certificados desde 2019</p>
            </div>

            {/* Certificación 2 */}
            <div className="bg-white rounded-2xl p-6 text-center shadow-lg">
              <div className="mb-4">
                <Image
                  src="https://yellowgreen-deer-888686.hostingersite.com/wp-content/uploads/2025/10/RSP160011Retailer-Lock-Up-V1-PRINT-8-5x11-V2-03-1-scaled.png"
                  alt="Diamantes GIA"
                  width={250}
                  height={60}
                  className="invert mx-auto h-28 w-auto object-contain"
                />
              </div>
              <h3 className="font-bold font-title-tai-lue text-gray-900 mb-2">Diamantes GIA</h3>
              <p className="font-tai-lue text-gray-600 text-sm">Certificación internacional</p>
            </div>
            
          {/* Certificación 3 */}
            <div className="bg-white rounded-2xl p-6 text-center shadow-lg">
              <div className="mb-4">
                <Image
                  src="https://yellowgreen-deer-888686.hostingersite.com/wp-content/uploads/2025/10/free-diamond-icon.png"
                  alt="Esmeraldas"
                  width={420}
                  height={60}
                  className="mx-auto h-28 w-auto object-contain"
                />
              </div>
              <h3 className="font-bold font-title-tai-lue text-gray-900 mb-2">Esmeraldas</h3>
              <p className="font-tai-lue text-gray-600 text-sm">Certificación de origen colombiano</p>
            </div>           
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="relative py-20 lg:py-32 overflow-hidden">
        {/* Background Video */}
        <div className="absolute inset-0 z-0">
          <video
            autoPlay
            muted
            loop
            playsInline
            className="w-full h-full object-cover"
          >
            <source
              src="https://yellowgreen-deer-888686.hostingersite.com/wp-content/uploads/2025/10/Banner-Horizontal-KAFE-JOYEROS_Pantallas-Principal.mp4"
              type="video/mp4"
            />
            {/* Fallback background if video fails to load */}
            <div className="w-full h-full bg-gray-900"></div>
          </video>
          <div className="absolute inset-0 bg-black/50"></div>
        </div>

        <div className="relative z-10 container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold font-title-tai-lue text-white mb-6">
              ¿Listo para crear tu historia?
            </h2>
            <p className="text-xl font-tai-lue text-gray-300 leading-relaxed mb-12">
              No vendemos solo un producto, sino la posibilidad de materializar un sentimiento que te acompañe toda la vida.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-6 justify-center items-center">
              <Link
                href="/contacto"
                className="bg-button px-8 py-4 text-white font-tai-lue font-medium text-lg rounded-full shadow-luxury hover:shadow-luxury-hover transition-all duration-300"
              >
                Contactanos
              </Link>
              <Link
                href="/servicios"
                className="btn-outline-general px-8 py-4 font-tai-lue font-medium text-lg rounded-full transition-all duration-300"
              >
                Ver Servicios
              </Link>
            </div>
          </div>
        </div>
      </section>
    </main>
    <Footer logo={"https://yellowgreen-deer-888686.hostingersite.com/wp-content/uploads/2025/10/NOMBRE-SLOGAN-COLOR-2-JPG-Photoroom.png"} />
    
    {/* Modal para imágenes ampliadas */}
    {selectedImage && (
      <div 
        className="fixed inset-0 bg-black/90 backdrop-blur-sm z-50 flex items-center justify-center p-4"
        onClick={() => setSelectedImage(null)}
      >
        <div 
          className="relative max-w-6xl w-full max-h-[90vh] overflow-hidden rounded-2xl bg-white shadow-2xl flex flex-col md:flex-row"
          onClick={(e) => e.stopPropagation()}
        >
          {/* Botón de cerrar */}
          <button
            onClick={() => setSelectedImage(null)}
            className="absolute top-4 right-4 w-10 h-10 bg-black/50 text-white rounded-full flex items-center justify-center hover:bg-black/70 transition-colors z-20"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
          
          {/* Columna izquierda - Imagen */}
          <div className="md:w-2/3 relative">
            <Image
              src={selectedImage.src}
              alt={selectedImage.alt}
              width={800}
              height={600}
              className="w-full h-full object-cover md:max-h-[90vh]"
            />
          </div>
          
          {/* Columna derecha - Contenido */}
          <div className="md:w-1/3 flex flex-col">
            {/* Header */}
            <div className="bg-gradient-to-r from-green to-red p-6">
              <h3 className="text-white font-title-tai-lue font-bold text-2xl">
                {selectedImage.title}
              </h3>
            </div>
            
            {/* Contenido */}
            <div className="flex-1 p-6 flex flex-col justify-between">
              <div className="space-y-4">
                <p className="text-gray-700 font-tai-lue leading-relaxed">
                  {selectedImage.title === "Nuestro Compromiso" && 
                    "Nos comprometemos con la creación de joyería consciente que respeta tanto a las personas como al medio ambiente. Cada pieza refleja nuestros valores de transparencia y responsabilidad social."
                  }
                  {selectedImage.title === "Trabajo Artesanal" && 
                    "Nuestro proceso artesanal combina técnicas ancestrales con diseño contemporáneo. Cada joya es única y lleva consigo la huella del maestro artesano que la creó."
                  }
                  {selectedImage.title === "Hecho a Mano" && 
                    "Cada pieza es cuidadosamente elaborada a mano por nuestros artesanos expertos. Este proceso garantiza la máxima calidad y exclusividad en cada creación."
                  }
                  {selectedImage.title === "Oro Responsable" && 
                    "Utilizamos oro Fairmined certificado, extraído de manera responsable por comunidades mineras que reciben un precio justo y trabajan en condiciones dignas."
                  }
                  {selectedImage.title === "Joyería Regenerativa" && 
                    "Nuestra filosofía regenerativa va más allá de la responsabilidad ambiental. Buscamos crear un impacto positivo en las comunidades y el medio ambiente a través de cada joya que creamos."
                  }
                </p>
                
                <div className="border-l-4 border-green pl-4">
                  <p className="text-sm text-gray-600 font-tai-lue italic">
                    &ldquo;Creemos que el lujo verdadero radica en conocer la historia detrás de cada pieza.&rdquo;
                  </p>
                </div>
              </div>
              
              {/* CTA Button */}
              <div className="mt-6">
                <Link
                  href="/servicios"
                  className="w-full bg-button text-white font-tai-lue font-medium py-3 px-6 rounded-full hover:shadow-lg transition-all duration-300 text-center block"
                  onClick={() => setSelectedImage(null)}
                >
                  Conoce Nuestros Servicios
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    )}
    </>
  );
}