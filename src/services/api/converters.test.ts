import { describe, expect, it } from 'vitest'
import {
  fromVerificationStatus,
  toDocumentRecord,
  toUserProfile,
  toUserRole,
  toVerificationStatus,
} from './converters'

describe('toVerificationStatus', () => {
  it('maps the legacy "true"/"false" strings', () => {
    expect(toVerificationStatus('true')).toBe('verified')
    expect(toVerificationStatus('false')).toBe('unverified')
  })

  it('treats anything else as unverified', () => {
    expect(toVerificationStatus(undefined)).toBe('unverified')
    expect(toVerificationStatus('')).toBe('unverified')
  })
})

describe('toUserRole', () => {
  it('recognizes authorizers and defaults to user', () => {
    expect(toUserRole('authorizer')).toBe('authorizer')
    expect(toUserRole('user')).toBe('user')
    expect(toUserRole(null)).toBe('user')
  })
})

describe('fromVerificationStatus', () => {
  it('round-trips back to the raw string', () => {
    expect(fromVerificationStatus('verified')).toBe('true')
    expect(fromVerificationStatus('unverified')).toBe('false')
  })
})

describe('toUserProfile', () => {
  it('maps snake_case raw fields to the domain shape', () => {
    const profile = toUserProfile('uid-1', {
      name: 'Ada',
      email: 'ada@example.com',
      age: '30',
      college_name: 'Trinity',
      roll_number: 'R-1',
      social_profile: 'https://example.com',
      verified_status: 'authorizer',
      detail_filled: 'true',
    })
    expect(profile).toEqual({
      uid: 'uid-1',
      name: 'Ada',
      email: 'ada@example.com',
      age: '30',
      collegeName: 'Trinity',
      rollNumber: 'R-1',
      socialProfile: 'https://example.com',
      role: 'authorizer',
      detailFilled: true,
    })
  })

  it('fills missing fields with safe defaults', () => {
    const profile = toUserProfile('uid-2', {})
    expect(profile.name).toBe('')
    expect(profile.role).toBe('user')
    expect(profile.detailFilled).toBe(false)
  })
})

describe('toDocumentRecord', () => {
  it('normalizes a raw document', () => {
    const record = toDocumentRecord('doc-1', {
      name: 'Ada',
      email: 'ada@example.com',
      social_link: 'https://example.com',
      doc_hash: 'abc123',
      doc_link: 'https://files/abc',
      comment: 'Degree',
      verified_status: 'true',
      verified_by: 'auth@example.com',
      published_date: '2026-01-01',
    })
    expect(record.status).toBe('verified')
    expect(record.uploaderEmail).toBe('ada@example.com')
    expect(record.hash).toBe('abc123')
    expect(record.verifiedBy).toBe('auth@example.com')
  })

  it('returns null verifiedBy when absent', () => {
    expect(toDocumentRecord('doc-2', {}).verifiedBy).toBeNull()
  })
})
