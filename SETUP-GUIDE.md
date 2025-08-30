# 🚀 Guida Setup Completa - Framework Multi-Sito

Segui questa guida passo-passo per configurare il tuo nuovo sito con il framework.

## ✅ Pre-requisiti

- [ ] Account **Vercel** (gratuito)
- [ ] Account **Supabase** (gratuito) 
- [ ] Account **Brevo** (ex-Sendinblue) per newsletter
- [ ] Node.js 18+ installato
- [ ] Git configurato

## 📋 Step 1: Setup Progetto

### 1.1 Clona e Personalizza

```bash
# Copia il framework
cp -r timoteo-site il-mio-nuovo-sito
cd il-mio-nuovo-sito

# Installa dipendenze
npm install

# Rimuovi riferimenti al progetto originale
rm -rf .git
git init
git add .
git commit -m "Initial commit - New project setup"
```

### 1.2 Configura Site Config

Modifica `config/site.config.ts`:

```typescript
export const siteConfig: SiteConfig = {
  projectId: 'il-mio-progetto',              // IMPORTANTE: usa trattini
  name: 'Il Mio Sito',
  title: 'Il Mio Sito - Titolo SEO',
  description: 'Descrizione del mio sito per SEO',
  url: 'https://ilmiosito.com',
  
  author: {
    name: 'Il Mio Nome',
    email: 'email@ilmiosito.com',
    social: {
      linkedin: 'https://linkedin.com/in/tuo-profilo',
      // ... altri social
    },
  },
  
  branding: {
    logo: '🚀', // Il tuo emoji o logo
    colors: {
      primaryBlue: '#2563eb',     // Personalizza i colori
      accentOrange: '#fb923c',
      // ... altri colori
    }
  },
  
  // NON CAMBIARE QUESTI FINCHÉ NON HAI CONFIGURATO I SERVIZI
  database: {
    supabaseUrl: process.env.NEXT_PUBLIC_SUPABASE_URL || '',
    supabaseAnonKey: process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || '',
  },
  newsletter: {
    brevoApiKey: process.env.BREVO_API_KEY || '',
    listId: parseInt(process.env.BREVO_LIST_ID || '1'),
  },
};
```

## 📊 Step 2: Setup Supabase

### 2.1 Crea Progetto Supabase

1. Vai su [supabase.com](https://supabase.com)
2. Crea nuovo progetto
3. Salva URL e anon key

### 2.2 Setup Database

1. Nel dashboard Supabase, vai su **SQL Editor**
2. Apri il file `supabase-setup.sql` del framework
3. **IMPORTANTE**: Sostituisci `timoteo_pasquali` con il tuo project_id usando **underscore**

```sql
-- Se il tuo projectId è "il-mio-progetto", usa "il_mio_progetto" nelle tabelle
-- Esempio:
CREATE TABLE IF NOT EXISTS il_mio_progetto_view_counts (
    -- ...
);
```

4. Esegui lo script SQL completo
5. Verifica che le tabelle siano create

### 2.3 Configura Environment Variables

Crea `.env.local`:

```bash
# Supabase
NEXT_PUBLIC_SUPABASE_URL=https://tuo-progetto.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJ...tua_anon_key

# Brevo (configureremo dopo)
BREVO_API_KEY=
BREVO_LIST_ID=

# Progetto
NEXT_PUBLIC_PROJECT_ID=il-mio-progetto
NEXT_PUBLIC_SITE_URL=https://ilmiosito.com
```

## 📧 Step 3: Setup Brevo

### 3.1 Crea Account Brevo

1. Vai su [brevo.com](https://brevo.com) (ex Sendinblue)
2. Crea account gratuito
3. Verifica email

### 3.2 Setup API e Lista

1. Vai su **Impostazioni** → **Chiavi API**
2. Crea nuova chiave API → copia
3. Vai su **Contatti** → **Liste** 
4. Crea nuova lista (es. "Il Mio Sito Newsletter")
5. Salva l'ID della lista (numero)

### 3.3 Aggiorna Environment

Aggiorna `.env.local`:

```bash
BREVO_API_KEY=xkeysib-tua-api-key-qui
BREVO_LIST_ID=123  # Il numero ID della tua lista
```

### 3.4 Crea Template Email (Opzionale)

Per il lead magnet automatico:

1. **Campagne** → **Template email**
2. Crea template per guida gratuita
3. Salva l'ID template
4. Aggiorna `src/app/api/newsletter/route.ts` con il tuo template ID

## 📝 Step 4: Contenuti

### 4.1 Primo Articolo

Crea `content/blog/il-mio-primo-articolo.mdx`:

```markdown
---
title: "Il Mio Primo Articolo"
description: "Una breve descrizione per SEO"
date: "2024-12-20"
category: "Guide"
tags: ["tutorial", "primo-post"]
image: "/blog/primo-articolo-1600x900.jpg"
draft: false
---

# Benvenuto nel mio blog!

Questo è il mio primo articolo creato con il framework...
```

### 4.2 Immagini

Aggiungi immagini in:
- `public/blog/` - Immagini articoli (1600x900)
- `public/og/` - Open Graph images (1200x630)

### 4.3 Personalizza Homepage

Modifica `src/app/page.tsx` per aggiornare:
- Testi hero section
- Servizi offerti
- Testimonials
- CTA buttons

## 🚀 Step 5: Deploy su Vercel

### 5.1 Deploy

```bash
# Installa Vercel CLI
npm i -g vercel

# Deploy
vercel

# Segui il wizard:
# - Link a Git repository? Yes
# - Deploy settings? Use defaults
```

### 5.2 Configura Environment Variables

Nel dashboard Vercel:

1. **Settings** → **Environment Variables**
2. Aggiungi tutte le variabili del tuo `.env.local`
3. **Importante**: Aggiorna `NEXT_PUBLIC_SITE_URL` con il tuo dominio Vercel

### 5.3 Test Completo

1. Visita il sito deployato
2. Testa il form newsletter
3. Controlla la sezione Q&A di un articolo
4. Verifica analytics su Supabase

## 🔧 Step 6: Personalizzazioni Avanzate

### 6.1 Domini Personalizzati

1. **Vercel dashboard** → **Settings** → **Domains** 
2. Aggiungi il tuo dominio
3. Configura DNS secondo le istruzioni
4. Aggiorna `NEXT_PUBLIC_SITE_URL`

### 6.2 Analytics (Opzionale)

Aggiungi Google Analytics o Plausible:

```typescript
// In config/site.config.ts
export const siteConfig = {
  // ...
  analytics: {
    plausibleDomain: 'ilmiosito.com',
    // o googleAnalyticsId: 'G-XXXXXXXXXX'
  }
}
```

### 6.3 WhatsApp Business

Aggiorna il numero WhatsApp in `QASection.tsx`:

```typescript
// Sostituisci 393123456789 con il tuo numero
const whatsappUrl = `https://wa.me/393456789012?text=${whatsappMessage}`;
```

## ✅ Checklist Pre-Launch

Prima di rendere pubblico il sito:

- [ ] Tutti i link funzionano
- [ ] Form newsletter funziona (test con email reale)
- [ ] Q&A system invia email correttamente
- [ ] SEO ottimizzata (meta tags, sitemap)
- [ ] Immagini ottimizzate
- [ ] Test su mobile e desktop
- [ ] Privacy policy aggiornata
- [ ] Social links corretti
- [ ] Database Supabase funziona
- [ ] View counting attivo
- [ ] Share buttons funzionano

## 🔄 Step 7: Secondo Progetto

Per creare un secondo sito:

1. Copia di nuovo il framework
2. **IMPORTANTE**: Cambia `projectId` in `site.config.ts`
3. **Crea nuove tabelle** Supabase con il nuovo prefixe
4. **Nuova lista** Brevo per il nuovo progetto
5. **Nuovo repository** Git
6. **Nuovo progetto** Vercel

Esempio per secondo cliente:

```typescript
// config/site.config.ts
export const siteConfig: SiteConfig = {
  projectId: 'cliente-azienda',  // Nuovo ID
  // ...
}
```

```sql
-- Nuove tabelle Supabase
CREATE TABLE cliente_azienda_view_counts (
  -- ...
);
```

## 🆘 Troubleshooting

### Errori Comuni

1. **Database non funziona**: Verifica RLS policies in Supabase
2. **Newsletter non invia**: Controlla chiavi API Brevo
3. **Build fallisce**: Verifica sintassi MDX articoli
4. **404 su articoli**: Controlla nomi file e slug

### Supporto

- **Documentazione completa**: `README-FRAMEWORK.md`
- **Issues**: Controlla gli errori nel browser console
- **Database**: Verifica logs su Supabase
- **Email**: Controlla logs su Brevo

---

**🎉 Complimenti! Il tuo sito è pronto!**

Ora puoi concentrarti sulla creazione di contenuti di valore per il tuo pubblico.