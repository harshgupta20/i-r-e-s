import { FileCheck2, Home, Info, Mail } from 'lucide-react'
import type { LucideIcon } from 'lucide-react'
import { ROUTES } from './routes'

export interface NavItem {
  label: string
  to: string
  icon: LucideIcon
}

/** Primary marketing/public navigation, shared by navbar + command menu. */
export const PRIMARY_NAV: NavItem[] = [
  { label: 'Home', to: ROUTES.home, icon: Home },
  { label: 'Verify', to: ROUTES.verify, icon: FileCheck2 },
  { label: 'About', to: ROUTES.about, icon: Info },
  { label: 'Contact', to: ROUTES.contact, icon: Mail },
]
