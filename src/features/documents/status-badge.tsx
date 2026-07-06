import { ShieldCheck, ShieldX } from 'lucide-react'
import type { VerificationStatus } from '@/types'
import { Badge } from '@/components/ui'

export function StatusBadge({ status }: { status: VerificationStatus }) {
  if (status === 'verified') {
    return (
      <Badge variant="success">
        <ShieldCheck />
        Verified
      </Badge>
    )
  }
  return (
    <Badge variant="warning">
      <ShieldX />
      Unverified
    </Badge>
  )
}
