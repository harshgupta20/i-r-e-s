import { NavLink, Outlet } from 'react-router-dom'
import { useAuth } from '@/hooks/use-auth'
import { useProfile } from '@/features/profile/hooks'
import { accountNavForRole } from '@/features/account/nav'
import type { AccountContext } from '@/features/account/context'
import { cn } from '@/lib/utils'
import { Avatar, AvatarFallback, AvatarImage, Badge, initials } from '@/components/ui'

export function AccountLayout() {
  const { user } = useAuth()
  const { data: profile, isLoading } = useProfile(user?.uid)

  // ProtectedRoute guarantees a user before this renders.
  if (!user) return null

  const role = profile?.role ?? 'user'
  const navItems = accountNavForRole(role)

  const context: AccountContext = { user, profile: profile ?? null, isLoadingProfile: isLoading }

  return (
    <div className="container py-8 lg:py-12">
      <div className="grid gap-8 lg:grid-cols-[260px_minmax(0,1fr)]">
        <aside className="lg:sticky lg:top-24 lg:self-start">
          <div className="flex items-center gap-3 rounded-xl border border-border bg-card p-4">
            <Avatar className="size-11">
              {user.photoURL && <AvatarImage src={user.photoURL} alt="" />}
              <AvatarFallback>{initials(user.displayName)}</AvatarFallback>
            </Avatar>
            <div className="min-w-0">
              <p className="truncate text-sm font-medium">{user.displayName}</p>
              <Badge variant={role === 'authorizer' ? 'primary' : 'default'} className="mt-1">
                {role === 'authorizer' ? 'Authorizer' : 'Member'}
              </Badge>
            </div>
          </div>

          <nav
            className="mt-4 flex gap-1 overflow-x-auto lg:flex-col"
            aria-label="Account sections"
          >
            {navItems.map((item) => (
              <NavLink
                key={item.to}
                to={item.to}
                end
                className={({ isActive }) =>
                  cn(
                    'flex shrink-0 items-center gap-2.5 rounded-lg px-3 py-2 text-sm font-medium transition-colors',
                    isActive
                      ? 'bg-primary/10 text-primary'
                      : 'text-muted-foreground hover:bg-accent hover:text-foreground',
                  )
                }
              >
                <item.icon className="size-4" />
                {item.label}
              </NavLink>
            ))}
          </nav>
        </aside>

        <div className="min-w-0">
          <Outlet context={context} />
        </div>
      </div>
    </div>
  )
}
