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

/**
 * True when the Firebase essentials for Auth + Firestore are present.
 * (storageBucket / messagingSenderId are optional — file storage uses Cloudinary.)
 */
export const isFirebaseConfigured: boolean = Boolean(
  firebaseConfig.apiKey &&
    firebaseConfig.authDomain &&
    firebaseConfig.projectId &&
    firebaseConfig.appId,
)

/** Cloudinary is used for document file storage (unsigned uploads). */
export const cloudinaryConfig = {
  cloudName: import.meta.env.VITE_CLOUDINARY_CLOUD_NAME,
  uploadPreset: import.meta.env.VITE_CLOUDINARY_UPLOAD_PRESET,
} as const

export const isCloudinaryConfigured: boolean = Boolean(
  cloudinaryConfig.cloudName && cloudinaryConfig.uploadPreset,
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
