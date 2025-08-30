"use client";

import { useEffect } from "react";
import * as CookieConsent from "vanilla-cookieconsent";

// Types for Meta Pixel
interface FbqFunction {
  callMethod?: (...args: unknown[]) => void;
  queue: unknown[];
  push: FbqFunction;
  loaded: boolean;
  version: string;
  (...args: unknown[]): void;
}

interface WindowWithFbq extends Window {
  fbq?: FbqFunction;
  _fbq?: FbqFunction;
  _fbqInitialized?: boolean;
}

export default function CookieBanner() {
  useEffect(() => {
    CookieConsent.run({
      guiOptions: {
        consentModal: { layout: "box", position: "bottom center" },
        preferencesModal: { layout: "box" }
      },
      // Cookie del banner: 182 giorni (≈ 6 mesi)
      cookie: {
        expiresAfterDays: 182,
        sameSite: "Lax",
        secure: true
      },
      // bumpa questo numero quando aggiorni la policy
      revision: 1,
      categories: {
        necessary: { enabled: true, readOnly: true },
        marketing: { autoClear: { cookies: [] } }, // Meta Pixel
        social: {} // YouTube
      },
      language: {
        default: "it",
        translations: {
          it: {
            consentModal: {
              title: "Preferenze cookie",
              description:
                "Usiamo cookie tecnici per far funzionare il sito e, previo consenso, cookie per marketing e contenuti di terze parti. Puoi rifiutare tutto o personalizzare.",
              acceptAllBtn: "Accetta tutto",
              acceptNecessaryBtn: "Rifiuta tutto",
              showPreferencesBtn: "Personalizza"
            },
            preferencesModal: {
              title: "Gestisci le preferenze",
              acceptAllBtn: "Accetta tutto",
              acceptNecessaryBtn: "Rifiuta tutto",
              savePreferencesBtn: "Salva selezione",
              closeIconLabel: "Chiudi",
              sections: [
                {
                  title: "Cookie strettamente necessari",
                  description:
                    "Sempre attivi per sicurezza, login e salvataggio preferenze.",
                  linkedCategory: "necessary"
                },
                {
                  title: "Marketing (Meta Pixel)",
                  description:
                    "Misurazione campagne e remarketing su Facebook/Instagram.",
                  linkedCategory: "marketing"
                },
                {
                  title: "Contenuti esterni (YouTube)",
                  description:
                    "Carica player e media di terze parti solo se acconsenti.",
                  linkedCategory: "social"
                },
                {
                  title: "Maggiori informazioni",
                  description:
                    'Leggi la [Cookie Policy](/cookie-policy).'
                }
              ]
            }
          }
        }
      },
      // Log prima scelta e ogni cambio
      onFirstConsent: ({ cookie }) => {
        fetch("/api/consent", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ event: "first", cookie })
        });
      },
      onChange: ({ cookie }) => {
        fetch("/api/consent", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ event: "change", cookie })
        });
        // attiva/disattiva Pixel in base al consenso
        toggleMetaPixel();
        // gestisci iframes via IframeManager
        window.dispatchEvent(new CustomEvent("cc-consent-changed"));
      }
    });
  }, []);

  return null;
}

// helper per attivare/disattivare Meta Pixel
function toggleMetaPixel() {
  const hasMarketing =
    CookieConsent.getUserPreferences().acceptedCategories.includes("marketing");
  const pixelId = process.env.NEXT_PUBLIC_META_PIXEL_ID;

  // se consenso presente e pixel non inizializzato, inietta
  if (hasMarketing && pixelId && !(window as WindowWithFbq)._fbqInitialized) {
    (function (f: WindowWithFbq, b: Document, e: string) {
      if (f.fbq) return;
      const n = f.fbq = function (...args: unknown[]) {
        if (n.callMethod) {
          n.callMethod(...args);
        } else {
          n.queue.push(args);
        }
      } as FbqFunction;
      
      if (!f._fbq) f._fbq = n;
      n.push = n;
      n.loaded = true;
      n.version = "2.0";
      n.queue = [];
      
      const t = b.createElement(e) as HTMLScriptElement;
      t.async = true;
      t.src = "https://connect.facebook.net/en_US/fbevents.js";
      const s = b.getElementsByTagName(e)[0];
      s.parentNode!.insertBefore(t, s);
    })(window as WindowWithFbq, document, "script");
    
    // Initialize with configured Meta Pixel ID
    (window as WindowWithFbq).fbq?.("init", pixelId);
    (window as WindowWithFbq).fbq?.("track", "PageView");
    (window as WindowWithFbq)._fbqInitialized = true;
  }

  // se revoca consenso, prova a spegnere il pixel
  if (!hasMarketing && (window as WindowWithFbq)._fbqInitialized) {
    try {
      // Non esiste "unload" ufficiale; rimuoviamo script e global
      const scripts = document.querySelectorAll(
        'script[src*="connect.facebook.net"]'
      );
      scripts.forEach((s) => s.parentElement?.removeChild(s));
      delete (window as WindowWithFbq).fbq;
      (window as WindowWithFbq)._fbqInitialized = false;
    } catch {}
  }
}
