import type { DocumentData } from 'firebase/firestore'
import type { DocumentRecord, UserProfile, UserRole, VerificationStatus } from '@/types'

/**
 * Translators between raw Firestore documents (snake_case, stringly-typed
 * booleans) and the clean domain model. This is the ONLY place those quirks
 * live — the rest of the app works exclusively with domain types.
 */

const str = (value: unknown, fallback = ''): string =>
  typeof value === 'string' ? value : fallback

export function toUserRole(raw: unknown): UserRole {
  return raw === 'authorizer' ? 'authorizer' : 'user'
}

export function toVerificationStatus(raw: unknown): VerificationStatus {
  // Legacy data stored the boolean as the string "true"/"false".
  return raw === 'true' || raw === true ? 'verified' : 'unverified'
}

export function toUserProfile(uid: string, data: DocumentData): UserProfile {
  return {
    uid,
    name: str(data.name),
    email: str(data.email),
    age: str(data.age),
    collegeName: str(data.college_name),
    rollNumber: str(data.roll_number),
    socialProfile: str(data.social_profile),
    role: toUserRole(data.verified_status),
    detailFilled: data.detail_filled === 'true' || data.detail_filled === true,
  }
}

export function toDocumentRecord(id: string, data: DocumentData): DocumentRecord {
  return {
    id,
    uploaderName: str(data.name),
    uploaderEmail: str(data.email),
    socialLink: str(data.social_link),
    hash: str(data.doc_hash),
    fileUrl: str(data.doc_link),
    comment: str(data.comment),
    status: toVerificationStatus(data.verified_status),
    verifiedBy: data.verified_by ? str(data.verified_by) : null,
    publishedDate: str(data.published_date),
  }
}

/** Domain verification status → the raw string Firestore expects. */
export function fromVerificationStatus(status: VerificationStatus): 'true' | 'false' {
  return status === 'verified' ? 'true' : 'false'
}
