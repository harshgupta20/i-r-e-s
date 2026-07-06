import { z } from 'zod'

export const contactSchema = z.object({
  email: z.string().min(1, 'Email is required').email('Enter a valid email address'),
  message: z
    .string()
    .min(10, 'Please add at least 10 characters')
    .max(2000, 'Message is too long'),
})

export type ContactFormValues = z.infer<typeof contactSchema>

export const supportSchema = z.object({
  title: z.string().min(3, 'Add a short title').max(120, 'Title is too long'),
  message: z
    .string()
    .min(10, 'Please add at least 10 characters')
    .max(2000, 'Message is too long'),
})

export type SupportFormValues = z.infer<typeof supportSchema>
