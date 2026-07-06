import { useOutletContext } from 'react-router-dom'
import type { AuthUser, UserProfile } from '@/types'

export interface AccountContext {
  user: AuthUser
  profile: UserProfile | null
  isLoadingProfile: boolean
}

/** Typed access to the account layout's shared user + profile. */
export function useAccount(): AccountContext {
  return useOutletContext<AccountContext>()
}
