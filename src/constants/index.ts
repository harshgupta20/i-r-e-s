export { ROUTES, type AppRoute } from './routes'

/** TanStack Query cache keys, namespaced and typed via factory helpers. */
export const QUERY_KEYS = {
  profile: (uid: string) => ['profile', uid] as const,
  documents: () => ['documents'] as const,
  userDocuments: (email: string) => ['documents', 'user', email] as const,
  verify: (hash: string) => ['verify', hash] as const,
} as const

/** Firestore collection + storage path names, kept in one place. */
export const COLLECTIONS = {
  users: 'users',
  allDocs: 'all_docs',
  userDocs: 'user_docs',
  docHistory: 'doc_history',
} as const

export const APP = {
  name: 'I-R-E-S',
  tagline: 'Verify document authenticity',
  description:
    'Hash your documents, publish a tamper-evident fingerprint, and let anyone verify them in seconds.',
  repoUrl: 'https://github.com/harshgupta20/i-r-e-s',
  authorLinkedIn: 'https://www.linkedin.com/in/harshgupta2001/',
  themeStorageKey: 'ires-theme',
} as const

/** Files we accept for hashing / upload. */
export const UPLOAD = {
  maxSizeBytes: 15 * 1024 * 1024, // 15 MB
  accept: '.pdf,.png,.jpg,.jpeg,.doc,.docx,.txt',
} as const
