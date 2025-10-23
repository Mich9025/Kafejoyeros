'use client';

import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { DynamicForm } from '@/components/ui/dynamic-form';

export default function EncuestaPage() { 
  const surveyFields = [    
    {
      name: "descripcion",
      label: "",
      type: "section-header" as const,
      placeholder: "Nos gustaría conocer su experiencia trabajando con nosotros. Sus respuestas nos ayudarán a mejorar nuestros servicios.",
      span: "full" as const,
      className: "text-lg text-center text-gray-600 mb-12"
    },
    {
      name: "pregunta1",
      label: "1. ¿Recuerda por qué eligió trabajar con nosotros por primera vez?",
      type: "textarea" as const,
      placeholder: "Comparta los motivos que lo llevaron a elegirnos inicialmente...",
      required: true,
      span: "full" as const,
      className: "min-h-[120px]"
    },
    {
      name: "pregunta2", 
      label: "2. Sabiendo que hay otras opciones en el mercado, ¿alguna razón en especial por la que continúe trabajando con nosotros?",
      type: "textarea" as const,
      placeholder: "Cuéntenos qué lo motiva a seguir siendo nuestro cliente...",
      required: true,
      span: "full" as const,
      className: "min-h-[120px]"
    },
    {
      name: "pregunta3",
      label: "3. ¿Considera que hay algo que nos diferencie de las demás opciones del mercado?",
      type: "textarea" as const,
      placeholder: "Describa qué aspectos considera únicos en nuestro servicio...",
      required: true,
      span: "full" as const,
      className: "min-h-[120px]"
    },
    {
      name: "pregunta4",
      label: "4. ¿Alguna vez nos ha recomendado? de ser así, ¿alguna razón en particular?",
      type: "textarea" as const,
      placeholder: "Si nos ha recomendado, comparta las razones. Si no, puede explicar por qué...",
      required: true,
      span: "full" as const,
      className: "min-h-[120px]"
    }
  ];

  const handleSubmit = async (data: Record<string, string | boolean | File | number | null>) => {
    try {
      console.log('Datos de la encuesta:', data);
      // Aquí se implementaría el envío de datos al backend
      // Por ahora solo mostramos en consola
      alert('¡Gracias por completar la encuesta! Sus respuestas han sido enviadas.');
    } catch (error) {
      console.error('Error al enviar la encuesta:', error);
      alert('Hubo un error al enviar la encuesta. Por favor, inténtelo de nuevo.');
    }
  };

  return (
    <>    
    <Header darkBackground={true} logo={"https://yellowgreen-deer-888686.hostingersite.com/wp-content/uploads/2025/10/NOMBRE-SLOGAN-COLOR-2-JPG-Photoroom.png"} />       
    <div className="min-h-screen bg-white">          
      <main className="pt-12">
        {/* Hero Section */}
        <section className="py-20 bg-white">
          <h1 className="text-4xl font-bold text-center text-gray-900">
            ENCUESTA DE SATISFACIÓN
          </h1>
        </section>

        {/* Content Section */}
        <section className="py-20 bg-gray-100">
          <div className="container mx-auto px-4">   
            <div className="container mx-auto px-4 max-w-4xl">
            <DynamicForm
              fields={surveyFields}
              onSubmit={handleSubmit}
              submitText="Enviar Encuesta"
              submitClassName="w-full p-2 bg-[var(--red)] text-white rounded hover:bg-[#270218] disabled:opacity-50"
              loadingText="Enviando..."
              successMessage="¡Encuesta enviada!"
              successDescription="Gracias por tomarse el tiempo de completar nuestra encuesta."
              retryText="Enviar otra respuesta"
              className="bg-white p-8 rounded-lg shadow-lg"
            />
          </div>         
          </div>
        </section>       
      </main>
      <Footer logo={"https://yellowgreen-deer-888686.hostingersite.com/wp-content/uploads/2025/10/NOMBRE-SLOGAN-COLOR-1-JPG-Photoroom.png"} />   
    </div>
    </>
  );
}