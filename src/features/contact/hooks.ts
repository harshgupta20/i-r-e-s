import { useMutation } from '@tanstack/react-query'
import { sendContactMessage, sendSupportMessage } from '@/services/api'
import type { ContactMessage, SupportMessage } from '@/types'

export function useSendContact() {
  return useMutation({
    mutationFn: (message: ContactMessage) => sendContactMessage(message),
  })
}

export function useSendSupport() {
  return useMutation({
    mutationFn: (message: SupportMessage) => sendSupportMessage(message),
  })
}
