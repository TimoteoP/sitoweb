import { NextRequest, NextResponse } from 'next/server';
import { rateLimit } from '../../../../lib/rateLimit';

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Methods': 'POST, OPTIONS',
  'Access-Control-Allow-Headers': 'Content-Type',
};

export async function OPTIONS() {
  return new NextResponse(null, { status: 204, headers: corsHeaders });
}

// Simple rate limiting store
const rateLimitStore = new Map<string, { count: number; timestamp: number }>();

export async function POST(request: NextRequest) {
  try {
    const clientIP = request.headers.get('x-forwarded-for') || request.headers.get('x-real-ip') || 'unknown';
    // Distributed rate limit: 3 per hour per IP
    const rl = await rateLimit(['contact', clientIP], 3, 3600);
    if (!rl.allowed) {
      const headers = { ...corsHeaders } as Record<string, string>;
      if (rl.resetAt) {
        const sec = Math.max(0, Math.ceil((new Date(rl.resetAt).getTime() - Date.now()) / 1000));
        headers['Retry-After'] = String(sec);
      }
      return NextResponse.json(
        { error: 'Troppi tentativi. Riprova tra un\'ora.' },
        { status: 429, headers }
      );
    }
    
    // Rate limiting: max 3 requests per hour per IP
    const now = Date.now();
    const hourInMs = 60 * 60 * 1000;
    const limit = rateLimitStore.get(clientIP);
    
    if (limit) {
      if (now - limit.timestamp < hourInMs) {
        if (limit.count >= 3) {
          return NextResponse.json(
            { error: 'Troppi tentativi. Riprova tra un\'ora.' },
            { status: 429, headers: corsHeaders }
          );
        }
        limit.count++;
      } else {
        // Reset if more than an hour has passed
        limit.count = 1;
        limit.timestamp = now;
      }
    } else {
      rateLimitStore.set(clientIP, { count: 1, timestamp: now });
    }

    const formData = await request.formData();
    
    const firstName = formData.get('firstName') as string;
    const lastName = formData.get('lastName') as string;
    const email = formData.get('email') as string;
    const phone = formData.get('phone') as string;
    const contactReason = formData.get('contactReason') as string;
    const message = formData.get('message') as string;
    const privacy = formData.get('privacy') as string;
    const newsletter = formData.get('newsletter') as string;
    const listId = formData.get('listId') as string;
    
    // Anti-spam fields
    const honeypot = formData.get('website') as string;
    const captchaAnswer = formData.get('captcha_answer') as string;
    const captchaExpected = formData.get('captcha_expected') as string;

    // Honeypot validation - if filled, it's likely a bot
    if (honeypot) {
      return NextResponse.json(
        { error: 'Spam rilevato' },
        { status: 400, headers: corsHeaders }
      );
    }

    // CAPTCHA validation
    if (!captchaAnswer || !captchaExpected || parseInt(captchaAnswer) !== parseInt(captchaExpected)) {
      return NextResponse.json(
        { error: 'Verifica di sicurezza non valida' },
        { status: 400, headers: corsHeaders }
      );
    }

    // Basic validation
    if (!firstName || !lastName || !email || !contactReason || !message || !privacy) {
      return NextResponse.json(
        { error: 'Campi obbligatori mancanti' },
        { status: 400, headers: corsHeaders }
      );
    }

    // Email format validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return NextResponse.json(
        { error: 'Formato email non valido' },
        { status: 400, headers: corsHeaders }
      );
    }

    // Content length validation
    if (message.length > 2000) {
      return NextResponse.json(
        { error: 'Messaggio troppo lungo (max 2000 caratteri)' },
        { status: 400, headers: corsHeaders }
      );
    }

    // Simple spam keyword detection
    const spamKeywords = ['viagra', 'casino', 'lottery', 'bitcoin', 'crypto', 'investment', 'loan'];
    const messageText = message.toLowerCase();
    if (spamKeywords.some(keyword => messageText.includes(keyword))) {
      return NextResponse.json(
        { error: 'Contenuto non valido rilevato' },
        { status: 400, headers: corsHeaders }
      );
    }

    // Prepare contact data for Brevo
    const contactData = {
      email: email,
      attributes: {
        FIRSTNAME: firstName,
        LASTNAME: lastName,
        SMS: phone || '',
        CONTACT_REASON: contactReason,
        MESSAGE: message,
        FORM_NAME: 'Form Contatti',
        NEWSLETTER_OPT_IN: newsletter === 'true' ? 'YES' : 'NO'
      },
      listIds: newsletter === 'true' ? [parseInt(listId || '8')] : [],
      updateEnabled: true
    };

    // Send to Brevo API
    const brevoResponse = await fetch('https://api.brevo.com/v3/contacts', {
      method: 'POST',
      headers: {
        'accept': 'application/json',
        'content-type': 'application/json',
        'api-key': process.env.BREVO_API_KEY || ''
      },
      body: JSON.stringify(contactData)
    });

    if (!brevoResponse.ok) {
      // If contact already exists, try to update it
      if (brevoResponse.status === 400) {
        const updateResponse = await fetch(`https://api.brevo.com/v3/contacts/${email}`, {
          method: 'PUT',
          headers: {
            'accept': 'application/json',
            'content-type': 'application/json',
            'api-key': process.env.BREVO_API_KEY || ''
          },
          body: JSON.stringify({
            attributes: contactData.attributes,
            listIds: contactData.listIds,
            unlinkListIds: newsletter !== 'true' ? [parseInt(listId || '8')] : []
          })
        });

        if (!updateResponse.ok) {
          console.error('Brevo update error:', await updateResponse.text());
          return NextResponse.json(
            { error: 'Errore nell\'aggiornamento del contatto' },
            { status: 500, headers: corsHeaders }
          );
        }
      } else {
        console.error('Brevo error:', await brevoResponse.text());
        return NextResponse.json(
          { error: 'Errore nell\'invio della richiesta' },
          { status: 500, headers: corsHeaders }
        );
      }
    }

    // Email notification to site owner can be added here if needed
    
    return NextResponse.json({ 
      success: true, 
      message: 'Messaggio inviato con successo!' 
    }, { headers: corsHeaders });

  } catch (error) {
    console.error('Contact form error:', error);
    return NextResponse.json(
      { error: 'Errore interno del server' },
      { status: 500, headers: corsHeaders }
    );
  }
}
