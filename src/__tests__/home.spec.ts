import { mount } from '@vue/test-utils'
import { describe, expect, it } from 'vitest'

import { createReplicaPreviews } from '../replicas'
import Home from '../views/Home.vue'

const pageModules = import.meta.glob('../views/[0-9]*.vue')
const coverModules = import.meta.glob('../assets/*/cover.{avif,jpeg,jpg,png,webp}', {
  eager: true,
  import: 'default',
  query: '?url',
}) as Record<string, string>

const expectedSites = createReplicaPreviews(Object.keys(pageModules), Object.entries(coverModules))

describe('Home gallery', () => {
  it('renders real numbered Vue files as gallery cards', () => {
    const wrapper = mount(Home, {
      global: {
        stubs: {
          RouterLink: {
            props: ['to'],
            template: '<a :href="typeof to === \'string\' ? to : to.path"><slot /></a>',
          },
        },
      },
    })

    expect(wrapper.text()).toContain('前端复刻收藏馆')
    expect(wrapper.text()).toContain('打开')
    expect(wrapper.text()).not.toContain('自动扫描')
    expect(wrapper.text()).not.toContain('Frontend Replica Vault')
    expect(wrapper.text()).not.toContain('Auto-indexed Vue replicas')
    expect(wrapper.text()).not.toContain('Vue 3 / TypeScript / Node 24')
    expect(wrapper.find('.rule-card').exists()).toBe(false)
    expect(wrapper.findAll('[data-testid="site-card"]')).toHaveLength(expectedSites.length)

    for (const site of expectedSites) {
      expect(wrapper.text()).toContain(site.fileName)
      expect(wrapper.text()).toContain(`作品 ${site.id}`)
    }

    const firstSiteWithCover = expectedSites.find((site) => site.coverUrl)

    if (firstSiteWithCover) {
      expect(wrapper.find('img').attributes('alt')).toBe(`${firstSiteWithCover.fileName} 预览图`)
    }
  })
})
