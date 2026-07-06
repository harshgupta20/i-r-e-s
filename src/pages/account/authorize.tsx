import { useMemo, useState } from 'react'
import { FileCheck2, Search, ShieldCheck, ShieldAlert, Files } from 'lucide-react'
import type { DocumentRecord, VerificationStatus } from '@/types'
import { useAccount } from '@/features/account/context'
import { useAllDocuments, useSetVerification } from '@/features/documents/hooks'
import { DocumentRow } from '@/features/documents/document-row'
import { toAppError } from '@/services/api'
import { useDebouncedValue } from '@/hooks/use-debounced-value'
import { PageHeader } from '@/components/page-header'
import {
  Card,
  EmptyState,
  ErrorState,
  Input,
  Pagination,
  Skeleton,
  StatCard,
  Table,
  TableBody,
  TableHead,
  TableHeader,
  TableRow,
  toast,
} from '@/components/ui'

const PAGE_SIZE = 8

export default function AuthorizePage() {
  const { user } = useAccount()
  const { data: documents, isLoading, isError, refetch } = useAllDocuments()
  const verify = useSetVerification(user.email)

  const [search, setSearch] = useState('')
  const [page, setPage] = useState(1)
  const debouncedSearch = useDebouncedValue(search.trim().toLowerCase(), 200)

  const stats = useMemo(() => {
    const total = documents?.length ?? 0
    const verified = documents?.filter((d) => d.status === 'verified').length ?? 0
    return { total, verified, pending: total - verified }
  }, [documents])

  const filtered = useMemo(() => {
    if (!documents) return []
    if (!debouncedSearch) return documents
    return documents.filter((d) =>
      [d.uploaderEmail, d.uploaderName, d.hash, d.comment]
        .join(' ')
        .toLowerCase()
        .includes(debouncedSearch),
    )
  }, [documents, debouncedSearch])

  const pageCount = Math.max(1, Math.ceil(filtered.length / PAGE_SIZE))
  const safePage = Math.min(page, pageCount)
  const pageItems = filtered.slice((safePage - 1) * PAGE_SIZE, safePage * PAGE_SIZE)

  const handleVerify = (record: DocumentRecord, status: VerificationStatus) => {
    verify.mutate(
      { record, status },
      {
        onSuccess: () =>
          toast.success(status === 'verified' ? 'Document verified' : 'Verification revoked'),
        onError: (error) => toast.error(toAppError(error).message),
      },
    )
  }

  return (
    <div className="space-y-6">
      <PageHeader
        title="Authorize documents"
        description="Review submitted documents and vouch for their authenticity."
      />

      <div className="grid gap-4 sm:grid-cols-3">
        <StatCard label="Total documents" value={stats.total} icon={Files} loading={isLoading} />
        <StatCard label="Verified" value={stats.verified} icon={ShieldCheck} loading={isLoading} />
        <StatCard label="Pending" value={stats.pending} icon={ShieldAlert} loading={isLoading} />
      </div>

      <div className="max-w-sm">
        <Input
          type="search"
          placeholder="Search by email, name, or hash…"
          value={search}
          onChange={(e) => {
            setSearch(e.target.value)
            setPage(1)
          }}
          startAdornment={<Search />}
        />
      </div>

      {isLoading ? (
        <Card className="p-4">
          <div className="space-y-3">
            {Array.from({ length: 5 }).map((_, i) => (
              <Skeleton key={i} className="h-12 w-full" />
            ))}
          </div>
        </Card>
      ) : isError ? (
        <ErrorState onRetry={() => void refetch()} />
      ) : stats.total === 0 ? (
        <EmptyState
          icon={FileCheck2}
          title="No documents to review"
          description="Once users publish documents, they’ll appear here for verification."
        />
      ) : filtered.length === 0 ? (
        <EmptyState
          icon={Search}
          title="No matches"
          description={`Nothing matches “${search}”. Try a different search.`}
        />
      ) : (
        <Card className="overflow-hidden">
          <Table>
            <TableHeader>
              <TableRow className="hover:bg-transparent">
                <TableHead />
                <TableHead>Uploader email</TableHead>
                <TableHead className="hidden md:table-cell">Name</TableHead>
                <TableHead className="hidden lg:table-cell">Published</TableHead>
                <TableHead className="hidden sm:table-cell">Fingerprint</TableHead>
                <TableHead className="text-right">Status</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {pageItems.map((record) => (
                <DocumentRow
                  key={record.id}
                  record={record}
                  onVerify={handleVerify}
                  pending={verify.isPending && verify.variables?.record.id === record.id}
                />
              ))}
            </TableBody>
          </Table>
        </Card>
      )}

      {!isLoading && !isError && filtered.length > 0 && (
        <Pagination
          page={safePage}
          pageCount={pageCount}
          onPageChange={setPage}
          summary={`${filtered.length} document${filtered.length === 1 ? '' : 's'}`}
        />
      )}
    </div>
  )
}
