import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { QUERY_KEYS } from '@/constants'
import { getUserProfile, saveUserProfile } from '@/services/api'
import type { AuthUser, UserProfileInput } from '@/types'

/** The current user's extended profile (null until they complete it). */
export function useProfile(uid: string | undefined) {
  return useQuery({
    queryKey: QUERY_KEYS.profile(uid ?? 'anon'),
    queryFn: () => getUserProfile(uid as string),
    enabled: Boolean(uid),
  })
}

export function useSaveProfile(user: AuthUser) {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: (input: UserProfileInput) => saveUserProfile(user, input),
    onSuccess: (profile) => {
      queryClient.setQueryData(QUERY_KEYS.profile(user.uid), profile)
    },
  })
}
