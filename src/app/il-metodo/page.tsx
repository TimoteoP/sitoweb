import { Metadata } from 'next';
import ContactCTA from '../../components/ContactCTA';

export const metadata: Metadata = {
  title: 'Il Metodo - Timoteo Pasquali',
  description: 'Scopri il metodo che ho sviluppato per trasformare le aziende attraverso l&apos;automazione intelligente e l&apos;AI.',
};

export default function IlMetodoPage() {
  return (
    <div className="page-container">
      <div className="hero-section">
        <h1 className="hero-title">Il Metodo</h1>
        <p className="hero-subtitle">
          La metodologia che ho sviluppato per trasformare le aziende attraverso 
          l&apos;automazione intelligente e l&apos;intelligenza artificiale.
        </p>
      </div>

      <div className="content-section">
        <div className="method-overview">
          <h2>Una Strategia Personalizzata</h2>
          <p>
            Ogni azienda è unica, con le sue sfide specifiche e opportunità da cogliere. 
            Il mio approccio non si basa su soluzioni standardizzate, ma su un metodo 
            collaudato che si adatta alle tue esigenze specifiche.
          </p>
        </div>

        <div className="method-steps">
          <div className="step">
            <div className="step-number">01</div>
            <div className="step-content">
              <h3>Analisi Profonda</h3>
              <p>
                Studio approfonditamente i tuoi processi attuali, identificando 
                inefficienze, colli di bottiglia e opportunità di miglioramento.
              </p>
            </div>
          </div>

          <div className="step">
            <div className="step-number">02</div>
            <div className="step-content">
              <h3>Strategia Personalizzata</h3>
              <p>
                Progetto una roadmap di automazione su misura per la tua azienda, 
                definendo priorità e obiettivi raggiungibili.
              </p>
            </div>
          </div>

          <div className="step">
            <div className="step-number">03</div>
            <div className="step-content">
              <h3>Implementazione Graduale</h3>
              <p>
                Implemento le soluzioni in modo graduale, garantendo un&apos;adozione 
                fluida e minimizzando i rischi operativi.
              </p>
            </div>
          </div>

          <div className="step">
            <div className="step-number">04</div>
            <div className="step-content">
              <h3>Formazione e Supporto</h3>
              <p>
                Formo il tuo team e fornisco supporto continuo per garantire 
                il successo a lungo termine delle automazioni implementate.
              </p>
            </div>
          </div>
        </div>

        <div className="results-section">
          <h2>Risultati Misurabili</h2>
          <div className="results-grid">
            <div className="result-item">
              <div className="result-number">90%</div>
              <div className="result-label">Riduzione dei tempi operativi</div>
            </div>
            <div className="result-item">
              <div className="result-number">70%</div>
              <div className="result-label">Riduzione degli errori manuali</div>
            </div>
            <div className="result-item">
              <div className="result-number">3x</div>
              <div className="result-label">Aumento della produttività</div>
            </div>
            <div className="result-item">
              <div className="result-number">50%</div>
              <div className="result-label">Risparmio sui costi operativi</div>
            </div>
          </div>
        </div>

        <ContactCTA
          title="Trasforma la Tua Azienda"
          subtitle="Pronto per risultati concreti in 30 giorni?"
          description="Scopri come il mio metodo personalizzato può rivoluzionare i tuoi processi aziendali e portare risultati misurabili in tempi record. Consulenza gratuita per valutare il potenziale della tua azienda."
          source="il-metodo-page"
          icon="⚡"
          features={[
            "Consulenza gratuita di 60 minuti",
            "Analisi dettagliata dei tuoi processi",
            "Roadmap personalizzata di implementazione",
            "ROI garantito entro 3 mesi",
            "Supporto post-implementazione"
          ]}
        />
      </div>
    </div>
  );
}