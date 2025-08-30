import { supabaseAdmin } from './supabaseServer';
import { getTableName } from './supabase';

export interface RateLimitResult {
  allowed: boolean;
  remaining?: number;
  resetAt?: string;
}

/**
 * Distributed rate limit via Supabase RPC. Falls back to "always allowed"
 * when service role key is not configured.
 */
export async function rateLimit(keyParts: Array<string | number>, limit: number, windowSeconds: number): Promise<RateLimitResult> {
  const key = keyParts.join(':');
  if (!supabaseAdmin) {
    return { allowed: true };
  }
  try {
    const tableName = getTableName('rate_limits');
    const { data, error } = await supabaseAdmin.rpc('check_and_increment_rate', {
      table_name: tableName,
      key,
      max_count: limit,
      window_seconds: windowSeconds,
    });
    if (error) {
      // In case of RPC error, be permissive but log on server
      console.error('RateLimit RPC error:', error);
      return { allowed: true };
    }
    // data is JSONB: { allowed, remaining, reset_at }
    const allowed = Boolean(data?.allowed);
    const remaining = typeof data?.remaining === 'number' ? data.remaining : undefined;
    const resetAt = data?.reset_at as string | undefined;
    return { allowed, remaining, resetAt };
  } catch (e) {
    console.error('RateLimit exception:', e);
    return { allowed: true };
  }
}
