'use client';

import React, { useState } from 'react';

export default function ContactForm() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [captcha, setCaptcha] = useState<{question: string, answer: number}>({question: '', answer: 0});
  const [captchaInput, setCaptchaInput] = useState('');

  // Generate simple math CAPTCHA
  const generateCaptcha = () => {
    const num1 = Math.floor(Math.random() * 10) + 1;
    const num2 = Math.floor(Math.random() * 10) + 1;
    const answer = num1 + num2;
    setCaptcha({
      question: `Quanto fa ${num1} + ${num2}?`,
      answer: answer
    });
  };

  // Initialize CAPTCHA on component mount
  React.useEffect(() => {
    generateCaptcha();
  }, []);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);

    // CAPTCHA validation
    if (parseInt(captchaInput) !== captcha.answer) {
      alert('Risposta del CAPTCHA non corretta. Riprova.');
      generateCaptcha();
      setCaptchaInput('');
      setIsSubmitting(false);
      return;
    }

    try {
      const formData = new FormData(e.currentTarget);
      
      // Add CAPTCHA verification to form data
      formData.append('captcha_answer', captchaInput);
      formData.append('captcha_expected', captcha.answer.toString());
      
      const response = await fetch('/api/contact', {
        method: 'POST',
        body: formData,
      });

      if (response.ok) {
        setShowSuccess(true);
        e.currentTarget.reset();
        setCaptchaInput('');
        generateCaptcha();
      } else {
        alert('Si è verificato un errore. Riprova più tardi.');
        generateCaptcha();
        setCaptchaInput('');
      }
    } catch {
      alert('Si è verificato un errore. Riprova più tardi.');
      generateCaptcha();
      setCaptchaInput('');
    } finally {
      setIsSubmitting(false);
    }
  };

  if (showSuccess) {
    return (
      <div style={{ 
        maxWidth: '600px', 
        margin: '0 auto', 
        padding: '3rem', 
        textAlign: 'center',
        backgroundColor: 'white',
        borderRadius: '12px',
        border: '1px solid #10B981',
        boxShadow: '0 2px 4px rgba(0, 0, 0, 0.05)'
      }}>
        <div style={{ fontSize: '4rem', marginBottom: '1rem' }}>✅</div>
        <h3 style={{ fontSize: '1.5rem', fontWeight: '700', color: 'var(--primary-dark)', marginBottom: '1rem' }}>
          Messaggio Inviato!
        </h3>
        <p style={{ color: 'var(--gray-600)', marginBottom: '2rem', lineHeight: '1.6' }}>
          Grazie per avermi scritto! Ti risponderò entro 24 ore (promesso).
        </p>
        <button
          onClick={() => setShowSuccess(false)}
          className="btn-primary"
        >
          Invia un altro messaggio
        </button>
      </div>
    );
  }

  return (
    <div style={{ maxWidth: '600px', margin: '0 auto' }}>
      <form 
        onSubmit={handleSubmit}
        style={{ display: 'grid', gap: '1.5rem' }}
      >
        {/* Hidden fields for Brevo integration */}
        <input type="hidden" name="listId" value="8" />
        <input type="hidden" name="formName" value="Form Contatti" />
        
        {/* Honeypot field - hidden from humans, visible to bots */}
        <input 
          type="text" 
          name="website" 
          style={{ 
            position: 'absolute', 
            left: '-9999px',
            opacity: 0,
            height: 0,
            width: 0
          }} 
          tabIndex={-1} 
          autoComplete="off" 
        />
        
        {/* Name & Last Name Row */}
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
          <div>
            <label 
              htmlFor="firstName" 
              style={{ 
                display: 'block', 
                marginBottom: '0.5rem', 
                fontWeight: '600', 
                color: 'var(--primary-dark)' 
              }}
            >
              Nome *
            </label>
            <input
              type="text"
              id="firstName"
              name="firstName"
              required
              style={{
                width: '100%',
                padding: '1rem',
                border: '2px solid var(--gray-300)',
                borderRadius: '8px',
                fontSize: '1rem',
                backgroundColor: '#f8f9fa',
                transition: 'all 0.2s ease'
              }}
              onFocus={(e) => e.target.style.borderColor = 'var(--primary-blue)'}
              onBlur={(e) => e.target.style.borderColor = 'var(--gray-300)'}
            />
          </div>
          <div>
            <label 
              htmlFor="lastName" 
              style={{ 
                display: 'block', 
                marginBottom: '0.5rem', 
                fontWeight: '600', 
                color: 'var(--primary-dark)' 
              }}
            >
              Cognome *
            </label>
            <input
              type="text"
              id="lastName"
              name="lastName"
              required
              style={{
                width: '100%',
                padding: '1rem',
                border: '2px solid var(--gray-300)',
                borderRadius: '8px',
                fontSize: '1rem',
                backgroundColor: '#f8f9fa',
                transition: 'all 0.2s ease'
              }}
              onFocus={(e) => e.target.style.borderColor = 'var(--primary-blue)'}
              onBlur={(e) => e.target.style.borderColor = 'var(--gray-300)'}
            />
          </div>
        </div>

        {/* Email */}
        <div>
          <label 
            htmlFor="email" 
            style={{ 
              display: 'block', 
              marginBottom: '0.5rem', 
              fontWeight: '600', 
              color: 'var(--primary-dark)' 
            }}
          >
            Email *
          </label>
          <input
            type="email"
            id="email"
            name="email"
            required
            style={{
              width: '100%',
              padding: '1rem',
              border: '2px solid var(--gray-300)',
              borderRadius: '8px',
              fontSize: '1rem',
              backgroundColor: '#f8f9fa',
              transition: 'all 0.2s ease'
            }}
            onFocus={(e) => e.target.style.borderColor = 'var(--primary-blue)'}
            onBlur={(e) => e.target.style.borderColor = 'var(--gray-300)'}
          />
        </div>

        {/* Phone */}
        <div>
          <label 
            htmlFor="phone" 
            style={{ 
              display: 'block', 
              marginBottom: '0.5rem', 
              fontWeight: '600', 
              color: 'var(--primary-dark)' 
            }}
          >
            Cellulare
          </label>
          <input
            type="tel"
            id="phone"
            name="phone"
            style={{
              width: '100%',
              padding: '1rem',
              border: '2px solid var(--gray-300)',
              borderRadius: '8px',
              fontSize: '1rem',
              backgroundColor: '#f8f9fa',
              transition: 'all 0.2s ease'
            }}
            onFocus={(e) => e.target.style.borderColor = 'var(--primary-blue)'}
            onBlur={(e) => e.target.style.borderColor = 'var(--gray-300)'}
          />
        </div>

        {/* Contact Reason */}
        <div>
          <label 
            htmlFor="contactReason" 
            style={{ 
              display: 'block', 
              marginBottom: '0.5rem', 
              fontWeight: '600', 
              color: 'var(--primary-dark)' 
            }}
          >
            Motivo del Contatto *
          </label>
          <select
            id="contactReason"
            name="contactReason"
            required
            style={{
              width: '100%',
              padding: '1rem',
              border: '2px solid var(--gray-300)',
              borderRadius: '8px',
              fontSize: '1rem',
              backgroundColor: '#f8f9fa',
              transition: 'all 0.2s ease'
            }}
            onFocus={(e) => e.target.style.borderColor = 'var(--primary-blue)'}
            onBlur={(e) => e.target.style.borderColor = 'var(--gray-300)'}
          >
            <option value="">Seleziona un motivo</option>
            <option value="Consulenza automazione aziendale">Consulenza automazione aziendale</option>
            <option value="Eliminazione Excel">Eliminazione Excel e fogli di calcolo</option>
            <option value="Formazione IA">Formazione sull{''}Intelligenza Artificiale</option>
            <option value="Sviluppo CRM personalizzato">Sviluppo CRM personalizzato</option>
            <option value="Automazione processi">Automazione processi aziendali</option>
            <option value="Richiesta preventivo">Richiesta preventivo</option>
            <option value="Collaborazione">Proposta di collaborazione</option>
            <option value="Altro">Altro</option>
          </select>
        </div>

        {/* Message */}
        <div>
          <label 
            htmlFor="message" 
            style={{ 
              display: 'block', 
              marginBottom: '0.5rem', 
              fontWeight: '600', 
              color: 'var(--primary-dark)' 
            }}
          >
            Il tuo messaggio *
          </label>
          <textarea
            id="message"
            name="message"
            required
            rows={6}
            placeholder="Descrivimi il tuo problema o la tua richiesta nel dettaglio. Più informazioni mi dai, più precisa sarà la mia risposta!"
            style={{
              width: '100%',
              padding: '1rem',
              border: '2px solid var(--gray-300)',
              borderRadius: '8px',
              fontSize: '1rem',
              backgroundColor: '#f8f9fa',
              resize: 'vertical',
              fontFamily: 'inherit',
              transition: 'all 0.2s ease'
            }}
            onFocus={(e) => e.target.style.borderColor = 'var(--primary-blue)'}
            onBlur={(e) => e.target.style.borderColor = 'var(--gray-300)'}
          />
        </div>

        {/* CAPTCHA */}
        <div>
          <label 
            htmlFor="captcha" 
            style={{ 
              display: 'block', 
              marginBottom: '0.5rem', 
              fontWeight: '600', 
              color: 'var(--primary-dark)' 
            }}
          >
            Verifica di sicurezza *
          </label>
          <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
            <span style={{ 
              fontSize: '1.1rem', 
              fontWeight: '500', 
              color: 'var(--primary-dark)',
              minWidth: '120px'
            }}>
              {captcha.question}
            </span>
            <input
              type="number"
              id="captcha"
              value={captchaInput}
              onChange={(e) => setCaptchaInput(e.target.value)}
              required
              min="0"
              max="20"
              style={{
                width: '80px',
                padding: '0.75rem',
                border: '2px solid var(--gray-300)',
                borderRadius: '8px',
                fontSize: '1rem',
                backgroundColor: '#f8f9fa',
                textAlign: 'center',
                transition: 'all 0.2s ease'
              }}
              onFocus={(e) => e.target.style.borderColor = 'var(--primary-blue)'}
              onBlur={(e) => e.target.style.borderColor = 'var(--gray-300)'}
            />
            <button
              type="button"
              onClick={() => {
                generateCaptcha();
                setCaptchaInput('');
              }}
              style={{
                padding: '0.5rem',
                border: '1px solid var(--gray-300)',
                borderRadius: '6px',
                backgroundColor: 'white',
                cursor: 'pointer',
                fontSize: '1.2rem'
              }}
              title="Genera nuova domanda"
            >
              🔄
            </button>
          </div>
          <p style={{
            fontSize: '0.75rem',
            color: 'var(--gray-500)',
            marginTop: '0.5rem'
          }}>
            Rispondi alla semplice domanda matematica per dimostrare che non sei un bot
          </p>
        </div>

        {/* Privacy Checkboxes */}
        <div style={{ display: 'grid', gap: '1rem' }}>
          {/* GDPR/Privacy (mandatory) */}
          <div style={{ display: 'flex', alignItems: 'flex-start', gap: '0.75rem' }}>
            <input
              type="checkbox"
              id="privacy"
              name="privacy"
              required
              style={{ marginTop: '2px', width: '20px', height: '20px', cursor: 'pointer' }}
            />
            <label 
              htmlFor="privacy" 
              style={{ 
                fontSize: '0.875rem', 
                lineHeight: '1.5', 
                color: 'var(--gray-600)',
                cursor: 'pointer'
              }}
            >
              <strong>*</strong> Accetto la <a href="/privacy-policy" target="_blank" style={{ color: 'var(--primary-blue)', textDecoration: 'underline' }}>Privacy Policy</a> e 
              acconsento al trattamento dei miei dati personali per rispondere alla mia richiesta di contatto. <span style={{ color: 'red' }}>(Obbligatorio)</span>
            </label>
          </div>

          {/* Newsletter (optional) */}
          <div style={{ display: 'flex', alignItems: 'flex-start', gap: '0.75rem' }}>
            <input
              type="checkbox"
              id="newsletter"
              name="newsletter"
              value="true"
              style={{ marginTop: '2px', width: '20px', height: '20px', cursor: 'pointer' }}
            />
            <label 
              htmlFor="newsletter" 
              style={{ 
                fontSize: '0.875rem', 
                lineHeight: '1.5', 
                color: 'var(--gray-600)',
                cursor: 'pointer'
              }}
            >
              Voglio ricevere la newsletter con contenuti gratuiti su IA e automazioni aziendali. <span style={{ color: 'var(--gray-500)' }}>(Facoltativo)</span>
            </label>
          </div>
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          disabled={isSubmitting}
          className="btn-primary"
          style={{
            fontSize: '1.125rem',
            padding: '1rem 2rem',
            margin: '1rem 0 0 0',
            cursor: isSubmitting ? 'not-allowed' : 'pointer',
            border: 'none',
            opacity: isSubmitting ? 0.7 : 1
          }}
        >
          {isSubmitting ? '🔄 Invio in corso...' : '🚀 Invia il Messaggio'}
        </button>
      </form>
    </div>
  );
}