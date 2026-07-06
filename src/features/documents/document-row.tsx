import { useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { ChevronDown, ExternalLink, ShieldCheck, ShieldX } from 'lucide-react'
import type { DocumentRecord, VerificationStatus } from '@/types'
import { formatDate } from '@/lib/format'
import { cn } from '@/lib/utils'
import { HashBadge } from '@/components/hash-badge'
import { StatusBadge } from './status-badge'
import {
  Button,
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  TableCell,
  TableRow,
} from '@/components/ui'

export interface DocumentRowProps {
  record: DocumentRecord
  onVerify: (record: DocumentRecord, status: VerificationStatus) => void
  pending: boolean
}

export function DocumentRow({ record, onVerify, pending }: DocumentRowProps) {
  const [expanded, setExpanded] = useState(false)
  const [confirmOpen, setConfirmOpen] = useState(false)

  const isVerified = record.status === 'verified'
  const nextStatus: VerificationStatus = isVerified ? 'unverified' : 'verified'

  const confirm = () => {
    onVerify(record, nextStatus)
    setConfirmOpen(false)
  }

  return (
    <>
      <TableRow className="cursor-pointer" onClick={() => setExpanded((v) => !v)}>
        <TableCell className="w-10">
          <ChevronDown
            className={cn(
              'size-4 text-muted-foreground transition-transform',
              expanded && 'rotate-180',
            )}
          />
        </TableCell>
        <TableCell className="font-medium">{record.uploaderEmail}</TableCell>
        <TableCell className="hidden md:table-cell">{record.uploaderName}</TableCell>
        <TableCell className="hidden lg:table-cell text-muted-foreground">
          {formatDate(record.publishedDate)}
        </TableCell>
        <TableCell className="hidden sm:table-cell" onClick={(e) => e.stopPropagation()}>
          <HashBadge hash={record.hash} />
        </TableCell>
        <TableCell className="text-right">
          <StatusBadge status={record.status} />
        </TableCell>
      </TableRow>

      <AnimatePresence initial={false}>
        {expanded && (
          <TableRow className="hover:bg-transparent">
            <TableCell colSpan={6} className="p-0">
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: 'auto', opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                transition={{ duration: 0.2 }}
                className="overflow-hidden"
              >
                <div className="flex flex-col gap-4 bg-surface-muted/40 px-6 py-5 sm:flex-row sm:items-end sm:justify-between">
                  <div className="space-y-2">
                    <p className="text-xs font-medium uppercase tracking-wide text-muted-foreground">
                      Uploader’s note
                    </p>
                    <p className="max-w-xl text-sm">{record.comment || '—'}</p>
                    {record.verifiedBy && (
                      <p className="text-xs text-muted-foreground">
                        Last actioned by {record.verifiedBy}
                      </p>
                    )}
                  </div>
                  <div className="flex items-center gap-2">
                    <Button asChild variant="outline" size="sm">
                      <a href={record.fileUrl} target="_blank" rel="noreferrer noopener">
                        <ExternalLink />
                        Open file
                      </a>
                    </Button>
                    <Button
                      size="sm"
                      variant={isVerified ? 'outline' : 'primary'}
                      loading={pending}
                      onClick={() => setConfirmOpen(true)}
                    >
                      {!pending && (isVerified ? <ShieldX /> : <ShieldCheck />)}
                      {isVerified ? 'Revoke verification' : 'Mark verified'}
                    </Button>
                  </div>
                </div>
              </motion.div>
            </TableCell>
          </TableRow>
        )}
      </AnimatePresence>

      <Dialog open={confirmOpen} onOpenChange={setConfirmOpen}>
        <DialogContent className="max-w-sm">
          <DialogHeader>
            <DialogTitle>{isVerified ? 'Revoke verification?' : 'Mark as verified?'}</DialogTitle>
            <DialogDescription>
              {isVerified
                ? 'This document will no longer be shown as verified to anyone checking it.'
                : 'You’re vouching that this document is authentic. Anyone verifying it will see it as verified.'}
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button variant="outline" onClick={() => setConfirmOpen(false)}>
              Cancel
            </Button>
            <Button variant={isVerified ? 'destructive' : 'primary'} onClick={confirm}>
              Confirm
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  )
}
