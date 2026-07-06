import { Link } from 'react-router-dom'
import { ArrowLeft, FileQuestion } from 'lucide-react'
import { ROUTES } from '@/constants'
import { Button } from '@/components/ui'

export default function NotFoundPage() {
  return (
    <div className="container grid min-h-[70vh] place-items-center py-16">
      <div className="max-w-md text-center">
        <div className="mx-auto mb-6 grid size-14 place-items-center rounded-2xl border border-border bg-surface text-muted-foreground shadow-sm">
          <FileQuestion className="size-7" />
        </div>
        <p className="font-mono text-sm text-muted-foreground">404</p>
        <h1 className="mt-2 text-3xl font-semibold tracking-tight">Page not found</h1>
        <p className="mt-3 text-muted-foreground">
          The page you’re looking for doesn’t exist or may have been moved.
        </p>
        <Button asChild className="mt-6">
          <Link to={ROUTES.home}>
            <ArrowLeft />
            Back to home
          </Link>
        </Button>
      </div>
    </div>
  )
}
