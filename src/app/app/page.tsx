import { Metadata } from 'next';
import AppDirectory from './AppDirectory';

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
  return (
    <div className="page-container">
      <div className="hero-section">
        <h1 className="hero-title">Le Mie App</h1>
        <p className="hero-subtitle">
          Soluzioni digitali innovative per automatizzare e semplificare i tuoi processi aziendali. 
          Esplora la mia collezione di app, alcune gratuite e altre premium.
        </p>
      </div>

      <AppDirectory apps={apps} />

      <div className="content-section">
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