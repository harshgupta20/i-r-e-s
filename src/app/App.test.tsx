import { describe, expect, it, vi } from 'vitest'
import { render, screen, waitFor } from '@testing-library/react'

// Force "demo mode" so the smoke test is hermetic — independent of the local
// .env — and never touches the network.
vi.mock('@/lib/env', () => ({
  firebaseConfig: {
    apiKey: '',
    authDomain: '',
    projectId: '',
    storageBucket: '',
    messagingSenderId: '',
    appId: '',
  },
  isFirebaseConfigured: false,
  cloudinaryConfig: { cloudName: '', uploadPreset: '' },
  isCloudinaryConfigured: false,
  emailjsConfig: { serviceId: '', contactTemplateId: '', supportTemplateId: '', publicKey: '' },
  isEmailConfigured: false,
}))

import { App } from './App'

describe('<App />', () => {
  it('boots and renders the shell without crashing', async () => {
    render(<App />)
    // The root layout (navbar, skip link) renders before any lazy page resolves.
    await waitFor(() => {
      expect(screen.getByText('Skip to content')).toBeInTheDocument()
    })
    // Demo-mode banner appears because config is mocked absent.
    expect(screen.getByText(/Demo mode/i)).toBeInTheDocument()
  })

  it('renders the lazy home page, including asChild buttons', async () => {
    // Exercises the home route's <Button asChild><Link/></Button> — the case
    // that must not trip Radix Slot's single-child requirement.
    render(<App />)
    await waitFor(
      () => {
        expect(screen.getByRole('link', { name: /verify a document/i })).toBeInTheDocument()
      },
      { timeout: 3000 },
    )
  })
})
