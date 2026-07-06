import { FirebaseError } from 'firebase/app'

/** A user-facing error with a stable, friendly message. */
export class AppError extends Error {
  constructor(
    message: string,
    readonly cause?: unknown,
  ) {
    super(message)
    this.name = 'AppError'
  }
}

const FIREBASE_MESSAGES: Record<string, string> = {
  'auth/popup-closed-by-user': 'Sign-in was cancelled.',
  'auth/cancelled-popup-request': 'Sign-in was cancelled.',
  'auth/popup-blocked': 'Your browser blocked the sign-in popup. Please allow popups and retry.',
  'auth/network-request-failed': 'Network error. Check your connection and try again.',
  'permission-denied': 'You don’t have permission to perform this action.',
  unavailable: 'The service is temporarily unavailable. Please try again.',
  'storage/unauthorized': 'You don’t have permission to upload this file.',
  'storage/canceled': 'Upload cancelled.',
}

/** Normalize any thrown value into an AppError with a friendly message. */
export function toAppError(error: unknown): AppError {
  if (error instanceof AppError) return error

  if (error instanceof FirebaseError) {
    const friendly = FIREBASE_MESSAGES[error.code]
    return new AppError(friendly ?? 'Something went wrong. Please try again.', error)
  }

  if (error instanceof Error) return new AppError(error.message, error)

  return new AppError('An unexpected error occurred.', error)
}
