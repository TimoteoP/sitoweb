import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import { getPostsByCategory, getAllCategories } from '../../../../../lib/mdx';
import { siteConfig } from '../../../../../config/site.config';
// Footer provided by layout

interface CategoryPageProps {
  params: Promise<{ category: string }>;
}

export async function generateMetadata({ params }: CategoryPageProps): Promise<Metadata> {
  const { category } = await params;
  const categoryName = category.replace(/-/g, ' ');
  const categoryCapitalized = categoryName.charAt(0).toUpperCase() + categoryName.slice(1);
  
  return {
    title: `${categoryCapitalized} - Blog ${siteConfig.name}`,
    description: `Tutti gli articoli della categoria ${categoryCapitalized}. Guide pratiche per l'automazione aziendale e l'eliminazione di Excel.`,
  };
}

export async function generateStaticParams() {
  const categories = getAllCategories();
  
  return categories.map((category) => ({
    category: category.toLowerCase().replace(/\s+/g, '-'),
  }));
}

export default async function CategoryPage({ params }: CategoryPageProps) {
  const { category: categorySlug } = await params;
  
  // Find the exact category name from available categories
  const categories = getAllCategories();
  const actualCategory = categories.find(cat => 
    cat.toLowerCase().replace(/\s+/g, '-') === categorySlug
  );
  
  if (!actualCategory) {
    notFound();
  }
  
  const posts = getPostsByCategory(actualCategory).filter(post => !post.draft);

  const getCategoryIcon = (category: string) => {
    if (category.toLowerCase().includes('guide')) return '📚';
    if (category.toLowerCase().includes('casi')) return '🔍';
    if (category.toLowerCase().includes('articoli')) return '✍️';
    return '📄';
  };

  const getCategoryDescription = (category: string) => {
    if (category.toLowerCase().includes('guide')) return 'Tutorial passo-passo per implementare automazioni nel tuo business';
    if (category.toLowerCase().includes('casi')) return 'Storie reali di successo: come altre aziende hanno risolto i loro problemi';
    if (category.toLowerCase().includes('articoli')) return 'Approfondimenti e riflessioni sul futuro del lavoro e dell\'automazione';
    return 'Contenuti di valore per il tuo business';
  };

  return (
    <>
      {/* Navigation provided by layout */}

      {/* Hero Section */}
      <section className="hero" style={{ paddingBottom: '1rem' }}>
        <div className="hero-container">
          <div className="hero-left">
            <div className="hero-badge">
              {getCategoryIcon(actualCategory)} {actualCategory} • Categorie Blog
            </div>
            <h1 className="hero-title">
              {actualCategory}
            </h1>
            <p className="hero-subtitle">
              {getCategoryDescription(actualCategory)}
            </p>
            
            {/* Article Count and Back Button */}
            <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '2rem', marginTop: '2rem', flexWrap: 'wrap' }}>
              <div style={{ color: 'var(--gray-600)', fontSize: '1.125rem', fontWeight: '500' }}>
                {posts.length} articoli in {actualCategory}
              </div>
              <Link href="/blog" className="btn-secondary">
                ← Torna al blog
              </Link>
            </div>
            
            {/* Breadcrumb */}
            <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '0.5rem', marginTop: '1rem', color: 'var(--gray-500)', fontSize: '0.875rem' }}>
              <Link href="/blog" style={{ color: 'var(--primary-blue)', textDecoration: 'none' }}>
                Blog
              </Link>
              <span>→</span>
              <span>{actualCategory}</span>
            </div>
          </div>
        </div>
      </section>

      {/* Articles Section */}
      <section style={{ padding: '1rem 2rem', background: 'var(--gray-50)' }}>
        <div className="services-container">
          <div>
            {/* Articles Grid */}
            <div>
              {posts.length === 0 ? (
                <div className="service-card" style={{ textAlign: 'center', padding: '4rem 2rem' }}>
                  <div style={{ fontSize: '4rem', marginBottom: '2rem' }}>{getCategoryIcon(actualCategory)}</div>
                  <h3 className="services-title" style={{ marginBottom: '1rem' }}>
                    Nessun articolo in questa categoria ancora
                  </h3>
                  <p className="services-subtitle" style={{ marginBottom: '2rem' }}>
                    Stiamo preparando contenuti fantastici per la categoria {actualCategory}. 
                    Nel frattempo, dai un{''}occhiata agli altri articoli.
                  </p>
                  <Link href="/blog" className="btn-primary">
                    ← Torna al blog
                  </Link>
                </div>
              ) : (
                <div style={{ 
                  display: 'grid', 
                  gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', 
                  gap: '1.5rem' 
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
                        {/* Category Badge */}
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
                            {getCategoryIcon(post.category)} {post.category}
                          </span>
                        </div>

                        {/* Title */}
                        <h3 style={{ 
                          fontSize: '1.25rem', 
                          fontWeight: '700', 
                          color: 'var(--primary-dark)', 
                          marginBottom: '0.75rem',
                          lineHeight: '1.4'
                        }}>
                          <Link 
                            href={`/blog/${post.slug}`}
                            className="post-title-link"
                            style={{ 
                              textDecoration: 'none', 
                              color: 'inherit',
                              transition: 'color 0.2s ease'
                            }}
                          >
                            {post.title}
                          </Link>
                        </h3>

                        {/* Description */}
                        <p style={{ 
                          fontSize: '0.95rem', 
                          color: 'var(--gray-600)', 
                          marginBottom: '1rem',
                          lineHeight: '1.6',
                          fontWeight: '400'
                        }}>
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
          </div>
        </div>
      </section>

      {/* Newsletter Section */}
      <section className="newsletter-section" id="newsletter">
        <div className="newsletter-container">
          <h2 className="newsletter-title">📧 Non perdere nessun articolo!</h2>
          <p className="newsletter-description">
            Ricevi guide esclusive e case study direttamente nella tua inbox. 
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
