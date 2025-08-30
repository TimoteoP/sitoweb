import { NextRequest, NextResponse } from 'next/server';
import { siteConfig } from '../../../../config/site.config';
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
    // Distributed rate limit: 5 per hour per IP
    const rl = await rateLimit(['question', clientIP], 5, 3600);
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
    
    // Rate limiting: max 5 questions per hour per IP
    const now = Date.now();
    const hourInMs = 60 * 60 * 1000;
    const limit = rateLimitStore.get(clientIP);
    
    if (limit) {
      if (now - limit.timestamp < hourInMs) {
        if (limit.count >= 5) {
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

    const { question, email, name, postSlug, postTitle, timeSpent, captchaAnswer, mathAnswer } = await request.json();

    if (!question || !email || !name || !email.includes('@')) {
      return NextResponse.json({ error: 'Dati non validi - nome, email e domanda sono obbligatori' }, { status: 400, headers: corsHeaders });
    }

    // Email format validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return NextResponse.json({ error: 'Formato email non valido' }, { status: 400, headers: corsHeaders });
    }

    // Content length validation
    if (question.length > 1000) {
      return NextResponse.json({ error: 'Domanda troppo lunga (max 1000 caratteri)' }, { status: 400, headers: corsHeaders });
    }

    // Anti-bot validations
    // 1. Time-based validation (server-side check)
    if (timeSpent && timeSpent < 10000) {
      console.log(`Bot detected - too fast submission: ${timeSpent}ms from ${clientIP}`);
      return NextResponse.json({ error: 'Compilazione troppo veloce. Riprova con calma.' }, { status: 400, headers: corsHeaders });
    }

    // 2. Math CAPTCHA validation
    if (!captchaAnswer || !mathAnswer || parseInt(captchaAnswer) !== mathAnswer) {
      console.log(`Bot detected - wrong CAPTCHA: ${captchaAnswer} vs ${mathAnswer} from ${clientIP}`);
      return NextResponse.json({ error: 'Verifica matematica non corretta.' }, { status: 400, headers: corsHeaders });
    }

    // Simple spam keyword detection
    const spamKeywords = ['viagra', 'casino', 'lottery', 'bitcoin', 'crypto', 'investment', 'loan'];
    const questionText = question.toLowerCase();
    if (spamKeywords.some(keyword => questionText.includes(keyword))) {
      return NextResponse.json({ error: 'Contenuto non valido rilevato' }, { status: 400, headers: corsHeaders });
    }

    // Send notification email via Brevo
    if (!siteConfig.newsletter.brevoApiKey) {
      console.error('Brevo API key is missing from environment variables');
      console.log('Question received but email service not configured:', { 
        timestamp: new Date().toISOString(),
        name,
        email,
        question, 
        postTitle, 
        postSlug 
      });
      
      // In development, we can save to a file or just log
      if (process.env.NODE_ENV === 'development') {
        console.log('=== QUESTION RECEIVED (Email service not configured) ===');
        console.log(`From: ${name} <${email}>`);
        console.log(`Article: ${postTitle} (${postSlug})`);
        console.log(`Question: ${question}`);
        console.log('=====================================================');
      }
      
      return NextResponse.json({ 
        error: 'Servizio email temporaneamente non disponibile. Ti prego di scrivermi direttamente a info@timoteopasquali.it' 
      }, { status: 503 });
    }

    console.log('Attempting to send email with Brevo...');
    console.log('Author email:', siteConfig.author.email);
    console.log('API key configured:', siteConfig.newsletter.brevoApiKey ? 'Yes' : 'No');

    const brevoResponse = await fetch('https://api.brevo.com/v3/smtp/email', {
      method: 'POST',
      headers: {
        'accept': 'application/json',
        'api-key': siteConfig.newsletter.brevoApiKey,
        'content-type': 'application/json',
      },
      body: JSON.stringify({
        sender: { email: siteConfig.author.email, name: 'Blog Timoteo Pasquali' },
        to: [{ email: siteConfig.author.email, name: siteConfig.author.name }],
        replyTo: { email, name },
        subject: `Nuova domanda da ${name} - ${postTitle}`,
        htmlContent: `
          <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
            <h2 style="color: #1a1f36;">📝 Nuova domanda dal blog</h2>
            
            <div style="background: #f0f9ff; padding: 20px; border-radius: 8px; margin: 20px 0; border-left: 4px solid #2563eb;">
              <p><strong>👤 Da:</strong> ${name}</p>
              <p><strong>📧 Email:</strong> <a href="mailto:${email}">${email}</a></p>
            </div>
            
            <div style="background: #f8f9fa; padding: 20px; border-radius: 8px; margin: 20px 0;">
              <p><strong>📰 Articolo:</strong> ${postTitle}</p>
              <p><strong>🔗 URL:</strong> <a href="${siteConfig.url}/blog/${postSlug}">${siteConfig.url}/blog/${postSlug}</a></p>
            </div>
            
            <div style="background: #fff; border: 2px solid #e3e6ea; border-radius: 8px; padding: 20px; margin: 20px 0;">
              <h3 style="color: #2563eb; margin-bottom: 15px;">💬 Domanda:</h3>
              <p style="font-size: 16px; line-height: 1.6; color: #374151;">${question}</p>
            </div>
            
            <div style="background: #f0f9ff; padding: 15px; border-radius: 8px; margin: 20px 0;">
              <p><strong>Email di risposta:</strong> <a href="mailto:${email}">${email}</a></p>
              <p><small>Clicca sull'email per rispondere direttamente al lettore.</small></p>
            </div>
            
            <hr style="margin: 30px 0; border: none; border-top: 1px solid #e5e7eb;">
            
            <p style="color: #6b7280; font-size: 14px;">
              Questa email è stata generata automaticamente dal sistema Q&A del blog.<br>
              Progetto: ${siteConfig.projectId} | Data: ${new Date().toLocaleString('it-IT')}
            </p>
          </div>
        `,
      }),
    });

    console.log('Brevo response status:', brevoResponse.status);

    if (!brevoResponse.ok) {
      const errorData = await brevoResponse.text();
      console.error('Brevo email error:', brevoResponse.status, errorData);
      
      // If it's an IP authorization issue, provide helpful feedback
      if (brevoResponse.status === 401 && errorData.includes('IP address')) {
        console.log('🔒 IP Authorization Issue - Question saved to logs for development:');
        console.log(`📧 From: ${name} <${email}>`);
        console.log(`📝 Question: ${question}`);
        console.log(`📰 Article: ${postTitle} (${postSlug})`);
        console.log('👆 Add your IP to Brevo: https://app.brevo.com/security/authorised_ips');
        
        // In development, we can still "succeed" for testing purposes
        if (process.env.NODE_ENV === 'development') {
          console.log('✅ Development mode: Treating as success for testing');
          return NextResponse.json({ 
            message: 'Domanda ricevuta! (Modalità sviluppo - controlla i log del server)' 
          }, { status: 200, headers: corsHeaders });
        }
      }
      
      return NextResponse.json({ 
        error: `Errore nel servizio email (${brevoResponse.status}). Scrivi direttamente a info@timoteopasquali.it` 
      }, { status: 500, headers: corsHeaders });
    }

    // Send confirmation email to user
    try {
      await fetch('https://api.brevo.com/v3/smtp/email', {
        method: 'POST',
        headers: {
          'accept': 'application/json',
          'api-key': siteConfig.newsletter.brevoApiKey,
          'content-type': 'application/json',
        },
        body: JSON.stringify({
          sender: { email: siteConfig.author.email, name: siteConfig.author.name },
          to: [{ email }],
          replyTo: { email: siteConfig.author.email, name: siteConfig.author.name },
          subject: `Domanda ricevuta: ${postTitle}`,
          htmlContent: `
            <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
              <h2 style="color: #10b981;">✅ Domanda ricevuta!</h2>
              
              <p>Ciao!</p>
              
              <p>Ho ricevuto la tua domanda sull'articolo "<strong>${postTitle}</strong>" e ti risponderò al più presto.</p>
              
              <div style="background: #f0f9ff; padding: 20px; border-radius: 8px; margin: 20px 0;">
                <h3 style="color: #2563eb; margin-bottom: 10px;">La tua domanda:</h3>
                <p style="font-style: italic;">"${question}"</p>
              </div>
              
              <p>Nel frattempo, ti consiglio di dare un'occhiata agli altri articoli del blog che potrebbero interessarti:</p>
              <p><a href="${siteConfig.url}/blog" style="color: #2563eb;">👉 Vai al blog</a></p>
              
              <hr style="margin: 30px 0; border: none; border-top: 1px solid #e5e7eb;">
              
              <p>Un saluto,<br>
              <strong>${siteConfig.author.name}</strong></p>
              
              <p style="color: #6b7280; font-size: 14px;">
                ${siteConfig.url} | ${siteConfig.author.email}
              </p>
            </div>
          `,
        }),
      });
    } catch (confirmationError) {
      console.error('Error sending confirmation email:', confirmationError);
      // Don't fail the request if confirmation email fails
    }

    return NextResponse.json({ 
      message: 'Domanda inviata con successo!' 
    }, { status: 200, headers: corsHeaders });

  } catch (error) {
    console.error('Question submission error:', error);
    return NextResponse.json({ 
      error: 'Errore interno del server' 
    }, { status: 500, headers: corsHeaders });
}
}
