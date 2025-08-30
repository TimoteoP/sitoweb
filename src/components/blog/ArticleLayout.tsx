import { ReactNode } from 'react';
import { BlogPost } from '../../../lib/mdx';
import { siteConfig } from '../../../config/site.config';
import ShareButtons from './ShareButtons';
import FAQSection from './FAQSection';
import QASection from './QASection';
import ViewCounter from './ViewCounter';

interface ArticleLayoutProps {
  post: BlogPost;
  children: ReactNode;
}

export default function ArticleLayout({ post, children }: ArticleLayoutProps) {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'BlogPosting',
    headline: post.title,
    description: post.description,
    author: {
      '@type': 'Person',
      name: siteConfig.author.name,
    },
    datePublished: post.date,
    dateModified: post.date,
    image: [post.ogImage || post.image],
    url: `${siteConfig.url}/blog/${post.slug}`,
    mainEntityOfPage: {
      '@type': 'WebPage',
      '@id': `${siteConfig.url}/blog/${post.slug}`,
    },
    publisher: {
      '@type': 'Person',
      name: siteConfig.author.name,
    },
  };

  return (
    <div className="min-h-screen" style={{ background: 'var(--gray-50)' }}>
      <div style={{ maxWidth: '800px', margin: '0 auto', padding: '2rem 1.5rem' }}>
        <article className="bg-white rounded-2xl shadow-sm" style={{ padding: '3rem 2.5rem', marginTop: '2rem' }}>
      {/* JSON-LD Schema */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      {/* Article Header */}
      <header style={{ marginBottom: '3rem' }}>
        {/* Category Badge */}
        <div className="flex items-center gap-4 mb-6">
          <span 
            className="px-3 py-1 text-sm font-semibold rounded-full"
            style={{
              backgroundColor: `${siteConfig.branding.colors.primaryBlue}20`,
              color: siteConfig.branding.colors.primaryBlue
            }}
          >
            {post.category}
          </span>
          {post.difficulty && (
            <span 
              className="px-3 py-1 text-sm font-medium rounded-full"
              style={{
                backgroundColor: `${siteConfig.branding.colors.accentOrange}20`,
                color: siteConfig.branding.colors.accentOrangePure
              }}
            >
              {post.difficulty}
            </span>
          )}
        </div>

        {/* Title */}
        <h1 className="hero-title" style={{ marginBottom: '1.5rem', textAlign: 'center' }}>
          {post.title}
        </h1>

        {/* Meta Information */}
        <div className="flex flex-wrap items-center gap-6 text-gray-600 mb-8">
          <time dateTime={post.date} className="flex items-center gap-2">
            📅 {new Date(post.date).toLocaleDateString('it-IT', {
              year: 'numeric',
              month: 'long',
              day: 'numeric'
            })}
          </time>
          <span className="flex items-center gap-2">
            ⏱️ {post.readingTime.text}
          </span>
          <span className="flex items-center gap-2">
            👁️ <ViewCounter slug={post.slug} />
          </span>
        </div>

        {/* Tags */}
        {post.tags.length > 0 && (
          <div className="flex flex-wrap gap-2 mb-8">
            {post.tags.map((tag) => (
              <span
                key={tag}
                className="px-3 py-1 text-sm bg-gray-100 text-gray-700 rounded-full hover:bg-gray-200 transition-colors"
              >
                #{tag}
              </span>
            ))}
          </div>
        )}


      </header>

      {/* Article Content */}
      <div style={{ lineHeight: '1.8', fontSize: '1.125rem', color: 'var(--gray-700)' }} className="prose-custom">
        {children}
      </div>

      {/* FAQ Section */}
      {post.faq && post.faq.length > 0 && (
        <FAQSection faq={post.faq} />
      )}

      {/* Share Buttons */}
      <div className="border-t border-b border-gray-200 py-8 my-12">
        <ShareButtons 
          url={`${siteConfig.url}/blog/${post.slug}`}
          title={post.title}
          slug={post.slug}
        />
      </div>

      {/* Q&A Section */}
      <QASection postSlug={post.slug} postTitle={post.title} />

      {/* Playlist Navigation */}
      {post.playlist && (
        <div className="mt-12 p-6 bg-gray-50 rounded-2xl">
          <h3 className="text-xl font-semibold mb-4">📚 Serie: {post.playlist}</h3>
          <p className="text-gray-600">
            Questo articolo fa parte della serie &quot;{post.playlist}&quot;. 
            <a 
              href={`/blog/playlist/${post.playlist}`}
              className="text-blue-600 hover:underline ml-1"
            >
              Vedi tutti gli articoli →
            </a>
          </p>
        </div>
      )}
        </article>
      </div>
    </div>
  );
}
