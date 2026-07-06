import {
  addDoc,
  collection,
  doc,
  getDocs,
  query,
  setDoc,
  updateDoc,
  where,
} from 'firebase/firestore'
import { format } from 'date-fns'
import { getDb } from '@/services/firebase/client'
import { uploadToCloudinary } from '@/services/cloudinary/client'
import { COLLECTIONS } from '@/constants'
import { hashFile } from '@/lib/hash'
import type {
  AuthUser,
  DocumentRecord,
  UploadDocumentInput,
  UserProfile,
  VerificationResult,
  VerificationStatus,
} from '@/types'
import { fromVerificationStatus, toDocumentRecord } from './converters'
import { AppError, toAppError } from './errors'

/** Every published document, newest first. Used by authorizers. */
export async function listAllDocuments(): Promise<DocumentRecord[]> {
  try {
    const snap = await getDocs(collection(getDb(), COLLECTIONS.allDocs))
    return snap.docs
      .map((d) => toDocumentRecord(d.id, d.data()))
      .sort((a, b) => b.publishedDate.localeCompare(a.publishedDate))
  } catch (error) {
    throw toAppError(error)
  }
}

/** A single user's upload history. */
export async function listUserDocuments(email: string): Promise<DocumentRecord[]> {
  try {
    const historyRef = collection(getDb(), COLLECTIONS.userDocs, email, COLLECTIONS.docHistory)
    const snap = await getDocs(historyRef)
    return snap.docs
      .map((d) => toDocumentRecord(d.id, d.data()))
      .sort((a, b) => b.publishedDate.localeCompare(a.publishedDate))
  } catch (error) {
    throw toAppError(error)
  }
}

/** Look up a document in the global registry by its content hash. */
export async function findDocumentByHash(hash: string): Promise<DocumentRecord | null> {
  try {
    const q = query(collection(getDb(), COLLECTIONS.allDocs), where('doc_hash', '==', hash))
    const snap = await getDocs(q)
    const first = snap.docs[0]
    return first ? toDocumentRecord(first.id, first.data()) : null
  } catch (error) {
    throw toAppError(error)
  }
}

/** Verify a file: hash it locally, then look the hash up in the registry. */
export async function verifyFile(file: File): Promise<VerificationResult> {
  const hash = await hashFile(file)
  const match = await findDocumentByHash(hash)
  return { hash, match }
}

/** Publish a document: upload bytes, register the hash, and record history. */
export async function uploadDocument(
  user: AuthUser,
  profile: UserProfile,
  { file, comment }: UploadDocumentInput,
): Promise<DocumentRecord> {
  try {
    const hash = await hashFile(file)

    const existing = await findDocumentByHash(hash)
    if (existing) {
      throw new AppError('This exact file has already been published to the registry.')
    }

    const { url: fileUrl } = await uploadToCloudinary(file)

    const publishedDate = format(new Date(), 'yyyy-MM-dd')
    const record = {
      name: user.displayName,
      email: user.email,
      social_link: profile.socialProfile,
      doc_hash: hash,
      doc_link: fileUrl,
      comment,
      verified_status: 'false',
      verified_by: null,
      published_date: publishedDate,
    }

    const created = await addDoc(collection(getDb(), COLLECTIONS.allDocs), record)

    // Keep the per-user index + history in sync.
    await setDoc(
      doc(getDb(), COLLECTIONS.userDocs, user.email),
      { name: user.displayName, email: user.email, uid: user.uid },
      { merge: true },
    )
    await addDoc(collection(getDb(), COLLECTIONS.userDocs, user.email, COLLECTIONS.docHistory), {
      doc_link: fileUrl,
      doc_hash: hash,
      published_date: publishedDate,
      verified_status: 'false',
      comment,
    })

    return toDocumentRecord(created.id, record)
  } catch (error) {
    throw toAppError(error)
  }
}

/** Set a document's verification status (authorizer action). Idempotent. */
export async function setVerificationStatus(
  record: DocumentRecord,
  verifierEmail: string,
  status: VerificationStatus,
): Promise<VerificationStatus> {
  try {
    const raw = fromVerificationStatus(status)

    await updateDoc(doc(getDb(), COLLECTIONS.allDocs, record.id), {
      verified_status: raw,
      verified_by: verifierEmail,
    })

    // Mirror the change onto the uploader's history entry (matched by hash).
    const historyRef = collection(
      getDb(),
      COLLECTIONS.userDocs,
      record.uploaderEmail,
      COLLECTIONS.docHistory,
    )
    const historySnap = await getDocs(query(historyRef, where('doc_hash', '==', record.hash)))
    await Promise.all(
      historySnap.docs.map((d) =>
        updateDoc(d.ref, { verified_status: raw, verified_by: verifierEmail }),
      ),
    )

    return status
  } catch (error) {
    throw toAppError(error)
  }
}
