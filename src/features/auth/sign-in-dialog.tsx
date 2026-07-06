import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { ShieldCheck } from 'lucide-react'
import { ROUTES } from '@/constants'
import { useAuth } from '@/hooks/use-auth'
import { toAppError } from '@/services/api'
import {
  Button,
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  toast,
} from '@/components/ui'
import { GoogleIcon } from '@/components/icons'

export function SignInDialog({
  open,
  onOpenChange,
}: {
  open: boolean
  onOpenChange: (open: boolean) => void
}) {
  const { signIn, isConfigured } = useAuth()
  const navigate = useNavigate()
  const [loading, setLoading] = useState(false)

  const handleSignIn = async () => {
    if (!isConfigured) {
      toast.error('Authentication is not configured for this deployment.')
      return
    }
    setLoading(true)
    try {
      await signIn()
      onOpenChange(false)
      toast.success('Signed in successfully')
      navigate(ROUTES.accountProfile)
    } catch (error) {
      toast.error(toAppError(error).message)
    } finally {
      setLoading(false)
    }
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <div className="mb-2 grid size-11 place-items-center rounded-xl bg-primary/10 text-primary">
            <ShieldCheck className="size-6" />
          </div>
          <DialogTitle>Enter the platform</DialogTitle>
          <DialogDescription>
            Sign in to publish documents, track their verification, and manage your profile.
          </DialogDescription>
        </DialogHeader>

        <Button size="lg" className="w-full" onClick={handleSignIn} loading={loading}>
          {!loading && <GoogleIcon className="size-4" />}
          Continue with Google
        </Button>

        <p className="text-center text-xs text-muted-foreground">
          By continuing you agree to our terms of service and acknowledge that document metadata may
          be stored to power verification.
        </p>
      </DialogContent>
    </Dialog>
  )
}
