import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
    './content/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          dark: '#1a1f36',
          blue: '#2563eb',
        },
        accent: {
          orange: '#fb923c',
          'orange-pure': '#f97316',
        },
        excel: {
          green: '#107c41',
        },
        error: {
          red: '#dc2626',
        },
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
      },
      typography: {
        DEFAULT: {
          css: {
            maxWidth: 'none',
            color: '#374151',
            lineHeight: '1.75',
            fontSize: '1.125rem',
            h1: {
              color: '#111827',
              fontSize: '2.25rem',
              fontWeight: '700',
              lineHeight: '2.5rem',
              marginBottom: '2rem',
              marginTop: '2rem',
            },
            h2: {
              color: '#111827',
              fontSize: '1.875rem',
              fontWeight: '600',
              lineHeight: '2.25rem',
              marginBottom: '1.5rem',
              marginTop: '2rem',
            },
            h3: {
              color: '#111827',
              fontSize: '1.5rem',
              fontWeight: '600',
              lineHeight: '2rem',
              marginBottom: '1rem',
              marginTop: '1.5rem',
            },
            p: {
              marginBottom: '1.5rem',
            },
            a: {
              color: '#2563eb',
              textDecoration: 'underline',
              '&:hover': {
                color: '#1d4ed8',
              },
            },
            strong: {
              color: '#111827',
              fontWeight: '600',
            },
            ul: {
              listStyleType: 'disc',
              paddingLeft: '1.5rem',
              marginBottom: '1.5rem',
            },
            ol: {
              listStyleType: 'decimal',
              paddingLeft: '1.5rem',
              marginBottom: '1.5rem',
            },
            li: {
              marginBottom: '0.5rem',
            },
            blockquote: {
              borderLeftWidth: '4px',
              borderLeftColor: '#2563eb',
              paddingLeft: '1rem',
              paddingTop: '0.5rem',
              paddingBottom: '0.5rem',
              backgroundColor: '#eff6ff',
              fontStyle: 'italic',
              marginBottom: '1.5rem',
            },
            code: {
              backgroundColor: '#f3f4f6',
              padding: '0.25rem 0.5rem',
              borderRadius: '0.25rem',
              fontSize: '0.875rem',
              fontFamily: 'ui-monospace, SFMono-Regular, "SF Mono", monospace',
            },
            pre: {
              backgroundColor: '#111827',
              color: '#f9fafb',
              padding: '1rem',
              borderRadius: '0.5rem',
              overflowX: 'auto',
              marginBottom: '1.5rem',
              fontSize: '0.875rem',
              code: {
                backgroundColor: 'transparent',
                padding: '0',
                color: 'inherit',
              },
            },
            table: {
              width: '100%',
              borderCollapse: 'collapse',
              marginBottom: '1.5rem',
            },
            th: {
              backgroundColor: '#f9fafb',
              border: '1px solid #d1d5db',
              padding: '0.75rem 1rem',
              textAlign: 'left',
              fontWeight: '600',
            },
            td: {
              border: '1px solid #d1d5db',
              padding: '0.75rem 1rem',
            },
          },
        },
      },
    },
  },
  plugins: [
    require('@tailwindcss/typography'),
    require('@tailwindcss/line-clamp'),
  ],
}

export default config