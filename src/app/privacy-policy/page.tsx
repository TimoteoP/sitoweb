import { Metadata } from 'next';
import Link from 'next/link';
import { siteConfig } from '../../../config/site.config';
// Footer provided by layout

export const metadata: Metadata = {
  title: `Privacy Policy - ${siteConfig.name}`,
  description: 'Privacy Policy completa per la gestione dei dati personali. Trattamento trasparente secondo GDPR per cittadini e residenti UE.',
  keywords: [...siteConfig.seo.keywords, 'privacy policy', 'gdpr', 'trattamento dati', 'privacy'],
  openGraph: {
    title: `Privacy Policy - ${siteConfig.name}`,
    description: 'Privacy Policy completa per la gestione trasparente dei dati personali secondo GDPR.',
    url: `${siteConfig.url}/privacy-policy`,
    images: [siteConfig.seo.ogImage],
  },
};

export default function PrivacyPolicyPage() {
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
                🔒 Privacy Policy • GDPR Compliant
              </div>
              <h1 className="hero-title" style={{ marginBottom: '1rem', fontSize: '2.5rem' }}>
                Privacy Policy
              </h1>
              <p style={{ color: 'var(--gray-600)', fontSize: '1rem', maxWidth: '600px', margin: '0 auto' }}>
                Ultimo aggiornamento: 25 agosto 2025
              </p>
            </div>

            {/* Content */}
            <div style={{ padding: '0 2rem 3rem' }}>
              <div style={{ 
                lineHeight: '1.7', 
                color: 'var(--gray-700)',
                fontSize: '1rem'
              }}>

                {/* Titolare del trattamento */}
                <section style={{ marginBottom: '3rem' }}>
                  <div style={{
                    padding: '2rem',
                    backgroundColor: 'var(--gray-50)',
                    borderRadius: '8px',
                    borderLeft: '4px solid var(--primary-blue)',
                    marginBottom: '2rem'
                  }}>
                    <h2 style={{ 
                      fontSize: '1.5rem', 
                      fontWeight: '700', 
                      color: 'var(--primary-dark)', 
                      marginBottom: '1rem'
                    }}>
                      Titolare del trattamento
                    </h2>
                    <div style={{ color: 'var(--gray-700)' }}>
                      <strong>Timoteo Pasquali</strong><br />
                      Piazzale Duca Abruzzi 2, 19124 La Spezia (Italia)<br />
                      Email: <a href="mailto:info@timoteopasquali.it" style={{ color: 'var(--primary-blue)' }}>info@timoteopasquali.it</a>
                    </div>
                  </div>
                </section>

                {/* Finalità del trattamento */}
                <section style={{ marginBottom: '3rem' }}>
                  <h2 style={{ 
                    fontSize: '1.5rem', 
                    fontWeight: '700', 
                    color: 'var(--primary-dark)', 
                    marginBottom: '1.5rem',
                    borderBottom: '2px solid var(--primary-blue)',
                    paddingBottom: '0.5rem'
                  }}>
                    Finalità del trattamento e base giuridica
                  </h2>
                  <div style={{ overflowX: 'auto' }}>
                    <table style={{ 
                      width: '100%', 
                      borderCollapse: 'collapse',
                      marginBottom: '1rem'
                    }}>
                      <thead>
                        <tr style={{ backgroundColor: 'var(--gray-100)' }}>
                          <th style={{ 
                            padding: '1rem', 
                            textAlign: 'left', 
                            fontWeight: '600',
                            border: '1px solid var(--gray-200)'
                          }}>Finalità</th>
                          <th style={{ 
                            padding: '1rem', 
                            textAlign: 'left', 
                            fontWeight: '600',
                            border: '1px solid var(--gray-200)'
                          }}>Base giuridica</th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr>
                          <td style={{ padding: '1rem', border: '1px solid var(--gray-200)' }}>Newsletter, modulo contatto</td>
                          <td style={{ padding: '1rem', border: '1px solid var(--gray-200)' }}>Consenso esplicito</td>
                        </tr>
                        <tr style={{ backgroundColor: 'var(--gray-50)' }}>
                          <td style={{ padding: '1rem', border: '1px solid var(--gray-200)' }}>Login utenti (Supabase)</td>
                          <td style={{ padding: '1rem', border: '1px solid var(--gray-200)' }}>Esecuzione del servizio / legittimo interesse</td>
                        </tr>
                        <tr>
                          <td style={{ padding: '1rem', border: '1px solid var(--gray-200)' }}>Messaggistica WhatsApp su richiesta</td>
                          <td style={{ padding: '1rem', border: '1px solid var(--gray-200)' }}>Legittimo interesse</td>
                        </tr>
                        <tr style={{ backgroundColor: 'var(--gray-50)' }}>
                          <td style={{ padding: '1rem', border: '1px solid var(--gray-200)' }}>Analisi visite (Vercel Analytics)</td>
                          <td style={{ padding: '1rem', border: '1px solid var(--gray-200)' }}>Legittimo interesse (privacy-first, senza cookie)</td>
                        </tr>
                        <tr>
                          <td style={{ padding: '1rem', border: '1px solid var(--gray-200)' }}>Meta Pixel (remarketing)</td>
                          <td style={{ padding: '1rem', border: '1px solid var(--gray-200)' }}>Consenso esplicito</td>
                        </tr>
                        <tr style={{ backgroundColor: 'var(--gray-50)' }}>
                          <td style={{ padding: '1rem', border: '1px solid var(--gray-200)' }}>YouTube embed</td>
                          <td style={{ padding: '1rem', border: '1px solid var(--gray-200)' }}>Consenso esplicito</td>
                        </tr>
                        <tr>
                          <td style={{ padding: '1rem', border: '1px solid var(--gray-200)' }}>Log consenso cookie</td>
                          <td style={{ padding: '1rem', border: '1px solid var(--gray-200)' }}>Obbligo di accountability sotto GDPR</td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </section>

                {/* Dati raccolti */}
                <section style={{ marginBottom: '3rem' }}>
                  <h2 style={{ 
                    fontSize: '1.5rem', 
                    fontWeight: '700', 
                    color: 'var(--primary-dark)', 
                    marginBottom: '1.5rem',
                    borderBottom: '2px solid var(--primary-blue)',
                    paddingBottom: '0.5rem'
                  }}>
                    Dati raccolti
                  </h2>
                  <ul style={{ paddingLeft: '1.5rem', marginBottom: '1rem' }}>
                    <li style={{ marginBottom: '0.5rem' }}><strong>Dati volontari:</strong> email, nome, messaggi, numero WhatsApp se usato.</li>
                    <li style={{ marginBottom: '0.5rem' }}><strong>Dati tecnici:</strong> visite anonime via Vercel Analytics.</li>
                    <li style={{ marginBottom: '0.5rem' }}><strong>Consensi:</strong> log di Meta Pixel e YouTube.</li>
                    <li style={{ marginBottom: '0.5rem' }}><strong>Log di consenso</strong> (Supabase).</li>
                  </ul>
                </section>

                {/* Modalità di trattamento */}
                <section style={{ marginBottom: '3rem' }}>
                  <h2 style={{ 
                    fontSize: '1.5rem', 
                    fontWeight: '700', 
                    color: 'var(--primary-dark)', 
                    marginBottom: '1.5rem',
                    borderBottom: '2px solid var(--primary-blue)',
                    paddingBottom: '0.5rem'
                  }}>
                    Modalità di trattamento e sicurezza
                  </h2>
                  <p style={{ marginBottom: '1rem' }}>
                    I dati sono trattati con strumenti elettronici sicuri (Supabase, Vercel, Brevo) con adeguate misure tecniche e organizzative (cifratura, backup, controllo accessi), conformi all{''}art. 32 GDPR.
                  </p>
                </section>

                {/* Destinatari */}
                <section style={{ marginBottom: '3rem' }}>
                  <h2 style={{ 
                    fontSize: '1.5rem', 
                    fontWeight: '700', 
                    color: 'var(--primary-dark)', 
                    marginBottom: '1.5rem',
                    borderBottom: '2px solid var(--primary-blue)',
                    paddingBottom: '0.5rem'
                  }}>
                    Destinatari o responsabili esterni
                  </h2>
                  <ul style={{ paddingLeft: '1.5rem', marginBottom: '1rem' }}>
                    <li style={{ marginBottom: '0.5rem' }}><strong>Brevo</strong> (newsletter e contatti)</li>
                    <li style={{ marginBottom: '0.5rem' }}><strong>Supabase</strong> (login e sessions)</li>
                    <li style={{ marginBottom: '0.5rem' }}><strong>Meta</strong> (Pixel, se consenso)</li>
                    <li style={{ marginBottom: '0.5rem' }}><strong>Google</strong> (YouTube embed, se consenso)</li>
                    <li style={{ marginBottom: '0.5rem' }}><strong>Vercel</strong> (analytics senza cookie)</li>
                  </ul>
                  <p style={{ marginBottom: '1rem' }}>
                    Tutti agiscono come <strong>responsabili del trattamento</strong> su mandato.
                  </p>
                </section>

                {/* Trasferimenti dati */}
                <section style={{ marginBottom: '3rem' }}>
                  <h2 style={{ 
                    fontSize: '1.5rem', 
                    fontWeight: '700', 
                    color: 'var(--primary-dark)', 
                    marginBottom: '1.5rem',
                    borderBottom: '2px solid var(--primary-blue)',
                    paddingBottom: '0.5rem'
                  }}>
                    Trasferimenti dati extra-SEE
                  </h2>
                  <p style={{ marginBottom: '1rem' }}>
                    Alcuni servizi (Meta, YouTube) comportano trasferimenti extra-SEE. Applichiamo <strong>garanzie adeguate (es. SCC)</strong> e attiviamo il flusso solo previa accettazione dell{''}interessato.
                  </p>
                </section>

                {/* Conservazione */}
                <section style={{ marginBottom: '3rem' }}>
                  <h2 style={{ 
                    fontSize: '1.5rem', 
                    fontWeight: '700', 
                    color: 'var(--primary-dark)', 
                    marginBottom: '1.5rem',
                    borderBottom: '2px solid var(--primary-blue)',
                    paddingBottom: '0.5rem'
                  }}>
                    Conservazione dei dati
                  </h2>
                  <ul style={{ paddingLeft: '1.5rem', marginBottom: '1rem' }}>
                    <li style={{ marginBottom: '0.5rem' }}><strong>Newsletter e contatti:</strong> fino a revoca del consenso.</li>
                    <li style={{ marginBottom: '0.5rem' }}><strong>Sessioni di login:</strong> finché servono + X giorni.</li>
                    <li style={{ marginBottom: '0.5rem' }}><strong>Analytics (Vercel):</strong> anonimizzato e cancellato secondo le impostazioni Vercel.</li>
                    <li style={{ marginBottom: '0.5rem' }}><strong>Log consenso:</strong> conservati almeno <strong>6 mesi</strong>.</li>
                    <li style={{ marginBottom: '0.5rem' }}><strong>YouTube embed:</strong> non conserviamo dati extra.</li>
                  </ul>
                </section>

                {/* Diritti */}
                <section style={{ marginBottom: '3rem' }}>
                  <h2 style={{ 
                    fontSize: '1.5rem', 
                    fontWeight: '700', 
                    color: 'var(--primary-dark)', 
                    marginBottom: '1.5rem',
                    borderBottom: '2px solid var(--primary-blue)',
                    paddingBottom: '0.5rem'
                  }}>
                    I tuoi diritti
                  </h2>
                  <p style={{ marginBottom: '1rem' }}>
                    Hai i diritti di accesso, rettifica, cancellazione, limitazione, opposizione, portabilità e revoca del consenso. Per esercitarli, scrivi a <a href="mailto:info@timoteopasquali.it" style={{ color: 'var(--primary-blue)' }}>info@timoteopasquali.it</a>. Hai anche diritto di reclamo al Garante.
                  </p>
                </section>

                {/* Sezioni aggiuntive */}
                <section style={{ marginBottom: '3rem' }}>
                  <div style={{ display: 'grid', gap: '2rem' }}>
                    
                    <div style={{
                      padding: '1.5rem',
                      backgroundColor: 'var(--gray-50)',
                      borderRadius: '8px',
                      borderLeft: '4px solid var(--accent-orange)'
                    }}>
                      <h3 style={{ 
                        fontSize: '1.25rem', 
                        fontWeight: '600', 
                        color: 'var(--primary-dark)', 
                        marginBottom: '1rem' 
                      }}>
                        Minori
                      </h3>
                      <p style={{ color: 'var(--gray-700)' }}>
                        Se l{''}utente ha meno di 14 anni, serve il consenso confermato da un genitore o tutore legale.
                      </p>
                    </div>

                    <div style={{
                      padding: '1.5rem',
                      backgroundColor: 'var(--gray-50)',
                      borderRadius: '8px',
                      borderLeft: '4px solid #10B981'
                    }}>
                      <h3 style={{ 
                        fontSize: '1.25rem', 
                        fontWeight: '600', 
                        color: 'var(--primary-dark)', 
                        marginBottom: '1rem' 
                      }}>
                        Sicurezza e responsabilità
                      </h3>
                      <p style={{ color: 'var(--gray-700)' }}>
                        Applichiamo misure di sicurezza (cifratura, pseudonimizzazione, backup, test) secondo l{''}art. 32 GDPR. Siamo responsabili della conformità (accountability).
                      </p>
                    </div>

                    <div style={{
                      padding: '1.5rem',
                      backgroundColor: 'var(--gray-50)',
                      borderRadius: '8px',
                      borderLeft: '4px solid #8B5CF6'
                    }}>
                      <h3 style={{ 
                        fontSize: '1.25rem', 
                        fontWeight: '600', 
                        color: 'var(--primary-dark)', 
                        marginBottom: '1rem' 
                      }}>
                        Modifiche alla policy
                      </h3>
                      <p style={{ color: 'var(--gray-700)' }}>
                        Ci riserviamo di aggiornare questa policy. In caso di modifiche rilevanti, ti informeremo via sito o email.
                      </p>
                    </div>

                  </div>
                </section>

                {/* Data ultimo aggiornamento */}
                <div style={{ 
                  textAlign: 'center', 
                  marginTop: '3rem',
                  paddingTop: '2rem',
                  borderTop: '1px solid var(--gray-200)'
                }}>
                  <p style={{ 
                    color: 'var(--gray-500)', 
                    fontSize: '0.875rem',
                    fontStyle: 'italic'
                  }}>
                    Last updated: 25 agosto 2025
                  </p>
                </div>

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
                  Hai domande sulla nostra Privacy Policy?
                </h3>
                <p style={{ 
                  color: 'var(--gray-600)', 
                  marginBottom: '1.5rem' 
                }}>
                  Contattami per qualsiasi chiarimento sul trattamento dei tuoi dati personali.
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
