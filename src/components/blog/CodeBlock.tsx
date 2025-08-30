// Uso in MDX
// <CodeBlock language="javascript" title="Esempio di funzione" filename="greet.js">
// {`const greet = (name) => {
//   console.log("Ciao " + name);
//   return \`Saluto per \${name}\`;
// };`}
// </CodeBlock>

'use client';

import { useState } from 'react';

type Props = {
  children: string;
  language?: string;
  title?: string;
  filename?: string;
  highlightLines?: number[];
  showLineNumbers?: boolean;
};

const languageColors = {
  javascript: '#f7df1e',
  typescript: '#3178c6',
  python: '#3776ab',
  css: '#1572b6',
  html: '#e34f26',
  json: '#000000',
  bash: '#4eaa25',
  sql: '#336791',
  php: '#777bb4',
};

export default function CodeBlock({ 
  children, 
  language = 'text',
  title,
  filename,
  highlightLines = [],
  showLineNumbers = true
}: Props) {
  const [copied, setCopied] = useState(false);

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(children);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error('Failed to copy code:', err);
    }
  };

  const lines = children.split('\n');
  const languageColor = languageColors[language as keyof typeof languageColors] || '#6b7280';

  return (
    <div style={{ margin: '2rem 0' }}>
      {/* Header */}
      {(title || filename || language) && (
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            backgroundColor: '#1f2937',
            padding: '0.75rem 1rem',
            borderTopLeftRadius: '12px',
            borderTopRightRadius: '12px',
            borderBottom: '1px solid #374151',
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
            {filename && (
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <div
                  style={{
                    width: '12px',
                    height: '12px',
                    borderRadius: '50%',
                    backgroundColor: languageColor,
                  }}
                />
                <span style={{ 
                  color: '#e5e7eb', 
                  fontSize: '0.875rem', 
                  fontFamily: 'ui-monospace, monospace' 
                }}>
                  {filename}
                </span>
              </div>
            )}
            {title && (
              <span style={{ 
                color: '#d1d5db', 
                fontSize: '0.875rem',
                fontWeight: '500' 
              }}>
                {title}
              </span>
            )}
            {!filename && !title && (
              <span style={{ 
                color: '#9ca3af', 
                fontSize: '0.75rem',
                textTransform: 'uppercase',
                letterSpacing: '0.05em',
                fontWeight: '600'
              }}>
                {language}
              </span>
            )}
          </div>
          
          <button
            onClick={copy}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '0.5rem',
              padding: '0.5rem 0.75rem',
              backgroundColor: copied ? '#10b981' : '#374151',
              color: 'white',
              border: 'none',
              borderRadius: '6px',
              fontSize: '0.75rem',
              fontWeight: '500',
              cursor: 'pointer',
              transition: 'all 0.2s ease',
            }}
            onMouseEnter={(e) => {
              if (!copied) {
                e.currentTarget.style.backgroundColor = '#4b5563';
              }
            }}
            onMouseLeave={(e) => {
              if (!copied) {
                e.currentTarget.style.backgroundColor = '#374151';
              }
            }}
          >
            {copied ? (
              <>
                <span>✓</span>
                <span>Copiato</span>
              </>
            ) : (
              <>
                <span>📋</span>
                <span>Copia</span>
              </>
            )}
          </button>
        </div>
      )}

      {/* Code content */}
      <div
        style={{
          backgroundColor: '#111827',
          borderRadius: (title || filename || language) ? '0 0 12px 12px' : '12px',
          overflow: 'hidden',
          border: '1px solid #374151',
          boxShadow: '0 4px 12px rgba(0, 0, 0, 0.15)',
        }}
      >
        {/* Copy button for blocks without header */}
        {!(title || filename || language) && (
          <button
            onClick={copy}
            style={{
              position: 'absolute',
              top: '1rem',
              right: '1rem',
              zIndex: 10,
              display: 'flex',
              alignItems: 'center',
              gap: '0.5rem',
              padding: '0.5rem 0.75rem',
              backgroundColor: copied ? '#10b981' : 'rgba(55, 65, 81, 0.8)',
              color: 'white',
              border: 'none',
              borderRadius: '6px',
              fontSize: '0.75rem',
              fontWeight: '500',
              cursor: 'pointer',
              transition: 'all 0.2s ease',
              backdropFilter: 'blur(4px)',
            }}
          >
            {copied ? '✓ Copiato' : '📋 Copia'}
          </button>
        )}

        <div style={{ position: 'relative' }}>
          <pre
            style={{
              margin: 0,
              padding: '1.5rem',
              overflow: 'auto',
              fontSize: '0.875rem',
              lineHeight: '1.6',
              fontFamily: 'ui-monospace, SFMono-Regular, "SF Mono", Monaco, Consolas, monospace',
              color: '#e5e7eb',
            }}
          >
            {showLineNumbers ? (
              <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                <tbody>
                  {lines.map((line, index) => (
                    <tr key={index}>
                      <td
                        style={{
                          width: '3em',
                          textAlign: 'right',
                          paddingRight: '1rem',
                          color: '#6b7280',
                          fontSize: '0.75rem',
                          userSelect: 'none',
                          borderRight: '1px solid #374151',
                        }}
                      >
                        {index + 1}
                      </td>
                      <td
                        style={{
                          paddingLeft: '1rem',
                          backgroundColor: highlightLines.includes(index + 1) 
                            ? 'rgba(59, 130, 246, 0.1)' 
                            : 'transparent',
                        }}
                      >
                        <code>{line}</code>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            ) : (
              <code>{children}</code>
            )}
          </pre>
        </div>
      </div>
    </div>
  );
}