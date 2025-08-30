/**
 * Supabase client configuration
 * Supports project-specific tables with prefixes
 */

import { createClient } from '@supabase/supabase-js';
import { siteConfig } from '../config/site.config';

const supabaseUrl = siteConfig.database.supabaseUrl;
const supabaseKey = siteConfig.database.supabaseAnonKey;

// Only create client if both URL and key are provided
export const supabase = supabaseUrl && supabaseKey 
  ? createClient(supabaseUrl, supabaseKey)
  : null;

// Database table helpers with project prefix
export const getTableName = (baseTableName: string): string => {
  return `${siteConfig.projectId.replace('-', '_')}_${baseTableName}`;
};

// Common table operations
export const dbTables = {
  viewCounts: getTableName('view_counts'),
  shareEvents: getTableName('share_events'),
  subscriptions: getTableName('subscriptions'),
};

// View count functions
export const incrementViewCount = async (postSlug: string) => {
  if (!supabase) return null;
  
  try {
    const { data, error } = await supabase
      .rpc('increment_view_count', {
        table_name: dbTables.viewCounts,
        post_slug: postSlug
      });
    
    if (error) {
      console.error('Error incrementing view count:', error);
      return null;
    }
    return data;
  } catch (err) {
    console.error('Error incrementing view count:', err);
    return null;
  }
};

export const getViewCount = async (postSlug: string) => {
  if (!supabase) return 0;
  
  try {
    const { data, error } = await supabase
      .from(dbTables.viewCounts)
      .select('count')
      .eq('post_slug', postSlug)
      .single();
    
    if (error && error.code !== 'PGRST116') {
      console.error('Error getting view count:', error);
      return 0;
    }
    return data?.count || 0;
  } catch (err) {
    console.error('Error getting view count:', err);
    return 0;
  }
};

export const getTopPosts = async (limit: number = 5) => {
  if (!supabase) return [];
  
  try {
    const { data, error } = await supabase
      .from(dbTables.viewCounts)
      .select('post_slug, count')
      .order('count', { ascending: false })
      .limit(limit);
    
    if (error) {
      console.error('Error getting top posts:', error);
      return [];
    }
    return data || [];
  } catch (err) {
    console.error('Error getting top posts:', err);
    return [];
  }
};

// Share event tracking
export const trackShareEvent = async (postSlug: string, channel: string) => {
  if (!supabase) return;
  
  try {
    const { error } = await supabase
      .from(dbTables.shareEvents)
      .insert([
        {
          post_slug: postSlug,
          channel,
          created_at: new Date().toISOString()
        }
      ]);
    
    if (error) {
      console.error('Error tracking share event:', error);
    }
  } catch (err) {
    console.error('Error tracking share event:', err);
  }
};