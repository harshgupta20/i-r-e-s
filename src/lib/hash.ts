/**
 * Content hashing for document fingerprints.
 *
 * The original implementation hashed files with `FileReader.readAsText`, which
 * is lossy for binary files (PDFs, images) — the same file could yield different
 * hashes. We hash the raw bytes via the Web Crypto SubtleCrypto API instead, so
 * the fingerprint is stable and correct for any file type.
 */

/** SHA-256 of an ArrayBuffer, returned as a lowercase hex string. */
export async function sha256(buffer: ArrayBuffer): Promise<string> {
  const digest = await crypto.subtle.digest('SHA-256', buffer)
  return Array.from(new Uint8Array(digest))
    .map((b) => b.toString(16).padStart(2, '0'))
    .join('')
}

/** SHA-256 fingerprint of a File's raw bytes. */
export async function hashFile(file: File): Promise<string> {
  const buffer = await file.arrayBuffer()
  return sha256(buffer)
}

/** Shorten a hash for display, e.g. `a1b2c3…d4e5f6`. */
export function truncateHash(hash: string, visible = 6): string {
  if (hash.length <= visible * 2) return hash
  return `${hash.slice(0, visible)}…${hash.slice(-visible)}`
}
