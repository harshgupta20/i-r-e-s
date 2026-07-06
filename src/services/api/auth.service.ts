import { onAuthStateChanged, signInWithPopup, signOut, type User } from 'firebase/auth'
import { getFirebaseAuth, getGoogleProvider } from '@/services/firebase/client'
import type { AuthUser } from '@/types'
import { toAppError } from './errors'

/** Map the verbose Firebase user to our lean domain identity. */
export function mapFirebaseUser(user: User | null): AuthUser | null {
  if (!user || !user.email) return null
  return {
    uid: user.uid,
    email: user.email,
    displayName: user.displayName ?? user.email,
    photoURL: user.photoURL,
  }
}

/** Subscribe to auth state; returns an unsubscribe function. */
export function subscribeToAuth(callback: (user: AuthUser | null) => void): () => void {
  return onAuthStateChanged(getFirebaseAuth(), (user) => callback(mapFirebaseUser(user)))
}

export async function signInWithGoogle(): Promise<AuthUser | null> {
  try {
    const result = await signInWithPopup(getFirebaseAuth(), getGoogleProvider())
    return mapFirebaseUser(result.user)
  } catch (error) {
    throw toAppError(error)
  }
}

export async function signOutUser(): Promise<void> {
  try {
    await signOut(getFirebaseAuth())
  } catch (error) {
    throw toAppError(error)
  }
}
