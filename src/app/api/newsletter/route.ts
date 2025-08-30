import { NextRequest, NextResponse } from 'next/server';
import { siteConfig } from '../../../../config/site.config';

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Methods': 'POST, OPTIONS',
  'Access-Control-Allow-Headers': 'Content-Type',
};

export async function OPTIONS() {
  return new NextResponse(null, { status: 204, headers: corsHeaders });
}

export async function POST(request: NextRequest) {
  try {
    const { 
      email, 
      projectId, 
      leadMagnet, 
      caseStudyTier,
      utmSource, utmMedium, utmCampaign,
    } = await request.json();

    if (!email || !email.includes('@')) {
      return NextResponse.json({ error: 'Email non valida' }, { status: 400, headers: corsHeaders });
    }

    // Brevo API integration
    const brevoResponse = await fetch('https://api.brevo.com/v3/contacts', {
      method: 'POST',
      headers: {
        'accept': 'application/json',
        'api-key': siteConfig.newsletter.brevoApiKey,
        'content-type': 'application/json',
      },
      body: JSON.stringify({
        email,
        attributes: {
          PROJECT_ID: projectId || siteConfig.projectId,
          LEAD_MAGNET: leadMagnet ? 'free' : 'none',
          CASE_STUDY_TIER: caseStudyTier || (leadMagnet ? 'free' : 'none'),
          SIGNUP_DATE: new Date().toISOString(),
          SIGNUP_SOURCE: 'website',
          UTM_SOURCE: utmSource || null,
          UTM_MEDIUM: utmMedium || null,
          UTM_CAMPAIGN: utmCampaign || null,
        },
        listIds: [siteConfig.newsletter.listId],
        updateEnabled: true, // Update if contact already exists
      }),
    });

    if (!brevoResponse.ok) {
      const errorData = await brevoResponse.json();
      console.error('Brevo API error:', errorData);
      
      // Handle specific Brevo errors
      if (errorData.code === 'duplicate_parameter') {
        return NextResponse.json({ 
          message: 'Email già presente nella lista! Controlla la tua inbox.' 
        }, { status: 200, headers: corsHeaders });
      }
      
      return NextResponse.json({ 
        error: 'Errore nel servizio di newsletter' 
      }, { status: 500, headers: corsHeaders });
    }

    // If lead magnet, trigger welcome email automation
    if (leadMagnet) {
      try {
        const templateId = parseInt(process.env.BREVO_TEMPLATE_CASE_STUDY || '0', 10);
        const payload = templateId > 0 ? {
          to: [{ email }],
          templateId,
          params: {
            PROJECT_NAME: siteConfig.name,
            PROJECT_URL: siteConfig.url,
            CASE_STUDY_LINK: `${siteConfig.url}/downloads/caso-studio.pdf`,
          },
        } : {
          to: [{ email }],
          subject: 'Il tuo Case Study',
          htmlContent: `
            <p>Ciao!</p>
            <p>Ecco il case study promesso:</p>
            <p><a href="${siteConfig.url}/downloads/caso-studio.pdf">Scarica il PDF</a></p>
            <p>Se vuoi i numeri dettagliati e le KPI operative, dai un'occhiata alla versione Pro:</p>
            <p><a href="${siteConfig.url}/caso-studio-pro">Case Study Pro</a></p>
          `,
        };

        await fetch('https://api.brevo.com/v3/smtp/email', {
          method: 'POST',
          headers: {
            'accept': 'application/json',
            'api-key': siteConfig.newsletter.brevoApiKey,
            'content-type': 'application/json',
          },
          body: JSON.stringify(payload),
        });
      } catch (emailError) {
        console.error('Error sending welcome email:', emailError);
        // Don't fail the subscription if email fails
      }
    }

    return NextResponse.json({ 
      message: 'Iscrizione completata con successo!' 
    }, { status: 200, headers: corsHeaders });

  } catch (error) {
    console.error('Newsletter subscription error:', error);
    return NextResponse.json({ 
      error: 'Errore interno del server' 
    }, { status: 500, headers: corsHeaders });
}
}
