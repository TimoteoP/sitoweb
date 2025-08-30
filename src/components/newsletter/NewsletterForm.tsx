'use client';

import { useState } from 'react';
import { siteConfig } from '../../../config/site.config';

interface NewsletterFormProps {
  title?: string;
  description?: string;
  buttonText?: string;
  leadMagnet?: boolean;
  className?: string;
}

export default function NewsletterForm({
  title = 'Scarica il Case Study Completo',
  description = 'Come un\'ottica da 1M€ ha eliminato tutti i fogli Excel in 30 giorni: numeri, processo e risultati',
  buttonText = 'Ricevi la Guida',
  leadMagnet = true,
  className = '',
}: NewsletterFormProps) {
  const [email, setEmail] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [privacyAccepted, setPrivacyAccepted] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!privacyAccepted) {
      alert('Per favore, accetta la Privacy Policy per continuare.');
      return;
    }

    if (!email.trim()) return;

    setIsSubmitting(true);

    try {
      const response = await fetch('/api/newsletter', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email: email.trim(),
          projectId: siteConfig.projectId,
          leadMagnet,
        }),
      });

      if (response.ok) {
        setIsSubmitted(true);
        setEmail('');
        setPrivacyAccepted(false);
      } else {
        const error = await response.json();
        throw new Error(error.message || 'Failed to subscribe');
      }
    } catch (error) {
      console.error('Error subscribing:', error);
      alert('Errore nell\'iscrizione. Riprova più tardi.');
    }

    setIsSubmitting(false);
  };

  if (isSubmitted) {
    return (
      <div className={`text-center ${className}`}>
        <div className="max-w-md mx-auto p-8 bg-green-50 rounded-2xl border border-green-200">
          <div className="text-4xl mb-4">✅</div>
          <h3 className="text-xl font-semibold text-green-800 mb-2">
            Iscrizione completata!
          </h3>
          <p className="text-green-700">
            {leadMagnet 
              ? 'Controlla la tua email per ricevere la guida gratuita. Se non la vedi, controlla anche lo spam!'
              : 'Grazie per esserti iscritto! Riceverai i nostri migliori contenuti direttamente nella tua inbox.'
            }
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className={className}>
      <div className="max-w-2xl mx-auto text-center">
        <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
          {title}
        </h2>
        <p className="text-lg text-white/95 mb-8">
          {description}
        </p>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Email Input */}
          <div className="flex flex-col sm:flex-row gap-4 max-w-lg mx-auto">
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="La tua email"
              className="flex-1 px-4 py-3 rounded-lg text-gray-900 placeholder-gray-500 focus:ring-2 focus:ring-orange-500 focus:border-transparent"
              required
            />
            <button
              type="submit"
              disabled={isSubmitting || !email.trim() || !privacyAccepted}
              className="px-8 py-3 bg-gradient-to-r from-orange-500 to-red-500 text-white font-semibold rounded-lg hover:from-orange-600 hover:to-red-600 transition-all transform hover:scale-[1.02] disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none whitespace-nowrap"
            >
              {isSubmitting ? '⏳ Invio...' : buttonText}
            </button>
          </div>

          {/* Privacy Checkbox */}
          <div className="flex items-start gap-3 max-w-lg mx-auto text-left">
            <input
              type="checkbox"
              id="privacy-accept"
              checked={privacyAccepted}
              onChange={(e) => setPrivacyAccepted(e.target.checked)}
              className="mt-1 w-4 h-4 cursor-pointer"
              required
            />
            <label htmlFor="privacy-accept" className="text-sm text-white/95 cursor-pointer leading-relaxed">
              Accetto la{' '}
              <a 
                href="/privacy-policy" 
                target="_blank" 
                className="text-white underline hover:no-underline"
              >
                Privacy Policy
              </a>{' '}
              e acconsento al trattamento dei miei dati personali per ricevere comunicazioni informative e promozionali.
            </label>
          </div>
        </form>

        {/* Features */}
        {leadMagnet && (
          <div className="grid sm:grid-cols-3 gap-4 mt-8 max-w-2xl mx-auto">
            <div className="text-center">
              <div className="text-2xl mb-2">📊</div>
              <p className="text-sm text-white/90">Dati reali e verificabili</p>
            </div>
            <div className="text-center">
              <div className="text-2xl mb-2">⚡</div>
              <p className="text-sm text-white/90">Implementazione in 30 giorni</p>
            </div>
            <div className="text-center">
              <div className="text-2xl mb-2">🎯</div>
              <p className="text-sm text-white/90">ROI immediato e misurabile</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}