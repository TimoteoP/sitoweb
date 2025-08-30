import { Metadata } from 'next';
import { siteConfig } from '../../../config/site.config';
// Footer provided by layout

export const metadata: Metadata = {
  title: `Chi Sono - ${siteConfig.name}`,
  description: 'Il tuo traghettatore dai fogli Excel al nuovo millennio. Marketing Automation Specialist & Excel Terminator con oltre 127 Excel eliminati.',
  keywords: [...siteConfig.seo.keywords, 'chi sono', 'about', 'biografia', 'experience'],
  openGraph: {
    title: `Chi Sono - ${siteConfig.name}`,
    description: 'Il tuo traghettatore dai fogli Excel al nuovo millennio',
    url: `${siteConfig.url}/chi-sono`,
    images: [siteConfig.seo.ogImage],
  },
};

export default function ChiSonoPage() {
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
                👨‍💻 Chi Sono • Il Tuo Excel Terminator
              </div>
              <h1 className="hero-title" style={{ marginBottom: '1.5rem' }}>
                TIMOTEO PASQUALI
              </h1>
              <p className="hero-subtitle" style={{ maxWidth: '800px', margin: '0 auto 2rem' }}>
                Marketing Automation Specialist & Excel Terminator. 
                Il tuo traghettatore dai fogli Excel al nuovo millennio.
                Oltre 127 Excel eliminati e contando...
              </p>
              
              {/* Stats */}
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(150px, 1fr))', gap: '1rem', marginTop: '2rem' }}>
                <div className="hero-feature" style={{ flexDirection: 'column', padding: '1rem' }}>
                  <span style={{ fontSize: '2rem', fontWeight: 'bold', color: 'var(--primary-blue)' }}>127</span>
                  <span className="feature-text">Excel Eliminati</span>
                </div>
                <div className="hero-feature" style={{ flexDirection: 'column', padding: '1rem' }}>
                  <span style={{ fontSize: '2rem', fontWeight: 'bold', color: 'var(--primary-blue)' }}>1.2M€</span>
                  <span className="feature-text">Fatturato Gestito</span>
                </div>
                <div className="hero-feature" style={{ flexDirection: 'column', padding: '1rem' }}>
                  <span style={{ fontSize: '2rem', fontWeight: 'bold', color: 'var(--primary-blue)' }}>30</span>
                  <span className="feature-text">Giorni per Sistema</span>
                </div>
                <div className="hero-feature" style={{ flexDirection: 'column', padding: '1rem' }}>
                  <span style={{ fontSize: '2rem', fontWeight: 'bold', color: 'var(--primary-blue)' }}>0</span>
                  <span className="feature-text">Righe di Codice</span>
                </div>
              </div>
            </div>

            {/* Experience Section */}
            <div style={{ padding: '2rem', borderTop: '1px solid var(--gray-100)' }}>
              <div className="services-header" style={{ textAlign: 'center', marginBottom: '3rem' }}>
                <h2 className="services-title">💼 ESPERIENZA PROFESSIONALE</h2>
                <p className="services-subtitle">Quella vera, non le buzzword</p>
              </div>
              
              <div style={{ display: 'grid', gridTemplateColumns: '1fr', gap: '1.5rem' }}>
                {/* Current Role */}
                <div style={{ 
                  padding: '2rem', 
                  backgroundColor: 'white', 
                  borderRadius: '12px', 
                  border: '1px solid var(--gray-100)', 
                  boxShadow: '0 2px 4px rgba(0, 0, 0, 0.05)',
                  borderLeft: '4px solid var(--primary-blue)'
                }}>
                  <div style={{ fontSize: '0.875rem', color: 'var(--gray-500)', marginBottom: '1rem' }}>2024 - Presente</div>
                  <h3 style={{ fontSize: '1.5rem', fontWeight: '700', color: 'var(--primary-dark)', marginBottom: '0.5rem' }}>
                    Chief Excel Elimination Officer
                  </h3>
                  <p style={{ fontWeight: '600', color: 'var(--gray-600)', marginBottom: '1rem' }}>La mia missione personale</p>
                  <p style={{ color: 'var(--gray-700)', marginBottom: '1.5rem', lineHeight: '1.6' }}>
                    Mi sono stancato di vedere imprenditori di successo prigionieri di fogli Excel del 2003. 
                    Ora li libero, uno alla volta.
                  </p>
                  <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
                    <li style={{ display: 'flex', alignItems: 'flex-start', gap: '0.75rem', marginBottom: '0.75rem' }}>
                      <span style={{ color: 'var(--accent-orange)', fontWeight: 'bold' }}>→</span>
                      <span style={{ color: 'var(--gray-700)' }}>Salvato un{''}ottica da 1M€ di fatturato dal suicidio da Excel multiplo</span>
                    </li>
                    <li style={{ display: 'flex', alignItems: 'flex-start', gap: '0.75rem', marginBottom: '0.75rem' }}>
                      <span style={{ color: 'var(--accent-orange)', fontWeight: 'bold' }}>→</span>
                      <span style={{ color: 'var(--gray-700)' }}>Terapista per professionisti con PTSD da #RIF!</span>
                    </li>
                    <li style={{ display: 'flex', alignItems: 'flex-start', gap: '0.75rem', marginBottom: '0.75rem' }}>
                      <span style={{ color: 'var(--accent-orange)', fontWeight: 'bold' }}>→</span>
                      <span style={{ color: 'var(--gray-700)' }}>Traduttore simultaneo per Boomers</span>
                    </li>
                    <li style={{ display: 'flex', alignItems: 'flex-start', gap: '0.75rem', marginBottom: '0.75rem' }}>
                      <span style={{ color: 'var(--accent-orange)', fontWeight: 'bold' }}>→</span>
                      <span style={{ color: 'var(--gray-700)' }}>Curiosità: questo sito? Fatto con l{''}IA in meno di 4 ore</span>
                    </li>
                  </ul>
                </div>

                {/* Previous Role */}
                <div style={{ 
                  padding: '2rem', 
                  backgroundColor: 'white', 
                  borderRadius: '12px', 
                  border: '1px solid var(--gray-100)', 
                  boxShadow: '0 2px 4px rgba(0, 0, 0, 0.05)',
                  borderLeft: '4px solid var(--gray-300)'
                }}>
                  <div style={{ fontSize: '0.875rem', color: 'var(--gray-500)', marginBottom: '1rem' }}>2020 - 2024</div>
                  <h3 style={{ fontSize: '1.5rem', fontWeight: '700', color: 'var(--primary-dark)', marginBottom: '0.5rem' }}>
                    Marketing Consultant Tradizionale
                  </h3>
                  <p style={{ fontWeight: '600', color: 'var(--gray-600)', marginBottom: '1rem' }}>Piccole Realtà Locali</p>
                  <p style={{ color: 'var(--gray-700)', marginBottom: '1.5rem', lineHeight: '1.6' }}>
                    Facevo consulenza marketing {"alla vecchia maniera"}. Funzionava, ma vedevo tutti 
                    impantanati negli stessi problemi: processi manuali, dati raccolti prossimi allo 0, tempo sprecato.
                    Poi ho scoperto che l{''}IA poteva risolvere tutto questo. Game changer.
                  </p>
                  <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
                    <li style={{ display: 'flex', alignItems: 'flex-start', gap: '0.75rem', marginBottom: '0.75rem' }}>
                      <span style={{ color: 'var(--accent-orange)', fontWeight: 'bold' }}>→</span>
                      <span style={{ color: 'var(--gray-700)' }}>Gestito campagne per oltre 25 realtà locali</span>
                    </li>
                    <li style={{ display: 'flex', alignItems: 'flex-start', gap: '0.75rem', marginBottom: '0.75rem' }}>
                      <span style={{ color: 'var(--accent-orange)', fontWeight: 'bold' }}>→</span>
                      <span style={{ color: 'var(--gray-700)' }}>Creato strategie che ancora oggi funzionano</span>
                    </li>
                    <li style={{ display: 'flex', alignItems: 'flex-start', gap: '0.75rem', marginBottom: '0.75rem' }}>
                      <span style={{ color: 'var(--accent-orange)', fontWeight: 'bold' }}>→</span>
                      <span style={{ color: 'var(--gray-700)' }}>Capito che il problema non era solo il marketing, ma l{''}organizzazione e la vendita</span>
                    </li>
                  </ul>
                </div>

                {/* Pre-history */}
                <div style={{ 
                  padding: '2rem', 
                  backgroundColor: 'white', 
                  borderRadius: '12px', 
                  border: '1px solid var(--gray-100)', 
                  boxShadow: '0 2px 4px rgba(0, 0, 0, 0.05)',
                  borderLeft: '4px solid var(--gray-200)'
                }}>
                  <div style={{ fontSize: '0.875rem', color: 'var(--gray-500)', marginBottom: '1rem' }}>Prima del 2020</div>
                  <h3 style={{ fontSize: '1.5rem', fontWeight: '700', color: 'var(--primary-dark)', marginBottom: '0.5rem' }}>
                    La Preistoria
                  </h3>
                  <p style={{ fontWeight: '600', color: 'var(--gray-600)', marginBottom: '1rem' }}>Il mondo prima dell{''}illuminazione</p>
                  <p style={{ color: 'var(--gray-700)', lineHeight: '1.6' }}>
                    Anche io usavo Excel. Lo ammetto. Avevo perfino delle macro. 
                    Che crashavano ogni martedì. Non ne parlo volentieri.
                  </p>
                </div>
              </div>
            </div>

            {/* Skills Section */}
            <div style={{ padding: '2rem', borderTop: '1px solid var(--gray-100)' }}>
              <div className="services-header" style={{ textAlign: 'center', marginBottom: '3rem' }}>
                <h2 className="services-title">🛠️ COMPETENZE</h2>
                <p className="services-subtitle">Quelle che contano davvero</p>
              </div>
              
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(400px, 1fr))', gap: '2rem' }}>
                {/* Hard Skills */}
                <div style={{ 
                  padding: '2rem', 
                  backgroundColor: 'white', 
                  borderRadius: '12px', 
                  border: '1px solid var(--gray-100)', 
                  boxShadow: '0 2px 4px rgba(0, 0, 0, 0.05)'
                }}>
                  <h3 style={{ fontSize: '1.25rem', fontWeight: '700', color: 'var(--primary-dark)', marginBottom: '1.5rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                    🔥 Hard Skills
                  </h3>
                  <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
                    {[
                      "Domatore certificato di ChatGPT e Claude",
                      "Excel-orcista (so come eliminarli definitivamente)",
                      "Creatore di sistemi che non crashano e non temono gli aggiornamenti",
                      "Architetto di automazioni che funzionano",
                      "Debugger di processi aziendali incasinati"
                    ].map((skill, index) => (
                      <li key={index} style={{ display: 'flex', alignItems: 'flex-start', gap: '0.75rem', marginBottom: '0.75rem' }}>
                        <span style={{ color: 'var(--primary-blue)', fontWeight: 'bold' }}>✓</span>
                        <span style={{ color: 'var(--gray-700)' }}>{skill}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Soft Skills */}
                <div style={{ 
                  padding: '2rem', 
                  backgroundColor: 'white', 
                  borderRadius: '12px', 
                  border: '1px solid var(--gray-100)', 
                  boxShadow: '0 2px 4px rgba(0, 0, 0, 0.05)'
                }}>
                  <h3 style={{ fontSize: '1.25rem', fontWeight: '700', color: 'var(--primary-dark)', marginBottom: '1.5rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                    💡 Soft Skills
                  </h3>
                  <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
                    {[
                      "Parlo fluentemente la lingua degli over 40",
                      "Traduco il tecnichese in italiano comprensibile",
                      "Pazienza infinita con {\"il computer non va\"}",
                      "Capacità di spiegare l{''}IA senza spaventare",
                      "Empatia per chi ha 47 password su post-it appiccicati allo schermo"
                    ].map((skill, index) => (
                      <li key={index} style={{ display: 'flex', alignItems: 'flex-start', gap: '0.75rem', marginBottom: '0.75rem' }}>
                        <span style={{ color: 'var(--primary-blue)', fontWeight: 'bold' }}>✓</span>
                        <span style={{ color: 'var(--gray-700)' }}>{skill}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>

            {/* Languages Section */}
            <div style={{ padding: '2rem', borderTop: '1px solid var(--gray-100)' }}>
              <div className="services-header" style={{ textAlign: 'center', marginBottom: '3rem' }}>
                <h2 className="services-title">🌍 LINGUE PARLATE</h2>
                <p className="services-subtitle">E qualche altra skill tecnica</p>
              </div>
              
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '1.5rem' }}>
                <div style={{ 
                  display: 'flex', 
                  alignItems: 'center', 
                  justifyContent: 'space-between', 
                  padding: '1.5rem', 
                  backgroundColor: 'white', 
                  borderRadius: '12px', 
                  border: '1px solid var(--gray-100)', 
                  boxShadow: '0 2px 4px rgba(0, 0, 0, 0.05)'
                }}>
                  <span style={{ fontWeight: '600', color: 'var(--primary-dark)' }}>🇮🇹 Italiano</span>
                  <span style={{ 
                    backgroundColor: '#dcfce7', 
                    color: '#166534', 
                    padding: '0.5rem 1rem', 
                    borderRadius: '20px', 
                    fontSize: '0.875rem', 
                    fontWeight: '600'
                  }}>Madrelingua</span>
                </div>
                <div style={{ 
                  display: 'flex', 
                  alignItems: 'center', 
                  justifyContent: 'space-between', 
                  padding: '1.5rem', 
                  backgroundColor: 'white', 
                  borderRadius: '12px', 
                  border: '1px solid var(--gray-100)', 
                  boxShadow: '0 2px 4px rgba(0, 0, 0, 0.05)'
                }}>
                  <span style={{ fontWeight: '600', color: 'var(--primary-dark)' }}>🇬🇧 Inglese</span>
                  <span style={{ 
                    backgroundColor: '#dbeafe', 
                    color: '#1e40af', 
                    padding: '0.5rem 1rem', 
                    borderRadius: '20px', 
                    fontSize: '0.875rem', 
                    fontWeight: '600'
                  }}>Fluente</span>
                </div>
                <div style={{ 
                  display: 'flex', 
                  alignItems: 'center', 
                  justifyContent: 'space-between', 
                  padding: '1.5rem', 
                  backgroundColor: 'white', 
                  borderRadius: '12px', 
                  border: '1px solid var(--gray-100)', 
                  boxShadow: '0 2px 4px rgba(0, 0, 0, 0.05)'
                }}>
                  <span style={{ fontWeight: '600', color: 'var(--primary-dark)' }}>📊 Excel</span>
                  <span style={{ 
                    backgroundColor: '#fee2e2', 
                    color: '#dc2626', 
                    padding: '0.5rem 1rem', 
                    borderRadius: '20px', 
                    fontSize: '0.875rem', 
                    fontWeight: '600'
                  }}>Preferisco evitare</span>
                </div>
                <div style={{ 
                  display: 'flex', 
                  alignItems: 'center', 
                  justifyContent: 'space-between', 
                  padding: '1.5rem', 
                  backgroundColor: 'white', 
                  borderRadius: '12px', 
                  border: '1px solid var(--gray-100)', 
                  boxShadow: '0 2px 4px rgba(0, 0, 0, 0.05)'
                }}>
                  <span style={{ fontWeight: '600', color: 'var(--primary-dark)' }}>🤖 Prompt Engineering</span>
                  <span style={{ 
                    backgroundColor: '#f3e8ff', 
                    color: '#7c2d12', 
                    padding: '0.5rem 1rem', 
                    borderRadius: '20px', 
                    fontSize: '0.875rem', 
                    fontWeight: '600'
                  }}>Nativo digitale</span>
                </div>
              </div>
            </div>

            {/* Testimonials */}
            <div style={{ padding: '2rem', borderTop: '1px solid var(--gray-100)' }}>
              <div className="services-header" style={{ textAlign: 'center', marginBottom: '3rem' }}>
                <h2 className="services-title">⭐ REFERENZE</h2>
                <p className="services-subtitle">Non richieste, ma arrivate</p>
              </div>
              
              <div style={{ display: 'grid', gridTemplateColumns: '1fr', gap: '2rem' }}>
                {[
                  {
                    text: "Mi ha letteralmente salvato l{''}azienda. Passavamo 3 ore al giorno su Excel, ora 30 minuti sul suo sistema. Il resto del tempo? Vendiamo.",
                    author: "Marco R.",
                    role: "Titolare Centro Ottico - Milano"
                  },
                  {
                    text: "Finalmente uno che parla la nostra lingua! Niente paroloni tecnici, solo soluzioni che funzionano. E soprattutto: addio #RIF!",
                    author: "Laura B.",
                    role: "Studio Commercialista - Bergamo"
                  },
                  {
                    text: "Ero scettico sull{''}IA, pensavo fosse roba da ragazzini. Timoteo mi ha dimostrato che anche un boomer può domarla.",
                    author: "Giuseppe T.",
                    role: "Imprenditore 58enne - Brescia"
                  }
                ].map((testimonial, index) => (
                  <div key={index} style={{ 
                    padding: '2rem', 
                    backgroundColor: 'white', 
                    borderRadius: '12px', 
                    border: '1px solid var(--gray-100)', 
                    boxShadow: '0 2px 4px rgba(0, 0, 0, 0.05)',
                    borderLeft: '4px solid var(--accent-orange)'
                  }}>
                    <p style={{ 
                      color: 'var(--gray-700)', 
                      fontStyle: 'italic', 
                      fontSize: '1.125rem', 
                      lineHeight: '1.7', 
                      marginBottom: '1.5rem' 
                    }}>
                      {'"'}{testimonial.text}{'"'}
                    </p>
                    <div>
                      <div style={{ fontWeight: '600', color: 'var(--primary-dark)', marginBottom: '0.25rem' }}>
                        {testimonial.author}
                      </div>
                      <div style={{ fontSize: '0.875rem', color: 'var(--gray-500)' }}>
                        {testimonial.role}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Contact Section */}
            <div style={{ padding: '2rem', borderTop: '1px solid var(--gray-100)', textAlign: 'center' }}>
              <div className="services-header" style={{ marginBottom: '3rem' }}>
                <h2 className="services-title">
                  Vuoi risparmiare tempo, soldi e grattacapi?
                </h2>
                <p className="services-subtitle">
                  Scegli come preferisci contattarmi o seguirmi
                </p>
              </div>
              
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '2rem', maxWidth: '800px', margin: '0 auto' }}>
                {/* Email */}
                <div style={{ 
                  padding: '2rem', 
                  backgroundColor: 'white', 
                  borderRadius: '12px', 
                  border: '1px solid var(--gray-100)', 
                  boxShadow: '0 2px 4px rgba(0, 0, 0, 0.05)'
                }}>
                  <h3 style={{ fontWeight: '700', color: 'var(--primary-dark)', marginBottom: '1rem' }}>📧 Scriviamoci</h3>
                  <p style={{ color: 'var(--gray-600)', fontSize: '0.875rem', marginBottom: '1.5rem' }}>
                    Per proposte serie, domande intelligenti o grida di aiuto da Excel
                  </p>
                  <a
                    href={`mailto:${siteConfig.author.email}`}
                    className="btn-primary"
                    style={{ display: 'inline-block' }}
                  >
                    Invia Email
                  </a>
                </div>

                {/* Social */}
                <div style={{ 
                  padding: '2rem', 
                  backgroundColor: 'white', 
                  borderRadius: '12px', 
                  border: '1px solid var(--gray-100)', 
                  boxShadow: '0 2px 4px rgba(0, 0, 0, 0.05)'
                }}>
                  <h3 style={{ fontWeight: '700', color: 'var(--primary-dark)', marginBottom: '1rem' }}>🚀 Seguimi</h3>
                  <p style={{ color: 'var(--gray-600)', fontSize: '0.875rem', marginBottom: '1.5rem' }}>
                    Tutorial, case study e demolizioni di Excel in diretta
                  </p>
                  <div style={{ display: 'flex', flexWrap: 'wrap', gap: '1rem', justifyContent: 'center' }}>
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
          </div>
        </div>
      </div>

      {/* Footer provided by layout */}
    </>
  );
}
