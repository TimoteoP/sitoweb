// Uso in MDX
// <CTA label="Scarica la guida gratuita" href="/risorse/guida.pdf" />
// <CTA label="Prenota consulenza gratuita" href="/contatti" variant="orange" />

type Props = {
  label: string;
  href: string;
  variant?: 'blue' | 'orange' | 'green';
  size?: 'sm' | 'md' | 'lg';
  icon?: string;
  external?: boolean;
};

export default function CTA({ 
  label, 
  href, 
  variant = 'blue', 
  size = 'md', 
  icon, 
  external = false 
}: Props) {
  const baseStyles = {
    display: 'inline-flex',
    alignItems: 'center',
    gap: '0.75rem',
    fontWeight: '600',
    textDecoration: 'none',
    borderRadius: '12px',
    transition: 'all 0.2s ease',
    boxShadow: '0 4px 12px rgba(0, 0, 0, 0.15)',
    transform: 'translateY(0)',
    border: 'none',
    cursor: 'pointer',
    fontFamily: 'inherit',
    textAlign: 'center' as const,
  };

  const variants = {
    blue: {
      backgroundColor: '#2563eb',
      color: 'white',
      hoverColor: '#1d4ed8',
    },
    orange: {
      backgroundColor: '#f97316', 
      color: 'white',
      hoverColor: '#ea580c',
    },
    green: {
      backgroundColor: '#107c41',
      color: 'white', 
      hoverColor: '#0f5132',
    },
  };

  const sizes = {
    sm: {
      padding: '0.75rem 1.5rem',
      fontSize: '0.875rem',
    },
    md: {
      padding: '1rem 2rem',
      fontSize: '1rem',
    },
    lg: {
      padding: '1.25rem 2.5rem',
      fontSize: '1.125rem',
    },
  };

  const currentVariant = variants[variant];
  const currentSize = sizes[size];

  return (
    <div style={{ margin: '2rem 0', textAlign: 'center' }}>
      <a
        href={href}
        target={external ? '_blank' : undefined}
        rel={external ? 'noopener noreferrer' : undefined}
        style={{
          ...baseStyles,
          ...currentSize,
          backgroundColor: currentVariant.backgroundColor,
          color: currentVariant.color,
        }}
        onMouseEnter={(e) => {
          e.currentTarget.style.backgroundColor = currentVariant.hoverColor;
          e.currentTarget.style.transform = 'translateY(-2px)';
          e.currentTarget.style.boxShadow = '0 8px 25px rgba(0, 0, 0, 0.2)';
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.backgroundColor = currentVariant.backgroundColor;
          e.currentTarget.style.transform = 'translateY(0)';
          e.currentTarget.style.boxShadow = '0 4px 12px rgba(0, 0, 0, 0.15)';
        }}
      >
        {icon && <span style={{ fontSize: '1.2em' }}>{icon}</span>}
        <span>{label}</span>
        {external && <span style={{ fontSize: '0.8em' }}>↗</span>}
      </a>
    </div>
  );
}