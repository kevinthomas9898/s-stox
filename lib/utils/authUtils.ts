/**
 * Strips wrapping double quotes and whitespace from a token string.
 * This is necessary because some backends return double-stringified JSON.
 */
export function normalizeToken(token: string | null | undefined): string | null {
  if (!token) return null;
  // Remove wrapping quotes if present
  let clean = token.trim();
  if (clean.startsWith('"') && clean.endsWith('"')) {
    clean = clean.slice(1, -1);
  }
  return clean || null;
}

/**
 * Converts a "true"/"false" string or boolean to an actual boolean.
 */
export function normalizeBoolean(value: any): boolean {
  if (typeof value === 'boolean') return value;
  if (typeof value === 'string') {
    return value.toLowerCase() === 'true';
  }
  return !!value;
}
