import { doc, getDoc, setDoc } from 'firebase/firestore'
import { getDb } from '@/services/firebase/client'
import { COLLECTIONS } from '@/constants'
import type { AuthUser, UserProfile, UserProfileInput } from '@/types'
import { toUserProfile } from './converters'
import { toAppError } from './errors'

/** Fetch the extended profile for a user, or `null` if they haven't created one. */
export async function getUserProfile(uid: string): Promise<UserProfile | null> {
  try {
    const snap = await getDoc(doc(getDb(), COLLECTIONS.users, uid))
    if (!snap.exists()) return null
    return toUserProfile(uid, snap.data())
  } catch (error) {
    throw toAppError(error)
  }
}

/** Create or update the current user's personal details. */
export async function saveUserProfile(
  user: AuthUser,
  input: UserProfileInput,
): Promise<UserProfile> {
  try {
    const payload = {
      name: user.displayName,
      email: user.email,
      age: input.age,
      college_name: input.collegeName,
      roll_number: input.rollNumber,
      social_profile: input.socialProfile,
      verified_status: 'user',
      detail_filled: 'true',
    }
    // Merge so we never clobber an existing "authorizer" role.
    await setDoc(doc(getDb(), COLLECTIONS.users, user.uid), payload, { merge: true })
    const saved = await getUserProfile(user.uid)
    if (!saved) throw new Error('Profile was not saved')
    return saved
  } catch (error) {
    throw toAppError(error)
  }
}
