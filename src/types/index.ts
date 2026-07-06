/**
 * Domain model. These are the *clean* shapes the app works with.
 * The raw Firestore documents (snake_case, stringly-typed booleans) are
 * translated to and from these types by converters in `services/api`.
 */

/** A person's capability on the platform. */
export type UserRole = 'user' | 'authorizer'

/** Whether a document has been vouched for by an authorizer. */
export type VerificationStatus = 'verified' | 'unverified'

/** The authenticated identity from the auth provider (Firebase). */
export interface AuthUser {
  uid: string
  email: string
  displayName: string
  photoURL: string | null
}

/** A user's extended profile, stored in `users/{uid}`. */
export interface UserProfile {
  uid: string
  name: string
  email: string
  age: string
  collegeName: string
  rollNumber: string
  socialProfile: string
  role: UserRole
  detailFilled: boolean
}

/** Fields the user fills in the personal-details form. */
export interface UserProfileInput {
  age: string
  collegeName: string
  rollNumber: string
  socialProfile: string
}

/** A published document record, stored in `all_docs/{id}`. */
export interface DocumentRecord {
  id: string
  uploaderName: string
  uploaderEmail: string
  socialLink: string
  hash: string
  fileUrl: string
  comment: string
  status: VerificationStatus
  verifiedBy: string | null
  publishedDate: string
}

/** Payload for publishing a new document. */
export interface UploadDocumentInput {
  file: File
  comment: string
}

/** The result of checking a file against the registry. */
export interface VerificationResult {
  hash: string
  match: DocumentRecord | null
}

/** Contact / support message payloads. */
export interface ContactMessage {
  email: string
  message: string
}

export interface SupportMessage {
  email: string
  title: string
  message: string
}
