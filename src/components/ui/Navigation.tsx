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
          <Link href="/il-metodo">Il Metodo</Link>
          <Link href="/app">App</Link>
          <Link href="/automazioni">Automazioni</Link>
          <Link href="/chatbot">Chatbot</Link>
          <Link href="/blog">Blog</Link>
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
