/**
 * Normalizes query parameters by ensuring each key maps to a single string value.
 * @param queries - An object containing query parameters which may have string or string array values.
 * @returns An object with the same keys, but all values are single strings.
 */
export const normalizeQueries = (queries: Record<string, string | string[] | undefined>) =>
  Object.fromEntries(
    Object.entries(queries).map(([key, value]) => [
      key,
      Array.isArray(value) ? value[0] : value,
    ])
  )