import { Metadata } from 'next';
import { siteConfig } from '../../../config/site.config';
import ContactForm from '../../components/ContactForm';
// Footer provided by layout

export const metadata: Metadata = {
  title: `Contatti - ${siteConfig.name}`,
  description: 'Hai Excel che ti stanno rovinando la vita? Scrivimi. Prometto di non giudicarti (troppo). Consulenze, domande intelligenti e grida di aiuto accettate.',
  keywords: [...siteConfig.seo.keywords, 'contatti', 'contact', 'consulenza', 'vibe coding', 'intelligenza artificiale', 'risparmia tempo', 'risparmia soldi', 'intelligenza artificiale per over 35', 'impara l"intelligenza artificiale', 'automazioni aziendali', 'IA in azienda', 'AI in azienda', 'automazione'],
  openGraph: {
    title: `Contatti - ${siteConfig.name}`,
    description: 'Sono qui per aiutarti a rimetterti al passo con i tempi. Niente giudizi, solo soluzioni.',
    url: `${siteConfig.url}/contatti`,
    images: [siteConfig.seo.ogImage],
  },
};

export default function ContattiPage() {
  return (
    <>
      {/* Navigation provided by layout */}
      
      {/* Main Content */}
      <div style={{ padding: '2rem', background: 'var(--gray-50)' }}>
        <div className="services-container">
          <div style={{ 
            maxWidth: '1000px', 
            margin: '0 auto',
            backgroundColor: 'white',
            borderRadius: '12px',
            border: '1px solid var(--gray-100)',
            boxShadow: '0 2px 4px rgba(0, 0, 0, 0.05)',
            overflow: 'hidden'
          }}>
            {/* Header Section */}
            <div style={{ padding: '3rem 2rem', textAlign: 'center' }}>
              <div className="hero-badge" style={{ display: 'inline-block', marginBottom: '2rem' }}>
                📞 Contatti • Il Tuo SOS per l{''}Intelligenza Artificiale
              </div>
              <h1 className="hero-title" style={{ marginBottom: '1.5rem' }}>
                HAI BISOGNO DI AIUTO?
              </h1>
              <p className="hero-subtitle" style={{ maxWidth: '800px', margin: '0 auto 2rem' }}>
                Se ti lasci governare da fogli Excel di cui nessuno ricorda più l{''}origine, sei nel posto giusto. 
                Non ti giudicherò (troppo) per quella macro che crasha dal 2019.
              </p>
            </div>

            {/* Contact Methods */}
            <div style={{ padding: '2rem', borderTop: '1px solid var(--gray-100)' }}>
              <div className="services-header" style={{ textAlign: 'center', marginBottom: '3rem' }}>
                <h2 className="services-title">📬 COME RAGGIUNGERMI</h2>
                <p className="services-subtitle">Scegli il tuo canale preferito (ma per favore, ricorda che sono un essere umano anche io e ogni tanto dormo!)</p>
              </div>
              
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '2rem' }}>
                {/* Email */}
                <div style={{ 
                  padding: '2rem', 
                  backgroundColor: 'white', 
                  borderRadius: '12px', 
                  border: '1px solid var(--gray-100)', 
                  boxShadow: '0 2px 4px rgba(0, 0, 0, 0.05)',
                  textAlign: 'center'
                }}>
                  <div style={{ fontSize: '3rem', marginBottom: '1rem' }}>📧</div>
                  <h3 style={{ fontSize: '1.5rem', fontWeight: '700', color: 'var(--primary-dark)', marginBottom: '1rem' }}>
                    Email Professionale
                  </h3>
                  <p style={{ color: 'var(--gray-600)', marginBottom: '1.5rem', lineHeight: '1.6' }}>
                    Per proposte serie, domande intelligenti o grida di aiuto. 
                    Rispondo entro 24h (se non io, il mio avatar di sicuro!).
                  </p>
                  <a
                    href={`mailto:${siteConfig.author.email}`}
                    className="btn-primary"
                    style={{ display: 'inline-block' }}
                  >
                    {siteConfig.author.email}
                  </a>
                </div>

                {/* Social Media */}
                <div style={{ 
                  padding: '2rem', 
                  backgroundColor: 'white', 
                  borderRadius: '12px', 
                  border: '1px solid var(--gray-100)', 
                  boxShadow: '0 2px 4px rgba(0, 0, 0, 0.05)',
                  textAlign: 'center'
                }}>
                  <div style={{ fontSize: '3rem', marginBottom: '1rem' }}>🚀</div>
                  <h3 style={{ fontSize: '1.5rem', fontWeight: '700', color: 'var(--primary-dark)', marginBottom: '1rem' }}>
                    Social & Tutorial
                  </h3>
                  <p style={{ color: 'var(--gray-600)', marginBottom: '1.5rem', lineHeight: '1.6' }}>
                    Seguimi per tutorial, case study e applicazioni pratiche per l{''}azienda. 
                    Contenuti gratuiti che valgono più di molti corsi a pagamento.
                  </p>
                  <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center' }}>
                    {Object.entries(siteConfig.author.social).map(([platform, url]) => (
                      <a
                        key={platform}
                        href={url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="social-icon-link"
                        style={{
                          display: 'inline-flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          width: '48px',
                          height: '48px',
                          borderRadius: '50%',
                          textDecoration: 'none',
                          transition: 'all 0.3s ease',
                          fontSize: '1.5rem',
                          ...(platform === 'linkedin' && {
                            backgroundColor: '#0077B5',
                            color: 'white'
                          }),
                          ...(platform === 'youtube' && {
                            backgroundColor: '#FF0000',
                            color: 'white'
                          }),
                          ...(platform === 'facebook' && {
                            backgroundColor: '#1877F2',
                            color: 'white'
                          }),
                          ...(platform === 'instagram' && {
                            background: 'linear-gradient(45deg, #405DE6, #5851DB, #833AB4, #C13584, #E1306C, #FD1D1D)',
                            color: 'white'
                          })
                        }}
                      >
                        {platform === 'linkedin' && (
                          <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
                            <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                          </svg>
                        )}
                        {platform === 'youtube' && (
                          <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
                            <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
                          </svg>
                        )}
                        {platform === 'facebook' && (
                          <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
                            <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                          </svg>
                        )}
                        {platform === 'instagram' && (
                          <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
                            <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
                          </svg>
                        )}
                      </a>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* FAQ Section */}
            <div style={{ padding: '2rem', borderTop: '1px solid var(--gray-100)' }}>
              <div className="services-header" style={{ textAlign: 'center', marginBottom: '3rem' }}>
                <h2 className="services-title">❓ FAQ PRIMA DI SCRIVERMI</h2>
                <p className="services-subtitle">Le domande che mi fate sempre (e che dovreste leggere prima)</p>
              </div>
              
              <div style={{ display: 'grid', gridTemplateColumns: '1fr', gap: '1.5rem' }}>
                <div style={{ 
                  padding: '2rem', 
                  backgroundColor: 'white', 
                  borderRadius: '12px', 
                  border: '1px solid var(--gray-100)', 
                  boxShadow: '0 2px 4px rgba(0, 0, 0, 0.05)',
                  borderLeft: '4px solid var(--primary-blue)'
                }}>
                  <h3 style={{ fontSize: '1.25rem', fontWeight: '700', color: 'var(--primary-dark)', marginBottom: '1rem' }}>
                    💰 {"Quanto costa?"}
                  </h3>
                  <p style={{ color: 'var(--gray-700)', lineHeight: '1.6', marginBottom: '1rem' }}>
                    Dipende. Eliminare un Excel che gestisce 3 prodotti è diverso da automatizzare un centro ottico da 1M€. 
                    Scrivetemi il vostro problema e vi farò un preventivo onesto.
                  </p>
                  <p style={{ color: 'var(--gray-600)', fontSize: '0.875rem', fontStyle: 'italic' }}>
                    (Spoiler: costa meno di quello che perdete in tempo e errori ogni mese)
                  </p>
                </div>

                <div style={{ 
                  padding: '2rem', 
                  backgroundColor: 'white', 
                  borderRadius: '12px', 
                  border: '1px solid var(--gray-100)', 
                  boxShadow: '0 2px 4px rgba(0, 0, 0, 0.05)',
                  borderLeft: '4px solid var(--accent-orange)'
                }}>
                  <h3 style={{ fontSize: '1.25rem', fontWeight: '700', color: 'var(--primary-dark)', marginBottom: '1rem' }}>
                    ⏰ {"Quanto ci vuole?"}
                  </h3>
                  <p style={{ color: 'var(--gray-700)', lineHeight: '1.6', marginBottom: '1rem' }}>
                    Di solito 2-4 settimane per sistemi completi. Ma ho già visto aziende risparmiarsi 15 ore a settimana 
                    dal primo giorno di implementazione.
                  </p>
                  <p style={{ color: 'var(--gray-600)', fontSize: '0.875rem', fontStyle: 'italic' }}>
                    (Molto meno di quanto ci avete messo a incasinarvi con Excel)
                  </p>
                </div>

                <div style={{ 
                  padding: '2rem', 
                  backgroundColor: 'white', 
                  borderRadius: '12px', 
                  border: '1px solid var(--gray-100)', 
                  boxShadow: '0 2px 4px rgba(0, 0, 0, 0.05)',
                  borderLeft: '4px solid #10B981'
                }}>
                  <h3 style={{ fontSize: '1.25rem', fontWeight: '700', color: 'var(--primary-dark)', marginBottom: '1rem' }}>
                    🤖 {"Non capisco niente di tecnologia..."}
                  </h3>
                  <p style={{ color: 'var(--gray-700)', lineHeight: '1.6', marginBottom: '1rem' }}>
                    Perfetto! Sono specializzato nel tradurre il {"tecnichese"} in italiano comprensibile. 
                    Se sapete usare WhatsApp, sapete usare i miei sistemi.
                  </p>
                  <p style={{ color: 'var(--gray-600)', fontSize: '0.875rem', fontStyle: 'italic' }}>
                    (Ho clienti che hanno imparato tutto in 30 minuti. Promesso.)
                  </p>
                </div>

                <div style={{ 
                  padding: '2rem', 
                  backgroundColor: 'white', 
                  borderRadius: '12px', 
                  border: '1px solid var(--gray-100)', 
                  boxShadow: '0 2px 4px rgba(0, 0, 0, 0.05)',
                  borderLeft: '4px solid #8B5CF6'
                }}>
                  <h3 style={{ fontSize: '1.25rem', fontWeight: '700', color: 'var(--primary-dark)', marginBottom: '1rem' }}>
                    🔒 {"I nostri dati sono sicuri?"}
                  </h3>
                  <p style={{ color: 'var(--gray-700)', lineHeight: '1.6', marginBottom: '1rem' }}>
                    Più sicuri che su Excel. I sistemi che creo hanno backup automatici, controlli di accesso, 
                    e non crashano se qualcuno preme F1 per sbaglio.
                  </p>
                  <p style={{ color: 'var(--gray-600)', fontSize: '0.875rem', fontStyle: 'italic' }}>
                    (E soprattutto, non rischiate più di perdere tutto per un {"salva con nome"} fatto al momento sbagliato)
                  </p>
                </div>
              </div>
            </div>

            {/* Contact Form Section */}
            <div style={{ padding: '3rem 2rem', borderTop: '1px solid var(--gray-100)' }}>
              <div className="services-header" style={{ textAlign: 'center', marginBottom: '3rem' }}>
                <h2 className="services-title">📝 SCRIVIMI DIRETTAMENTE</h2>
                <p className="services-subtitle">Compila il form qui sotto e ti risponderò il prima possibile</p>
              </div>

              <ContactForm />
            </div>

            {/* Contact CTA */}
            <div style={{ padding: '3rem 2rem', textAlign: 'center', borderTop: '1px solid var(--gray-100)', background: 'var(--gray-50)' }}>
              <h2 style={{ fontSize: '2rem', fontWeight: '700', color: 'var(--primary-dark)', marginBottom: '1rem' }}>
                Pronto a venire nel nuovo millennio? 🚀
              </h2>
              <p style={{ color: 'var(--gray-600)', fontSize: '1.125rem', marginBottom: '2rem', maxWidth: '600px', margin: '0 auto 2rem' }}>
                Non rimandare più. Ogni giorno che passa è un giorno di tempo e soldi persi. 
                Scrivimi ora e iniziamo a sistemare le cose.
              </p>
              <p style={{ color: 'var(--gray-500)', fontSize: '0.875rem' }}>
                Preferisci l{''}email diretta? 
                <a
                  href={`mailto:${siteConfig.author.email}?subject=Aiuto!%20Ho%20bisogno%20di%20eliminare%20Excel&body=Ciao%20Timoteo,%0A%0AHo%20letto%20la%20tua%20pagina%20contatti%20e%20ho%20bisogno%20del%20tuo%20aiuto.%0A%0AIl%20mio%20problema%20con%20Excel%20è:%0A[descrivi%20qui%20il%20tuo%20problema]%0A%0ALa%20mia%20azienda%20è:%0A[nome%20azienda%20e%20settore]%0A%0AGrazie!`}
                  style={{ color: 'var(--primary-blue)', textDecoration: 'underline', marginLeft: '0.5rem' }}
                >
                  Clicca qui per aprire il client email
                </a>
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Footer provided by layout */}
    </>
  );
}
