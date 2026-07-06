import { useState } from 'react'
import { Link } from 'react-router-dom'
import { AnimatePresence, motion } from 'framer-motion'
import { ChevronDown, LifeBuoy } from 'lucide-react'
import { ROUTES } from '@/constants'
import { cn } from '@/lib/utils'
import { PageHeader } from '@/components/page-header'
import { Card } from '@/components/ui'

interface FaqItem {
  code: string
  title: string
  content: React.ReactNode
}

const FAQS: FaqItem[] = [
  {
    code: 'P-001',
    title: 'My profile data is incomplete',
    content: (
      <div className="space-y-3">
        <p>
          This means you haven’t finished setting up your profile. Complete your personal details to
          unlock uploads and verification.
        </p>
        <ol className="ml-5 list-decimal space-y-1">
          <li>
            Open{' '}
            <Link to={ROUTES.accountDetails} className="text-primary hover:underline">
              Personal details
            </Link>
            .
          </li>
          <li>Fill in every field and submit.</li>
          <li>Your profile updates instantly — no refresh needed.</li>
        </ol>
      </div>
    ),
  },
  {
    code: 'Access',
    title: 'How do I become an authorizer?',
    content: (
      <div className="space-y-3">
        <p>Authorizers can review and verify documents. To request access:</p>
        <ol className="ml-5 list-decimal space-y-1">
          <li>
            Go to the{' '}
            <Link to={ROUTES.contact} className="text-primary hover:underline">
              Contact
            </Link>{' '}
            page.
          </li>
          <li>
            Use the title <em>“Request for Authorization Access”</em>.
          </li>
          <li>Explain why you’re eligible to become an authorizer, then submit.</li>
        </ol>
        <p>An admin reviews each request and updates your role if approved.</p>
      </div>
    ),
  },
  {
    code: 'Verify',
    title: 'How does verification actually work?',
    content: (
      <p>
        Every document is fingerprinted with a SHA-256 hash computed from its exact bytes. Verifying
        a file re-computes that fingerprint and looks for a match in the registry. Because any change
        to the file changes the fingerprint, forgeries never match.
      </p>
    ),
  },
]

export default function HelpPage() {
  const [open, setOpen] = useState<string | null>(FAQS[0].code)

  return (
    <div className="space-y-6">
      <PageHeader title="Help center" description="Answers to common questions and error codes." />

      <Card className="divide-y divide-border">
        {FAQS.map((faq) => {
          const isOpen = open === faq.code
          return (
            <div key={faq.code}>
              <button
                onClick={() => setOpen(isOpen ? null : faq.code)}
                className="flex w-full items-center gap-3 px-5 py-4 text-left transition-colors hover:bg-accent/40 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-ring"
                aria-expanded={isOpen}
              >
                <span className="grid size-9 shrink-0 place-items-center rounded-lg bg-primary/10 text-primary">
                  <LifeBuoy className="size-4" />
                </span>
                <span className="flex-1">
                  <span className="font-mono text-xs text-muted-foreground">{faq.code}</span>
                  <span className="block text-sm font-medium">{faq.title}</span>
                </span>
                <ChevronDown
                  className={cn(
                    'size-4 shrink-0 text-muted-foreground transition-transform',
                    isOpen && 'rotate-180',
                  )}
                />
              </button>
              <AnimatePresence initial={false}>
                {isOpen && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.2 }}
                    className="overflow-hidden"
                  >
                    <div className="px-5 pb-5 pl-[4.25rem] text-sm text-muted-foreground">
                      {faq.content}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          )
        })}
      </Card>
    </div>
  )
}
