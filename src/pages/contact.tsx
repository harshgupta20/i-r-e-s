import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { Github, Linkedin, Mail, Send } from 'lucide-react'
import { APP } from '@/constants'
import { isEmailConfigured } from '@/lib/env'
import { useSendContact } from '@/features/contact/hooks'
import { contactSchema, type ContactFormValues } from '@/features/contact/schema'
import { toAppError } from '@/services/api'
import { PageHeader } from '@/components/page-header'
import {
  Button,
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  Field,
  Input,
  Textarea,
  toast,
} from '@/components/ui'

export default function ContactPage() {
  const sendContact = useSendContact()
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<ContactFormValues>({
    resolver: zodResolver(contactSchema),
    defaultValues: { email: '', message: '' },
  })

  const onSubmit = handleSubmit(async (values) => {
    try {
      await sendContact.mutateAsync(values)
      toast.success('Message sent', { description: 'We’ll get back to you shortly.' })
      reset()
    } catch (error) {
      toast.error(toAppError(error).message)
    }
  })

  return (
    <div className="container max-w-5xl py-12 lg:py-16">
      <PageHeader
        title="Get in touch"
        description="Questions, feedback, or partnership ideas — we’d love to hear from you."
      />

      <div className="mt-8 grid gap-6 lg:grid-cols-[1fr_1.3fr]">
        <div className="space-y-4">
          <ContactLink
            icon={Mail}
            label="Email"
            value="Send us a message"
            href={`mailto:hello@example.com`}
          />
          <ContactLink
            icon={Github}
            label="GitHub"
            value="View the project"
            href={APP.repoUrl}
          />
          <ContactLink
            icon={Linkedin}
            label="LinkedIn"
            value="Connect with the author"
            href={APP.authorLinkedIn}
          />
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Send a message</CardTitle>
          </CardHeader>
          <CardContent>
            {!isEmailConfigured && (
              <p className="mb-4 rounded-lg border border-warning/30 bg-warning/10 px-3 py-2 text-sm text-muted-foreground">
                Email delivery isn’t configured in this deployment. The form is shown for
                demonstration.
              </p>
            )}
            <form onSubmit={onSubmit} className="space-y-5" noValidate>
              <Field label="Your email" error={errors.email?.message} required>
                {(props) => (
                  <Input
                    type="email"
                    autoComplete="email"
                    placeholder="you@example.com"
                    invalid={props['aria-invalid']}
                    {...register('email')}
                    id={props.id}
                    aria-describedby={props['aria-describedby']}
                  />
                )}
              </Field>

              <Field label="Message" error={errors.message?.message} required>
                {(props) => (
                  <Textarea
                    rows={5}
                    placeholder="How can we help?"
                    invalid={props['aria-invalid']}
                    {...register('message')}
                    id={props.id}
                    aria-describedby={props['aria-describedby']}
                  />
                )}
              </Field>

              <Button type="submit" className="w-full" loading={isSubmitting}>
                {!isSubmitting && <Send />}
                Send message
              </Button>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

function ContactLink({
  icon: Icon,
  label,
  value,
  href,
}: {
  icon: typeof Mail
  label: string
  value: string
  href: string
}) {
  return (
    <a
      href={href}
      target={href.startsWith('http') ? '_blank' : undefined}
      rel="noreferrer noopener"
      className="flex items-center gap-4 rounded-xl border border-border bg-card p-4 transition-colors hover:border-primary/40 hover:bg-accent/40"
    >
      <div className="grid size-10 place-items-center rounded-lg bg-primary/10 text-primary">
        <Icon className="size-5" />
      </div>
      <div>
        <p className="text-sm font-medium">{label}</p>
        <p className="text-sm text-muted-foreground">{value}</p>
      </div>
    </a>
  )
}
