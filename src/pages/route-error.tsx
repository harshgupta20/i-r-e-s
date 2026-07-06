import { isRouteErrorResponse, Link, useRouteError } from 'react-router-dom'
import { AlertTriangle, ArrowLeft } from 'lucide-react'
import { ROUTES } from '@/constants'
import { Button } from '@/components/ui'
import { Navbar } from '@/components/navbar'

export function RouteError() {
  const error = useRouteError()

  const { code, title } = isRouteErrorResponse(error)
    ? { code: String(error.status), title: error.statusText || 'Unexpected error' }
    : { code: 'Error', title: 'Something went wrong' }

  return (
    <div className="flex min-h-full flex-col">
      <Navbar />
      <main className="container grid flex-1 place-items-center py-16">
        <div className="max-w-md text-center">
          <div className="mx-auto mb-6 grid size-14 place-items-center rounded-2xl bg-destructive/10 text-destructive">
            <AlertTriangle className="size-7" />
          </div>
          <p className="font-mono text-sm text-muted-foreground">{code}</p>
          <h1 className="mt-2 text-3xl font-semibold tracking-tight">{title}</h1>
          <p className="mt-3 text-muted-foreground">
            An error occurred while loading this page. Please try again.
          </p>
          <div className="mt-6 flex justify-center gap-3">
            <Button variant="outline" onClick={() => window.location.reload()}>
              Reload
            </Button>
            <Button asChild>
              <Link to={ROUTES.home}>
                <ArrowLeft />
                Home
              </Link>
            </Button>
          </div>
        </div>
      </main>
    </div>
  )
}
