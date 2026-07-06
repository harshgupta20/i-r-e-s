import { useState } from 'react'
import { Link } from 'react-router-dom'
import { CheckCircle2, ExternalLink, UploadCloud, UserRound } from 'lucide-react'
import { ROUTES } from '@/constants'
import { isCloudinaryConfigured } from '@/lib/env'
import type { DocumentRecord } from '@/types'
import { useAccount } from '@/features/account/context'
import { useUploadDocument } from '@/features/documents/hooks'
import { toAppError } from '@/services/api'
import { PageHeader } from '@/components/page-header'
import { FileDropzone } from '@/components/file-dropzone'
import { HashBadge } from '@/components/hash-badge'
import {
  Button,
  Card,
  CardContent,
  EmptyState,
  Field,
  Textarea,
  toast,
} from '@/components/ui'

export default function UploadPage() {
  const { user, profile } = useAccount()
  const [file, setFile] = useState<File | null>(null)
  const [comment, setComment] = useState('')
  const [commentError, setCommentError] = useState<string>()
  const [published, setPublished] = useState<DocumentRecord | null>(null)

  const upload = useUploadDocument(user, profile ?? emptyProfileFallback())

  if (!profile) {
    return (
      <div className="space-y-6">
        <PageHeader title="Upload document" description="Publish a document fingerprint." />
        <EmptyState
          icon={UserRound}
          title="Complete your profile first"
          description="We attach your details to each published document, so you’ll need to add them before uploading."
          action={
            <Button asChild>
              <Link to={ROUTES.accountDetails}>Complete profile</Link>
            </Button>
          }
        />
      </div>
    )
  }

  const handleSubmit = () => {
    if (!file) return
    if (comment.trim().length < 3) {
      setCommentError('Add a short description (min 3 characters)')
      return
    }
    setCommentError(undefined)
    upload.mutate(
      { file, comment: comment.trim() },
      {
        onSuccess: (record) => {
          setPublished(record)
          setFile(null)
          setComment('')
          toast.success('Document published', {
            description: 'Its fingerprint is now in the registry.',
          })
        },
        onError: (error) => toast.error(toAppError(error).message),
      },
    )
  }

  return (
    <div className="space-y-6">
      <PageHeader
        title="Upload document"
        description="Your file is hashed locally; only its fingerprint and metadata are published."
      />

      {published && (
        <Card className="border-success/30 bg-success/[0.04]">
          <CardContent className="flex flex-col gap-3 p-5 sm:flex-row sm:items-center sm:justify-between">
            <div className="flex items-center gap-3">
              <CheckCircle2 className="size-5 text-success" />
              <div>
                <p className="font-medium">Published successfully</p>
                <p className="text-sm text-muted-foreground">Pending authorizer verification.</p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <HashBadge hash={published.hash} />
              <Button asChild size="sm" variant="outline">
                <a href={published.fileUrl} target="_blank" rel="noreferrer noopener">
                  <ExternalLink />
                  View
                </a>
              </Button>
            </div>
          </CardContent>
        </Card>
      )}

      {!isCloudinaryConfigured && (
        <Card className="border-warning/30 bg-warning/[0.04]">
          <CardContent className="p-4 text-sm text-muted-foreground">
            File storage (Cloudinary) isn’t configured. Set{' '}
            <code className="font-mono text-xs">VITE_CLOUDINARY_CLOUD_NAME</code> and{' '}
            <code className="font-mono text-xs">VITE_CLOUDINARY_UPLOAD_PRESET</code> in your{' '}
            <code className="font-mono text-xs">.env</code> to enable uploads.
          </CardContent>
        </Card>
      )}

      <Card>
        <CardContent className="space-y-5 p-6">
          <FileDropzone
            file={file}
            onFileChange={setFile}
            disabled={upload.isPending}
            onError={(message) => toast.error(message)}
          />

          <Field label="Description" error={commentError} required>
            {(props) => (
              <Textarea
                rows={3}
                placeholder="e.g. B.Tech degree certificate — 2024"
                value={comment}
                onChange={(e) => setComment(e.target.value)}
                disabled={upload.isPending}
                invalid={props['aria-invalid']}
                id={props.id}
                aria-describedby={props['aria-describedby']}
              />
            )}
          </Field>

          <div className="flex justify-end">
            <Button onClick={handleSubmit} disabled={!file} loading={upload.isPending}>
              {!upload.isPending && <UploadCloud />}
              Publish document
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

// `profile` is guaranteed non-null past the guard above; this keeps the hook call
// unconditional (Rules of Hooks) without weakening the type used at call time.
function emptyProfileFallback() {
  return {
    uid: '',
    name: '',
    email: '',
    age: '',
    collegeName: '',
    rollNumber: '',
    socialProfile: '',
    role: 'user' as const,
    detailFilled: false,
  }
}
