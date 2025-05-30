import { beforeEach, describe, expect, it, vi } from 'vitest'
import { shallowRef } from 'vue'
import { useTimeout } from './index'

describe('useTimeout', () => {
  beforeEach(() => {
    vi.useFakeTimers()
  })
  it('works', () => {
    const ready = useTimeout(10)
    expect(ready.value).toEqual(false)
    vi.advanceTimersByTime(10)
    expect(ready.value).toEqual(true)
  })

  it('works with controls', () => {
    const { ready } = useTimeout(10, { controls: true })
    expect(ready.value).toEqual(false)
    vi.advanceTimersByTime(10)
    expect(ready.value).toEqual(true)
  })

  it('works with ref target', () => {
    const interval = shallowRef(10)
    const ready = useTimeout(interval)
    expect(ready.value).toEqual(false)
    vi.advanceTimersByTime(10)
    expect(ready.value).toEqual(true)
  })

  it('works with controls and ref target', () => {
    const interval = shallowRef(10)
    const { ready } = useTimeout(interval, { controls: true })
    expect(ready.value).toEqual(false)
    vi.advanceTimersByTime(10)
    expect(ready.value).toEqual(true)
  })
})
