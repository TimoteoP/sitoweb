/**
 * Site Configuration
 * Reusable configuration for multiple projects
 */

export interface SiteConfig {
  projectId: string;
  name: string;
  title: string;
  description: string;
  url: string;
  author: {
    name: string;
    email: string;
    social: {
      linkedin?: string;
      youtube?: string;
      facebook?: string;
      instagram?: string;
      whatsapp?: string;
    };
  };
  branding: {
    logo: string;
    favicon: string;
    colors: {
      primaryDark: string;
      primaryBlue: string;
      accentOrange: string;
      accentOrangePure: string;
      excelGreen: string;
      errorRed: string;
    };
  };
  seo: {
    keywords: string[];
    ogImage: string;
  };
  database: {
    supabaseUrl: string;
    supabaseAnonKey: string;
  };
  newsletter: {
    brevoApiKey: string;
    listId: number;
  };
  features: {
    blog: boolean;
    newsletter: boolean;
    analytics: boolean;
    search: boolean;
  };
}

// Current project configuration
export const siteConfig: SiteConfig = {
  projectId: 'timoteo_pasquali',
  name: 'Timoteo Pasquali',
  title: 'Timoteo Pasquali - Addio Excel, ti portiamo nel nuovo millennio',
  description: 'Consulente in marketing, AI e automazioni per imprenditori e professionisti over 35. Creati il software su misura senza scrivere una riga di codice.',
  url: 'https://timoteopasquali.it',
  author: {
    name: 'Timoteo Pasquali',
    email: 'info@timoteopasquali.it',
    social: {
      linkedin: 'https://www.linkedin.com/in/timoteopasquali/',
      youtube: 'https://www.youtube.com/@timoteopasquali.business',
      facebook: 'https://www.facebook.com/TimoteoPasqualiBusiness/',
      // Optional: direct WhatsApp link (e.g., https://wa.me/39XXXXXXXXXX)
      // whatsapp: 'https://wa.me/39XXXXXXXXXX',
    },
  },
  branding: {
    logo: '🔥',
    favicon: '/favicon.ico',
    colors: {
      primaryDark: '#1a1f36',
      primaryBlue: '#2563eb',
      accentOrange: '#fb923c',
      accentOrangePure: '#f97316',
      excelGreen: '#107c41',
      errorRed: '#dc2626',
    },
  },
  seo: {
    keywords: [
      'automazione business',
      'eliminare excel', 
      'IA per imprenditori',
      'marketing automation',
      'consulenza digitale',
      'consulenze marketing',
      'IA in azienda',
      'IA per professionisti',
      'vibe coding',
      'no code',
      'automatizzare i processi aziendali',
      'intelligenza artificiale per il business',
      'risparmia tempo e soldi con l"IA',
      'consulenza digitale'
    ],
    ogImage: '/og/og-default.jpg',
  },
  database: {
    supabaseUrl: process.env.NEXT_PUBLIC_SUPABASE_URL || '',
    supabaseAnonKey: process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || '',
  },
  newsletter: {
    brevoApiKey: process.env.BREVO_API_KEY || '',
    listId: parseInt(process.env.BREVO_LIST_ID || '1'),
  },
  features: {
    blog: true,
    newsletter: true,
    analytics: true,
    search: true,
  },
};

export default siteConfig;
