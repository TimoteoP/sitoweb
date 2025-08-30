/**
 * MDX utilities for blog posts
 * Handles frontmatter parsing and content processing
 */

import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import readingTime from 'reading-time';

const postsDirectory = path.join(process.cwd(), 'content/blog');

export interface BlogPost {
  slug: string;
  title: string;
  description: string;
  date: string;
  category: 'Guide' | 'Casi Studio' | 'Articoli';
  tags: string[];
  playlist?: string;
  order?: number;
  difficulty?: 'Base' | 'Intermedio' | 'Avanzato';
  image: string;
  ogImage?: string;
  audio?: string;
  faq?: Array<{
    q: string;
    a: string;
  }>;
  canonical?: string;
  draft: boolean;
  content: string;
  readingTime: {
    text: string;
    minutes: number;
    time: number;
    words: number;
  };
}

export type BlogPostMeta = Omit<BlogPost, 'content'>;

// Ensure posts directory exists
export function ensurePostsDirectory() {
  if (!fs.existsSync(postsDirectory)) {
    fs.mkdirSync(postsDirectory, { recursive: true });
  }
}

// Get all blog posts (metadata only)
export function getAllPosts(): BlogPostMeta[] {
  ensurePostsDirectory();
  
  if (!fs.existsSync(postsDirectory)) {
    return [];
  }

  const fileNames = fs.readdirSync(postsDirectory).filter(name => name.endsWith('.mdx'));
  
  const allPostsData = fileNames.map((fileName) => {
    const slug = fileName.replace(/\.mdx$/, '');
    const post = getPostBySlug(slug);
    if (!post) return null;
    // Return metadata only (without content)
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { content, ...meta } = post;
    return meta;
  }).filter((post): post is BlogPostMeta => post !== null);

  // Sort posts by date
  return allPostsData.sort((a, b) => {
    return new Date(b.date).getTime() - new Date(a.date).getTime();
  });
}

// Get a single post by slug
export function getPostBySlug(slug: string): BlogPost | null {
  try {
    ensurePostsDirectory();
    const fullPath = path.join(postsDirectory, `${slug}.mdx`);
    
    if (!fs.existsSync(fullPath)) {
      return null;
    }
    
    const fileContents = fs.readFileSync(fullPath, 'utf8');
    const { data, content } = matter(fileContents);
    const readingTimeStats = readingTime(content);

    return {
      slug,
      title: data.title || '',
      description: data.description || '',
      date: data.date || '',
      category: data.category || 'Articoli',
      tags: data.tags || [],
      playlist: data.playlist,
      order: data.order,
      difficulty: data.difficulty,
      image: data.image || '/blog/default.jpg',
      ogImage: data.ogImage,
      audio: data.audio,
      faq: data.faq,
      canonical: data.canonical,
      draft: data.draft || false,
      content,
      readingTime: readingTimeStats,
    };
  } catch (error) {
    console.error(`Error reading post ${slug}:`, error);
    return null;
  }
}

// Temporary test function to verify the deep-research post
export function testDeepResearchPost() {
const post = getPostBySlug('deep-research-imprenditori-ricerca-approfondita-dati');
console.log('Deep Research Post:', post);
return post;
}

// Get posts by category
export function getPostsByCategory(category: string): BlogPostMeta[] {
  const allPosts = getAllPosts();
  return allPosts.filter(post => 
    !post.draft && post.category.toLowerCase() === category.toLowerCase()
  );
}

// Get posts by tag
export function getPostsByTag(tag: string): BlogPostMeta[] {
  const allPosts = getAllPosts();
  return allPosts.filter(post => 
    !post.draft && post.tags.some(postTag => 
      postTag.toLowerCase() === tag.toLowerCase()
    )
  );
}

// Get posts by playlist
export function getPostsByPlaylist(playlist: string): BlogPostMeta[] {
  const allPosts = getAllPosts();
  return allPosts
    .filter(post => !post.draft && post.playlist === playlist)
    .sort((a, b) => (a.order || 0) - (b.order || 0));
}

// Get all categories
export function getAllCategories(): string[] {
  const allPosts = getAllPosts();
  const categories = allPosts
    .filter(post => !post.draft)
    .map(post => post.category);
  return [...new Set(categories)];
}

// Get all tags
export function getAllTags(): string[] {
  const allPosts = getAllPosts();
  const tags = allPosts
    .filter(post => !post.draft)
    .flatMap(post => post.tags);
  return [...new Set(tags)];
}

// Get all playlists
export function getAllPlaylists(): Array<{
  slug: string;
  title: string;
  description: string;
  posts: BlogPostMeta[];
}> {
  const allPosts = getAllPosts();
  const playlistMap = new Map();

  allPosts
    .filter(post => !post.draft && post.playlist)
    .forEach(post => {
      if (!playlistMap.has(post.playlist)) {
        playlistMap.set(post.playlist, {
          slug: post.playlist,
          title: post.playlist, // You can enhance this with metadata
          description: `Serie di articoli su ${post.playlist}`,
          posts: []
        });
      }
      playlistMap.get(post.playlist).posts.push(post);
    });

  // Sort posts within each playlist
  playlistMap.forEach(playlist => {
    playlist.posts.sort((a: BlogPostMeta, b: BlogPostMeta) => (a.order || 0) - (b.order || 0));
  });

  return Array.from(playlistMap.values());
}