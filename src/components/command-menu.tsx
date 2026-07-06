import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { LogOut, Moon, Sun, User as UserIcon } from 'lucide-react'
import { ROUTES } from '@/constants'
import { PRIMARY_NAV } from '@/constants/navigation'
import { useAuth } from '@/hooks/use-auth'
import { useTheme } from '@/hooks/use-theme'
import { useCommandStore } from '@/stores/command-store'
import {
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from '@/components/ui'

export function CommandMenu() {
  const { open, setOpen, toggle } = useCommandStore()
  const navigate = useNavigate()
  const { user, signOut } = useAuth()
  const { resolvedTheme, toggleTheme } = useTheme()

  // Global ⌘K / Ctrl+K shortcut.
  useEffect(() => {
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'k' && (e.metaKey || e.ctrlKey)) {
        e.preventDefault()
        toggle()
      }
    }
    document.addEventListener('keydown', onKeyDown)
    return () => document.removeEventListener('keydown', onKeyDown)
  }, [toggle])

  const run = (action: () => void) => {
    setOpen(false)
    action()
  }

  return (
    <CommandDialog open={open} onOpenChange={setOpen}>
      <CommandInput placeholder="Type a command or search…" />
      <CommandList>
        <CommandEmpty>No results found.</CommandEmpty>

        <CommandGroup heading="Navigation">
          {PRIMARY_NAV.map((item) => (
            <CommandItem key={item.to} onSelect={() => run(() => navigate(item.to))}>
              <item.icon />
              {item.label}
            </CommandItem>
          ))}
          {user && (
            <CommandItem onSelect={() => run(() => navigate(ROUTES.accountProfile))}>
              <UserIcon />
              My account
            </CommandItem>
          )}
        </CommandGroup>

        <CommandGroup heading="Preferences">
          <CommandItem onSelect={() => run(toggleTheme)}>
            {resolvedTheme === 'dark' ? <Sun /> : <Moon />}
            Switch to {resolvedTheme === 'dark' ? 'light' : 'dark'} theme
          </CommandItem>
          {user && (
            <CommandItem onSelect={() => run(() => void signOut())}>
              <LogOut />
              Sign out
            </CommandItem>
          )}
        </CommandGroup>
      </CommandList>
    </CommandDialog>
  )
}
