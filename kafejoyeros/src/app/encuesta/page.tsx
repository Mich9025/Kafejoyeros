'use client';

import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { DynamicForm } from '@/components/ui/dynamic-form';
import emailjs from '@emailjs/browser';


export default function EncuestaPage() { 
  const surveyFields = [    
    {
      name: "descripcion",
      label: "",
      type: "section-header" as const,
      placeholder: "Nos gustaría conocer su experiencia trabajando con nosotros. Sus respuestas nos ayudarán a mejorar nuestros servicios.",
      span: "full" as const,
      className: "text-lg text-center text-gray-600 mb-8"
    },
    {
      name: "calificacion",
      label: "Calificación General",
      type: "select" as const,
      placeholder: "Seleccione una calificación",
      required: true,
      span: "full" as const,
      options: [
        { value: "5", label: "⭐⭐⭐⭐⭐ Excelente" },
        { value: "4", label: "⭐⭐⭐⭐ Muy Bueno" },
        { value: "3", label: "⭐⭐⭐ Bueno" },
        { value: "2", label: "⭐⭐ Regular" },
        { value: "1", label: "⭐ Malo" }
      ],
      className: "w-full placeholder:text-gray-400"
    },
    {
      name: "pregunta1",
      label: "1. ¿Recuerda por qué eligió trabajar con nosotros por primera vez?",
      type: "textarea" as const,
      placeholder: "Comparta los motivos que lo llevaron a elegirnos inicialmente...",
      required: true,
      span: "full" as const,
      className: "min-h-[100px] placeholder:text-gray-400"
    },
    {
      name: "pregunta2", 
      label: "2. Sabiendo que hay otras opciones en el mercado, ¿alguna razón en especial por la que continúe trabajando con nosotros?",
      type: "textarea" as const,
      placeholder: "Cuéntenos qué lo motiva a seguir siendo nuestro cliente...",
      required: true,
      span: "full" as const,
      className: "min-h-[100px] placeholder:text-gray-400"
    },
    {
      name: "pregunta3",
      label: "3. ¿Considera que hay algo que nos diferencie de las demás opciones del mercado?",
      type: "textarea" as const,
      placeholder: "Describa qué aspectos considera únicos en nuestro servicio...",
      required: true,
      span: "full" as const,
      className: "min-h-[100px] placeholder:text-gray-400"
    },
    {
      name: "pregunta4",
      label: "4. ¿Alguna vez nos ha recomendado? de ser así, ¿alguna razón en particular?",
      type: "textarea" as const,
      placeholder: "Si nos ha recomendado, comparta las razones. Si no, puede explicar por qué...",
      required: true,
      span: "full" as const,
      className: "min-h-[100px] placeholder:text-gray-400"
    }
  ];

  const handleSubmit = async (data: Record<string, string | boolean | File | number | null>) => {
    try {
      const serviceId = process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID!;
      const templateId = process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID!;
      const publicKey = process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY!;

      if (!templateId || !publicKey || templateId.includes('YOUR_TEMPLATE_ID') || publicKey.includes('YOUR_PUBLIC_KEY')) {
        console.warn("EmailJS credentials invalid or missing. Check .env.local");
        alert("Configuración de Email incompleta. Por favor revisa la consola.");
        return;
      }

      // Format the survey data into the message field
      const formattedMessage = `
Encuesta de Satisfacción:
Calificación: ${data.calificacion || 'No especificada'}

1. ¿Recuerda por qué eligió trabajar con nosotros por primera vez?
${data.pregunta1 || 'Sin respuesta'}

2. Sabiendo que hay otras opciones en el mercado, ¿alguna razón en especial por la que continúe trabajando con nosotros?
${data.pregunta2 || 'Sin respuesta'}

3. ¿Considera que hay algo que nos diferencie de las demás opciones del mercado?
${data.pregunta3 || 'Sin respuesta'}

4. ¿Alguna vez nos ha recomendado? de ser así, ¿alguna razón en particular?
${data.pregunta4 || 'Sin respuesta'}
      `.trim();

      const templateParams = {
        from_name: "Encuesta Anónima",
        user_email: "no-reply@kafejoyeros.com",
        form: "Encuesta",
        message: formattedMessage,
        phone: "N/A",
        location: "N/A",
        budget: "N/A",
        contact_preference: "N/A",
        referral: "Encuesta"
      };

      await emailjs.send(serviceId, templateId, templateParams, publicKey);
      
      // El componente DynamicForm manejará el mensaje de éxito
    } catch (error) {
      console.error('Error al enviar la encuesta:', error);
      alert('Hubo un error al enviar la encuesta. Por favor, inténtelo de nuevo.');
      throw error; // Re-lanzar para que DynamicForm sepa que falló
    }
  };

  return (
    <>    
    <Header darkBackground={true} logo={"https://api.kafejoyeros.com/wp-content/uploads/2025/10/NOMBRE-SLOGAN-COLOR-2-JPG-Photoroom.png"} />       
    <div className="min-h-screen bg-gray-50">          
      <main className="pt-40 pb-20">
        {/* Hero Section */}
        <section className="mb-12">
          <div className="container mx-auto px-4 text-center">
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
              Encuesta de Satisfacción
            </h1>
            <div className="w-24 h-1 bg-[var(--red)] mx-auto rounded-full"></div>
          </div>
        </section>

        {/* Form Section */}
        <section>
          <div className="container mx-auto px-4">   
            <div className="max-w-3xl mx-auto">
              <div className="bg-white rounded-2xl shadow-xl overflow-hidden border border-gray-100">
                <div className="bg-[var(--red)] h-2 w-full"></div>
                <div className="p-8 md:p-12">
                  <DynamicForm
                    fields={surveyFields}
                    onSubmit={handleSubmit}
                    submitText="Enviar Encuesta"
                    submitClassName="w-full py-4 bg-[var(--red)] text-white font-semibold rounded-lg hover:bg-[#270218] transition-colors duration-300 disabled:opacity-70 text-lg shadow-md hover:shadow-lg"
                    loadingText="Enviando respuestas..."
                    successMessage="¡Gracias por su opinión!"
                    successDescription="Sus respuestas han sido enviadas correctamente. Agradecemos su tiempo y confianza en nuestros servicios."
                    retryText="Enviar otra respuesta"
                    className="space-y-6"
                  />
                </div>
              </div>
            </div>         
          </div>
        </section>       
      </main>
      <Footer logo={"https://api.kafejoyeros.com/wp-content/uploads/2025/10/NOMBRE-SLOGAN-COLOR-1-JPG-Photoroom.png"} />   
    </div>
    </>
  );
}