import { describe, expect, it } from 'vitest'
import { sha256, truncateHash } from './hash'

describe('sha256', () => {
  it('matches the known digest for "abc"', async () => {
    const buffer = new TextEncoder().encode('abc').buffer
    await expect(sha256(buffer)).resolves.toBe(
      'ba7816bf8f01cfea414140de5dae2223b00361a396177a9cb410ff61f20015ad',
    )
  })

  it('is deterministic for identical bytes', async () => {
    const a = new TextEncoder().encode('i-r-e-s').buffer
    const b = new TextEncoder().encode('i-r-e-s').buffer
    expect(await sha256(a)).toBe(await sha256(b))
  })

  it('differs when a single byte changes', async () => {
    const a = new TextEncoder().encode('document').buffer
    const b = new TextEncoder().encode('Document').buffer
    expect(await sha256(a)).not.toBe(await sha256(b))
  })
})

describe('truncateHash', () => {
  it('shortens long hashes with an ellipsis', () => {
    expect(truncateHash('a'.repeat(64))).toBe('aaaaaa…aaaaaa')
  })

  it('leaves short strings untouched', () => {
    expect(truncateHash('abc')).toBe('abc')
  })
})
