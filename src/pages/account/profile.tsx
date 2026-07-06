import { Link } from 'react-router-dom'
import { ExternalLink, IdCard, PencilLine, UserRound } from 'lucide-react'
import { ROUTES } from '@/constants'
import { useAccount } from '@/features/account/context'
import { PageHeader } from '@/components/page-header'
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
  Badge,
  Button,
  Card,
  CardContent,
  EmptyState,
  initials,
  Separator,
  Skeleton,
} from '@/components/ui'

export default function ProfilePage() {
  const { user, profile, isLoadingProfile } = useAccount()

  return (
    <div className="space-y-6">
      <PageHeader
        title="Profile"
        description="Your account and personal information."
        actions={
          <Button asChild variant="outline" size="sm">
            <Link to={ROUTES.accountDetails}>
              <PencilLine />
              Edit details
            </Link>
          </Button>
        }
      />

      <Card>
        <CardContent className="flex flex-col items-start gap-4 p-6 sm:flex-row sm:items-center">
          <Avatar className="size-16 text-base">
            {user.photoURL && <AvatarImage src={user.photoURL} alt="" />}
            <AvatarFallback>{initials(user.displayName)}</AvatarFallback>
          </Avatar>
          <div className="min-w-0">
            <h2 className="text-xl font-semibold">{user.displayName}</h2>
            <p className="text-sm text-muted-foreground">{user.email}</p>
            <Badge variant={profile?.role === 'authorizer' ? 'primary' : 'default'} className="mt-2">
              {profile?.role === 'authorizer' ? 'Authorizer' : 'Member'}
            </Badge>
          </div>
        </CardContent>
      </Card>

      {isLoadingProfile ? (
        <Card>
          <CardContent className="space-y-4 p-6">
            {Array.from({ length: 4 }).map((_, i) => (
              <div key={i} className="flex justify-between">
                <Skeleton className="h-5 w-28" />
                <Skeleton className="h-5 w-40" />
              </div>
            ))}
          </CardContent>
        </Card>
      ) : profile ? (
        <Card>
          <CardContent className="p-6">
            <h3 className="flex items-center gap-2 text-sm font-medium text-muted-foreground">
              <IdCard className="size-4" />
              Personal details
            </h3>
            <Separator className="my-4" />
            <dl className="grid gap-4 sm:grid-cols-2">
              <Detail label="Age" value={profile.age} />
              <Detail label="Roll number" value={profile.rollNumber} />
              <Detail label="College" value={profile.collegeName} />
              <Detail
                label="Social profile"
                value={
                  profile.socialProfile ? (
                    <a
                      href={profile.socialProfile}
                      target="_blank"
                      rel="noreferrer noopener"
                      className="inline-flex items-center gap-1.5 text-primary hover:underline"
                    >
                      View <ExternalLink className="size-3.5" />
                    </a>
                  ) : (
                    '—'
                  )
                }
              />
            </dl>
          </CardContent>
        </Card>
      ) : (
        <EmptyState
          icon={UserRound}
          title="Complete your profile"
          description="Add your personal details to start publishing and verifying documents."
          action={
            <Button asChild>
              <Link to={ROUTES.accountDetails}>Add details</Link>
            </Button>
          }
        />
      )}
    </div>
  )
}

function Detail({ label, value }: { label: string; value: React.ReactNode }) {
  return (
    <div>
      <dt className="text-xs font-medium uppercase tracking-wide text-muted-foreground">{label}</dt>
      <dd className="mt-1 text-sm font-medium">{value || '—'}</dd>
    </div>
  )
}
