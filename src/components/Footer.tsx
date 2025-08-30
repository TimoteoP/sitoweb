import Link from 'next/link';
import { siteConfig } from '../../config/site.config';

interface FooterProps {
  currentPage?: string;
}

export default function Footer({ currentPage }: FooterProps) {
  return (
    <footer>
      <div className="footer-content">
        {/* Three Column Footer Layout */}
        <div style={{ 
          display: 'grid',
          gridTemplateColumns: '1fr 1fr 1fr',
          gap: '2rem',
          alignItems: 'start',
          marginBottom: '2rem'
        }}>
          
          {/* Left Column - Legal Menu */}
          <div>
            <h4 style={{ 
              color: 'white',
              fontSize: '0.875rem',
              fontWeight: '600',
              marginBottom: '1rem',
              textTransform: 'uppercase',
              letterSpacing: '0.05em',
              margin: '0 0 1rem 0'
            }}>
              Legal Menu
            </h4>
            <nav style={{ 
              display: 'flex',
              flexDirection: 'column',
              gap: '0.5rem',
              background: 'transparent'
            }}>
              <Link 
                href="/cookie-policy" 
                className={`footer-legal-link ${currentPage === 'cookie-policy' ? 'active' : ''}`}
                style={{
                  background: 'transparent',
                  border: 'none',
                  padding: '0'
                }}
              >
                Cookie Policy
              </Link>
              <Link 
                href="/privacy-policy" 
                className={`footer-legal-link ${currentPage === 'privacy-policy' ? 'active' : ''}`}
                style={{
                  background: 'transparent',
                  border: 'none',
                  padding: '0'
                }}
              >
                Privacy Policy
              </Link>
            </nav>
          </div>

          {/* Center Column - Socials */}
          <div style={{ textAlign: 'center' }}>
            <h4 style={{ 
              color: 'white',
              fontSize: '0.875rem',
              fontWeight: '600',
              marginBottom: '1rem',
              textTransform: 'uppercase',
              letterSpacing: '0.05em',
              margin: '0 0 1rem 0'
            }}>
              Socials
            </h4>
            <div style={{ 
              display: 'flex',
              justifyContent: 'center',
              gap: '1rem',
              flexWrap: 'wrap'
            }}>
              <a
                href={siteConfig.author.social.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="footer-social-link"
                style={{
                  color: 'rgba(255, 255, 255, 0.8)',
                  textDecoration: 'none',
                  fontSize: '0.875rem',
                  transition: 'color 0.2s ease'
                }}
              >
                LinkedIn
              </a>
              <a
                href={siteConfig.author.social.youtube}
                target="_blank"
                rel="noopener noreferrer"
                className="footer-social-link"
                style={{
                  color: 'rgba(255, 255, 255, 0.8)',
                  textDecoration: 'none',
                  fontSize: '0.875rem',
                  transition: 'color 0.2s ease'
                }}
              >
                YouTube
              </a>
              <a
                href={siteConfig.author.social.facebook}
                target="_blank"
                rel="noopener noreferrer"
                className="footer-social-link"
                style={{
                  color: 'rgba(255, 255, 255, 0.8)',
                  textDecoration: 'none',
                  fontSize: '0.875rem',
                  transition: 'color 0.2s ease'
                }}
              >
                Facebook
              </a>
            </div>
          </div>

          {/* Right Column - My Data */}
          <div style={{ textAlign: 'right' }}>
            <h4 style={{ 
              color: 'white',
              fontSize: '0.875rem',
              fontWeight: '600',
              marginBottom: '1rem',
              textTransform: 'uppercase',
              letterSpacing: '0.05em',
              margin: '0 0 1rem 0'
            }}>
              My Data
            </h4>
            <div style={{ 
              display: 'flex',
              flexDirection: 'column',
              gap: '0.5rem',
              fontSize: '0.875rem'
            }}>
              <a 
                href="mailto:info@timoteopasquali.it" 
                className="footer-contact-link"
                style={{
                  color: 'rgba(255, 255, 255, 0.8)',
                  textDecoration: 'none',
                  transition: 'color 0.2s ease'
                }}
              >
                info@timoteopasquali.it
              </a>
              <span style={{ color: 'rgba(255, 255, 255, 0.6)' }}>
                P.IVA IT00000000000
              </span>
              <span style={{ color: 'rgba(255, 255, 255, 0.6)' }}>
                La Spezia, Italia
              </span>
            </div>
          </div>
        </div>

        {/* Bottom Copyright */}
        <div style={{ 
          borderTop: '1px solid rgba(255, 255, 255, 0.2)',
          paddingTop: '1rem',
          textAlign: 'center'
        }}>
          <p style={{ 
            color: 'rgba(255, 255, 255, 0.6)',
            fontSize: '0.75rem',
            margin: 0
          }}>
            &copy; 2025 Timoteo Pasquali | Tutti i diritti riservati
          </p>
        </div>
      </div>
    </footer>
  );
}