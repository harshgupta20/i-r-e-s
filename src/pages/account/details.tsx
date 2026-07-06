import { useEffect } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { Save } from 'lucide-react'
import { useAccount } from '@/features/account/context'
import { useSaveProfile } from '@/features/profile/hooks'
import { profileSchema, type ProfileFormValues } from '@/features/profile/schema'
import { toAppError } from '@/services/api'
import { PageHeader } from '@/components/page-header'
import {
  Button,
  Card,
  CardContent,
  Field,
  Input,
  toast,
} from '@/components/ui'

export default function DetailsPage() {
  const { user, profile } = useAccount()
  const saveProfile = useSaveProfile(user)

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting, isDirty },
  } = useForm<ProfileFormValues>({
    resolver: zodResolver(profileSchema),
    defaultValues: { age: '', collegeName: '', rollNumber: '', socialProfile: '' },
  })

  // Prefill once the profile arrives.
  useEffect(() => {
    if (profile) {
      reset({
        age: profile.age,
        collegeName: profile.collegeName,
        rollNumber: profile.rollNumber,
        socialProfile: profile.socialProfile,
      })
    }
  }, [profile, reset])

  const onSubmit = handleSubmit(async (values) => {
    try {
      await saveProfile.mutateAsync(values)
      toast.success('Profile updated')
    } catch (error) {
      toast.error(toAppError(error).message)
    }
  })

  return (
    <div className="space-y-6">
      <PageHeader
        title="Personal details"
        description="This information appears on the documents you publish."
      />

      <Card>
        <CardContent className="p-6">
          <form onSubmit={onSubmit} className="space-y-5" noValidate>
            <div className="grid gap-5 sm:grid-cols-2">
              <Field label="Full name">
                {(props) => <Input value={user.displayName} disabled id={props.id} />}
              </Field>
              <Field label="Email">
                {(props) => <Input value={user.email} disabled id={props.id} />}
              </Field>
            </div>

            <div className="grid gap-5 sm:grid-cols-2">
              <Field label="Age" error={errors.age?.message} required>
                {(props) => (
                  <Input
                    inputMode="numeric"
                    placeholder="21"
                    invalid={props['aria-invalid']}
                    {...register('age')}
                    id={props.id}
                    aria-describedby={props['aria-describedby']}
                  />
                )}
              </Field>
              <Field label="Roll number" error={errors.rollNumber?.message} required>
                {(props) => (
                  <Input
                    placeholder="e.g. 20BCS1234"
                    invalid={props['aria-invalid']}
                    {...register('rollNumber')}
                    id={props.id}
                    aria-describedby={props['aria-describedby']}
                  />
                )}
              </Field>
            </div>

            <Field label="College name" error={errors.collegeName?.message} required>
              {(props) => (
                <Input
                  placeholder="Your institution"
                  invalid={props['aria-invalid']}
                  {...register('collegeName')}
                  id={props.id}
                  aria-describedby={props['aria-describedby']}
                />
              )}
            </Field>

            <Field
              label="Social profile"
              description="A public URL — LinkedIn, GitHub, or a personal site."
              error={errors.socialProfile?.message}
              required
            >
              {(props) => (
                <Input
                  type="url"
                  placeholder="https://linkedin.com/in/…"
                  invalid={props['aria-invalid']}
                  {...register('socialProfile')}
                  id={props.id}
                  aria-describedby={props['aria-describedby']}
                />
              )}
            </Field>

            <div className="flex justify-end gap-3">
              <Button type="submit" loading={isSubmitting} disabled={!isDirty && Boolean(profile)}>
                {!isSubmitting && <Save />}
                Save details
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  )
}
