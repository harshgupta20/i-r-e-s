import { Link } from 'react-router-dom'
import { Github } from 'lucide-react'
import { APP } from '@/constants'
import { PRIMARY_NAV } from '@/constants/navigation'
import { Brand } from '@/components/brand'

export function Footer() {
  return (
    <footer className="border-t border-border">
      <div className="container flex flex-col gap-6 py-10 sm:flex-row sm:items-center sm:justify-between">
        <div className="space-y-2">
          <Brand />
          <p className="max-w-xs text-sm text-muted-foreground">{APP.description}</p>
        </div>

        <nav className="flex flex-wrap gap-x-6 gap-y-2 text-sm" aria-label="Footer">
          {PRIMARY_NAV.map((item) => (
            <Link
              key={item.to}
              to={item.to}
              className="text-muted-foreground transition-colors hover:text-foreground"
            >
              {item.label}
            </Link>
          ))}
          <a
            href={APP.repoUrl}
            target="_blank"
            rel="noreferrer noopener"
            className="inline-flex items-center gap-1.5 text-muted-foreground transition-colors hover:text-foreground"
          >
            <Github className="size-4" />
            GitHub
          </a>
        </nav>
      </div>
      <div className="border-t border-border/60">
        <div className="container flex h-14 items-center justify-between text-xs text-muted-foreground">
          <span>
            © {new Date().getFullYear()} {APP.name}
          </span>
          <span>Built with React, TypeScript &amp; Firebase</span>
        </div>
      </div>
    </footer>
  )
}
