import emailjs from '@emailjs/browser'
import { emailjsConfig, isEmailConfigured } from '@/lib/env'
import type { ContactMessage, SupportMessage } from '@/types'
import { AppError } from './errors'

function ensureConfigured() {
  if (!isEmailConfigured) {
    throw new AppError('Email delivery is not configured for this deployment.')
  }
}

export async function sendContactMessage({ email, message }: ContactMessage): Promise<void> {
  ensureConfigured()
  try {
    await emailjs.send(
      emailjsConfig.serviceId,
      emailjsConfig.contactTemplateId,
      { user_email: email, user_message: message },
      { publicKey: emailjsConfig.publicKey },
    )
  } catch (error) {
    throw new AppError('We couldn’t send your message. Please try again.', error)
  }
}

export async function sendSupportMessage({
  email,
  title,
  message,
}: SupportMessage): Promise<void> {
  ensureConfigured()
  try {
    await emailjs.send(
      emailjsConfig.serviceId,
      emailjsConfig.supportTemplateId,
      { user_email: email, user_title: title, message },
      { publicKey: emailjsConfig.publicKey },
    )
  } catch (error) {
    throw new AppError('We couldn’t send your message. Please try again.', error)
  }
}
