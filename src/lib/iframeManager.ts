"use client";

import * as CookieConsent from "vanilla-cookieconsent";

type Manager = {
  run: (config: unknown) => void;
  setConsent: (config: Record<string, boolean>) => void;
};

function isFunction(v: unknown): v is (...args: unknown[]) => unknown {
  return typeof v === 'function';
}

function isManager(v: unknown): v is Manager {
  return typeof v === 'object' && v !== null && 'run' in (v as Record<string, unknown>);
}

// Safe, minimal, consent-aware iframe manager
export async function mountIframeManager() {
  try {
    const imported: unknown = await import('@orestbida/iframemanager');
    const rec = imported as Record<string, unknown>;

    let manager: Manager | null = null;
    if (isFunction(rec.default)) {
      manager = (rec.default as (...a: unknown[]) => unknown)() as Manager;
    } else if (isFunction((rec as { iframemanager?: unknown }).iframemanager)) {
      const factory = (rec as { iframemanager?: unknown }).iframemanager as (...a: unknown[]) => unknown;
      manager = factory() as Manager;
    } else if (isManager(rec.default)) {
      manager = rec.default as Manager;
    }

    if (!manager || !isFunction(manager.run)) {
      console.warn('iframemanager module shape not recognized');
      return;
    }
    manager.run({
      currLang: 'it',
      services: {
        youtube: {
          embedUrl: 'https://www.youtube-nocookie.com/embed/{data-id}',
          thumbnailUrl: 'https://i3.ytimg.com/vi/{data-id}/hqdefault.jpg',
          iframe: {
            allow: 'accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture; fullscreen',
            params: 'rel=0&modestbranding=1'
          },
          languages: {
            it: {
              notice: 'Per vedere questo contenuto (YouTube) devi accettare i cookie della categoria Social.',
              loadBtn: 'Carica il video'
            }
          },
          onAccept: () => {
            // nothing extra
          }
        }
      }
    });

    const syncConsent = () => {
      const prefs = CookieConsent.getUserPreferences();
      const hasSocial = prefs.acceptedCategories.includes('social');
      manager.setConsent({ youtube: hasSocial });
    };

    // Initial sync + listen for changes from CookieBanner
    syncConsent();
    window.addEventListener('cc-consent-changed', syncConsent);
  } catch (error) {
    console.error('Failed to load iframemanager:', error);
  }
}
