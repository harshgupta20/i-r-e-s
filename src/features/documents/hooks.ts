import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { QUERY_KEYS } from '@/constants'
import {
  listAllDocuments,
  listUserDocuments,
  setVerificationStatus,
  uploadDocument,
} from '@/services/api'
import type {
  AuthUser,
  DocumentRecord,
  UploadDocumentInput,
  UserProfile,
  VerificationStatus,
} from '@/types'

/** Every published document (authorizer view). */
export function useAllDocuments() {
  return useQuery({
    queryKey: QUERY_KEYS.documents(),
    queryFn: listAllDocuments,
  })
}

/** A single user's upload history. */
export function useUserDocuments(email: string | undefined) {
  return useQuery({
    queryKey: QUERY_KEYS.userDocuments(email ?? 'anon'),
    queryFn: () => listUserDocuments(email as string),
    enabled: Boolean(email),
  })
}

export function useUploadDocument(user: AuthUser, profile: UserProfile) {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: (input: UploadDocumentInput) => uploadDocument(user, profile, input),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: QUERY_KEYS.userDocuments(user.email) })
      queryClient.invalidateQueries({ queryKey: QUERY_KEYS.documents() })
    },
  })
}

export function useSetVerification(verifierEmail: string) {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: ({
      record,
      status,
    }: {
      record: DocumentRecord
      status: VerificationStatus
    }) => setVerificationStatus(record, verifierEmail, status),
    // Optimistically flip the row so the table updates instantly.
    onMutate: async ({ record, status }) => {
      await queryClient.cancelQueries({ queryKey: QUERY_KEYS.documents() })
      const previous = queryClient.getQueryData<DocumentRecord[]>(QUERY_KEYS.documents())
      queryClient.setQueryData<DocumentRecord[]>(QUERY_KEYS.documents(), (old) =>
        old?.map((d) => (d.id === record.id ? { ...d, status, verifiedBy: verifierEmail } : d)),
      )
      return { previous }
    },
    onError: (_error, _vars, context) => {
      if (context?.previous) {
        queryClient.setQueryData(QUERY_KEYS.documents(), context.previous)
      }
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: QUERY_KEYS.documents() })
    },
  })
}
