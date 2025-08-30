# 🚀 Multi-Site Reusable Framework

**Un framework Next.js 14 progettato per creare rapidamente siti web con blog per diversi progetti.**

## 📋 Caratteristiche

- ✅ **Next.js 14** con App Router e TypeScript
- ✅ **MDX** per articoli con frontmatter completo  
- ✅ **Supabase** per database condiviso tra progetti
- ✅ **Brevo** per newsletter e automazioni email
- ✅ **Tailwind CSS** con design system riutilizzabile
- ✅ **SEO avanzata** con JSON-LD e Open Graph
- ✅ **Multi-progetto** con configurazioni indipendenti
- ✅ **Componenti riutilizzabili** per blog, newsletter, FAQ
- ✅ **Sistema di conteggio visualizzazioni**
- ✅ **Condivisione social** con tracking
- ✅ **Q&A integrata** con notifiche email

## 🏗 Struttura del Progetto

```
/
├── config/
│   └── site.config.ts          # Configurazione specifica del progetto
├── lib/
│   ├── mdx.ts                  # Gestione articoli MDX
│   └── supabase.ts             # Database condiviso
├── src/
│   ├── app/
│   │   ├── api/                # API routes (newsletter, Q&A, view-count)
│   │   ├── blog/               # Pagine blog dinamiche
│   │   └── page.tsx            # Homepage
│   └── components/
│       ├── ui/                 # Componenti UI riutilizzabili
│       ├── blog/               # Componenti specifici blog
│       └── newsletter/         # Form newsletter
├── content/
│   └── blog/                   # Articoli in formato MDX
├── public/
│   ├── blog/                   # Immagini articoli
│   ├── og/                     # Open Graph images
│   └── audio/                  # File audio (opzionale)
└── .env.example                # Template variabili ambiente
```

## ⚙️ Setup per Nuovo Progetto

### 1. Clona e Personalizza

```bash
# Clona il framework
cp -r timoteo-site nuovo-progetto
cd nuovo-progetto

# Installa dipendenze
npm install
```

### 2. Configura il Progetto

Modifica `config/site.config.ts`:

```typescript
export const siteConfig: SiteConfig = {
  projectId: 'nuovo-progetto',           // ID univoco
  name: 'Nome del Sito',
  title: 'Titolo SEO',
  description: 'Descrizione del sito',
  url: 'https://nuovosito.com',
  author: {
    name: 'Nome Autore',
    email: 'email@example.com',
    // ... social links
  },
  branding: {
    colors: {
      primaryBlue: '#2563eb',
      // ... altri colori personalizzati
    }
  }
}
```

### 3. Setup Database

#### Supabase (Database Siti Web)
Crea le tabelle con prefisso progetto:

```sql
-- Tabella conteggio visualizzazioni
CREATE TABLE nuovo_progetto_view_counts (
  post_slug TEXT PRIMARY KEY,
  count INTEGER DEFAULT 0,
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);

-- Tabella eventi condivisione
CREATE TABLE nuovo_progetto_share_events (
  id SERIAL PRIMARY KEY,
  post_slug TEXT NOT NULL,
  channel TEXT NOT NULL,
  created_at TIMESTAMP DEFAULT NOW()
);

-- Tabella iscrizioni newsletter
CREATE TABLE nuovo_progetto_subscriptions (
  id SERIAL PRIMARY KEY,
  email TEXT UNIQUE NOT NULL,
  created_at TIMESTAMP DEFAULT NOW(),
  active BOOLEAN DEFAULT true
);
```

### 4. Variabili Ambiente

Copia `.env.example` in `.env.local`:

```bash
# Database
NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_anon_key

# Newsletter
BREVO_API_KEY=your_brevo_api_key
BREVO_LIST_ID=your_list_id

# Progetto
NEXT_PUBLIC_PROJECT_ID=nuovo-progetto
NEXT_PUBLIC_SITE_URL=https://nuovosito.com
```

## 📝 Creazione Articoli

### Formato MDX

Crea file in `content/blog/nome-articolo.mdx`:

```markdown
---
title: "Titolo Articolo"
description: "Descrizione per SEO"
date: "2024-12-20"
category: "Guide" # Guide | Casi Studio | Articoli  
tags: ["tag1", "tag2", "tag3"]
playlist: "Serie-Nome" # opzionale
order: 1 # ordine nella serie
difficulty: "Base" # Base | Intermedio | Avanzato
image: "/blog/immagine-1600x900.jpg"
ogImage: "/og/immagine-1200x630.jpg" # opzionale
audio: "/audio/audio.mp3" # opzionale
faq:
  - q: "Domanda?"
    a: "Risposta dettagliata"
canonical: "https://sito.com/blog/slug"
draft: false
---

# Contenuto Articolo

Il tuo contenuto in **Markdown** con tutte le funzionalità MDX.
```

## 🎨 Personalizzazione Design

### Colori Brand

Modifica `config/site.config.ts` per i colori:

```typescript
branding: {
  colors: {
    primaryDark: '#1a1f36',
    primaryBlue: '#2563eb', 
    accentOrange: '#fb923c',
    // ... personalizza tutti i colori
  }
}
```

### Componenti Riutilizzabili

- `Navigation` - Header con menu responsive
- `ArticleLayout` - Layout articoli con SEO
- `Sidebar` - Sidebar blog con top articoli
- `ShareButtons` - Condivisione social con tracking
- `NewsletterForm` - Form iscrizione con Brevo
- `FAQSection` - Sezione FAQ con JSON-LD
- `AudioPlayer` - Player per podcast/audio

## 🚀 Deploy

### Vercel (Consigliato)

```bash
npm install -g vercel
vercel

# Configura environment variables nel dashboard Vercel
```

### Altri Provider

Il framework è compatibile con qualsiasi provider che supporti Next.js 14.

## 📊 Analytics e Tracking

### View Count Automatico

Ogni visualizzazione articolo viene tracciata automaticamente in Supabase.

### Share Tracking

I clic sui pulsanti di condivisione vengono registrati per analytics.

### Newsletter Analytics

Integrazione completa con Brevo per tracking aperture e click.

## 🔧 Funzionalità Avanzate

### Serie di Articoli (Playlist)

Raggruppa articoli correlati usando il campo `playlist` nel frontmatter.

### Q&A Integrata

Ogni articolo ha una sezione Q&A che invia email di notifica all'autore.

### Audio/Podcast

Supporto nativo per file audio con player integrato.

### Search (TODO)

Sistema di ricerca con Fuse.js o Pagefind.

## 📱 Multi-Progetto Management

### Struttura Database

```
Supabase Database "siti-web":
├── progetto1_view_counts
├── progetto1_share_events  
├── progetto2_view_counts
├── progetto2_share_events
└── ...
```

### Lista Brevo per Progetto

Ogni progetto ha una lista Brevo separata configurata in `BREVO_LIST_ID`.

### Deploy Indipendenti

Ogni progetto può essere deployato su domini diversi mantenendo la stessa base di codice.

## 🤝 Contribuire

Questo framework è progettato per essere esteso. Alcune idee:

- [ ] Sistema di ricerca integrato
- [ ] Commenti con database
- [ ] Dashboard analytics
- [ ] E-commerce integration
- [ ] Multi-lingua
- [ ] Dark mode

## 📞 Supporto

Per domande sul framework o personalizzazioni:
- Email: info@timoteopasquali.it
- GitHub: [Repository issues]

---

**Buon coding!** 🚀