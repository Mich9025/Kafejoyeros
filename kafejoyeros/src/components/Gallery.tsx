'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';

interface WordPressImage {
  id: number;
  url: string;
  title: string;
  alt: string;
  width: number;
  height: number;
}

interface GalleryProps {
  title?: string;
  subtitle?: string;
}

export default function Gallery({
  title = "EDITORIAL",
  subtitle = "Creemos firmemente que es posible hacer joyería de lujo con valores intangibles, con historias de esperanza, respeto por la tierra y admiración por quienes hacen parte del proceso. Cada una de nuestras piezas es una forma de transmitir lo que llamamos Lujo Consciente."
}: GalleryProps) {
  const [images, setImages] = useState<WordPressImage[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedImage, setSelectedImage] = useState<WordPressImage | null>(null);

  useEffect(() => {
    const fetchImages = async () => {
      try {
        console.log('Starting to fetch images...');
        
        const response = await fetch(
          'https://yellowgreen-deer-888686.hostingersite.com/wp-json/filebird/public/v1/attachment-id/?folder_id=6',
          {
            headers: {
              'Authorization': 'Bearer rcHPRPFiUjqRtQlESWQhQCcHagZ3EosAJzm5LugJ',
              'Content-Type': 'application/json',
            },
          }
        );

        console.log('Response status:', response.status);

        if (!response.ok) {
          throw new Error(`Failed to fetch images: ${response.status}`);
        }

        const responseData = await response.json();
        console.log('Response data:', responseData);
        
        // Acceder a los IDs desde la estructura correcta
        const attachmentIds = responseData.data.attachment_ids;
        console.log('Attachment IDs:', attachmentIds);
        
        // Obtener detalles de cada imagen (limitado a 12)
        const imagePromises = attachmentIds.slice(0, 12).map(async (id: string) => {
          console.log('Fetching image details for ID:', id);
          
          const imageResponse = await fetch(
            `https://yellowgreen-deer-888686.hostingersite.com/wp-json/wp/v2/media/${id}`,
            {
              headers: {
                'Authorization': 'Bearer rcHPRPFiUjqRtQlESWQhQCcHagZ3EosAJzm5LugJ',
              },
            }
          );
          
          console.log(`Image response for ID ${id}:`, imageResponse.status);
          
          if (imageResponse.ok) {
            const imageData = await imageResponse.json();
            console.log('Image data for ID', id, ':', imageData);
            return {
              id: imageData.id,
              url: imageData.guid.rendered,
              title: imageData.title.rendered,
              alt: imageData.title.rendered,
              width: 400, // Valor por defecto
              height: 600, // Valor por defecto
            };
          } else {
            console.error('Failed to fetch image', id, ':', imageResponse.status);
          }
          return null;
        });

        const imageResults = await Promise.all(imagePromises);
        const validImages = imageResults.filter(img => img !== null) as WordPressImage[];
        console.log('Valid images count:', validImages.length);
        console.log('Valid images:', validImages);
        setImages(validImages);
      } catch (error) {
        console.error('Error fetching images:', error);
        
        // Fallback con imágenes de prueba
        const fallbackImages: WordPressImage[] = [
          {
            id: 1,
            url: 'https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?w=400',
            title: 'Test Image 1',
            alt: 'Test Image 1',
            width: 400,
            height: 600,
          },
          {
            id: 2,
            url: 'https://images.unsplash.com/photo-1611652022419-a9419f74343d?w=400',
            title: 'Test Image 2',
            alt: 'Test Image 2',
            width: 400,
            height: 500,
          },
        ];
        console.log('Using fallback images');
        setImages(fallbackImages);
      } finally {
        setLoading(false);
      }
    };

    fetchImages();
  }, []);

  if (loading) {
    return (
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-title-tai-lue text-[#171717] mb-4 uppercase">
              {title}
            </h2>
            <p className="text-[#171717] font-tai-lue">
              {subtitle}
            </p>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-0">
            {Array.from({ length: 12 }).map((_, index) => (
              <div
                key={index}
                className="aspect-square bg-gray-200 animate-pulse"
              />
            ))}
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="py-20 bg-white">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-title-tai-lue font-bold text-gray-900 mb-4">
            {title}
          </h2>
          <p className="text-xl text-gray-600 font-tai-lue">
            {subtitle}
          </p>
        </div>

        {/* Masonry Grid */}
        <div className="columns-2 md:columns-3 lg:columns-4 gap-0 space-y-0">
          {images.map((image, index) => (
            <div
              key={image.id}
              className="break-inside-avoid cursor-pointer group relative overflow-hidden"
              onClick={() => setSelectedImage(image)}
            >
              <Image
                src={image.url}
                alt={image.alt}
                width={image.width}
                height={image.height}
                className="w-full h-auto object-cover transition-transform duration-300 group-hover:scale-105"
                style={{
                  aspectRatio: `${image.width}/${image.height}`
                }}
              />
              <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-all duration-300"></div>
            </div>
          ))}
        </div>
      </div>

      {/* Modal */}
      {selectedImage && (
        <div 
          className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4"
          onClick={() => setSelectedImage(null)}
        >
          <div 
            className="relative max-w-4xl max-h-[90vh] overflow-hidden rounded-lg"
            onClick={(e) => e.stopPropagation()}
          >
            <Image
              src={selectedImage.url}
              alt={selectedImage.alt}
              width={selectedImage.width}
              height={selectedImage.height}
              className="w-full h-auto object-contain"
            />
            <button
              onClick={() => setSelectedImage(null)}
              className="absolute top-4 right-4 w-10 h-10 bg-black/50 text-white rounded-full flex items-center justify-center hover:bg-black/70 transition-colors"
            >
              ×
            </button>
          </div>
        </div>
      )}
    </section>
  );
}