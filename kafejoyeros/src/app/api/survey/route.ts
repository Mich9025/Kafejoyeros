import { NextResponse } from 'next/server';
import nodemailer from 'nodemailer';

export async function POST(request: Request) {
  try {
    const data = await request.json();
    
    // Validate environment variables
    if (!process.env.SMTP_HOST || !process.env.SMTP_USER || !process.env.SMTP_PASSWORD) {
      console.error('Missing SMTP environment variables');
      return NextResponse.json(
        { error: 'Server configuration error' },
        { status: 500 }
      );
    }

    const transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST,
      port: Number(process.env.SMTP_PORT) || 587,
      secure: false, // true for 465, false for other ports
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASSWORD,
      },
    });

    // Format the email content
    const emailContent = Object.entries(data)
      .map(([key, value]) => {
        // Skip internal fields if any
        if (key === 'descripcion') return '';
        
        // Format key to be more readable if needed, or just use the question text if we had it mapped
        // Since we receive just keys like "pregunta1", we might want to map them to the actual questions
        // or just display them as is. 
        // For better readability, let's try to map them if possible, or just print them.
        
        return `<strong>${key}:</strong><br/>${value}<br/><br/>`;
      })
      .join('');

    const mailOptions = {
      from: process.env.SMTP_USER,
      to: 'info@kafejoyeros.com',
      subject: 'Nueva Respuesta de Encuesta de Satisfacción',
      html: `
        <h2>Nueva respuesta recibida</h2>
        <p>Se ha recibido una nueva respuesta en la encuesta de satisfacción:</p>
        <hr/>
        ${emailContent}
        <hr/>
        <p>Este es un mensaje automático del sistema.</p>
      `,
    };

    await transporter.sendMail(mailOptions);

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Error sending email:', error);
    return NextResponse.json(
      { error: 'Error sending email' },
      { status: 500 }
    );
  }
}
