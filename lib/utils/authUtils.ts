/**
 * Converts a "true"/"false" string or boolean to an actual boolean.
 */
export function normalizeBoolean(value: unknown): boolean {
  if (typeof value === 'boolean') return value;
  if (typeof value === 'string') {
    return value.toLowerCase() === 'true';
  }
  return !!value;
}
