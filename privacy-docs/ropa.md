# Registro delle Attività di Trattamento (RoPA) – 25 agosto 2025

## 1. Newsletter (via Brevo)

- **Finalità**: Invio newsletter e aggiornamenti.
- **Base giuridica**: Consenso esplicito.
- **Dati**: Nome, Email.
- **Responsabile**: Brevo (sottoprocessore).
- **Conservazione**: Fino a revoca o dopo 6 newsletter non aperte.
- **Misure di sicurezza**: DPA attivo con Brevo, crittografia TLS.
- **Trasferimento extra-SEE**: Sì, con clausole contrattuali standard.

## 2. Login utenti (Supabase)

- **Finalità**: Autenticazione per accesso aree riservate.
- **Base giuridica**: Esecuzione del servizio.
- **Dati**: Email, password (hash), token/session.
- **Responsabile**: Supabase.
- **Conservazione**: Sessione attiva + 30 giorni.
- **Misure di sicurezza**: Cookie HTTP-only, HTTPS, autenticazione sicura.

## 3. Vercel Web Analytics

- **Finalità**: Analisi anonima del traffico senza cookie.
- **Base giuridica**: Legittimo interesse (misurazione tecnica).
- **Dati**: Visite, pagine, referer, anonimi.
- **Responsabile**: Vercel.
- **Conservazione**: Secondo politica Vercel (anonimizzato e aggregato).
- **Misure di sicurezza**: Standard Vercel, nessun cookie.

## 4. Meta Pixel (Facebook/Instagram)

- **Finalità**: Remarketing, misurazione campagne.
- **Base giuridica**: Consenso esplicito.
- **Dati**: Cookie anonimi legati al browser.
- **Responsabile**: Meta.
- **Conservazione**: Secondo policy di Meta.
- **Misure di sicurezza**: Standard Meta, solo se consenso, etc.
- **Trasferimento extra-SEE**: Sì, con SCC o altro.

## 5. YouTube Embed (Iframe blocked)

- **Finalità**: Visualizzazione video.
- **Base giuridica**: Consenso esplicito.
- **Dati**: Player YouTube, potenzialmente privacy-enhanced.
- **Responsabile**: YouTube/Google.
- **Conservazione**: No dati personali conservati dal sito.
- **Misure di sicurezza**: Blocco preventivo via IframeManager.

## 6. Modalità di contatto via WhatsApp

- **Finalità**: Comunicazione su richiesta.
- **Base giuridica**: Legittimo interesse (su tua chiamata).
- **Dati**: Numero WhatsApp (solo se l’utente lo fornisce).
- **Responsabile**: Meta (WhatsApp).
- **Conservazione**: Fino alla fine della conversazione o revoca.
- **Misure di sicurezza**: Standard WhatsApp.

## 7. Log Consenso Cookie

- **Finalità**: Documentare i consensi per auditor (accountability).
- **Base giuridica**: Obbligo GDPR (accountability).
- **Dati**: Timestamp, categorie accettate, evento (“first”/“change”).
- **Responsabile**: In-house (database Supabase).
- **Conservazione**: 6 mesi.
- **Misure di sicurezza**: Database protetto, service role only.
