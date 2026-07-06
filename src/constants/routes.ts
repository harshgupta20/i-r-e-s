/** Central route registry — the single source of truth for navigation. */
export const ROUTES = {
  home: '/',
  about: '/about',
  contact: '/contact',
  verify: '/verify',
  account: '/account',
  accountProfile: '/account/profile',
  accountDetails: '/account/details',
  accountDocuments: '/account/documents',
  accountUpload: '/account/upload',
  accountAuthorize: '/account/authorize',
  accountHelp: '/account/help',
} as const

export type AppRoute = (typeof ROUTES)[keyof typeof ROUTES]
