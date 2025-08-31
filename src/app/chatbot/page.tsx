import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Chatbot - Timoteo Pasquali',
  description: 'Scopri come i chatbot intelligenti possono rivoluzionare il customer service e automatizzare le interazioni con i clienti.',
};

interface ChatbotFeature {
  title: string;
  description: string;
  icon: string;
}

interface ChatbotSolution {
  name: string;
  description: string;
  features: string[];
  price: string;
  ideal_for: string;
  implementation_time: string;
  platforms: string[];
}

const features: ChatbotFeature[] = [
  {
    title: "Intelligenza Artificiale Avanzata",
    description: "Utilizzo i modelli AI più avanzati per creare conversazioni naturali e contestuali.",
    icon: "🧠"
  },
  {
    title: "Integrazione Multicanale",
    description: "I chatbot funzionano su website, WhatsApp, Telegram, Facebook Messenger e altro.",
    icon: "💬"
  },
  {
    title: "Apprendimento Continuo",
    description: "Il chatbot migliora automaticamente basandosi sulle interazioni con gli utenti.",
    icon: "📈"
  },
  {
    title: "Personalizzazione Completa",
    description: "Ogni chatbot è progettato per riflettere la personalità e i valori del tuo brand.",
    icon: "🎨"
  }
];

const solutions: ChatbotSolution[] = [
  {
    name: "Chatbot Customer Service",
    description: "Automatizza il supporto clienti con risposte immediate e trasferimento intelligente agli operatori umani.",
    features: [
      "Risposta automatica a FAQ",
      "Classificazione automatica dei ticket",
      "Escalation intelligente",
      "Integrazione CRM",
      "Analytics dettagliati"
    ],
    price: "Da €800/mese",
    ideal_for: "E-commerce e aziende di servizi",
    implementation_time: "2-3 settimane",
    platforms: ["Website", "WhatsApp", "Facebook"]
  },
  {
    name: "Lead Generation Bot",
    description: "Qualifica automaticamente i lead e raccoglie informazioni preziose sui prospect.",
    features: [
      "Qualificazione automatica lead",
      "Raccolta informazioni contatto",
      "Scoring predittivo",
      "Integrazione CRM/Marketing",
      "Follow-up automatizzato"
    ],
    price: "Da €600/mese",
    ideal_for: "B2B e servizi professionali",
    implementation_time: "1-2 settimane",
    platforms: ["Website", "LinkedIn", "Email"]
  },
  {
    name: "E-commerce Assistant",
    description: "Guida i clienti nell&apos;acquisto, suggerisce prodotti e gestisce ordini e resi.",
    features: [
      "Raccomandazioni prodotti AI",
      "Gestione carrello e checkout",
      "Tracking ordini",
      "Gestione resi",
      "Upselling intelligente"
    ],
    price: "Da €1000/mese",
    ideal_for: "Negozi online e marketplace",
    implementation_time: "3-4 settimane",
    platforms: ["Website", "WhatsApp", "Telegram"]
  }
];

export default function ChatbotPage() {
  return (
    <div className="page-container">
      <div className="hero-section">
        <h1 className="hero-title">Chatbot Intelligenti</h1>
        <p className="hero-subtitle">
          Rivoluziona il customer service e automatizza le interazioni con i clienti 
          attraverso chatbot alimentati dall&apos;intelligenza artificiale più avanzata.
        </p>
      </div>

      <div className="content-section">
        <div className="chatbot-intro">
          <h2>Il Futuro del Customer Service</h2>
          <p>
            I chatbot di oggi non sono semplici script automatici. Utilizzo l&apos;intelligenza artificiale 
            più avanzata per creare assistenti virtuali che comprendono il contesto, 
            imparano dalle interazioni e forniscono esperienze personalizzate ai tuoi clienti.
          </p>
        </div>

        <div className="features-section">
          <h2>Caratteristiche Innovative</h2>
          <div className="features-grid">
            {features.map((feature, index) => (
              <div key={index} className="feature-card">
                <div className="feature-icon">{feature.icon}</div>
                <h3>{feature.title}</h3>
                <p>{feature.description}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="solutions-section">
          <h2>Soluzioni Chatbot</h2>
          <p className="section-subtitle">
            Ogni chatbot è progettato per risolvere specifiche sfide aziendali 
            e ottimizzare i risultati del tuo business.
          </p>
          
          <div className="solutions-grid">
            {solutions.map((solution, index) => (
              <div key={index} className="solution-card">
                <div className="solution-header">
                  <h3>{solution.name}</h3>
                  <div className="solution-price">{solution.price}</div>
                </div>
                
                <p className="solution-description">{solution.description}</p>
                
                <div className="solution-details">
                  <div className="solution-features">
                    <h4>Funzionalità principali:</h4>
                    <ul>
                      {solution.features.map((feature, fIndex) => (
                        <li key={fIndex}>{feature}</li>
                      ))}
                    </ul>
                  </div>
                  
                  <div className="solution-meta">
                    <div className="meta-item">
                      <strong>Ideale per:</strong> {solution.ideal_for}
                    </div>
                    <div className="meta-item">
                      <strong>Implementazione:</strong> {solution.implementation_time}
                    </div>
                    <div className="meta-item">
                      <strong>Piattaforme:</strong> {solution.platforms.join(', ')}
                    </div>
                  </div>
                </div>
                
                <a href="/contatti" className="solution-cta">
                  Richiedi Demo
                </a>
              </div>
            ))}
          </div>
        </div>

        <div className="results-section">
          <h2>Risultati Misurabili</h2>
          <div className="results-grid">
            <div className="result-stat">
              <div className="stat-number">85%</div>
              <div className="stat-label">Riduzione ticket di supporto</div>
            </div>
            <div className="result-stat">
              <div className="stat-number">24/7</div>
              <div className="stat-label">Disponibilità del servizio</div>
            </div>
            <div className="result-stat">
              <div className="stat-number">60%</div>
              <div className="stat-label">Miglioramento lead quality</div>
            </div>
            <div className="result-stat">
              <div className="stat-number">3x</div>
              <div className="stat-label">Velocità di risposta</div>
            </div>
          </div>
        </div>

        <div className="implementation-process">
          <h2>Come Funziona</h2>
          <div className="process-timeline">
            <div className="process-step">
              <div className="step-number">1</div>
              <div className="step-content">
                <h4>Analisi e Strategia</h4>
                <p>Studio i tuoi processi e identifico le opportunità di automazione</p>
              </div>
            </div>
            
            <div className="process-step">
              <div className="step-number">2</div>
              <div className="step-content">
                <h4>Progettazione Conversazionale</h4>
                <p>Creo i flussi di conversazione e la personalità del chatbot</p>
              </div>
            </div>
            
            <div className="process-step">
              <div className="step-number">3</div>
              <div className="step-content">
                <h4>Sviluppo e Training</h4>
                <p>Sviluppo il chatbot e lo addestro sui tuoi dati specifici</p>
              </div>
            </div>
            
            <div className="process-step">
              <div className="step-number">4</div>
              <div className="step-content">
                <h4>Test e Ottimizzazione</h4>
                <p>Testo intensivamente e ottimizo le performance</p>
              </div>
            </div>
            
            <div className="process-step">
              <div className="step-number">5</div>
              <div className="step-content">
                <h4>Deploy e Monitoraggio</h4>
                <p>Lancio il chatbot e monitoro continuamente le performance</p>
              </div>
            </div>
          </div>
        </div>

        <div className="chatbot-technologies">
          <h2>Tecnologie Utilizzate</h2>
          <div className="tech-grid">
            <div className="tech-item">
              <h4>OpenAI GPT-4</h4>
              <p>Per conversazioni naturali e comprensione avanzata</p>
            </div>
            <div className="tech-item">
              <h4>Google Dialogflow</h4>
              <p>Per il riconoscimento dell&apos;intento e l&apos;elaborazione NLP</p>
            </div>
            <div className="tech-item">
              <h4>Microsoft Bot Framework</h4>
              <p>Per integrazioni enterprise e scalabilità</p>
            </div>
            <div className="tech-item">
              <h4>Webhook Custom</h4>
              <p>Per integrazioni personalizzate con i tuoi sistemi</p>
            </div>
          </div>
        </div>

        <div className="cta-section">
          <h2>Pronto a Rivoluzionare il Tuo Customer Service?</h2>
          <p>
            Scopri come un chatbot intelligente può trasformare il modo in cui interagisci con i tuoi clienti. 
            Richiedi una demo personalizzata e vedi il chatbot in azione sui tuoi casi d&apos;uso specifici.
          </p>
          <div className="cta-buttons">
            <a href="/contatti" className="cta-button primary">
              Richiedi Demo Gratuita
            </a>
            <a href="#" className="cta-button secondary">
              Scarica Case Study
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}