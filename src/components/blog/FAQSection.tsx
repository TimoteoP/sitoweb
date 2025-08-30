'use client';

import { useState } from 'react';

interface FAQ {
  q: string;
  a: string;
}

interface FAQSectionProps {
  faq: FAQ[];
}

export default function FAQSection({ faq }: FAQSectionProps) {
  const [openItems, setOpenItems] = useState<number[]>([]);

  const toggleItem = (index: number) => {
    setOpenItems(prev =>
      prev.includes(index)
        ? prev.filter(i => i !== index)
        : [...prev, index]
    );
  };

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faq.map(item => ({
      '@type': 'Question',
      name: item.q,
      acceptedAnswer: {
        '@type': 'Answer',
        text: item.a,
      },
    })),
  };

  return (
    <section className="mt-12 mb-8">
      {/* JSON-LD for FAQ */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <div style={{
        backgroundColor: '#eff6ff',
        padding: '2rem',
        borderRadius: '0.75rem',
        border: '2px solid #3b82f6',
        margin: '2rem 0'
      }}>
        <h2 style={{
          fontSize: '1.5rem',
          fontWeight: 'bold',
          color: '#111827',
          marginBottom: '1.5rem'
        }}>
          FAQs
        </h2>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
          {faq.map((item, index) => (
            <div
              key={index}
              style={{
                backgroundColor: 'white',
                borderRadius: '0.75rem',
                boxShadow: '0 1px 3px rgba(0, 0, 0, 0.1)',
                border: '1px solid #e5e7eb',
                overflow: 'hidden'
              }}
            >
              <button
                onClick={() => toggleItem(index)}
                style={{
                  width: '100%',
                  padding: '1.25rem 1.5rem',
                  textAlign: 'left',
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'flex-start',
                  border: 'none',
                  background: 'transparent',
                  cursor: 'pointer'
                }}
                onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#f9fafb'}
                onMouseLeave={(e) => e.currentTarget.style.backgroundColor = 'transparent'}
              >
                <div style={{ display: 'flex', alignItems: 'flex-start', gap: '0.75rem' }}>
                  <div style={{
                    width: '1.5rem',
                    height: '1.5rem',
                    backgroundColor: '#3b82f6',
                    borderRadius: '50%',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    marginTop: '0.25rem',
                    flexShrink: 0
                  }}>
                    <span style={{ 
                      fontSize: '0.75rem', 
                      color: 'white', 
                      fontWeight: 'bold' 
                    }}>{index + 1}</span>
                  </div>
                  <span style={{
                    fontWeight: '600',
                    color: '#111827',
                    paddingRight: '1rem',
                    fontSize: '1.125rem',
                    lineHeight: '1.6'
                  }}>
                    {item.q}
                  </span>
                </div>
                <div
                  style={{
                    width: '2rem',
                    height: '2rem',
                    borderRadius: '50%',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    backgroundColor: openItems.includes(index) ? '#dbeafe' : '#f3f4f6',
                    color: openItems.includes(index) ? '#2563eb' : '#6b7280',
                    transform: openItems.includes(index) ? 'rotate(180deg)' : 'rotate(0deg)',
                    transition: 'all 0.2s ease',
                    flexShrink: 0
                  }}
                >
                  <span style={{ fontSize: '0.875rem' }}>▼</span>
                </div>
              </button>
              
              {openItems.includes(index) && (
                <div style={{
                  padding: '1.25rem 1.5rem',
                  borderTop: '1px solid #f3f4f6',
                  backgroundColor: '#eff6ff'
                }}>
                  <div style={{ display: 'flex', gap: '0.75rem' }}>
                    <div style={{
                      width: '1.5rem',
                      height: '1.5rem',
                      backgroundColor: '#10b981',
                      borderRadius: '50%',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      marginTop: '0.25rem',
                      flexShrink: 0
                    }}>
                      <span style={{ 
                        fontSize: '0.75rem', 
                        color: 'white' 
                      }}>✓</span>
                    </div>
                    <p style={{
                      color: '#374151',
                      fontSize: '1rem',
                      lineHeight: '1.6'
                    }}>
                      {item.a}
                    </p>
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}