import { FolderClosed, IdCard, LifeBuoy, ShieldCheck, UploadCloud, UserRound } from 'lucide-react'
import type { LucideIcon } from 'lucide-react'
import { ROUTES } from '@/constants'
import type { UserRole } from '@/types'

export interface AccountNavItem {
  label: string
  to: string
  icon: LucideIcon
  /** If set, only visible to these roles. */
  roles?: UserRole[]
}

const ITEMS: AccountNavItem[] = [
  { label: 'Profile', to: ROUTES.accountProfile, icon: UserRound },
  { label: 'Personal details', to: ROUTES.accountDetails, icon: IdCard },
  { label: 'Upload document', to: ROUTES.accountUpload, icon: UploadCloud, roles: ['user'] },
  { label: 'My documents', to: ROUTES.accountDocuments, icon: FolderClosed, roles: ['user'] },
  { label: 'Authorize', to: ROUTES.accountAuthorize, icon: ShieldCheck, roles: ['authorizer'] },
  { label: 'Help center', to: ROUTES.accountHelp, icon: LifeBuoy },
]

export function accountNavForRole(role: UserRole): AccountNavItem[] {
  return ITEMS.filter((item) => !item.roles || item.roles.includes(role))
}
