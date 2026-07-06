import { z } from 'zod'

export const profileSchema = z.object({
  age: z
    .string()
    .min(1, 'Age is required')
    .refine((v) => {
      const n = Number(v)
      return Number.isInteger(n) && n > 0 && n < 120
    }, 'Enter a valid age'),
  collegeName: z.string().min(2, 'College name is required').max(120),
  rollNumber: z.string().min(1, 'Roll number is required').max(60),
  socialProfile: z
    .string()
    .min(1, 'Social profile is required')
    .url('Enter a valid URL (include https://)'),
})

export type ProfileFormValues = z.infer<typeof profileSchema>
