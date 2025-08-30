'use client';

import React, { useState } from 'react';
import { siteConfig } from '../../../config/site.config';

interface QASectionProps {
  postSlug: string;
  postTitle: string;
}

export default function QASection({ postSlug, postTitle }: QASectionProps) {
  const [question, setQuestion] = useState('');
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [captchaAnswer, setCaptchaAnswer] = useState('');
  const [isHuman, setIsHuman] = useState(false);
  const [startTime, setStartTime] = useState<number>(0);
  
  // Simple math CAPTCHA - changes every time
  const [mathChallenge, setMathChallenge] = useState<{
    question: string;
    answer: number;
  }>({question: '', answer: 0});

  // Generate new math challenge
  const generateMathChallenge = () => {
    const operations = [
      () => {
        const a = Math.floor(Math.random() * 10) + 1;
        const b = Math.floor(Math.random() * 10) + 1;
        return { question: `Quanto fa ${a} + ${b}?`, answer: a + b };
      },
      () => {
        const a = Math.floor(Math.random() * 10) + 5;
        const b = Math.floor(Math.random() * 5) + 1;
        return { question: `Quanto fa ${a} - ${b}?`, answer: a - b };
      },
      () => {
        const a = Math.floor(Math.random() * 5) + 2;
        const b = Math.floor(Math.random() * 5) + 2;
        return { question: `Quanto fa ${a} × ${b}?`, answer: a * b };
      }
    ];
    
    const operation = operations[Math.floor(Math.random() * operations.length)];
    const challenge = operation();
    setMathChallenge(challenge);
    setCaptchaAnswer('');
  };

  // Initialize on mount
  React.useEffect(() => {
    generateMathChallenge();
    setStartTime(Date.now());
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!question.trim() || !email.trim() || !name.trim()) return;

    // Anti-bot validations
    const timeSpent = Date.now() - startTime;
    
    // 1. Time-based check - humans need at least 10 seconds to fill the form
    if (timeSpent < 10000) {
      alert('Compila il form con più calma. Sembra che tu abbia fatto troppo veloce!');
      return;
    }
    
    // 2. Math CAPTCHA check
    if (parseInt(captchaAnswer) !== mathChallenge.answer) {
      alert('Risposta matematica non corretta. Riprova.');
      generateMathChallenge();
      return;
    }
    
    // 3. Human interaction check
    if (!isHuman) {
      alert('Conferma di essere umano prima di inviare.');
      return;
    }

    setIsSubmitting(true);

    try {
      // Send to Brevo via API route
      const response = await fetch('/api/question', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          question: question.trim(),
          email: email.trim(),
          name: name.trim(),
          postSlug,
          postTitle,
          timeSpent: Date.now() - startTime,
          captchaAnswer,
          mathAnswer: mathChallenge.answer,
        }),
      });

      if (response.ok) {
        setIsSubmitted(true);
        setQuestion('');
        setEmail('');
        setName('');
        setCaptchaAnswer('');
        setIsHuman(false);
        generateMathChallenge();
      } else {
        const errorData = await response.text();
        console.error('Server response:', response.status, errorData);
        throw new Error(`Failed to submit question: ${response.status} - ${errorData}`);
      }
    } catch (error) {
      console.error('Error submitting question:', error);
      let errorMessage = 'Errore nell\'invio della domanda. Riprova più tardi.';
      
      if (error instanceof Error && error.message.includes('503')) {
        errorMessage = 'Servizio email temporaneamente non disponibile. Scrivimi direttamente a info@timoteopasquali.it o prova il modulo di contatto nella pagina Contatti.';
      } else if (error instanceof Error && error.message.includes('500')) {
        errorMessage = 'Problemi con il servizio email. Scrivimi direttamente a info@timoteopasquali.it';
      }
      
      alert(errorMessage);
    }

    setIsSubmitting(false);
  };

  const whatsappMessage = encodeURIComponent(
    `Ciao! Ho una domanda sull'articolo "${postTitle}": ${question || '[La tua domanda qui]'}`
  );

  const whatsappHref = siteConfig.author.social?.whatsapp
    ? `${siteConfig.author.social.whatsapp}?text=${whatsappMessage}`
    : null;

  if (isSubmitted) {
    return (
      <section className="mt-12 p-8 bg-green-50 rounded-2xl border border-green-200">
        <div className="text-center">
          <div className="text-4xl mb-4">✅</div>
          <h3 className="text-xl font-semibold text-green-800 mb-2">
            Domanda ricevuta!
          </h3>
          <p className="text-green-700">
            Ti risponderò al più presto via email. Grazie per il tuo interesse!
          </p>
        </div>
      </section>
    );
  }

  // const QuestionIcon = () => (
  //   <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
  //     <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 17h-2v-2h2v2zm2.07-7.75l-.9.92C13.45 12.9 13 13.5 13 15h-2v-.5c0-1.1.45-2.1 1.17-2.83l1.24-1.26c.37-.36.59-.86.59-1.41 0-1.1-.9-2-2-2s-2 .9-2 2H8c0-2.21 1.79-4 4-4s4 1.79 4 4c0 .88-.36 1.68-.93 2.25z"/>
  //   </svg>
  // );

  const WhatsAppIcon = () => (
    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.890-5.335 11.893-11.893A11.821 11.821 0 0020.484 3.488"/>
    </svg>
  );

  return (
    <section style={{ marginTop: '3rem' }}>
      <div style={{
        backgroundColor: '#fef3c7',
        borderRadius: '1rem',
        padding: '2rem',
        border: '1px solid #fbbf24',
        boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)'
      }}>
        <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
          <h3 style={{
            fontSize: '1.5rem',
            fontWeight: 'bold',
            color: '#111827',
            marginBottom: '0.5rem'
          }}>
            Hai una domanda su questo articolo?
          </h3>
          <p style={{
            color: '#374151',
            fontSize: '1rem',
            maxWidth: '32rem',
            margin: '0 auto',
            lineHeight: '1.6'
          }}>
            Non lasciare che i dubbi ti fermino! Scrivimi la tua domanda e ti risponderò personalmente.
            È il modo migliore per approfondire e applicare quello che hai letto.
          </p>
        </div>

        <div style={{
          display: 'grid',
          gridTemplateColumns: '2fr 1fr',
          gap: '2rem'
        }}>
          {/* Form */}
          <div>
            <div style={{
              backgroundColor: 'white',
              borderRadius: '1rem',
              padding: '1.5rem',
              boxShadow: '0 1px 3px rgba(0, 0, 0, 0.1)',
              border: '1px solid #f3f4f6'
            }}>
              <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
                <div>
                  <label htmlFor="question" style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '0.5rem',
                    fontSize: '0.875rem',
                    fontWeight: '600',
                    color: '#1f2937',
                    marginBottom: '0.75rem'
                  }}>
                    <div style={{
                      width: '1.25rem',
                      height: '1.25rem',
                      backgroundColor: '#3b82f6',
                      borderRadius: '50%',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center'
                    }}>
                      <span style={{ fontSize: '0.75rem', color: 'white' }}>?</span>
                    </div>
                    La tua domanda *
                  </label>
                  <textarea
                    id="question"
                    value={question}
                    onChange={(e) => setQuestion(e.target.value)}
                    placeholder="Esempio: Come posso applicare questo metodo alla mia azienda di 15 dipendenti?"
                    style={{
                      width: '100%',
                      padding: '1rem',
                      border: '2px solid #e5e7eb',
                      borderRadius: '0.75rem',
                      fontSize: '1rem',
                      color: '#374151',
                      resize: 'none',
                      transition: 'border-color 0.2s ease',
                      fontFamily: 'inherit'
                    }}
                    rows={4}
                    required
                    onFocus={(e) => e.target.style.borderColor = '#3b82f6'}
                    onBlur={(e) => e.target.style.borderColor = '#e5e7eb'}
                  />
                </div>

                <div>
                  <label htmlFor="name" style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '0.5rem',
                    fontSize: '0.875rem',
                    fontWeight: '600',
                    color: '#1f2937',
                    marginBottom: '0.75rem'
                  }}>
                    <div style={{
                      width: '1.25rem',
                      height: '1.25rem',
                      backgroundColor: '#f59e0b',
                      borderRadius: '50%',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center'
                    }}>
                      <span style={{ fontSize: '0.75rem', color: 'white' }}>👤</span>
                    </div>
                    Il tuo nome *
                  </label>
                  <input
                    type="text"
                    id="name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Mario Rossi"
                    style={{
                      width: '100%',
                      padding: '1rem',
                      border: '2px solid #e5e7eb',
                      borderRadius: '0.75rem',
                      fontSize: '1rem',
                      color: '#374151',
                      transition: 'border-color 0.2s ease',
                      fontFamily: 'inherit'
                    }}
                    required
                    onFocus={(e) => e.target.style.borderColor = '#3b82f6'}
                    onBlur={(e) => e.target.style.borderColor = '#e5e7eb'}
                  />
                </div>
                
                <div>
                  <label htmlFor="email" style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '0.5rem',
                    fontSize: '0.875rem',
                    fontWeight: '600',
                    color: '#1f2937',
                    marginBottom: '0.75rem'
                  }}>
                    <div style={{
                      width: '1.25rem',
                      height: '1.25rem',
                      backgroundColor: '#10b981',
                      borderRadius: '50%',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center'
                    }}>
                      <span style={{ fontSize: '0.75rem', color: 'white' }}>@</span>
                    </div>
                    La tua email *
                  </label>
                  <input
                    type="email"
                    id="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="esempio@email.com"
                    style={{
                      width: '100%',
                      padding: '1rem',
                      border: '2px solid #e5e7eb',
                      borderRadius: '0.75rem',
                      fontSize: '1rem',
                      color: '#374151',
                      transition: 'border-color 0.2s ease',
                      fontFamily: 'inherit'
                    }}
                    required
                    onFocus={(e) => e.target.style.borderColor = '#3b82f6'}
                    onBlur={(e) => e.target.style.borderColor = '#e5e7eb'}
                  />
                </div>

                {/* Math CAPTCHA */}
                <div>
                  <label htmlFor="captcha" style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '0.5rem',
                    fontSize: '0.875rem',
                    fontWeight: '600',
                    color: '#1f2937',
                    marginBottom: '0.75rem'
                  }}>
                    <div style={{
                      width: '1.25rem',
                      height: '1.25rem',
                      backgroundColor: '#8b5cf6',
                      borderRadius: '50%',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center'
                    }}>
                      <span style={{ fontSize: '0.75rem', color: 'white' }}>🔢</span>
                    </div>
                    Verifica anti-spam *
                  </label>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '1rem' }}>
                    <span style={{ 
                      fontSize: '1.1rem', 
                      fontWeight: '500', 
                      color: '#1f2937',
                      minWidth: '140px'
                    }}>
                      {mathChallenge.question}
                    </span>
                    <input
                      type="number"
                      id="captcha"
                      value={captchaAnswer}
                      onChange={(e) => setCaptchaAnswer(e.target.value)}
                      required
                      min="0"
                      max="100"
                      style={{
                        width: '80px',
                        padding: '0.75rem',
                        border: '2px solid #e5e7eb',
                        borderRadius: '0.5rem',
                        fontSize: '1rem',
                        textAlign: 'center',
                        transition: 'border-color 0.2s ease'
                      }}
                      onFocus={(e) => e.target.style.borderColor = '#3b82f6'}
                      onBlur={(e) => e.target.style.borderColor = '#e5e7eb'}
                    />
                    <button
                      type="button"
                      onClick={generateMathChallenge}
                      style={{
                        padding: '0.5rem',
                        border: '1px solid #d1d5db',
                        borderRadius: '0.5rem',
                        backgroundColor: '#f9fafb',
                        cursor: 'pointer',
                        fontSize: '1.1rem',
                        transition: 'background-color 0.2s ease'
                      }}
                      onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#f3f4f6'}
                      onMouseLeave={(e) => e.currentTarget.style.backgroundColor = '#f9fafb'}
                      title="Nuova domanda"
                    >
                      🔄
                    </button>
                  </div>
                </div>

                {/* Human verification checkbox */}
                <div style={{ marginBottom: '1.5rem' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                    <input
                      type="checkbox"
                      id="humanCheck"
                      checked={isHuman}
                      onChange={(e) => setIsHuman(e.target.checked)}
                      required
                      style={{ 
                        width: '20px', 
                        height: '20px', 
                        cursor: 'pointer',
                        accentColor: '#3b82f6'
                      }}
                    />
                    <label 
                      htmlFor="humanCheck" 
                      style={{ 
                        fontSize: '0.95rem', 
                        color: '#374151',
                        cursor: 'pointer',
                        fontWeight: '500'
                      }}
                    >
                      🤖 Confermo di essere umano e non un bot
                    </label>
                  </div>
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting || !question.trim() || !email.trim() || !name.trim() || !captchaAnswer.trim() || !isHuman}
                  style={{
                    width: '100%',
                    backgroundColor: '#3b82f6',
                    color: 'white',
                    padding: '1rem 1.5rem',
                    borderRadius: '0.75rem',
                    fontWeight: 'bold',
                    fontSize: '1rem',
                    border: 'none',
                    cursor: isSubmitting || !question.trim() || !email.trim() || !name.trim() || !captchaAnswer.trim() || !isHuman ? 'not-allowed' : 'pointer',
                    opacity: isSubmitting || !question.trim() || !email.trim() || !name.trim() || !captchaAnswer.trim() || !isHuman ? 0.5 : 1,
                    transition: 'all 0.2s ease'
                  }}
                  onMouseEnter={(e) => {
                    if (!isSubmitting && question.trim() && email.trim() && name.trim() && captchaAnswer.trim() && isHuman) {
                      e.currentTarget.style.backgroundColor = '#2563eb';
                      e.currentTarget.style.transform = 'scale(1.02)';
                    }
                  }}
                  onMouseLeave={(e) => {
                    if (!isSubmitting && question.trim() && email.trim() && name.trim() && captchaAnswer.trim() && isHuman) {
                      e.currentTarget.style.backgroundColor = '#3b82f6';
                      e.currentTarget.style.transform = 'scale(1)';
                    }
                  }}
                >
                  {isSubmitting ? 'Invio in corso...' : 'Invia la Domanda'}
                </button>
              </form>
            </div>
          </div>

          {/* WhatsApp Alternative */}
          <div>
            <div style={{
              backgroundColor: 'white',
              borderRadius: '1rem',
              padding: '1.5rem',
              boxShadow: '0 1px 3px rgba(0, 0, 0, 0.1)',
              border: '1px solid #f3f4f6',
              height: '100%'
            }}>
              <div style={{ textAlign: 'center' }}>
                <div style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  width: '3rem',
                  height: '3rem',
                  backgroundColor: '#10b981',
                  borderRadius: '0.75rem',
                  marginBottom: '1rem'
                }}>
                  <WhatsAppIcon />
                </div>
                <h4 style={{
                  fontWeight: 'bold',
                  color: '#111827',
                  marginBottom: '0.75rem',
                  fontSize: '1.125rem'
                }}>
                  Preferisci WhatsApp?
                </h4>
                
                <p style={{
                  color: '#6b7280',
                  fontSize: '0.875rem',
                  marginBottom: '1.5rem',
                  lineHeight: '1.5'
                }}>
                  Per domande urgenti o se preferisci una risposta più veloce, 
                  scrivimi direttamente su WhatsApp.
                </p>
                {whatsappHref ? (
                  <a
                    href={whatsappHref}
                    target="_blank"
                    rel="noopener noreferrer"
                    style={{
                      display: 'inline-flex',
                      alignItems: 'center',
                      gap: '0.5rem',
                      backgroundColor: '#10b981',
                      color: 'white',
                      padding: '0.75rem 1rem',
                      borderRadius: '0.75rem',
                      textDecoration: 'none',
                      fontWeight: '500',
                      boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
                      transition: 'all 0.2s ease'
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.backgroundColor = '#059669';
                      e.currentTarget.style.transform = 'scale(1.05)';
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.backgroundColor = '#10b981';
                      e.currentTarget.style.transform = 'scale(1)';
                    }}
                  >
                    <WhatsAppIcon />
                    Scrivi su WhatsApp
                  </a>
                ) : (
                  <p style={{ color: '#6b7280', fontSize: '0.9rem' }}>
                    WhatsApp non è configurato. Aggiungi il link in siteConfig per attivarlo.
                  </p>
                )}
              </div>
            </div>
          </div>
        </div>

        <div style={{
          marginTop: '2rem',
          padding: '1.5rem',
          backgroundColor: 'white',
          borderRadius: '1rem',
          border: '1px solid #f3f4f6',
          boxShadow: '0 1px 3px rgba(0, 0, 0, 0.1)'
        }}>
          <div style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '0.75rem'
          }}>
            <div style={{
              width: '2rem',
              height: '2rem',
              backgroundColor: '#10b981',
              borderRadius: '50%',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              flexShrink: 0
            }}>
              <svg style={{ width: '1rem', height: '1rem', color: 'white' }} fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 1l3.09 6.26L22 9l-5 4.87L18.18 21 12 17.77 5.82 21 7 13.87 2 9l6.91-1.74L12 1z"/>
              </svg>
            </div>
            <p style={{
              color: '#374151',
              textAlign: 'center',
              fontWeight: '500',
              fontSize: '0.875rem'
            }}>
              <strong style={{ color: '#111827' }}>Privacy garantita:</strong> La tua email viene utilizzata solo per rispondere alla domanda. 
              Nessun spam, solo contenuti di valore.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
