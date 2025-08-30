// Uso in MDX
// <Callout type="warning" title="Attenzione" icon="⚠️">
//   Non spendere più del 10% del fatturato in test non validati!
// </Callout>
// <Callout type="success" icon="✅">Perfetto! Hai completato tutti i passi.</Callout>
// <Callout type="tip" icon="💡">Questo trucco ti farà risparmiare ore di lavoro!</Callout>

import type { ReactNode } from 'react';

type Props = {
  type?: 'info' | 'warning' | 'success' | 'danger' | 'tip';
  children: ReactNode;
  title?: string;
  icon?: string;
};

export default function Callout({ 
  type = 'info', 
  children, 
  title,
  icon 
}: Props) {
  const styles = {
    info: {
      borderColor: '#2563eb',
      backgroundColor: '#eff6ff',
      textColor: '#1e40af',
      iconBg: '#2563eb',
      defaultIcon: 'ℹ️',
    },
    warning: {
      borderColor: '#f59e0b',
      backgroundColor: '#fffbeb',
      textColor: '#92400e',
      iconBg: '#f59e0b',
      defaultIcon: '⚠️',
    },
    success: {
      borderColor: '#10b981',
      backgroundColor: '#f0fdf4',
      textColor: '#047857',
      iconBg: '#10b981',
      defaultIcon: '✅',
    },
    danger: {
      borderColor: '#dc2626',
      backgroundColor: '#fef2f2',
      textColor: '#991b1b',
      iconBg: '#dc2626',
      defaultIcon: '🚨',
    },
    tip: {
      borderColor: '#f97316',
      backgroundColor: '#fff7ed',
      textColor: '#9a3412',
      iconBg: '#f97316',
      defaultIcon: '💡',
    },
  };

  const currentStyle = styles[type];
  const displayIcon = icon || currentStyle.defaultIcon;

  return (
    <div
      style={{
        margin: '2rem 0',
        padding: '1.5rem',
        borderRadius: '12px',
        borderLeft: `4px solid ${currentStyle.borderColor}`,
        backgroundColor: currentStyle.backgroundColor,
        boxShadow: '0 2px 8px rgba(0, 0, 0, 0.08)',
        position: 'relative',
      }}
    >
      <div style={{ display: 'flex', alignItems: 'flex-start', gap: '1rem' }}>
        {/* Icon */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            width: '2.5rem',
            height: '2.5rem',
            borderRadius: '50%',
            backgroundColor: currentStyle.iconBg,
            color: 'white',
            fontSize: '1.2rem',
            flexShrink: 0,
            marginTop: title ? '0.25rem' : '0',
          }}
        >
          {displayIcon}
        </div>

        {/* Content */}
        <div style={{ flex: 1, minWidth: 0 }}>
          {title && (
            <h4
              style={{
                margin: '0 0 0.75rem 0',
                fontSize: '1.1rem',
                fontWeight: '600',
                color: currentStyle.textColor,
                lineHeight: '1.4',
              }}
            >
              {title}
            </h4>
          )}
          <div
            style={{
              color: currentStyle.textColor,
              fontSize: '1rem',
              lineHeight: '1.6',
              margin: 0,
            }}
          >
            {children}
          </div>
        </div>
      </div>
    </div>
  );
}