import { useMutation } from '@tanstack/react-query'
import { verifyFile } from '@/services/api'

/** Hash a file locally and check it against the registry. */
export function useVerifyFile() {
  return useMutation({
    mutationFn: (file: File) => verifyFile(file),
  })
}
