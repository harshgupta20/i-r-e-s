import { describe, expect, it } from 'vitest'
import { render, screen, waitFor } from '@testing-library/react'
import { App } from './App'

describe('<App />', () => {
  it('boots and renders the shell without Firebase configured', async () => {
    render(<App />)
    // The root layout (navbar, skip link) renders before any lazy page resolves.
    await waitFor(() => {
      expect(screen.getByText('Skip to content')).toBeInTheDocument()
    })
    // Demo-mode banner appears because env vars are absent in tests.
    expect(screen.getByText(/Demo mode/i)).toBeInTheDocument()
  })
})
