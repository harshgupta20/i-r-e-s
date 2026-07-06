import { useState } from 'react'
import { NavLink } from 'react-router-dom'
import { Menu, Search } from 'lucide-react'
import { PRIMARY_NAV } from '@/constants/navigation'
import { useCommandStore } from '@/stores/command-store'
import { cn } from '@/lib/utils'
import {
  Button,
  Kbd,
  Sheet,
  SheetClose,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '@/components/ui'
import { Brand } from '@/components/brand'
import { ThemeToggle } from '@/components/theme-toggle'
import { UserMenu } from '@/features/auth/user-menu'

function navLinkClass({ isActive }: { isActive: boolean }) {
  return cn(
    'rounded-md px-3 py-2 text-sm font-medium transition-colors',
    isActive ? 'text-foreground' : 'text-muted-foreground hover:text-foreground',
  )
}

export function Navbar() {
  const openCommand = useCommandStore((s) => s.setOpen)
  const [mobileOpen, setMobileOpen] = useState(false)

  return (
    <header className="sticky top-0 z-40 border-b border-border/80 glass">
      <div className="container flex h-16 items-center justify-between gap-4">
        <div className="flex items-center gap-1">
          <Brand />
          <nav className="ml-6 hidden items-center gap-0.5 md:flex" aria-label="Primary">
            {PRIMARY_NAV.map((item) => (
              <NavLink key={item.to} to={item.to} end={item.to === '/'} className={navLinkClass}>
                {item.label}
              </NavLink>
            ))}
          </nav>
        </div>

        <div className="flex items-center gap-2">
          <Button
            variant="outline"
            size="sm"
            className="hidden gap-6 text-muted-foreground sm:inline-flex"
            onClick={() => openCommand(true)}
          >
            <span className="inline-flex items-center gap-2">
              <Search className="size-4" />
              Search…
            </span>
            <Kbd>⌘K</Kbd>
          </Button>
          <Button
            variant="ghost"
            size="icon-sm"
            className="sm:hidden"
            aria-label="Search"
            onClick={() => openCommand(true)}
          >
            <Search />
          </Button>

          <ThemeToggle />
          <div className="hidden sm:block">
            <UserMenu />
          </div>

          {/* Mobile menu */}
          <Sheet open={mobileOpen} onOpenChange={setMobileOpen}>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon-sm" className="md:hidden" aria-label="Open menu">
                <Menu />
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="w-72">
              <SheetHeader>
                <SheetTitle>
                  <Brand />
                </SheetTitle>
              </SheetHeader>
              <nav className="flex flex-col gap-1 px-4" aria-label="Mobile">
                {PRIMARY_NAV.map((item) => (
                  <SheetClose asChild key={item.to}>
                    <NavLink
                      to={item.to}
                      end={item.to === '/'}
                      className={({ isActive }) =>
                        cn(
                          'flex items-center gap-3 rounded-md px-3 py-2.5 text-sm font-medium transition-colors',
                          isActive
                            ? 'bg-accent text-foreground'
                            : 'text-muted-foreground hover:bg-accent hover:text-foreground',
                        )
                      }
                    >
                      <item.icon className="size-4" />
                      {item.label}
                    </NavLink>
                  </SheetClose>
                ))}
                <div className="mt-4 border-t border-border pt-4">
                  <UserMenu />
                </div>
              </nav>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  )
}
