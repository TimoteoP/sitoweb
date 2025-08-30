import { Metadata } from 'next';
import { siteConfig } from '../../config/site.config';

export const metadata: Metadata = {
  title: siteConfig.title,
  description: siteConfig.description,
  keywords: siteConfig.seo.keywords,
  authors: [{ name: siteConfig.author.name }],
  openGraph: {
    title: siteConfig.title,
    description: siteConfig.description,
    url: siteConfig.url,
    images: [siteConfig.seo.ogImage],
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: siteConfig.title,
    description: siteConfig.description,
    images: [siteConfig.seo.ogImage],
  },
  alternates: {
    canonical: siteConfig.url,
  },
};

export default function HomePage() {
  return (
    <>
      {/* Navigation provided by layout */}

      {/* Hero Section */}
      <section className="hero">
        <div className="hero-container">
          <div className="hero-left">
            <div className="hero-badge">
              🔥 Addio Foglio Excel • Benvenuta IA
            </div>
            <h1 className="hero-title">
              Hai l&apos;Azienda invasa da fogli Excel?
            </h1>
            <p className="hero-subtitle">
              Sei alla 27esima versione definitiva bis di quel foglio Excel fondamentale?
              Tremi ad ogni aggiornamento di Windows?
              Usi macro ereditate che nessuno sa come funzionino?
              Finalmente qualcuno ha ascoltato le tue grida d&apos;aiuto! Ti porto da un labirinto di fogli excel ad un sistema unico, sicuro e automatizzato in 30 giorni.
            </p>
            <div className="hero-buttons">
              <a href="#caso-studio" className="btn-primary">Scarica il caso studio completo</a>
              <a href="#metodo" className="btn-secondary">Scopri il Metodo</a>
            </div>
            <div className="hero-features">
              <div className="hero-feature">
                <span className="feature-icon">✅</span>
                <span className="feature-text">Applicabile ad ogni tipo di attività</span>
              </div>
              <div className="hero-feature">
                <span className="feature-icon">📊</span>
                <span className="feature-text">Creato su misura</span>
              </div>
              <div className="hero-feature">
                <span className="feature-icon">🔧</span>
                <span className="feature-text">Lo sviluppiamo assieme</span>
              </div>
            </div>
          </div>
          <div className="hero-right">
            <div className="excel-mockup">
              <div className="excel-header">
                <span className="excel-filename">📊 Gestionale_2025_FINALE_v3_DEFINITIVO_davvero.xlsx</span>
                <div className="window-controls">
                  <span className="control-red"></span>
                  <span className="control-yellow"></span>
                  <span className="control-green"></span>
                </div>
              </div>
              <div className="excel-ribbon">
                <span>Home</span>
                <span>Inserisci</span>
                <span>Formule</span>
                <span>Dati</span>
                <span>Revisione</span>
                <span>Visualizza</span>
              </div>
              <div className="excel-formula-bar">
                <span className="formula-icon">fx</span>
                <span>=SE(CERCA.VERT(A2;Database!$A:$Z;3;FALSO())&gt;0;SOMMA(B2:B999);&quot;Errore&quot;)</span>
              </div>
              <div className="excel-grid">
                {/* Headers */}
                <div className="cell cell-header"></div>
                <div className="cell cell-header">A</div>
                <div className="cell cell-header">B</div>
                <div className="cell cell-header">C</div>
                <div className="cell cell-header">D</div>
                <div className="cell cell-header">E</div>
                <div className="cell cell-header">F</div>
                
                {/* Row 1 */}
                <div className="cell cell-header">1</div>
                <div className="cell">Cliente</div>
                <div className="cell">Fatturato</div>
                <div className="cell">Margine</div>
                <div className="cell cell-error">#RIF!</div>
                <div className="cell">Scadenza</div>
                <div className="cell cell-error">#NOME?</div>
                
                {/* Row 2 */}
                <div className="cell cell-header">2</div>
                <div className="cell">Ottica Rossi</div>
                <div className="cell">€ 987.650</div>
                <div className="cell cell-error">#DIV/0!</div>
                <div className="cell">28%</div>
                <div className="cell">31/12/2024</div>
                <div className="cell cell-error">######</div>
                
                {/* Row 3 */}
                <div className="cell cell-header">3</div>
                <div className="cell">Studio Bianchi</div>
                <div className="cell cell-error">#VALORE!</div>
                <div className="cell">€ 45.230</div>
                <div className="cell">12%</div>
                <div className="cell cell-error">#####</div>
                <div className="cell">Errore</div>
                
                {/* Row 4 */}
                <div className="cell cell-header">4</div>
                <div className="cell">Dr. Verdi</div>
                <div className="cell">€ 156.890</div>
                <div className="cell">35%</div>
                <div className="cell cell-error">#N/D</div>
                <div className="cell">15/01/2025</div>
                <div className="cell cell-error">#RIF!</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Il Metodo Section */}
      <section className="metodo-section" id="metodo">
        <div className="metodo-container">
          <div className="metodo-header">
            <h2 className="metodo-title">Il Metodo in 6 Step</h2>
            <p className="metodo-subtitle">
              Come trasformare un&apos;accozzaglia di fogli Excel in un sistema integrato, stabile ed efficiente.
            </p>
          </div>
          
          <div className="metodo-grid">
            <div className="metodo-step">
              <div className="step-number">1</div>
              <h3>Analisi del Caos</h3>
              <p>Mappiamo tutti i processi nascosti nei tuoi Excel. Ogni formula, ogni collegamento, ogni automazione mancata.</p>
            </div>
            
            <div className="metodo-step">
              <div className="step-number">2</div>
              <h3>Progettazione Intelligente</h3>
              <p>L&apos;IA diventa il tuo architetto software. Definiamo insieme la struttura perfetta per il tuo business.</p>
            </div>
            
            <div className="metodo-step">
              <div className="step-number">3</div>
              <h3>Sviluppo Guidato</h3>
              <p>Claude e ChatGPT (o gli LLM che sceglieremo al momento) scrivono il codice. Tu supervisioni. Nessuna programmazione richiesta.</p>
            </div>
            
            <div className="metodo-step">
              <div className="step-number">4</div>
              <h3>Test e Ottimizzazione</h3>
              <p>Sistema testato sul campo con i tuoi dati reali. Aggiustamenti in tempo reale fino alla perfezione.</p>
            </div>
            
            <div className="metodo-step">
              <div className="step-number">5</div>
              <h3>Formazione e Adozione</h3>
              <p>Il tuo team impara in ore, non settimane. Supporto continuo per la transizione.</p>
            </div>
            
            <div className="metodo-step">
              <div className="step-number">6</div>
              <h3>Libertà Totale</h3>
              <p>Sei autonomo. Puoi modificare, espandere, migliorare quando vuoi, senza dipendere da nessuno.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section className="services" id="servizi">
        <div className="services-container">
          <div className="services-header">
            <h2 className="services-title">3 Percorsi per la tua Trasformazione</h2>
            <p className="services-subtitle">Scegli come entrare nel Futuro</p>
          </div>
          
          <div className="services-grid">
            {/* IMPARA Card */}
            <div className="service-card">
              <div className="service-icon">🎓</div>
              <h3 className="service-title">Impara</h3>
              <p className="service-description">
                Diventa autonomo nella creazione di sistemi automatizzati. 
                Il Metodo completo che ho usato per il centro ottico, spiegato passo dopo passo.
              </p>
              <ul className="service-features">
                <li>Metodo testato su business reali</li>
                <li>Zero programmazione richiesta</li>
                <li>Supporto continuo incluso</li>
                <li>Risultati in 30 giorni</li>
              </ul>
              <a href="#" className="service-cta">Scopri il Metodo</a>
            </div>

            {/* USA Card */}
            <div className="service-card">
              <div className="service-icon">🚀</div>
              <h3 className="service-title">Utilizza</h3>
              <p className="service-description">
                Soluzioni pronte all&apos;uso per i problemi più comuni di ogni imprenditore o professionista.
                App testate e ottimizzate per la realtà italiana che fanno risparmiare tempo e denaro.
              </p>
              <ul className="service-features">
                <li>Gestione email intelligente</li>
                <li>Fatturazione automatica</li>
                <li>Organizzazione clienti</li>
                <li>Report automatici</li>
              </ul>
              <a href="#" className="service-cta">Prova gratuitamente</a>
            </div>

            {/* CRESCI Card */}
            <div className="service-card">
              <div className="service-icon">📈</div>
              <h3 className="service-title">Cresci</h3>
              <p className="service-description">
                Padroneggia il marketing moderno con l&apos;aiuto dei migliori esperti virtuali.
                Formazione continua iper-efficace adattata al tuo business.
              </p>
              <ul className="service-features">
                <li>I Giganti del marketing sempre disponibili</li>
                <li>Strategie personalizzate</li>
                <li>Applicazione pratica immediata</li>
                <li>Aggiornamenti continui</li>
              </ul>
              <a href="#" className="service-cta">Inizia a crescere</a>
            </div>
          </div>
        </div>
      </section>

      {/* Newsletter Section */}
      <section className="newsletter-section" id="newsletter">
        <div className="newsletter-container">
          <h2 className="newsletter-title">Scarica il Case Study Completo</h2>
          <p className="newsletter-description">
            Come un&apos;ottica da 1M€ ha eliminato tutti i fogli Excel in 30 giorni: numeri, processo e risultati
          </p>
          <form className="newsletter-form" id="newsletterForm">
            <input type="email" className="newsletter-input" placeholder="La tua email" required />
            <div className="privacy-checkbox">
              <input type="checkbox" id="privacy-accept" required />
              <label htmlFor="privacy-accept">
                Accetto la <a href="/privacy-policy" target="_blank">Privacy Policy</a> e acconsento al trattamento dei miei dati personali
              </label>
            </div>
            <button type="submit" className="newsletter-button">Ricevi il Caso Studio</button>
          </form>     
        </div>
      </section>

      {/* Footer provided by layout */}
    </>
  );
}
