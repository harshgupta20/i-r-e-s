import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import {
  ArrowRight,
  FileCheck2,
  Fingerprint,
  Lock,
  ScanLine,
  ShieldCheck,
  Sparkles,
  UploadCloud,
} from 'lucide-react'
import { APP, ROUTES } from '@/constants'
import { Badge, Button, Card } from '@/components/ui'

const STEPS = [
  {
    icon: UploadCloud,
    title: 'Upload & hash',
    body: 'Your document is fingerprinted with SHA-256 locally in your browser. The file never needs to leave your device to be identified.',
  },
  {
    icon: ShieldCheck,
    title: 'Get it authorized',
    body: 'A verified authorizer reviews the submission and vouches for its authenticity, recording an immutable verification record.',
  },
  {
    icon: ScanLine,
    title: 'Anyone can verify',
    body: 'Recipients drop the same file into the verifier. A matching fingerprint confirms the document is genuine in seconds.',
  },
]

const FEATURES = [
  {
    icon: Fingerprint,
    title: 'Tamper-evident by design',
    body: 'Change a single byte and the fingerprint changes. Forgeries simply don’t match.',
  },
  {
    icon: Lock,
    title: 'Privacy-first hashing',
    body: 'Verification uses content fingerprints — not the document contents themselves.',
  },
  {
    icon: FileCheck2,
    title: 'Instant verification',
    body: 'No back-and-forth emails. A recipient gets an authoritative answer immediately.',
  },
]

const fadeUp = {
  initial: { opacity: 0, y: 16 },
  animate: { opacity: 1, y: 0 },
}

export default function HomePage() {
  return (
    <>
      {/* Hero */}
      <section className="relative overflow-hidden">
        <div className="pointer-events-none absolute inset-0 -z-10 bg-grid mask-radial-faded opacity-60" />
        <div className="pointer-events-none absolute left-1/2 top-[-10%] -z-10 size-[40rem] -translate-x-1/2 rounded-full bg-primary/20 blur-[120px]" />

        <div className="container flex flex-col items-center py-20 text-center lg:py-28">
          <motion.div {...fadeUp} transition={{ duration: 0.4 }}>
            <Badge variant="outline" className="gap-1.5 bg-surface/60 py-1 backdrop-blur">
              <Sparkles className="text-primary" />
              Document authenticity, verified in seconds
            </Badge>
          </motion.div>

          <motion.h1
            {...fadeUp}
            transition={{ duration: 0.4, delay: 0.05 }}
            className="mt-6 max-w-3xl text-balance text-4xl font-bold tracking-tight sm:text-5xl lg:text-6xl"
          >
            Prove your documents are <span className="text-primary">authentic</span> on the internet.
          </motion.h1>

          <motion.p
            {...fadeUp}
            transition={{ duration: 0.4, delay: 0.1 }}
            className="mt-6 max-w-xl text-pretty text-lg text-muted-foreground"
          >
            {APP.name} fingerprints your documents and publishes a tamper-evident record, so anyone
            can confirm they’re genuine — no middlemen, no guesswork.
          </motion.p>

          <motion.div
            {...fadeUp}
            transition={{ duration: 0.4, delay: 0.15 }}
            className="mt-9 flex flex-col gap-3 sm:flex-row"
          >
            <Button asChild size="lg">
              <Link to={ROUTES.verify}>
                <ScanLine />
                Verify a document
              </Link>
            </Button>
            <Button asChild size="lg" variant="outline">
              <Link to={ROUTES.about}>
                Learn how it works
                <ArrowRight />
              </Link>
            </Button>
          </motion.div>
        </div>
      </section>

      {/* How it works */}
      <section className="border-t border-border bg-surface-muted/30">
        <div className="container py-20">
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="text-3xl font-semibold tracking-tight">How it works</h2>
            <p className="mt-3 text-muted-foreground">
              Three steps from raw file to independently verifiable proof.
            </p>
          </div>

          <div className="mt-14 grid gap-6 md:grid-cols-3">
            {STEPS.map((step, i) => (
              <motion.div
                key={step.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-80px' }}
                transition={{ duration: 0.4, delay: i * 0.1 }}
              >
                <Card className="h-full p-6">
                  <div className="flex items-center justify-between">
                    <div className="grid size-11 place-items-center rounded-xl bg-primary/10 text-primary">
                      <step.icon className="size-5" />
                    </div>
                    <span className="font-mono text-sm text-muted-foreground">
                      0{i + 1}
                    </span>
                  </div>
                  <h3 className="mt-5 text-lg font-semibold">{step.title}</h3>
                  <p className="mt-2 text-sm text-muted-foreground">{step.body}</p>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="container py-20">
        <div className="grid gap-10 lg:grid-cols-[1fr_1.2fr] lg:items-center">
          <div>
            <h2 className="text-3xl font-semibold tracking-tight">
              Built on cryptographic proof, not trust.
            </h2>
            <p className="mt-4 text-muted-foreground">
              Every document gets a unique fingerprint. Verification compares fingerprints, so
              authenticity is a mathematical fact — instant, private, and impossible to fake.
            </p>
            <Button asChild variant="secondary" className="mt-6">
              <Link to={ROUTES.verify}>
                Try the verifier
                <ArrowRight />
              </Link>
            </Button>
          </div>
          <div className="grid gap-4 sm:grid-cols-2">
            {FEATURES.map((feature) => (
              <Card key={feature.title} className="p-5">
                <div className="grid size-10 place-items-center rounded-lg bg-primary/10 text-primary">
                  <feature.icon className="size-5" />
                </div>
                <h3 className="mt-4 font-semibold">{feature.title}</h3>
                <p className="mt-1.5 text-sm text-muted-foreground">{feature.body}</p>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="container pb-24">
        <Card className="relative overflow-hidden border-primary/20 bg-primary/[0.04] p-10 text-center sm:p-14">
          <div className="pointer-events-none absolute inset-0 -z-10 bg-dot opacity-40" />
          <h2 className="text-3xl font-semibold tracking-tight">Ready to make it authentic?</h2>
          <p className="mx-auto mt-3 max-w-lg text-muted-foreground">
            Publish your first document fingerprint and give recipients a way to trust it instantly.
          </p>
          <Button asChild size="lg" className="mt-8">
            <Link to={ROUTES.accountUpload}>
              <UploadCloud />
              Publish a document
            </Link>
          </Button>
        </Card>
      </section>
    </>
  )
}
