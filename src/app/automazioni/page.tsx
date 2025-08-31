import { Metadata } from 'next';
import AutomazioniDirectory from './AutomazioniDirectory';

export const metadata: Metadata = {
  title: 'Automazioni - Timoteo Pasquali',
  description: 'Esplora le mie automazioni pronte all&apos;uso per ottimizzare i tuoi processi aziendali. Template gratuiti e soluzioni premium.',
};

interface AutomationItem {
  title: string;
  description: string;
  category: string;
  complexity: 'Semplice' | 'Intermedio' | 'Avanzato';
  price: 'Gratis' | 'A pagamento';
  platforms: string[];
  timeToImplement: string;
  link: string;
  status: 'Disponibile' | 'In sviluppo' | 'Presto disponibile';
}

const automations: AutomationItem[] = [
  {
    title: "Excel to Database Migration Kit",
    description: "Template completo per trasferire dati da Excel a database professionali (Airtable/Notion). Include script di validazione, pulizia dati e sincronizzazione bidirezionale.",
    category: "Data Management",
    complexity: "Semplice",
    price: "Gratis",
    platforms: ["Excel", "Airtable", "Zapier"],
    timeToImplement: "1-2 ore",
    link: "https://gumroad.com/l/excel-to-database-free",
    status: "Disponibile"
  },
  {
    title: "E-commerce Order Processing System",
    description: "Automazione completa per gestire ordini: conferma automatica, fatturazione, tracking spedizioni, feedback clienti. Riduce il 90% del lavoro manuale.",
    category: "E-commerce",
    complexity: "Avanzato",
    price: "A pagamento",
    platforms: ["Shopify", "WooCommerce", "Make.com", "Stripe"],
    timeToImplement: "4-6 ore",
    link: "https://gumroad.com/l/ecommerce-automation-pro",
    status: "Disponibile"
  },
  {
    title: "Social Media Content Factory",
    description: "Sistema per creare, programmare e pubblicare contenuti social automaticamente. Include generazione AI, ottimizzazione hashtag, cross-posting.",
    category: "Social Media",
    complexity: "Intermedio",
    price: "Gratis",
    platforms: ["ChatGPT", "Buffer", "Canva", "Google Sheets"],
    timeToImplement: "2-3 ore",
    link: "https://gumroad.com/l/social-content-factory",
    status: "Disponibile"
  },
  {
    title: "Lead Qualification & Nurturing Machine",
    description: "Sistema AI per qualificare lead automaticamente e attivare sequenze di nurturing personalizzate. Include scoring predittivo e handoff intelligente al sales.",
    category: "Sales & Marketing",
    complexity: "Avanzato",
    price: "A pagamento",
    platforms: ["HubSpot", "Zapier", "ChatGPT API", "ActiveCampaign"],
    timeToImplement: "6-8 ore",
    link: "https://gumroad.com/l/lead-nurturing-pro",
    status: "Disponibile"
  },
  {
    title: "Invoice & Payment Automation Suite",
    description: "Gestione completa fatturazione: generazione automatica, invio ricorrente, reminder pagamenti, riconciliazione bancaria. Zero intervento manuale.",
    category: "Amministrazione",
    complexity: "Avanzato",
    price: "A pagamento",
    platforms: ["QuickBooks", "Stripe", "Make.com", "FattureInCloud"],
    timeToImplement: "5-7 ore",
    link: "https://gumroad.com/l/invoice-automation-suite",
    status: "Disponibile"
  },
  {
    title: "Customer Support Auto-Pilot",
    description: "Template gratuito per automatizzare il primo livello di customer support. Include chatbot setup, ticket routing, FAQ dinamiche.",
    category: "Customer Service",
    complexity: "Semplice",
    price: "Gratis",
    platforms: ["Zendesk", "Intercom", "ChatGPT", "Zapier"],
    timeToImplement: "2-4 ore",
    link: "https://gumroad.com/l/support-autopilot-free",
    status: "Disponibile"
  },
  {
    title: "Content Marketing Pipeline Pro",
    description: "Sistema completo per automatizzare la creazione di contenuti: research automatico, generation AI, SEO optimization, publishing multi-canale.",
    category: "Content Marketing",
    complexity: "Avanzato",
    price: "A pagamento",
    platforms: ["ChatGPT", "WordPress", "Buffer", "Ahrefs API"],
    timeToImplement: "6-10 ore",
    link: "https://gumroad.com/l/content-pipeline-pro",
    status: "In sviluppo"
  },
  {
    title: "Inventory Smart Alerts System",
    description: "Monitoraggio intelligente delle scorte con predizioni AI. Alert personalizzati, riordino automatico, gestione fornitori integrata.",
    category: "Inventory Management",
    complexity: "Intermedio",
    price: "Gratis",
    platforms: ["Google Sheets", "Slack", "Email", "Telegram"],
    timeToImplement: "2-3 ore",
    link: "https://gumroad.com/l/inventory-alerts-free",
    status: "Presto disponibile"
  },
  {
    title: "CRM Data Synchronization Hub",
    description: "Sincronizzazione bidirezionale tra CRM, email marketing, contabilità e analytics. Un singolo workflow per governare tutti i tuoi dati clienti.",
    category: "CRM Integration",
    complexity: "Avanzato",
    price: "A pagamento",
    platforms: ["HubSpot", "Salesforce", "Make.com", "Google Analytics"],
    timeToImplement: "8-12 ore",
    link: "https://gumroad.com/l/crm-sync-hub-pro",
    status: "Disponibile"
  },
  {
    title: "Email Marketing Sequence Builder",
    description: "Kit gratuito con 15 sequenze email pre-scritte e automatizzate. Include: welcome series, abandoned cart, win-back, upsell sequences.",
    category: "Email Marketing",
    complexity: "Semplice",
    price: "Gratis",
    platforms: ["Mailchimp", "ConvertKit", "ActiveCampaign"],
    timeToImplement: "1-2 ore",
    link: "https://gumroad.com/l/email-sequences-free",
    status: "Disponibile"
  }
];

export default function AutomazioniPage() {
  return (
    <div className="page-container">
      <div className="hero-section">
        <h1 className="hero-title">Le Mie Automazioni</h1>
        <p className="hero-subtitle">
          Template e workflow pronti all&apos;uso per automatizzare i tuoi processi aziendali. 
          Risparmia tempo e riduci gli errori con soluzioni testate e ottimizzate.
        </p>
      </div>

      <div className="content-section">
        <div className="automations-intro">
          <h2>Automazione Immediata</h2>
          <p>
            Ogni automazione include documentazione dettagliata, video tutorial e supporto 
            per l&apos;implementazione. Trasforma i tuoi processi manuali in workflow intelligenti 
            in pochi clic.
          </p>
        </div>

        <div className="benefits-section">
          <h2>Perché Scegliere le Mie Automazioni</h2>
          <div className="benefits-grid">
            <div className="benefit-item">
              <div className="benefit-icon">⚡</div>
              <h3>Implementazione Rapida</h3>
              <p>Template pronti all&apos;uso con setup guidato</p>
            </div>
            <div className="benefit-item">
              <div className="benefit-icon">🔧</div>
              <h3>Completamente Personalizzabili</h3>
              <p>Adatta ogni workflow alle tue esigenze specifiche</p>
            </div>
            <div className="benefit-item">
              <div className="benefit-icon">📚</div>
              <h3>Documentazione Completa</h3>
              <p>Guide dettagliate e video tutorial inclusi</p>
            </div>
            <div className="benefit-item">
              <div className="benefit-icon">🎯</div>
              <h3>Testate sul Campo</h3>
              <p>Ogni automazione è stata testata in aziende reali</p>
            </div>
          </div>
        </div>
      </div>

      <AutomazioniDirectory automations={automations} />

      <div className="content-section">
        <div className="custom-automation">
          <h2>🚀 Automazione su Misura</h2>
          <p>
            Hai processi unici che richiedono una soluzione personalizzata? 
            Posso creare automazioni completamente customizzate per la tua azienda.
          </p>
          <div className="custom-process">
            <div className="process-steps">
              <div className="process-step">
                <div className="step-number">1</div>
                <h4>Analisi</h4>
                <p>Studio i tuoi processi attuali</p>
              </div>
              <div className="process-step">
                <div className="step-number">2</div>
                <h4>Progettazione</h4>
                <p>Disegno il workflow ottimale</p>
              </div>
              <div className="process-step">
                <div className="step-number">3</div>
                <h4>Implementazione</h4>
                <p>Sviluppo e testo l&apos;automazione</p>
              </div>
              <div className="process-step">
                <div className="step-number">4</div>
                <h4>Formazione</h4>
                <p>Formo il tuo team</p>
              </div>
            </div>
          </div>
          <a href="/contatti" className="cta-button">
            Richiedi un&apos;Automazione Personalizzata
          </a>
        </div>
      </div>
    </div>
  );
}