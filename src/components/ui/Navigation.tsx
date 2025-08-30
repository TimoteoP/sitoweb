'use client';

import Link from 'next/link';
import { useState } from 'react';
import { siteConfig } from '../../../config/site.config';

export default function Navigation() {
  const [open, setOpen] = useState(false);

  return (
    <nav>
      <div className="nav-container">
        <Link href="/" className="logo">
          <div className="logo-icon">🔥</div>
          <span>{siteConfig.name}</span>
        </Link>

        <div className={`nav-links${open ? ' active' : ''}`} id="navLinks">
          <a href="#servizi">Servizi</a>
          <a href="#metodo">Metodo</a>
          <a href="#caso-studio">Case study</a>
          <Link href="/chi-sono">Chi sono</Link>
          <Link href="/blog">Blog</Link>
          <Link href="/contatti">Contatti</Link>
          <a href="#newsletter" className="cta-nav">Guida gratuita</a>
        </div>

        {/* Mobile toggle */}
        <button
          type="button"
          aria-label="Apri/chiudi menu"
          className="mobile-menu-toggle"
          onClick={() => setOpen(!open)}
        >
          <span></span>
          <span></span>
          <span></span>
        </button>
      </div>
    </nav>
  );
}
