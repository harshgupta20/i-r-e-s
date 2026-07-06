import { cloudinaryConfig, isCloudinaryConfigured } from '@/lib/env'
import { AppError } from '@/services/api/errors'

export interface CloudinaryUploadResult {
  url: string
  publicId: string
}

interface CloudinaryResponse {
  secure_url?: string
  public_id?: string
  error?: { message?: string }
}

/**
 * Upload a file to Cloudinary via an unsigned upload preset.
 *
 * This replaces Firebase Storage (which now requires the Blaze plan). It needs
 * no server: create an *unsigned* upload preset in the Cloudinary console and
 * set VITE_CLOUDINARY_CLOUD_NAME + VITE_CLOUDINARY_UPLOAD_PRESET.
 *
 * The `auto` resource type accepts any file (PDF, image, doc, …).
 */
export async function uploadToCloudinary(file: File): Promise<CloudinaryUploadResult> {
  if (!isCloudinaryConfigured) {
    throw new AppError('File storage (Cloudinary) is not configured for this deployment.')
  }

  const form = new FormData()
  form.append('file', file)
  form.append('upload_preset', cloudinaryConfig.uploadPreset)

  const endpoint = `https://api.cloudinary.com/v1_1/${cloudinaryConfig.cloudName}/auto/upload`

  let response: Response
  try {
    response = await fetch(endpoint, { method: 'POST', body: form })
  } catch (error) {
    throw new AppError('Network error while uploading the file. Please try again.', error)
  }

  const data = (await response.json().catch(() => ({}))) as CloudinaryResponse

  if (!response.ok || !data.secure_url) {
    throw new AppError(data.error?.message || 'File upload failed. Please try again.')
  }

  return { url: data.secure_url, publicId: data.public_id ?? '' }
}
