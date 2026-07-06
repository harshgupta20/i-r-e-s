import { Navigate, Outlet, useLocation } from 'react-router-dom'
import { ROUTES } from '@/constants'
import { useAuth } from '@/hooks/use-auth'
import { Spinner } from '@/components/ui'

/** Gates a subtree behind authentication; redirects unauthenticated users home. */
export function ProtectedRoute() {
  const { user, loading } = useAuth()
  const location = useLocation()

  if (loading) {
    return (
      <div className="grid min-h-[60vh] place-items-center">
        <Spinner size="lg" />
      </div>
    )
  }

  if (!user) {
    return <Navigate to={ROUTES.home} replace state={{ from: location.pathname }} />
  }

  return <Outlet />
}
