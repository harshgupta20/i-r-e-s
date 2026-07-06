import { Component, type ErrorInfo, type ReactNode } from 'react'
import { RotateCcw } from 'lucide-react'
import { Button } from '@/components/ui/button'

interface Props {
  children: ReactNode
  fallback?: ReactNode
}

interface State {
  error: Error | null
}

/** Catches render errors in the subtree and shows a recovery UI. */
export class ErrorBoundary extends Component<Props, State> {
  state: State = { error: null }

  static getDerivedStateFromError(error: Error): State {
    return { error }
  }

  componentDidCatch(error: Error, info: ErrorInfo) {
    // In production this is where an error reporter (Sentry, etc.) would go.
    console.error('Uncaught render error:', error, info.componentStack)
  }

  private reset = () => this.setState({ error: null })

  render() {
    if (!this.state.error) return this.props.children
    if (this.props.fallback) return this.props.fallback

    return (
      <div className="grid min-h-[60vh] place-items-center p-6">
        <div className="max-w-md text-center">
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
        </div>
      </div>
    )
  }
}
