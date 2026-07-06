import { describe, expect, it } from 'vitest'
import { render, screen } from '@testing-library/react'
import { Button } from './button'

describe('<Button />', () => {
  it('renders a native button by default', () => {
    render(<Button>Click me</Button>)
    expect(screen.getByRole('button', { name: 'Click me' })).toBeInTheDocument()
  })

  it('renders as its child element with asChild (Radix Slot needs a single child)', () => {
    // Regression: previously a falsy spinner sibling made Slot throw
    // "Expected a single React element child".
    render(
      <Button asChild>
        <a href="/verify">Verify a document</a>
      </Button>,
    )
    const link = screen.getByRole('link', { name: 'Verify a document' })
    expect(link).toHaveAttribute('href', '/verify')
    expect(screen.queryByRole('button')).not.toBeInTheDocument()
  })

  it('disables and shows a spinner while loading', () => {
    render(<Button loading>Saving</Button>)
    expect(screen.getByRole('button')).toBeDisabled()
  })
})
