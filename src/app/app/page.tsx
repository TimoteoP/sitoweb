import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'App - Timoteo Pasquali',
  description: 'Scopri le app che ho sviluppato per semplificare i processi aziendali. Alcune gratuite, altre a pagamento.',
};

interface AppItem {
  title: string;
  description: string;
  category: string;
  price: 'Gratis' | 'A pagamento';
  link: string;
  status: 'Disponibile' | 'In sviluppo' | 'Presto disponibile';
}

const apps: AppItem[] = [
  {
    title: "Excel Killer - Data Processor",
    description: "Trasforma i tuoi fogli Excel in database intelligenti con automazione avanzata. Elimina errori manuali e velocizza l&apos;elaborazione dati del 300%.",
    category: "Gestione Dati",
    price: "Gratis",
    link: "https://gumroad.com/l/excel-killer-free",
    status: "Disponibile"
  },
  {
    title: "Invoice Generator Pro AI",
    description: "Sistema completo per fatturazione automatica con AI. Include: generazione smart, invio automatico, reminder pagamenti, integrazione contabilità.",
    category: "Amministrazione",
    price: "A pagamento",
    link: "https://gumroad.com/l/invoice-generator-pro",
    status: "Disponibile"
  },
  {
    title: "Lead Magnet Builder",
    description: "Crea landing page ad alta conversione e lead magnet in 5 minuti. Templates professionali, A/B testing integrato, analytics avanzati.",
    category: "Marketing",
    price: "Gratis",
    link: "https://gumroad.com/l/lead-magnet-free",
    status: "Disponibile"
  },
  {
    title: "Customer Journey Mapper AI",
    description: "Mappa automaticamente il customer journey dei tuoi clienti usando AI. Identifica punti di drop-off e ottimizza le conversioni.",
    category: "Analytics",
    price: "A pagamento",
    link: "https://gumroad.com/l/customer-journey-pro",
    status: "Disponibile"
  },
  {
    title: "Social Content Automator",
    description: "Genera e pubblica contenuti sui social usando ChatGPT. Include: calendario editoriale, hashtag optimizer, engagement tracker.",
    category: "Social Media",
    price: "A pagamento",
    link: "https://gumroad.com/l/social-automator",
    status: "Disponibile"
  },
  {
    title: "Email Sequence Builder",
    description: "Crea sequenze email automatiche ad alta conversione. Templates testati, personalizzazione AI, tracking avanzato.",
    category: "Email Marketing",
    price: "Gratis",
    link: "https://gumroad.com/l/email-sequence-free",
    status: "Disponibile"
  },
  {
    title: "Inventory Smart Manager",
    description: "Gestione intelligente delle scorte con previsioni AI. Riordino automatico, alert personalizzati, integrazione fornitori.",
    category: "Gestione Inventario",
    price: "A pagamento",
    link: "https://gumroad.com/l/inventory-manager-pro",
    status: "In sviluppo"
  },
  {
    title: "Task Automation Studio",
    description: "Suite completa per automatizzare qualsiasi processo aziendale. Drag & drop builder, integrazioni illimitate, AI assistant.",
    category: "Automazione",
    price: "A pagamento",
    link: "https://gumroad.com/l/automation-studio-pro",
    status: "Presto disponibile"
  },
  {
    title: "Website Speed Optimizer",
    description: "Tool gratuito per ottimizzare la velocità del tuo sito web. Analisi completa, suggerimenti actionable, monitoraggio continuo.",
    category: "Web Tools",
    price: "Gratis",
    link: "https://gumroad.com/l/speed-optimizer-free",
    status: "Disponibile"
  }
];

export default function AppPage() {
  const freeApps = apps.filter(app => app.price === 'Gratis');
  const paidApps = apps.filter(app => app.price === 'A pagamento');

  return (
    <div className="page-container">
      <div className="hero-section">
        <h1 className="hero-title">Le Mie App</h1>
        <p className="hero-subtitle">
          Soluzioni digitali innovative per automatizzare e semplificare i tuoi processi aziendali. 
          Esplora la mia collezione di app, alcune gratuite e altre premium.
        </p>
      </div>

      <div className="content-section">
        <div className="apps-intro">
          <h2>Innovazione Accessibile</h2>
          <p>
            Ogni app nasce dalla mia esperienza diretta nel risolvere problemi reali delle aziende. 
            Offro alcune soluzioni gratuitamente per supportare le piccole imprese, 
            mentre le app premium includono funzionalità avanzate e supporto dedicato.
          </p>
        </div>

        <div className="apps-section">
          <h2>🎁 App Gratuite</h2>
          <p className="section-subtitle">
            Strumenti potenti che puoi utilizzare subito, senza costi nascosti.
          </p>
          <div className="apps-grid">
            {freeApps.map((app, index) => (
              <div key={index} className="app-card">
                <div className="app-header">
                  <h3>{app.title}</h3>
                  <div className="app-meta">
                    <span className="app-category">{app.category}</span>
                    <span className={`app-status status-${app.status.toLowerCase().replace(' ', '-')}`}>
                      {app.status}
                    </span>
                  </div>
                </div>
                <p className="app-description">{app.description}</p>
                <div className="app-footer">
                  <span className="app-price free">Gratis</span>
                  <a href={app.link} className="app-link">
                    {app.status === 'Disponibile' ? 'Scarica' : 'Notificami'}
                  </a>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="apps-section">
          <h2>💎 App Premium</h2>
          <p className="section-subtitle">
            Soluzioni avanzate con funzionalità professionali e supporto dedicato.
          </p>
          <div className="apps-grid">
            {paidApps.map((app, index) => (
              <div key={index} className="app-card premium">
                <div className="app-header">
                  <h3>{app.title}</h3>
                  <div className="app-meta">
                    <span className="app-category">{app.category}</span>
                    <span className={`app-status status-${app.status.toLowerCase().replace(' ', '-')}`}>
                      {app.status}
                    </span>
                  </div>
                </div>
                <p className="app-description">{app.description}</p>
                <div className="app-footer">
                  <span className="app-price premium">Premium</span>
                  <a href={app.link} className="app-link premium">
                    {app.status === 'Disponibile' ? 'Acquista' : 'Pre-ordina'}
                  </a>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="custom-development">
          <h2>🛠️ Sviluppo su Misura</h2>
          <p>
            Non trovi l&apos;app che fa al caso tuo? Posso sviluppare una soluzione completamente 
            personalizzata per le tue esigenze specifiche.
          </p>
          <div className="custom-features">
            <ul>
              <li>Analisi dettagliata dei requisiti</li>
              <li>Sviluppo agile con feedback continuo</li>
              <li>Integrazioni con i tuoi sistemi esistenti</li>
              <li>Supporto e manutenzione inclusi</li>
              <li>Formazione del team</li>
            </ul>
          </div>
          <a href="/contatti" className="cta-button">
            Richiedi un Preventivo
          </a>
        </div>
      </div>
    </div>
  );
}