import { Link } from 'react-router-dom'
import { ExternalLink, FolderClosed, UploadCloud } from 'lucide-react'
import { ROUTES } from '@/constants'
import { useAccount } from '@/features/account/context'
import { useUserDocuments } from '@/features/documents/hooks'
import { StatusBadge } from '@/features/documents/status-badge'
import { formatDate } from '@/lib/format'
import { PageHeader } from '@/components/page-header'
import { HashBadge } from '@/components/hash-badge'
import {
  Button,
  Card,
  CardContent,
  CardFooter,
  EmptyState,
  ErrorState,
  Skeleton,
} from '@/components/ui'

export default function DocumentsPage() {
  const { user } = useAccount()
  const { data: documents, isLoading, isError, refetch } = useUserDocuments(user.email)

  return (
    <div className="space-y-6">
      <PageHeader
        title="My documents"
        description="Everything you’ve published and its verification status."
        actions={
          <Button asChild size="sm">
            <Link to={ROUTES.accountUpload}>
              <UploadCloud />
              Upload
            </Link>
          </Button>
        }
      />

      {isLoading ? (
        <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
          {Array.from({ length: 3 }).map((_, i) => (
            <Card key={i}>
              <CardContent className="space-y-3 p-5">
                <Skeleton className="h-6 w-24" />
                <Skeleton className="h-4 w-full" />
                <Skeleton className="h-4 w-2/3" />
              </CardContent>
            </Card>
          ))}
        </div>
      ) : isError ? (
        <ErrorState onRetry={() => void refetch()} />
      ) : !documents || documents.length === 0 ? (
        <EmptyState
          icon={FolderClosed}
          title="No documents yet"
          description="Publish your first document to see it appear here with its verification status."
          action={
            <Button asChild>
              <Link to={ROUTES.accountUpload}>Upload a document</Link>
            </Button>
          }
        />
      ) : (
        <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
          {documents.map((doc) => (
            <Card key={doc.id} className="flex flex-col">
              <CardContent className="flex-1 space-y-3 p-5">
                <div className="flex items-center justify-between">
                  <StatusBadge status={doc.status} />
                  <span className="text-xs text-muted-foreground">
                    {formatDate(doc.publishedDate)}
                  </span>
                </div>
                <p className="line-clamp-2 text-sm font-medium">{doc.comment || 'Untitled document'}</p>
                <HashBadge hash={doc.hash} />
              </CardContent>
              <CardFooter className="border-t border-border pt-4">
                <Button asChild variant="ghost" size="sm" className="w-full">
                  <a href={doc.fileUrl} target="_blank" rel="noreferrer noopener">
                    <ExternalLink />
                    View document
                  </a>
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>
      )}
    </div>
  )
}
