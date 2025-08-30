import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { MDXRemote } from 'next-mdx-remote/rsc';
import remarkGfm from 'remark-gfm';
import { getAllPosts, getPostBySlug } from '../../../../lib/mdx';
import { siteConfig } from '../../../../config/site.config';
import ArticleLayout from '../../../components/blog/ArticleLayout';
import Callout from '../../../components/blog/Callout';
import Card from '../../../components/blog/Card';

interface BlogPostPageProps {
  params: Promise<{ slug: string }>;
}

// Generate metadata for SEO
export async function generateMetadata({ params }: BlogPostPageProps): Promise<Metadata> {
  const { slug } = await params;
  const post = getPostBySlug(slug);

  if (!post || post.draft) {
    return {
      title: 'Articolo non trovato',
    };
  }

  return {
    title: `${post.title} - ${siteConfig.name}`,
    description: post.description,
    keywords: [...siteConfig.seo.keywords, ...post.tags],
    authors: [{ name: siteConfig.author.name }],
    openGraph: {
      title: post.title,
      description: post.description,
      url: `${siteConfig.url}/blog/${post.slug}`,
      siteName: siteConfig.name,
      images: [
        {
          url: (post.ogImage || post.image || siteConfig.seo.ogImage).startsWith('http') 
            ? (post.ogImage || post.image || siteConfig.seo.ogImage)
            : `${siteConfig.url}${post.ogImage || post.image || siteConfig.seo.ogImage}`,
          width: 1200,
          height: 630,
          alt: post.title,
        },
      ],
      locale: 'it_IT',
      type: 'article',
      publishedTime: post.date,
      authors: [siteConfig.author.name],
      tags: post.tags,
    },
    twitter: {
      card: 'summary_large_image',
      title: post.title,
      description: post.description,
      images: [post.ogImage || post.image],
    },
    alternates: {
      canonical: post.canonical || `${siteConfig.url}/blog/${post.slug}`,
    },
    other: {
      'article:author': siteConfig.author.name,
      'article:published_time': post.date,
      'article:tag': post.tags.join(', '),
      'og:image:secure_url': (post.ogImage || post.image || siteConfig.seo.ogImage).startsWith('http') 
        ? (post.ogImage || post.image || siteConfig.seo.ogImage)
        : `${siteConfig.url}${post.ogImage || post.image || siteConfig.seo.ogImage}`,
      // Force LinkedIn to refresh cache
      'og:updated_time': new Date().toISOString(),
    },
  };
}

// Generate static paths for all posts
export async function generateStaticParams() {
  const posts = getAllPosts();
  
  return posts
    .filter(post => !post.draft)
    .map((post) => ({
      slug: post.slug,
    }));
}

// MDX Components with improved typography and spacing
const mdxComponents = {
  h1: () => null, // Hide the first H1 since ArticleLayout already shows the title
  h2: (props: React.HTMLProps<HTMLHeadingElement>) => (
    <h2 className="text-3xl font-bold mt-12 mb-6 text-gray-900 leading-tight" {...props} />
  ),
  h3: (props: React.HTMLProps<HTMLHeadingElement>) => (
    <h3 className="text-2xl font-semibold mt-10 mb-5 text-gray-900 leading-tight" {...props} />
  ),
  h4: (props: React.HTMLProps<HTMLHeadingElement>) => (
    <h4 className="text-xl font-semibold mt-8 mb-4 text-gray-900 leading-tight" {...props} />
  ),
  p: (props: React.HTMLProps<HTMLParagraphElement>) => (
    <p className="mb-6 leading-loose text-gray-700 text-lg" style={{ lineHeight: '1.8' }} {...props} />
  ),
  ul: (props: React.HTMLProps<HTMLUListElement>) => (
    <ul className="mb-6 space-y-3 list-disc pl-8 text-gray-700 text-lg" style={{ lineHeight: '1.8' }} {...props} />
  ),
  ol: (props: React.OlHTMLAttributes<HTMLOListElement>) => (
    <ol className="mb-6 space-y-3 list-decimal pl-8 text-gray-700 text-lg" style={{ lineHeight: '1.8' }} {...props} />
  ),
  li: (props: React.HTMLProps<HTMLLIElement>) => (
    <li className="leading-loose mb-2" {...props} />
  ),
  blockquote: (props: React.HTMLProps<HTMLQuoteElement>) => (
    <blockquote 
      className="border-l-4 border-blue-500 pl-6 py-4 my-8 bg-blue-50 italic text-gray-700 text-lg rounded-r-lg" 
      style={{ lineHeight: '1.8' }} 
      {...props} 
    />
  ),
  code: (props: React.HTMLProps<HTMLElement>) => (
    <code className="bg-gray-100 px-3 py-1 rounded text-base font-mono text-gray-800 border" {...props} />
  ),
  pre: (props: React.HTMLProps<HTMLPreElement>) => (
    <pre className="bg-gray-900 text-gray-100 p-6 rounded-lg overflow-x-auto my-8 text-base leading-relaxed" {...props} />
  ),
  table: (props: React.HTMLProps<HTMLTableElement>) => (
    <div className="overflow-x-auto my-8">
      <table className="prose-custom-table" {...props} />
    </div>
  ),
  thead: (props: React.HTMLProps<HTMLTableSectionElement>) => (
    <thead className="prose-custom-thead" {...props} />
  ),
  tbody: (props: React.HTMLProps<HTMLTableSectionElement>) => (
    <tbody className="prose-custom-tbody" {...props} />
  ),
  th: (props: React.HTMLProps<HTMLTableCellElement>) => (
    <th className="prose-custom-th" style={{ color: 'white !important' }} {...props} />
  ),
  td: (props: React.HTMLProps<HTMLTableCellElement>) => (
    <td className="prose-custom-td" {...props} />
  ),
  a: (props: React.HTMLProps<HTMLAnchorElement>) => (
    <a className="text-blue-600 hover:text-blue-700 underline font-medium transition-colors" {...props} />
  ),
  strong: (props: React.HTMLProps<HTMLElement>) => (
    <strong className="font-bold text-gray-900" {...props} />
  ),
  em: (props: React.HTMLProps<HTMLElement>) => (
    <em className="italic text-gray-800" {...props} />
  ),
  hr: (props: React.HTMLProps<HTMLHRElement>) => (
    <hr className="my-12 border-gray-300 border-t-2" {...props} />
  ),
  Callout,
  Card,
};

export default async function BlogPost({ params }: BlogPostPageProps) {
  const { slug } = await params;
  const post = getPostBySlug(slug);

  if (!post || post.draft) {
    notFound();
  }

  return (
    <>
      {/* Navigation provided by layout */}
      
      <div style={{ background: 'var(--gray-50)', minHeight: '100vh' }}>
        <ArticleLayout post={post}>
          <MDXRemote 
            source={post.content} 
            components={mdxComponents}
            options={{
              mdxOptions: {
                remarkPlugins: [remarkGfm],
              },
            }}
          />
        </ArticleLayout>
      </div>

      {/* View counting handled by client component in ArticleLayout */}
    </>
  );
}
