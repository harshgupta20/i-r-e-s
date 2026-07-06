import { initializeApp, type FirebaseApp } from 'firebase/app'
import { getAuth, GoogleAuthProvider, type Auth } from 'firebase/auth'
import { getFirestore, type Firestore } from 'firebase/firestore'
import { getStorage, type FirebaseStorage } from 'firebase/storage'
import { firebaseConfig, isFirebaseConfigured } from '@/lib/env'

/**
 * Lazily-initialized Firebase singletons.
 *
 * Initialization is deferred to first use (not module load) so the app boots in
 * "demo mode" when config is absent — `getAuth` throws `auth/invalid-api-key`
 * with an empty key, which would otherwise white-screen the whole app on import.
 * Callers guard on `isFirebaseConfigured` before invoking data features.
 */
let app: FirebaseApp | undefined
let authInstance: Auth | undefined
let dbInstance: Firestore | undefined
let storageInstance: FirebaseStorage | undefined
let providerInstance: GoogleAuthProvider | undefined

function getApp(): FirebaseApp {
  return (app ??= initializeApp(firebaseConfig))
}

export function getFirebaseAuth(): Auth {
  return (authInstance ??= getAuth(getApp()))
}

export function getDb(): Firestore {
  return (dbInstance ??= getFirestore(getApp()))
}

export function getFirebaseStorage(): FirebaseStorage {
  return (storageInstance ??= getStorage(getApp()))
}

export function getGoogleProvider(): GoogleAuthProvider {
  return (providerInstance ??= new GoogleAuthProvider())
}

export { isFirebaseConfigured }
