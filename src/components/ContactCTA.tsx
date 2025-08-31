'use client';

import ContactForm from './ContactForm';

interface ContactCTAProps {
  title: string;
  subtitle: string;
  description: string;
  source: string;
  features?: string[];
  icon?: string;
}

export default function ContactCTA({
  title,
  subtitle,
  description,
  source,
  features,
  icon = "📧"
}: ContactCTAProps) {
  return (
    <section style={{
      background: 'linear-gradient(135deg, var(--primary-blue) 0%, var(--accent-orange) 100%)',
      padding: '4rem 2rem',
      borderRadius: '20px',
      margin: '3rem 0',
      color: 'white',
      boxShadow: '0 10px 30px rgba(0,0,0,0.1)'
    }}>
      <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
        {/* Header Section */}
        <div style={{ textAlign: 'center', marginBottom: '3rem' }}>
          <div style={{ fontSize: '3rem', marginBottom: '1rem' }}>
            {icon}
          </div>
          <h2 style={{ 
            fontSize: '2.5rem', 
            fontWeight: '700',
            marginBottom: '1rem',
            color: 'white'
          }}>
            {title}
          </h2>
          <p style={{ 
            fontSize: '1.25rem', 
            marginBottom: '1rem',
            opacity: 0.95,
            color: 'white'
          }}>
            {subtitle}
          </p>
          <p style={{ 
            fontSize: '1.1rem',
            opacity: 0.9,
            maxWidth: '800px',
            margin: '0 auto',
            lineHeight: '1.6',
            color: 'white'
          }}>
            {description}
          </p>
        </div>

        {/* Features Grid (if provided) */}
        {features && features.length > 0 && (
          <div style={{ 
            display: 'grid', 
            gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', 
            gap: '1.5rem',
            marginBottom: '3rem'
          }}>
            {features.map((feature, index) => (
              <div key={index} style={{
                display: 'flex',
                alignItems: 'center',
                gap: '0.75rem',
                background: 'rgba(255, 255, 255, 0.1)',
                padding: '1rem',
                borderRadius: '12px',
                backdropFilter: 'blur(10px)'
              }}>
                <span style={{ fontSize: '1.25rem' }}>✅</span>
                <span style={{ fontSize: '0.95rem', fontWeight: '500', color: 'white' }}>
                  {feature}
                </span>
              </div>
            ))}
          </div>
        )}

        {/* Contact Form Container */}
        <div style={{
          background: 'white',
          borderRadius: '16px',
          padding: '3rem',
          boxShadow: '0 20px 40px rgba(0,0,0,0.15)',
          maxWidth: '700px',
          margin: '0 auto'
        }}>
          <div style={{
            textAlign: 'center',
            marginBottom: '2rem'
          }}>
            <h3 style={{
              fontSize: '1.5rem',
              fontWeight: '600',
              color: 'var(--primary-dark)',
              marginBottom: '0.5rem'
            }}>
              Iniziamo a parlarne
            </h3>
            <p style={{
              color: 'var(--gray-600)',
              fontSize: '1rem'
            }}>
              Compila il form qui sotto e ti risponderò entro 24 ore con una proposta personalizzata
            </p>
          </div>
          
          <ContactForm source={source} />
        </div>

        {/* Trust Indicators */}
        <div style={{
          textAlign: 'center',
          marginTop: '2rem',
          display: 'flex',
          justifyContent: 'center',
          gap: '2rem',
          flexWrap: 'wrap',
          fontSize: '0.9rem',
          opacity: 0.9
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <span>🔒</span>
            <span>Dati sicuri e protetti</span>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <span>⚡</span>
            <span>Risposta entro 24h</span>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <span>💝</span>
            <span>Consultazione gratuita</span>
          </div>
        </div>
      </div>
    </section>
  );
}