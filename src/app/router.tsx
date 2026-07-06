import { lazy } from 'react'
import { createBrowserRouter, Navigate } from 'react-router-dom'
import { RootLayout } from '@/layouts/root-layout'
import { AccountLayout } from '@/layouts/account-layout'
import { ProtectedRoute } from '@/components/protected-route'
import { RouteError } from '@/pages/route-error'
import { ROUTES } from '@/constants'

// Route-level code splitting: each page is its own chunk, loaded on demand.
const HomePage = lazy(() => import('@/pages/home'))
const VerifyPage = lazy(() => import('@/pages/verify'))
const AboutPage = lazy(() => import('@/pages/about'))
const ContactPage = lazy(() => import('@/pages/contact'))
const NotFoundPage = lazy(() => import('@/pages/not-found'))

const ProfilePage = lazy(() => import('@/pages/account/profile'))
const DetailsPage = lazy(() => import('@/pages/account/details'))
const UploadPage = lazy(() => import('@/pages/account/upload'))
const DocumentsPage = lazy(() => import('@/pages/account/documents'))
const AuthorizePage = lazy(() => import('@/pages/account/authorize'))
const HelpPage = lazy(() => import('@/pages/account/help'))

export const router = createBrowserRouter([
  {
    element: <RootLayout />,
    errorElement: <RouteError />,
    children: [
      { path: ROUTES.home, element: <HomePage /> },
      { path: ROUTES.verify, element: <VerifyPage /> },
      { path: ROUTES.about, element: <AboutPage /> },
      { path: ROUTES.contact, element: <ContactPage /> },
      {
        element: <ProtectedRoute />,
        children: [
          {
            path: 'account',
            element: <AccountLayout />,
            children: [
              { index: true, element: <Navigate to={ROUTES.accountProfile} replace /> },
              { path: 'profile', element: <ProfilePage /> },
              { path: 'details', element: <DetailsPage /> },
              { path: 'upload', element: <UploadPage /> },
              { path: 'documents', element: <DocumentsPage /> },
              { path: 'authorize', element: <AuthorizePage /> },
              { path: 'help', element: <HelpPage /> },
            ],
          },
        ],
      },
      { path: '*', element: <NotFoundPage /> },
    ],
  },
], {
  future: {
    v7_relativeSplatPath: true,
  },
})
