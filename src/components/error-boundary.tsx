import { Component, type ErrorInfo, type ReactNode } from 'react'
import { RotateCcw } from 'lucide-react'
import { Button } from '@/components/ui/button'

interface Props {
  children: ReactNode
  fallback?: ReactNode
}

interface State {
  error: Error | null
  componentStack: string | null
}

/** Catches render errors in the subtree and shows a recovery UI. */
export class ErrorBoundary extends Component<Props, State> {
  state: State = { error: null, componentStack: null }

  static getDerivedStateFromError(error: Error): Partial<State> {
    return { error }
  }

  componentDidCatch(error: Error, info: ErrorInfo) {
    // In production this is where an error reporter (Sentry, etc.) would go.
    console.error('Uncaught render error:', error, info.componentStack)
    this.setState({ componentStack: info.componentStack ?? null })
  }

  private reset = () => this.setState({ error: null, componentStack: null })

  render() {
    const { error, componentStack } = this.state
    if (!error) return this.props.children
    if (this.props.fallback) return this.props.fallback

    return (
      <div className="grid min-h-[60vh] place-items-center p-6">
        <div className="w-full max-w-2xl text-center">
          <p className="font-mono text-sm text-muted-foreground">Error</p>
          <h1 className="mt-2 text-2xl font-semibold tracking-tight">This page crashed</h1>
          <p className="mt-2 text-sm text-muted-foreground">
            An unexpected error occurred while rendering. Reloading usually fixes it.
          </p>
          <div className="mt-6 flex justify-center gap-3">
            <Button variant="outline" onClick={this.reset}>
              <RotateCcw />
              Try again
            </Button>
            <Button onClick={() => window.location.reload()}>Reload page</Button>
          </div>

          {/* Dev-only diagnostics — never shown in production builds. */}
          {import.meta.env.DEV && (
            <details className="mt-6 rounded-lg border border-destructive/30 bg-destructive/5 p-4 text-left">
              <summary className="cursor-pointer text-sm font-medium text-destructive">
                {error.name}: {error.message}
              </summary>
              <pre className="mt-3 max-h-72 overflow-auto whitespace-pre-wrap break-words font-mono text-xs text-muted-foreground">
                {error.stack}
                {componentStack}
              </pre>
            </details>
          )}
        </div>
      </div>
    )
  }
}
