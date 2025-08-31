import { Metadata } from 'next';
import AppDirectory from './AppDirectory';
import ContactCTA from '../../components/ContactCTA';

export const metadata: Metadata = {
  title: 'App - Timoteo Pasquali',
  description: 'Scopri le app che ho sviluppato per semplificare i processi aziendali. Alcune gratuite, altre a pagamento.',
};

interface AppItem {
  title: string;
  description: string;
  category: string;
  price: 'Free' | 'Premium';
  link: string;
  status: 'Disponibile' | 'In Sviluppo' | 'In Brainstorming';
}

const apps: AppItem[] = [
  {
    title: "Excel Killer - Data Processor",
    description: "Trasforma i tuoi fogli Excel in database intelligenti con automazione avanzata. Elimina errori manuali e velocizza l&apos;elaborazione dati del 300%.",
    category: "Gestione Dati",
    price: "Free",
    link: "https://gumroad.com/l/excel-killer-free",
    status: "Disponibile"
  },
  {
    title: "Invoice Generator Pro AI",
    description: "Sistema completo per fatturazione automatica con AI. Include: generazione smart, invio automatico, reminder pagamenti, integrazione contabilità.",
    category: "Amministrazione",
    price: "Premium",
    link: "https://gumroad.com/l/invoice-generator-pro",
    status: "Disponibile"
  },
  {
    title: "Lead Magnet Builder",
    description: "Crea landing page ad alta conversione e lead magnet in 5 minuti. Templates professionali, A/B testing integrato, analytics avanzati.",
    category: "Marketing",
    price: "Free",
    link: "https://gumroad.com/l/lead-magnet-free",
    status: "Disponibile"
  },
  {
    title: "Customer Journey Mapper AI",
    description: "Mappa automaticamente il customer journey dei tuoi clienti usando AI. Identifica punti di drop-off e ottimizza le conversioni.",
    category: "Analytics",
    price: "Premium",
    link: "https://gumroad.com/l/customer-journey-pro",
    status: "Disponibile"
  },
  {
    title: "Social Content Automator",
    description: "Genera e pubblica contenuti sui social usando ChatGPT. Include: calendario editoriale, hashtag optimizer, engagement tracker.",
    category: "Social Media",
    price: "Premium",
    link: "https://gumroad.com/l/social-automator",
    status: "Disponibile"
  },
  {
    title: "Email Sequence Builder",
    description: "Crea sequenze email automatiche ad alta conversione. Templates testati, personalizzazione AI, tracking avanzato.",
    category: "Email Marketing",
    price: "Free",
    link: "https://gumroad.com/l/email-sequence-free",
    status: "Disponibile"
  },
  {
    title: "Inventory Smart Manager",
    description: "Gestione intelligente delle scorte con previsioni AI. Riordino automatico, alert personalizzati, integrazione fornitori.",
    category: "Gestione Inventario",
    price: "Premium",
    link: "https://gumroad.com/l/inventory-manager-pro",
    status: "In Sviluppo"
  },
  {
    title: "Task Automation Studio",
    description: "Suite completa per automatizzare qualsiasi processo aziendale. Drag & drop builder, integrazioni illimitate, AI assistant.",
    category: "Automazione",
    price: "Premium",
    link: "https://gumroad.com/l/automation-studio-pro",
    status: "In Brainstorming"
  },
  {
    title: "Website Speed Optimizer",
    description: "Tool gratuito per ottimizzare la velocità del tuo sito web. Analisi completa, suggerimenti actionable, monitoraggio continuo.",
    category: "Web Tools",
    price: "Free",
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

      <ContactCTA
        title="Sviluppo su Misura"
        subtitle="Non trovi l'app perfetta per te?"
        description="Posso sviluppare una soluzione completamente personalizzata per le tue esigenze specifiche. Dalla prima analisi al supporto post-lancio, ti accompagno in ogni fase."
        source="app-page"
        icon="🛠️"
        features={[
          "Analisi dettagliata dei requisiti",
          "Sviluppo agile con feedback continuo",
          "Integrazioni con i tuoi sistemi esistenti",
          "Supporto e manutenzione inclusi",
          "Formazione del team"
        ]}
      />
    </div>
  );
}