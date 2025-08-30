import { Metadata } from 'next';
import Link from 'next/link';
import { getAllPosts } from '../../../lib/mdx';
import { siteConfig } from '../../../config/site.config';
// Footer provided by layout

export const metadata: Metadata = {
  title: `Blog - ${siteConfig.name}`,
  description: 'Guide pratiche, tutorial e case study per l\'automazione aziendale e l\'eliminazione di Excel. Contenuti per imprenditori e professionisti over 40.',
  keywords: siteConfig.seo.keywords,
  openGraph: {
    title: `Blog - ${siteConfig.name}`,
    description: 'Guide pratiche per liberarti da Excel e automatizzare il tuo business',
    url: `${siteConfig.url}/blog`,
    images: [siteConfig.seo.ogImage],
  },
};

export default function BlogPage() {
  const posts = getAllPosts().filter(post => !post.draft);

  // JSON-LD for Blog
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Blog',
    name: `Blog di ${siteConfig.author.name}`,
    description: 'Guide e tutorial per l\'automazione aziendale',
    url: `${siteConfig.url}/blog`,
    author: {
      '@type': 'Person',
      name: siteConfig.author.name,
    },
    blogPost: posts.slice(0, 10).map(post => ({
      '@type': 'BlogPosting',
      headline: post.title,
      url: `${siteConfig.url}/blog/${post.slug}`,
      datePublished: post.date,
      author: {
        '@type': 'Person',
        name: siteConfig.author.name,
      },
    })),
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      {/* Navigation provided by layout */}

      {/* Blog Hero Section */}
      <section className="hero" style={{ paddingBottom: '1rem' }}>
        <div className="hero-container">
          <div className="hero-left">
            <div className="hero-badge">
              📚 Blog • Approfondiamo...
            </div>
            <h1 className="hero-title">
              Guide, Casi Studio ed Articoli
            </h1>
            <p className="hero-subtitle">
              Scopri come liberarti dai fogli di calcolo e portare il tuo business nel nuovo millennio.
              Guide passo-passo, casi studio reali e articoli di approfondimento per imprenditori e professionisti over 40.
            </p>
        </div> 

          {/* Blog Illustration */}
          <div className="hero-right">
            <div className="excel-mockup">
              <div className="excel-header">
                <span className="excel-filename">📚 Blog_Guide_Tutorial_2025.xlsx</span>
                <div className="window-controls">
                  <span className="control-red"></span>
                  <span className="control-yellow"></span>
                  <span className="control-green"></span>
                </div>
              </div>
              <div className="excel-ribbon">
                <span>Home</span>
                <span>Articoli</span>
                <span>Guide</span>
                <span>Tutorial</span>
                <span>Casi Studio</span>
              </div>
              <div className="excel-formula-bar">
                <span className="formula-icon">fx</span>
                <span>=CONCATENA({"Excel"};{" è morto, viva l"}{''}automazione!{")"})</span>
              </div>
              <div className="excel-grid">
                {/* Headers */}
                <div className="cell cell-header"></div>
                <div className="cell cell-header">A</div>
                <div className="cell cell-header">B</div>
                <div className="cell cell-header">C</div>
                
                {/* Row 1 */}
                <div className="cell cell-header">1</div>
                <div className="cell">Guida</div>
                <div className="cell">Status</div>
                <div className="cell">Risultato</div>
                
                {/* Row 2 */}
                <div className="cell cell-header">2</div>
                <div className="cell">Eliminare Excel</div>
                <div className="cell" style={{ color: '#10b981', fontWeight: 'bold' }}>✅ PUBBLICATO</div>
                <div className="cell">🚀 Successo</div>
                
                {/* Row 3 */}
                <div className="cell cell-header">3</div>
                <div className="cell">Automazioni IA</div>
                <div className="cell" style={{ color: '#10b981', fontWeight: 'bold' }}>✅ PUBBLICATO</div>
                <div className="cell">💰 +50% Revenue</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Articles Section - Reduced padding to decrease space */}
      <section style={{ padding: '1rem 2rem', background: 'var(--gray-50)' }}>
        <div className="services-container">
          <div className="services-header" style={{ marginBottom: '1rem' }}>
            <h2 className="services-title">Ultimi Post</h2>
            <p className="services-subtitle">Contenuti di valore per la tua trasformazione digitale</p>
          </div>

      {/* Categories Filter - Fixed to show all 3 categories */}
      <div className="hero-buttons" style={{ justifyContent: 'center', marginBottom: '2rem' }}>
              <Link href="/blog" className="btn-secondary" style={{ marginRight: '0.5rem' }}>
                📋Tutto...
              </Link>
              <Link
                href="/blog/category/articoli"
                className="btn-secondary"
                style={{ marginRight: '0.5rem' }}
              >
                ✍️Articoli
              </Link>
              <Link
                href="/blog/category/guide"
                className="btn-secondary"
                style={{ marginRight: '0.5rem' }}
              >
                📚Guide
              </Link>
              <Link
                href="/blog/category/casi-studio"
                className="btn-secondary"
              >
                🔍Casi Studio
              </Link>
            </div>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 300px', gap: '3rem', alignItems: 'start' }}>
            {/* Main Articles Grid - 3 columns with 15px gap */}
            <div>
              {posts.length === 0 ? (
                <div style={{ textAlign: 'center', padding: '4rem 2rem' }}>
                  <div style={{ fontSize: '4rem', marginBottom: '2rem' }}>📝</div>
                  <h3 style={{ fontSize: '2rem', fontWeight: '600', color: 'var(--primary-dark)', marginBottom: '1rem' }}>
                    Articoli in arrivo!
                  </h3>
                  <p style={{ color: 'var(--gray-600)', fontSize: '1.125rem' }}>
                    Stiamo preparando contenuti fantastici per te. 
                    Iscriviti alla newsletter per essere avvisato quando pubblicheremo i primi articoli.
                  </p>
                </div>
              ) : (
                <div style={{ 
                  display: 'grid', 
                  gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', 
                  gap: '15px' 
                }}>
                  {posts.map((post) => (
                    <article
                      key={post.slug}
                      className="service-card"
                      style={{ 
                        padding: '1.5rem',
                        height: 'fit-content'
                      }}
                    >
                      {/* Category - Show actual category from post data */}
                      <div style={{ marginBottom: '1rem' }}>
                        <span 
                          style={{
                            display: 'inline-block',
                            padding: '0.25rem 0.75rem',
                            backgroundColor: 'var(--primary-blue)',
                            color: 'white',
                            borderRadius: '20px',
                            fontSize: '0.875rem',
                            fontWeight: '600'
                          }}
                        >
                          {post.category === 'Articoli' && '✍️ Articolo'}
                          {post.category === 'Guide' && '📚 Guida'}
                          {post.category === 'Casi Studio' && '🔍 Caso Studio'}
                          {!['Articoli', 'Guide', 'Casi Studio'].includes(post.category) && `📝 ${post.category}`}
                        </span>
                      </div>

                      {/* Title */}
                      <h3 className="service-title" style={{ fontSize: '1.25rem', marginBottom: '0.75rem' }}>
                        <Link 
                          href={`/blog/${post.slug}`}
                          style={{ textDecoration: 'none', color: 'inherit' }}
                        >
                          {post.title}
                        </Link>
                      </h3>

                      {/* Description */}
                      <p className="service-description" style={{ fontSize: '0.9rem', marginBottom: '1rem' }}>
                        {post.description}
                      </p>

                      {/* Meta Info */}
                      <div style={{ display: 'flex', gap: '0.75rem', marginBottom: '1rem', fontSize: '0.8rem', color: 'var(--gray-500)' }}>
                        <span>📅 {new Date(post.date).toLocaleDateString('it-IT')}</span>
                        <span>⏱️ {post.readingTime.text}</span>
                        {post.difficulty && <span>📊 {post.difficulty}</span>}
                      </div>

                      {/* Tags */}
                      <div style={{ marginBottom: '1.5rem' }}>
                        {post.tags.slice(0, 3).map((tag) => (
                          <span
                            key={tag}
                            style={{
                              display: 'inline-block',
                              padding: '0.25rem 0.5rem',
                              backgroundColor: 'var(--gray-100)',
                              color: 'var(--gray-600)',
                              borderRadius: '4px',
                              fontSize: '0.7rem',
                              marginRight: '0.5rem',
                              marginBottom: '0.5rem'
                            }}
                          >
                            #{tag}
                          </span>
                        ))}
                      </div>

                      {/* Read More */}
                      <Link
                        href={`/blog/${post.slug}`}
                        className="service-cta"
                        style={{ fontSize: '0.9rem', padding: '0.75rem 1.25rem' }}
                      >
                        Leggi l{''}articolo →
                      </Link>
                    </article>
                  ))}
                </div>
              )}
            </div>

            {/* Sidebar - Top 5 Articles */}
            <div style={{ position: 'sticky', top: '2rem' }}>
              <div className="service-card" style={{ padding: '1.5rem' }}>
                <h3 style={{ fontSize: '1.25rem', fontWeight: '600', color: 'var(--primary-dark)', marginBottom: '1rem' }}>
                  📈 Articoli Popolari
                </h3>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                  {posts.slice(0, 5).map((post, index) => (
                    <div
                      key={post.slug}
                      style={{
                        paddingBottom: '1rem',
                        borderBottom: index < 4 ? '1px solid var(--gray-100)' : 'none'
                      }}
                    >
                      <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '0.5rem' }}>
                        <span 
                          style={{ 
                            fontSize: '1.25rem', 
                            fontWeight: 'bold', 
                            color: 'var(--primary-blue)',
                            minWidth: '24px'
                          }}
                        >
                          {index + 1}
                        </span>
                        <Link
                          href={`/blog/${post.slug}`}
                          style={{
                            textDecoration: 'none',
                            color: 'var(--gray-900)',
                            fontSize: '0.95rem',
                            fontWeight: '500',
                            lineHeight: '1.3'
                          }}
                        >
                          {post.title}
                        </Link>
                      </div>
                      <div style={{ fontSize: '0.8rem', color: 'var(--gray-500)', marginLeft: '1.75rem' }}>
                        📅 {new Date(post.date).toLocaleDateString('it-IT')} • ⏱️ {post.readingTime.text}
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Categories Widget */}
              <div className="service-card" style={{ padding: '1.5rem', marginTop: '1rem' }}>
                <h3 style={{ fontSize: '1.25rem', fontWeight: '600', color: 'var(--primary-dark)', marginBottom: '1rem' }}>
                  📂 Categorie
                </h3>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                  <Link
                    href="/blog"
                    style={{
                      textDecoration: 'none',
                      color: 'var(--gray-700)',
                      padding: '0.5rem',
                      borderRadius: '4px',
                      fontSize: '0.9rem',
                      display: 'block'
                    }}
                  >
                    📋 Tutti gli articoli ({posts.length})
                  </Link>
                  <Link
                    href="/blog/category/articoli"
                    style={{
                      textDecoration: 'none',
                      color: 'var(--gray-700)',
                      padding: '0.5rem',
                      borderRadius: '4px',
                      fontSize: '0.9rem',
                      display: 'block'
                    }}
                  >
                    ✍️ Articoli
                  </Link>
                  <Link
                    href="/blog/category/guide"
                    style={{
                      textDecoration: 'none',
                      color: 'var(--gray-700)',
                      padding: '0.5rem',
                      borderRadius: '4px',
                      fontSize: '0.9rem',
                      display: 'block'
                    }}
                  >
                    📚 Guide
                  </Link>
                  <Link
                    href="/blog/category/casi-studio"
                    style={{
                      textDecoration: 'none',
                      color: 'var(--gray-700)',
                      padding: '0.5rem',
                      borderRadius: '4px',
                      fontSize: '0.9rem',
                      display: 'block'
                    }}
                  >
                    🔍 Casi Studio
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Newsletter Section - Using exact same form as homepage */}
      <section className="newsletter-section" id="newsletter">
        <div className="newsletter-container">
          <h2 className="newsletter-title">📧 Non perdere nessun articolo!</h2>
          <p className="newsletter-description">
            Ricevi guide esclusive, case study e tutorial direttamente nella tua inbox. 
            Zero spam, solo contenuti di valore per far crescere il tuo business.
          </p>
          <form className="newsletter-form" id="newsletterForm">
            <input type="email" className="newsletter-input" placeholder="La tua email" required />
            <div className="privacy-checkbox">
              <input type="checkbox" id="privacy-accept" required />
              <label htmlFor="privacy-accept">
                Accetto la <Link href="/privacy-policy" target="_blank">Privacy Policy</Link> e acconsento al trattamento dei miei dati personali
              </label>
            </div>
            <button type="submit" className="newsletter-button">Ricevi la Guida</button>
          </form>     
        </div>
      </section>

      {/* Footer provided by layout */}
    </>
  );
}
