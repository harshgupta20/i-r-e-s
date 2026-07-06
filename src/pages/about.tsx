import { Link } from 'react-router-dom'
import { ArrowRight, Building2, FileWarning, GraduationCap, ShieldCheck } from 'lucide-react'
import { APP, ROUTES } from '@/constants'
import { Button, Card } from '@/components/ui'

const PROBLEMS = [
  {
    icon: FileWarning,
    title: 'Forgery is easy',
    body: 'Without an anti-forgery mechanism, skilfully generated counterfeits are hard to detect and undermine trust in the issuing authority.',
  },
  {
    icon: GraduationCap,
    title: 'Certificates matter',
    body: 'Students must produce academic certificates during admissions and hiring, yet low transparency makes them simple to fake.',
  },
  {
    icon: Building2,
    title: 'Verification is costly',
    body: 'Companies spend heavily verifying credentials manually — a process that is slow, expensive, and error-prone.',
  },
]

export default function AboutPage() {
  return (
    <div className="container max-w-4xl py-12 lg:py-16">
      <div className="max-w-2xl">
        <p className="font-mono text-sm text-primary">About {APP.name}</p>
        <h1 className="mt-3 text-4xl font-bold tracking-tight">
          Digital documents you can actually trust.
        </h1>
        <p className="mt-5 text-lg text-muted-foreground">
          Physical documents are inconvenient and inefficient, but digitizing them creates a new
          problem: proving they’re authentic. {APP.name} makes verification a matter of
          cryptographic fact rather than manual, error-prone checks.
        </p>
      </div>

      <div className="mt-12 grid gap-4 sm:grid-cols-3">
        {PROBLEMS.map((problem) => (
          <Card key={problem.title} className="p-5">
            <div className="grid size-10 place-items-center rounded-lg bg-primary/10 text-primary">
              <problem.icon className="size-5" />
            </div>
            <h2 className="mt-4 font-semibold">{problem.title}</h2>
            <p className="mt-1.5 text-sm text-muted-foreground">{problem.body}</p>
          </Card>
        ))}
      </div>

      <div className="prose-none mt-14 space-y-5 text-muted-foreground">
        <h2 className="text-2xl font-semibold tracking-tight text-foreground">Our approach</h2>
        <p>
          {APP.name} computes a unique cryptographic fingerprint (a SHA-256 hash) for each document
          and publishes it to a shared registry. Because the fingerprint is derived from the
          document’s exact contents, altering so much as a single byte produces a completely
          different fingerprint — making tampering immediately obvious.
        </p>
        <p>
          Verified authorizers can vouch for a document, attaching an immutable verification record.
          Anyone who receives the document can then confirm its authenticity themselves by
          re-computing the fingerprint and matching it against the registry — no third-party
          verification service required, and without ever exposing the document’s contents.
        </p>
        <p>
          The result is a lightweight, privacy-preserving trust layer for digital documents:
          students face less risk of losing or damaging certificates, and institutions and employers
          get instant, dependable verification.
        </p>
      </div>

      <Card className="mt-14 flex flex-col items-start gap-4 border-primary/20 bg-primary/[0.04] p-8 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex items-center gap-4">
          <div className="grid size-11 place-items-center rounded-xl bg-primary/10 text-primary">
            <ShieldCheck className="size-6" />
          </div>
          <div>
            <p className="font-semibold text-foreground">See it in action</p>
            <p className="text-sm text-muted-foreground">Verify a document in under ten seconds.</p>
          </div>
        </div>
        <Button asChild>
          <Link to={ROUTES.verify}>
            Open the verifier
            <ArrowRight />
          </Link>
        </Button>
      </Card>
    </div>
  )
}
