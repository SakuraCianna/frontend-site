import { describe, expect, it } from 'vitest'

import { createReplicaPreviews, getReplicaIdFromPath, resolveCoverUrl } from '../replicas'

describe('replica registry', () => {
  it('accepts only positive numbered Vue files', () => {
    expect(getReplicaIdFromPath('./1.vue')).toBe(1)
    expect(getReplicaIdFromPath('../views/24.vue')).toBe(24)
    expect(getReplicaIdFromPath('./0.vue')).toBeUndefined()
    expect(getReplicaIdFromPath('./Home.vue')).toBeUndefined()
    expect(getReplicaIdFromPath('./2.draft.vue')).toBeUndefined()
    expect(getReplicaIdFromPath('./03.vue')).toBeUndefined()
  })

  it('creates sorted previews and selects covers by README priority', () => {
    const previews = createReplicaPreviews(
      ['./10.vue', './Home.vue', './2.vue', './0.vue', './2.draft.vue'],
      [
        ['../assets/2/cover.png', '/cover-2.png'],
        ['../assets/2/cover.webp', '/cover-2.webp'],
        ['../assets/10/cover.jpeg', '/cover-10.jpeg'],
      ],
    )

    expect(previews).toEqual([
      {
        id: 2,
        fileName: '2.vue',
        route: '/2',
        coverUrl: '/cover-2.webp',
      },
      {
        id: 10,
        fileName: '10.vue',
        route: '/10',
        coverUrl: '/cover-10.jpeg',
      },
    ])
  })

  it('ignores covers outside the numbered asset folders', () => {
    expect(
      resolveCoverUrl(1, [
        ['../assets/shared/cover.webp', '/shared.webp'],
        ['../assets/01/cover.avif', '/leading-zero.avif'],
        ['../assets/1/banner.webp', '/banner.webp'],
        ['../assets/1/cover.jpg', '/cover-1.jpg'],
      ]),
    ).toBe('/cover-1.jpg')
  })
})
