import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  try {
    const data = await request.json();
    
    // Server-side environment variables (no NEXT_PUBLIC_ prefix)
    const serviceId = process.env.EMAILJS_SERVICE_ID;
    const templateId = process.env.EMAILJS_TEMPLATE_ID;
    const publicKey = process.env.EMAILJS_PUBLIC_KEY;

    if (!serviceId || !templateId || !publicKey) {
      return NextResponse.json(
        { error: 'Configuration Error: Missing EmailJS credentials on server' }, 
        { status: 500 }
      );
    }

    const payload = {
      service_id: serviceId,
      template_id: templateId,
      user_id: publicKey,
      template_params: data
    };

    const response = await fetch('https://api.emailjs.com/api/v1.0/email/send', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(payload),
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error('EmailJS Error:', errorText);
      return NextResponse.json({ error: 'Failed to send email via EmailJS', details: errorText }, { status: response.status });
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('API Error:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
