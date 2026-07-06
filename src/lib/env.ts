/**
 * Typed, validated access to environment configuration.
 * Centralizing this means the rest of the app never touches `import.meta.env`.
 */

export const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
  appId: import.meta.env.VITE_FIREBASE_APP_ID,
} as const

/** True when all required Firebase config values are present. */
export const isFirebaseConfigured: boolean = Object.values(firebaseConfig).every(
  (value) => typeof value === 'string' && value.length > 0,
)

export const emailjsConfig = {
  serviceId: import.meta.env.VITE_EMAILJS_SERVICE_ID,
  contactTemplateId: import.meta.env.VITE_EMAILJS_CONTACT_TEMPLATE_ID,
  supportTemplateId: import.meta.env.VITE_EMAILJS_SUPPORT_TEMPLATE_ID,
  publicKey: import.meta.env.VITE_EMAILJS_PUBLIC_KEY,
} as const

export const isEmailConfigured: boolean = Boolean(
  emailjsConfig.serviceId && emailjsConfig.publicKey,
)
