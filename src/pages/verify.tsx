import { useState } from 'react'
import { motion } from 'framer-motion'
import {
  CircleHelp,
  ExternalLink,
  ScanLine,
  ShieldCheck,
  ShieldX,
  Sparkles,
} from 'lucide-react'
import type { VerificationResult } from '@/types'
import { useVerifyFile } from '@/features/verify/hooks'
import { StatusBadge } from '@/features/documents/status-badge'
import { toAppError } from '@/services/api'
import { formatDate } from '@/lib/format'
import { PageHeader } from '@/components/page-header'
import { FileDropzone } from '@/components/file-dropzone'
import { HashBadge } from '@/components/hash-badge'
import {
  Badge,
  Button,
  Card,
  Separator,
  Spinner,
  toast,
} from '@/components/ui'

export default function VerifyPage() {
  const [file, setFile] = useState<File | null>(null)
  const [result, setResult] = useState<VerificationResult | null>(null)
  const verify = useVerifyFile()

  const handleVerify = () => {
    if (!file) return
    setResult(null)
    verify.mutate(file, {
      onSuccess: setResult,
      onError: (error) => toast.error(toAppError(error).message),
    })
  }

  const handleFileChange = (next: File | null) => {
    setFile(next)
    setResult(null)
  }

  return (
    <div className="container max-w-5xl py-10 lg:py-14">
      <PageHeader
        title="Verify a document"
        description="Drop a file to check it against the registry. It's hashed locally — your document is never uploaded."
      />

      <div className="mt-8 grid gap-6 lg:grid-cols-2">
        <Card className="p-6">
          <FileDropzone
            file={file}
            onFileChange={handleFileChange}
            disabled={verify.isPending}
            onError={(message) => toast.error(message)}
          />
          <Button
            className="mt-4 w-full"
            size="lg"
            onClick={handleVerify}
            disabled={!file}
            loading={verify.isPending}
          >
            {!verify.isPending && <ScanLine />}
            {verify.isPending ? 'Checking…' : 'Verify authenticity'}
          </Button>
          {result && (
            <div className="mt-4 flex items-center justify-between gap-2 text-sm">
              <span className="text-muted-foreground">Computed fingerprint</span>
              <HashBadge hash={result.hash} />
            </div>
          )}
        </Card>

        <ResultPanel result={result} loading={verify.isPending} />
      </div>
    </div>
  )
}

function ResultPanel({
  result,
  loading,
}: {
  result: VerificationResult | null
  loading: boolean
}) {
  if (loading) {
    return (
      <Card className="grid place-items-center p-6">
        <div className="flex flex-col items-center gap-4 py-8 text-center">
          <Spinner size="lg" />
          <p className="text-sm text-muted-foreground">Scanning the registry…</p>
        </div>
      </Card>
    )
  }

  if (!result) {
    return (
      <Card className="grid place-items-center p-6">
        <div className="flex flex-col items-center gap-3 py-8 text-center">
          <div className="grid size-12 place-items-center rounded-xl border border-border bg-surface text-muted-foreground shadow-sm">
            <CircleHelp className="size-6" />
          </div>
          <div>
            <p className="font-medium">Awaiting a document</p>
            <p className="mt-1 max-w-xs text-sm text-muted-foreground">
              Upload a file and run verification to see its authenticity result here.
            </p>
          </div>
        </div>
      </Card>
    )
  }

  const { match } = result

  if (!match) {
    return (
      <motion.div initial={{ opacity: 0, scale: 0.98 }} animate={{ opacity: 1, scale: 1 }}>
        <Card className="border-warning/30 bg-warning/[0.04] p-6">
          <div className="flex items-center gap-3">
            <div className="grid size-11 place-items-center rounded-xl bg-warning/15 text-warning">
              <ShieldX className="size-6" />
            </div>
            <div>
              <h2 className="text-lg font-semibold">Not in the registry</h2>
              <p className="text-sm text-muted-foreground">
                No published document matches this fingerprint.
              </p>
            </div>
          </div>
          <p className="mt-4 text-sm text-muted-foreground">
            This file hasn’t been published to {`I-R-E-S`}, or its contents differ from what was
            originally published — even a one-byte change produces a different fingerprint.
          </p>
        </Card>
      </motion.div>
    )
  }

  const verified = match.status === 'verified'

  return (
    <motion.div initial={{ opacity: 0, scale: 0.98 }} animate={{ opacity: 1, scale: 1 }}>
      <Card className={verified ? 'border-success/30 bg-success/[0.04] p-6' : 'p-6'}>
        <div className="flex items-center justify-between gap-3">
          <div className="flex items-center gap-3">
            <div
              className={
                verified
                  ? 'grid size-11 place-items-center rounded-xl bg-success/15 text-success'
                  : 'grid size-11 place-items-center rounded-xl bg-warning/15 text-warning'
              }
            >
              {verified ? <ShieldCheck className="size-6" /> : <Sparkles className="size-6" />}
            </div>
            <div>
              <h2 className="text-lg font-semibold">
                {verified ? 'Authentic & verified' : 'Found — pending verification'}
              </h2>
              <p className="text-sm text-muted-foreground">This fingerprint is in the registry.</p>
            </div>
          </div>
          <StatusBadge status={match.status} />
        </div>

        <Separator className="my-5" />

        <dl className="space-y-3 text-sm">
          <Row label="Uploaded by" value={match.uploaderName} />
          <Row label="Email" value={match.uploaderEmail} />
          <Row label="Published" value={formatDate(match.publishedDate)} />
          {match.verifiedBy && <Row label="Verified by" value={match.verifiedBy} />}
          {match.comment && <Row label="Note" value={match.comment} />}
        </dl>

        {match.fileUrl && (
          <Button asChild variant="outline" className="mt-5 w-full">
            <a href={match.fileUrl} target="_blank" rel="noreferrer noopener">
              <ExternalLink />
              View published document
            </a>
          </Button>
        )}

        {!verified && (
          <Badge variant="warning" className="mt-4">
            An authorizer has not yet vouched for this document.
          </Badge>
        )}
      </Card>
    </motion.div>
  )
}

function Row({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex items-start justify-between gap-6">
      <dt className="shrink-0 text-muted-foreground">{label}</dt>
      <dd className="text-right font-medium">{value}</dd>
    </div>
  )
}
