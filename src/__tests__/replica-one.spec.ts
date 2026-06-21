import { mount } from '@vue/test-utils'
import { describe, expect, it } from 'vitest'

import ReplicaOne from '../views/1.vue'

function mountReplicaOne() {
  return mount(ReplicaOne, {
    global: {
      stubs: {
        RouterLink: {
          props: ['to'],
          template: '<a :href="typeof to === \'string\' ? to : to.path"><slot /></a>',
        },
      },
    },
  })
}

describe('Replica 1 not-found page', () => {
  it('renders the 404 hero content and navigation cards', () => {
    const wrapper = mountReplicaOne()

    expect(wrapper.text()).toContain("Seems you've wandered off...")
    expect(wrapper.text()).toContain('Whoops! Nothing here yet')
    expect(wrapper.text()).toContain('Main Page')
    expect(wrapper.text()).toContain('Showcase')
    expect(wrapper.findAll('.nav-card')).toHaveLength(2)
    expect(wrapper.find('.brand-link img').attributes('src')).toContain('logoipsum-415.svg')
  })

  it('toggles the mobile navigation overlay', async () => {
    const wrapper = mountReplicaOne()
    const menuToggle = wrapper.get('.menu-toggle')

    expect(menuToggle.attributes('aria-expanded')).toBe('false')
    expect(wrapper.get('.mobile-menu').classes()).not.toContain('is-open')

    await menuToggle.trigger('click')

    expect(menuToggle.attributes('aria-expanded')).toBe('true')
    expect(wrapper.get('.mobile-menu').classes()).toContain('is-open')
  })
})
