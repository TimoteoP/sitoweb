import { Metadata } from 'next';
import Link from 'next/link';
import { siteConfig } from '../../../config/site.config';
// Footer provided by layout

export const metadata: Metadata = {
  title: `Cookie Policy - ${siteConfig.name}`,
  description: 'Cookie Policy conforme alle normative UE per i cittadini e residenti SEE e Svizzera. Gestione trasparente dei cookie tecnici, di marketing e social.',
  keywords: [...siteConfig.seo.keywords, 'cookie policy', 'privacy', 'GDPR', 'normativa cookies'],
  openGraph: {
    title: `Cookie Policy - ${siteConfig.name}`,
    description: 'Cookie Policy conforme alle normative UE per una gestione trasparente dei cookie.',
    url: `${siteConfig.url}/cookie-policy`,
    images: [siteConfig.seo.ogImage],
  },
};

export default function CookiePolicyPage() {
  return (
    <>
      {/* Navigation provided by layout */}
      
      {/* Main Content */}
      <div style={{ padding: '2rem', background: 'var(--gray-50)' }}>
        <div className="services-container">
          <div style={{ 
            maxWidth: '800px', 
            margin: '0 auto',
            backgroundColor: 'white',
            borderRadius: '12px',
            border: '1px solid var(--gray-100)',
            boxShadow: '0 2px 4px rgba(0, 0, 0, 0.05)',
            overflow: 'hidden'
          }}>
            {/* Header Section */}
            <div style={{ padding: '3rem 2rem 2rem', textAlign: 'center' }}>
              <div className="hero-badge" style={{ display: 'inline-block', marginBottom: '1.5rem' }}>
                🍪 Cookie Policy • Normativa UE
              </div>
              <h1 className="hero-title" style={{ marginBottom: '1rem', fontSize: '2.5rem' }}>
                Cookie Policy
              </h1>
              <p style={{ color: 'var(--gray-600)', fontSize: '1rem', maxWidth: '600px', margin: '0 auto' }}>
                Ultimo aggiornamento: 25/08/2025 • Ambito: cittadini/residenti SEE e Svizzera
              </p>
            </div>

            {/* Content */}
            <div style={{ padding: '0 2rem 3rem' }}>
              <div style={{ 
                lineHeight: '1.7', 
                color: 'var(--gray-700)',
                fontSize: '1rem'
              }}>
                
                {/* Section 1 */}
                <section style={{ marginBottom: '2.5rem' }}>
                  <h2 style={{ 
                    fontSize: '1.5rem', 
                    fontWeight: '700', 
                    color: 'var(--primary-dark)', 
                    marginBottom: '1rem',
                    borderBottom: '2px solid var(--primary-blue)',
                    paddingBottom: '0.5rem'
                  }}>
                    1. Chi siamo
                  </h2>
                  <p style={{ marginBottom: '1rem' }}>
                    <strong>Titolare del trattamento:</strong> Timoteo Pasquali, Piazzale Duca Abruzzi, 2, 19124 La Spezia (Italia) – email: <a href="mailto:info@timoteopasquali.it" style={{ color: 'var(--primary-blue)' }}>info@timoteopasquali.it</a> – sito: <a href="https://www.timoteopasquali.it" style={{ color: 'var(--primary-blue)' }}>https://www.timoteopasquali.it</a>.
                  </p>
                </section>

                {/* Section 2 */}
                <section style={{ marginBottom: '2.5rem' }}>
                  <h2 style={{ 
                    fontSize: '1.5rem', 
                    fontWeight: '700', 
                    color: 'var(--primary-dark)', 
                    marginBottom: '1rem',
                    borderBottom: '2px solid var(--primary-blue)',
                    paddingBottom: '0.5rem'
                  }}>
                    2. Cosa sono cookie e tecnologie simili
                  </h2>
                  <p style={{ marginBottom: '1rem' }}>
                    Usiamo cookie e tecnologie affini (script, local storage, pixel, web beacon). I cookie possono essere tecnici/funzionali, statistici (misurazione) o marketing/tracciamento. Solo i tecnici sono attivi di default; gli altri si attivano solo dopo il tuo consenso.
                  </p>
                </section>

                {/* Section 3 */}
                <section style={{ marginBottom: '2.5rem' }}>
                  <h2 style={{ 
                    fontSize: '1.5rem', 
                    fontWeight: '700', 
                    color: 'var(--primary-dark)', 
                    marginBottom: '1rem',
                    borderBottom: '2px solid var(--primary-blue)',
                    paddingBottom: '0.5rem'
                  }}>
                    3. Base giuridica
                  </h2>
                  <ul style={{ paddingLeft: '1.5rem', marginBottom: '1rem' }}>
                    <li style={{ marginBottom: '0.5rem' }}><strong>Cookie tecnici/necessari:</strong> legittimo interesse a far funzionare il sito, nessun consenso richiesto.</li>
                    <li style={{ marginBottom: '0.5rem' }}><strong>Statistici equiparati a tecnici:</strong> non in uso; se attivati, saranno configurati senza identificare l{''}utente.</li>
                    <li style={{ marginBottom: '0.5rem' }}><strong>Marketing/tracciamento (es. Meta Pixel):</strong> consenso prima dell{''}attivazione.</li>
                  </ul>
                </section>

                {/* Section 4 */}
                <section style={{ marginBottom: '2.5rem' }}>
                  <h2 style={{ 
                    fontSize: '1.5rem', 
                    fontWeight: '700', 
                    color: 'var(--primary-dark)', 
                    marginBottom: '1rem',
                    borderBottom: '2px solid var(--primary-blue)',
                    paddingBottom: '0.5rem'
                  }}>
                    4. Strumenti usati sul sito
                  </h2>
                  
                  <h3 style={{ fontSize: '1.25rem', fontWeight: '600', marginBottom: '0.5rem', color: 'var(--primary-dark)' }}>
                    Essenziali (sempre attivi)
                  </h3>
                  <ul style={{ paddingLeft: '1.5rem', marginBottom: '1.5rem' }}>
                    <li style={{ marginBottom: '0.5rem' }}>Cookie di sessione/autenticazione Supabase necessari per login e aree riservate; vengono impostati come cookie sicuri/HTTP-only nell{''}architettura SSR.</li>
                    <li style={{ marginBottom: '0.5rem' }}>Cookie di gestione consenso del banner (cc_cookie, 6 mesi di validità).</li>
                  </ul>

                  <h3 style={{ fontSize: '1.25rem', fontWeight: '600', marginBottom: '0.5rem', color: 'var(--primary-dark)' }}>
                    Misurazione senza cookie
                  </h3>
                  <ul style={{ paddingLeft: '1.5rem', marginBottom: '1.5rem' }}>
                    <li style={{ marginBottom: '0.5rem' }}>Vercel Web Analytics: non usa cookie né terze parti; identifica il visitatore tramite hash volatile e retiene i dati per finestra limitata. Piano Hobby include 50k eventi/mese.</li>
                  </ul>

                  <h3 style={{ fontSize: '1.25rem', fontWeight: '600', marginBottom: '0.5rem', color: 'var(--primary-dark)' }}>
                    Marketing/tracciamento
                  </h3>
                  <ul style={{ paddingLeft: '1.5rem', marginBottom: '1.5rem' }}>
                    <li style={{ marginBottom: '0.5rem' }}>Meta Pixel (Facebook/Instagram): attivato solo con consenso marketing; finalità remarketing e misurazione campagne. Dati trasferiti anche fuori SEE; Meta è soggetto a regole UE e provvedimenti recenti. Puoi revocare il consenso in ogni momento nel Centro preferenze cookie.</li>
                  </ul>

                  <h3 style={{ fontSize: '1.25rem', fontWeight: '600', marginBottom: '0.5rem', color: 'var(--primary-dark)' }}>
                    Contenuti incorporati
                  </h3>
                  <ul style={{ paddingLeft: '1.5rem', marginBottom: '1.5rem' }}>
                    <li style={{ marginBottom: '0.5rem' }}>YouTube: usiamo modalità {'"Privacy Enhanced"'} (youtube-nocookie.com) e blocco preventivo: il player si carica solo dopo consenso {'"social"'}. Nota: anche in modalità {'"no-cookie"'} possono essere usate memorie locali al click su Play; quindi chiediamo comunque consenso.</li>
                  </ul>

                  <h3 style={{ fontSize: '1.25rem', fontWeight: '600', marginBottom: '0.5rem', color: 'var(--primary-dark)' }}>
                    WhatsApp come canale di contatto
                  </h3>
                  <ul style={{ paddingLeft: '1.5rem', marginBottom: '1.5rem' }}>
                    <li style={{ marginBottom: '0.5rem' }}>Se clicchi su {"Chatta su WhatsApp"} verrai reindirizzato all{''}app/WEB di WhatsApp: si applica l{''}informativa di WhatsApp; non attiviamo cookie di marketing solo per mostrare il link.</li>
                  </ul>
                </section>

                {/* Section 5 */}
                <section style={{ marginBottom: '2.5rem' }}>
                  <h2 style={{ 
                    fontSize: '1.5rem', 
                    fontWeight: '700', 
                    color: 'var(--primary-dark)', 
                    marginBottom: '1rem',
                    borderBottom: '2px solid var(--primary-blue)',
                    paddingBottom: '0.5rem'
                  }}>
                    5. Come gestisci il consenso
                  </h2>
                  <p style={{ marginBottom: '1rem' }}>
                    Alla prima visita mostriamo un banner con le opzioni <strong>Accetta tutto</strong>, <strong>Rifiuta tutto</strong> e <strong>Personalizza</strong> con pari evidenza. Nessun cookie non necessario viene attivato prima della tua scelta. Le preferenze vengono ricordate per almeno 6 mesi, salvo cancellazione dal browser o cambio della policy (in tal caso potremmo riproporre la richiesta). Puoi modificare o revocare il consenso in qualsiasi momento dal pulsante <strong>{"Preferenze cookie"}</strong> visibile in basso a sinistra su ogni pagina.
                  </p>
                </section>

                {/* Section 6 */}
                <section style={{ marginBottom: '2.5rem' }}>
                  <h2 style={{ 
                    fontSize: '1.5rem', 
                    fontWeight: '700', 
                    color: 'var(--primary-dark)', 
                    marginBottom: '1rem',
                    borderBottom: '2px solid var(--primary-blue)',
                    paddingBottom: '0.5rem'
                  }}>
                    6. Trasferimenti extra SEE
                  </h2>
                  <p style={{ marginBottom: '1rem' }}>
                    Alcuni fornitori (es. Meta/YouTube) possono trattare dati fuori dallo SEE. Adottiamo misure adeguate e limitiamo l{''}attivazione a seguito di consenso.
                  </p>
                </section>

                {/* Section 7 */}
                <section style={{ marginBottom: '2.5rem' }}>
                  <h2 style={{ 
                    fontSize: '1.5rem', 
                    fontWeight: '700', 
                    color: 'var(--primary-dark)', 
                    marginBottom: '1rem',
                    borderBottom: '2px solid var(--primary-blue)',
                    paddingBottom: '0.5rem'
                  }}>
                    7. Conservazione
                  </h2>
                  <ul style={{ paddingLeft: '1.5rem', marginBottom: '1rem' }}>
                    <li style={{ marginBottom: '0.5rem' }}><strong>Cookie tecnici:</strong> durata limitata alla sessione o secondo necessità di sicurezza.</li>
                    <li style={{ marginBottom: '0.5rem' }}><strong>Preferenze cookie:</strong> di regola 182 giorni.</li>
                    <li style={{ marginBottom: '0.5rem' }}><strong>Log della prova del consenso:</strong> conservati su Supabase per dimostrare la compliance (timestamp, categoria, scelta, pseudo-ID), senza conservare IP in chiaro.</li>
                  </ul>
                </section>

                {/* Section 8 */}
                <section style={{ marginBottom: '2.5rem' }}>
                  <h2 style={{ 
                    fontSize: '1.5rem', 
                    fontWeight: '700', 
                    color: 'var(--primary-dark)', 
                    marginBottom: '1rem',
                    borderBottom: '2px solid var(--primary-blue)',
                    paddingBottom: '0.5rem'
                  }}>
                    8. I tuoi diritti
                  </h2>
                  <p style={{ marginBottom: '1rem' }}>
                    Puoi esercitare i diritti previsti dagli artt. 15-22 GDPR (accesso, rettifica, cancellazione, limitazione, portabilità, opposizione) scrivendo a <a href="mailto:info@timoteopasquali.it" style={{ color: 'var(--primary-blue)' }}>info@timoteopasquali.it</a>.
                  </p>
                </section>

                {/* Section 9 */}
                <section style={{ marginBottom: '2.5rem' }}>
                  <h2 style={{ 
                    fontSize: '1.5rem', 
                    fontWeight: '700', 
                    color: 'var(--primary-dark)', 
                    marginBottom: '1rem',
                    borderBottom: '2px solid var(--primary-blue)',
                    paddingBottom: '0.5rem'
                  }}>
                    9. Modifiche
                  </h2>
                  <p style={{ marginBottom: '1rem' }}>
                    Potremo aggiornare questa policy. Se le modifiche impattano sul consenso, te lo richiederemo di nuovo.
                  </p>
                </section>

              </div>

              {/* CTA Section */}
              <div style={{ 
                marginTop: '3rem', 
                padding: '2rem', 
                background: 'var(--gray-50)', 
                borderRadius: '8px', 
                textAlign: 'center' 
              }}>
                <h3 style={{ 
                  fontSize: '1.25rem', 
                  fontWeight: '700', 
                  color: 'var(--primary-dark)', 
                  marginBottom: '1rem' 
                }}>
                  Hai domande sulla nostra Cookie Policy?
                </h3>
                <p style={{ 
                  color: 'var(--gray-600)', 
                  marginBottom: '1.5rem' 
                }}>
                  Contattami per qualsiasi chiarimento sui cookie e sulla gestione dei tuoi dati.
                </p>
                <Link 
                  href="/contatti" 
                  className="btn-primary"
                  style={{ display: 'inline-block' }}
                >
                  📧 Contattami
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Footer provided by layout */}
    </>
  );
}
