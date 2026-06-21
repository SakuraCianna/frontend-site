import { describe, expect, it } from 'vitest'

import { getReplicaIdFromPath } from '../replicas'
import { routes } from '../router'

const pageModules = import.meta.glob('../views/[0-9]*.vue')
const expectedReplicaIds = Object.keys(pageModules)
  .map((path) => getReplicaIdFromPath(path))
  .filter((id): id is number => id !== undefined)
  .sort((left, right) => left - right)

describe('router', () => {
  it('registers the home route, numbered replica routes, and fallback route', () => {
    const replicaRoutes = routes.slice(1, -1)

    expect(routes[0]).toMatchObject({ path: '/', name: 'home' })
    expect(replicaRoutes.map((route) => route.path)).toEqual(
      expectedReplicaIds.map((id) => `/${id}`),
    )
    expect(replicaRoutes.map((route) => route.name)).toEqual(
      expectedReplicaIds.map((id) => `replica-${id}`),
    )
    expect(routes.at(-1)).toMatchObject({ redirect: '/' })
  })
})
