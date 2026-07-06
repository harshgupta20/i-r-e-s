import { createContext, useEffect, useMemo, useState } from 'react'
import { signInWithGoogle, signOutUser, subscribeToAuth } from '@/services/api'
import { isFirebaseConfigured } from '@/services/firebase/client'
import type { AuthUser } from '@/types'

export interface AuthContextValue {
  user: AuthUser | null
  /** True until the first auth state is resolved. */
  loading: boolean
  isConfigured: boolean
  signIn: () => Promise<void>
  signOut: () => Promise<void>
}

export const AuthContext = createContext<AuthContextValue | null>(null)

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<AuthUser | null>(null)
  const [loading, setLoading] = useState(isFirebaseConfigured)

  useEffect(() => {
    if (!isFirebaseConfigured) return
    const unsubscribe = subscribeToAuth((nextUser) => {
      setUser(nextUser)
      setLoading(false)
    })
    return unsubscribe
  }, [])

  const value = useMemo<AuthContextValue>(
    () => ({
      user,
      loading,
      isConfigured: isFirebaseConfigured,
      signIn: async () => {
        await signInWithGoogle()
      },
      signOut: async () => {
        await signOutUser()
      },
    }),
    [user, loading],
  )

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}
