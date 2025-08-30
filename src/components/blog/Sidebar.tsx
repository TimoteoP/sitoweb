'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { BlogPostMeta } from '../../../lib/mdx';
import { getTopPosts } from '../../../lib/supabase';

interface SidebarProps {
  currentPost?: string;
  categories: string[];
  topPosts?: BlogPostMeta[];
}

export default function Sidebar({ currentPost, categories, topPosts = [] }: SidebarProps) {
  const [dynamicTopPosts, setDynamicTopPosts] = useState<Array<{post_slug: string; count: number}>>([]);

  useEffect(() => {
    // Load dynamic top posts from Supabase
    getTopPosts(5).then(setDynamicTopPosts);
  }, []);

  // Merge static and dynamic top posts
  const displayTopPosts = dynamicTopPosts.length > 0 
    ? topPosts.filter(post => 
        dynamicTopPosts.some(topPost => topPost.post_slug === post.slug)
      ).sort((a, b) => {
        const aViews = dynamicTopPosts.find(p => p.post_slug === a.slug)?.count || 0;
        const bViews = dynamicTopPosts.find(p => p.post_slug === b.slug)?.count || 0;
        return bViews - aViews;
      })
    : topPosts.slice(0, 5);

  return (
    <aside className="bg-white rounded-2xl shadow-lg p-6 sticky top-24">
      {/* Top 5 Articles */}
      <div className="mb-8">
        <h3 className="text-lg font-semibold mb-4 text-gray-900 flex items-center gap-2">
          🔥 Articoli Più Letti
        </h3>
        
        {displayTopPosts.length > 0 ? (
          <div className="space-y-3">
            {displayTopPosts.map((post, index) => {
              const views = dynamicTopPosts.find(p => p.post_slug === post.slug)?.count;
              return (
                <Link
                  key={post.slug}
                  href={`/blog/${post.slug}`}
                  className={`block p-3 rounded-lg transition-colors hover:bg-gray-50 ${
                    currentPost === post.slug ? 'bg-blue-50 border-l-4 border-blue-500' : ''
                  }`}
                >
                  <div className="flex items-start gap-3">
                    <span className="flex-shrink-0 w-6 h-6 bg-gradient-to-r from-blue-500 to-orange-500 text-white text-sm font-bold rounded-full flex items-center justify-center">
                      {index + 1}
                    </span>
                    <div className="flex-1 min-w-0">
                      <h4 className="font-medium text-sm text-gray-900 leading-tight line-clamp-2">
                        {post.title}
                      </h4>
                      <div className="flex items-center gap-2 mt-1">
                        <span className="text-xs text-gray-500">
                          {post.category}
                        </span>
                        {views && (
                          <span className="text-xs text-gray-400">
                            👁️ {views}
                          </span>
                        )}
                      </div>
                    </div>
                  </div>
                </Link>
              );
            })}
          </div>
        ) : (
          <div className="text-gray-500 text-sm text-center py-4">
            📊 Statistiche in caricamento...
          </div>
        )}
      </div>

      {/* Categories */}
      <div className="mb-8">
        <h3 className="text-lg font-semibold mb-4 text-gray-900 flex items-center gap-2">
          📂 Categorie
        </h3>
        
        <div className="space-y-2">
          <Link
            href="/blog"
            className="block px-3 py-2 text-sm text-gray-600 hover:bg-gray-50 rounded-lg transition-colors"
          >
            📋 Tutti gli articoli
          </Link>
          
          {categories.map((category) => (
            <Link
              key={category}
              href={`/blog/category/${category.toLowerCase().replace(/\s+/g, '-')}`}
              className="block px-3 py-2 text-sm text-gray-600 hover:bg-gray-50 rounded-lg transition-colors"
            >
              {category === 'Guide' && '📚'}
              {category === 'Casi Studio' && '🔍'}
              {category === 'Articoli' && '✍️'}
              {' '}{category}
            </Link>
          ))}
        </div>
      </div>

      {/* Newsletter CTA */}
      <div className="bg-gradient-to-r from-blue-50 to-orange-50 rounded-xl p-4 border border-gray-200">
        <h3 className="font-semibold text-gray-900 mb-2 text-center">
          📧 Non perderti nulla!
        </h3>
        <p className="text-sm text-gray-600 text-center mb-4">
          Ricevi guide esclusive e case study direttamente nella tua inbox.
        </p>
        <Link
          href="/#newsletter"
          className="block w-full bg-gradient-to-r from-blue-500 to-orange-500 text-white text-center py-2 px-4 rounded-lg font-medium hover:from-blue-600 hover:to-orange-600 transition-all transform hover:scale-[1.02]"
        >
          🎁 Iscriviti Gratis
        </Link>
      </div>
    </aside>
  );
}