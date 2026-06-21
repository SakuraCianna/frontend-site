import { createRouter, createWebHistory, type RouteRecordRaw } from 'vue-router'

import { getReplicaIdFromPath } from '../replicas'
import Home from '../views/Home.vue'

const pageModules = import.meta.glob('../views/[0-9]*.vue')

const replicaRoutes: RouteRecordRaw[] = Object.entries(pageModules)
  .map(([path, component]) => {
    const id = getReplicaIdFromPath(path)

    if (!id) {
      return undefined
    }

    return {
      id,
      route: {
        path: `/${id}`,
        name: `replica-${id}`,
        component: component,
      } as RouteRecordRaw,
    }
  })
  .filter((entry): entry is { id: number; route: RouteRecordRaw } => entry !== undefined)
  .sort((left, right) => left.id - right.id)
  .map((entry) => entry.route)

export const routes: RouteRecordRaw[] = [
  {
    path: '/',
    name: 'home',
    component: Home,
  },
  ...replicaRoutes,
  {
    path: '/:pathMatch(.*)*',
    redirect: '/',
  },
]

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
})

export default router
