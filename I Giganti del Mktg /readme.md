# I Giganti del Marketing (MVP)

## **Obiettivo in una frase**

Un  **coach “Mito del Marketing”**  che:

1.  parla con stile riconoscibile,
2.  attinge a una  **knowledge base curata**  (no allucinazioni),
3.  **porta ogni idea al livello di un piccolo business locale**, con step attuabili.

----------

## **Architettura minima (modulare)**

[React Native app] ──> [API Orchestrator (Node)] │ ├─ call → [MCP Persona Sessions] ← persona/stile/flow │ └─ retrieval → [Supabase: docs + pgvector] ↑ ingest/curation pipeline

-   **MCP Persona**: gestisce persona, fasi, timer, turni.
-   **Retrieval**: prima di ogni risposta, passiamo al coach 3–6 “nugget” della  **KB**  più pertinenti.
-   **Output**: il coach produce consigli ma  **deve**  rispettare regole di adattamento “piccola realtà locale”.

----------

## **Cosa entra nella Knowledge Base (e cosa no)**

Evitiamo guai legali e cibo per allucinazioni.

## **Fonti consentite**

-   Riassunti originali delle teorie (scritti da noi).
-   Citazioni brevi e commentate (pochissime parole).
-   Interviste pubbliche con link di riferimento.
-   Case study creati da noi che “traducono” i concetti in locale.

## **Struttura dei documenti**

Ogni doc è un JSON/Markdown con metadata chiari:

-   author: “Seth Godin” (o Ogilvy, ecc.)
-   concept: es. “Purple Cow”, “Permission Marketing”
-   level: “theory” | “playbook” | “local-adaptation”
-   use_case: es. “parrucchiere”, “idraulico”, “elettricista”
-   constraints: “budget<500€/mese”, “no-crew video”
-   summary: nostro riassunto originale
-   tactics: elenco di mosse pratiche
-   pitfalls: errori comuni
-   kpis: misure concrete (es. lead/mese, CTR, costo/chiamata)
-   refs: link di supporto (no full-text protetto)

**Schema DB (Supabase)**

t_marketing_docs(id, author, concept, level, use_case[], constraints[], summary, tactics jsonb, pitfalls jsonb, kpis jsonb, embedding vector, created_at)

----------

# **Retrieval sobrio (niente Pinecone, basta pgvector)**

1.  Filtra per author = "Seth Godin" e use_case se noto (es. idraulico).
2.  Calcola top-k vettoriale su summary + tactics.
3.  **Recency/quality boost**: se il doc è “local-adaptation”, dargli +peso.
4.  Dedup/diversifica: massimo 1 doc per concept.
5.  Passa al coach  **solo bullet sintetici**: 3–6 snippet, 80–120 parole ciascuno.

----------

# **Persona e guardrail: “Godin, ma per botteghe vere”**

Usiamo MCP Persona Sessions con una persona “Godin-like” e  **rulebook**  che forza l’adattamento locale. Per ogni “mito” creiamo:

-   **Persona file**: identità, tono, cosa fare/non fare.
-   **Rulebook**: vincoli non negoziabili.
-   **Templates**: prompt d’avvio e di risposta con sezioni fisse.

## **Esempio di regole (estratto)**

-   **Obiettivo**: ogni risposta termina con un  **piano in 3 mosse sotto 250€/mese**.
-   **Vincoli**: niente consigli enterprise, niente “viral or death”, vietate tattiche non etiche.
-   **Output scaffold**:
    1.  “Principio in 1 riga”
    2.  “Traduzione per micro-impresa”
    3.  “Piano 7 giorni” (3 step, con stima tempi/costi)
    4.  “KPI da misurare”
    5.  “Prossimo passo domani (15 min)”

> Se parli di “mucca viola”,
> 
> **obbligo**

----------

# **File da creare (prima stesura, in ordine)**

## **1)**

## **KB seed**

## **(5–10 doc max)**

-   kb/godin/permission_marketing.local-playbook.md
-   kb/godin/purple_cow.local-adaptation.md
-   kb/godin/tribes.community-starter.md
-   kb/godin/storytelling.microbrand-basics.md
-   kb/godin/differentiation.no-budget-tactics.md

Ognuno con metadata + summary + 5–7 tactic locali.

## **2)**

## **Ingestion script**

-   scripts/ingest_kb.ts
    -   parse MD/JSON → upsert in t_marketing_docs
    -   crea embedding (pgvector)
    -   valida campi obbligatori

## **3)**

## **Retriever**

-   api/marketing/retrieve.ts
    -   input: author, use_case, query
    -   output: 3–6 nugget sintetici (title, bullets)

## **4)**

## **Persona MCP**

-   roles/Role-Godin-IT.md
    -   Identità/tono: sintetico, provocatorio ma concreto
    -   Non fare: buzzword, campagne > 500€/mese
    -   Fai: 3 mosse low-budget, KPI specifici
-   session_types.yaml
    -   GODIN_LOCAL_10: 10 minuti, fasi rapide, output scaffold obbligatorio

## **5)**

## **Orchestrator hook**

-   api/sessions/init.ts: se coach=Godin, chiama marketing/retrieve con use_case dell’utente, aggiungi i nugget al context
-   api/sessions/close.ts: valida che l’output abbia piano 3 mosse + KPI

----------

# **Anti-allucinazioni e stile coerente**

-   **Context stretto**: passiamo solo i nugget selezionati, non 20 pagine di fuffa.
-   **Parser strutturato**: Zod/Valibot per imporre lo schema dell’output; se mancano KPI/step, richiedi riformulazione al coach.
-   **Frasi-ancora**: una lista breve di frasi consentite “in stile Godin” ma non imitazioni testuali.
-   **Cite light**: “Basato su: Permission Marketing (riassunto)” con link. Niente citazioni lunghe.

----------

# **Esempio di trasformazione “da mito a bottega”**

**Input utente**: “Sono un idraulico a La Spezia, 300€/mese di budget.”

**Risposta attesa (scaffold):**

1.  Principio: “Costruisci fiducia chiedendo il permesso, non attenzioni a pagamento.”
2.  Traduzione micro: “Crea una lista WhatsApp opt-in per clienti serviti negli ultimi 12 mesi.”
3.  Piano 7 giorni:
    -   Giorno 1–2: landing 1-schermata con QR nel furgone e biglietti (15€ stampa).
    -   Giorno 3–5: offerta “check caldaia a 15€” per iscritti, 20 slot/mese.
    -   Giorno 6–7: flusso messaggi 3 step (opt-in, reminder, follow-up recensione).
4.  KPI: iscritti/mese, tasso prenotazione, costo per prenotazione, recensioni nuove.
5.  Domani: “prepara QR + messaggio opt-in; 15 minuti.”

Zero “fate la Mucca Viola e che Dio ve la mandi buona.”

----------

# **Test rapido di qualità (prima di portarlo fuori)**

-   **Golden prompts**: 10 input tipici (idraulico, parrucchiere, elettricista, estetista, palestra) con output atteso.
-   **Check di forma**: presenza delle 5 sezioni, limiti di budget rispettati, KPI presenti.
-   **A/B “senza KB vs con KB”**: il con-KB deve ridurre consigli generici di almeno il 50%.
-   **Robustezza budget**: se l’utente scrive 100€/mese, il coach non spara Google Ads da 500€.
-   **Hallucination gate**: se non ha nugget rilevanti, ammette incertezza e propone micro-esperimento, non inventa case study.

----------

# **Sicurezza e costo**

-   **Supabase EU**  per DB e embeddings, nessun SaaS extra.
-   **PII minimization**: niente nomi clienti nei docs; prompt sanitizzati.
-   **Costo**: quasi nullo oltre al modello LLM. Scalabile a Ogilvy/Cialdini clonando la struttura (nuova KB + nuova persona + stesse API).

----------

# **Riuso immediato per altri “miti”**

-   **Ogilvy**: focus su headline, offerte, prove; scaffolding: “Big Idea + Offerta + Prova + CTA”; playbook locali per volantini, landing e annunci search.
-   **Cialdini**: principi di persuasione tradotti in  **etichette locali**: riprova sociale con recensioni, scarsità su slot limitati, autorità con badge/certificazioni.
-   **Kahneman**: dual-track “System 1 (hook) / System 2 (decisione)” con bias checklist; KPI: riduzione tempo decisione, aumento completamento form.

Stessa pipeline, cambia solo KB + persona + guardrail.

----------

# **Conclusione**

Sì, ci serve. Facciamo  **un primo coach “Mito”**  (Godin-like) su MCP Persona Sessions, con  **KB curata**  e  **regole ferree di localizzazione**. È economico, testabile e, soprattutto,  **riusabile**  per tutta la serie: “Giganti del Marketing”, “Kahneman”, “Dalio”.

Costruiamo oggi i tre mattoni che contano:  **persona, KB modulare, retriever sobrio**. Domani cloni e lanci il prossimo mito senza riscrivere il mondo.xx