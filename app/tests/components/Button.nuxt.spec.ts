import { BaseButton } from '#components'
import { mountSuspended } from '@nuxt/test-utils/runtime'
import { describe, expect, it } from 'vitest'

describe('baseButton', () => {
  it('renders the default button correctly (snapshot)', async () => {
    const wrapper = await mountSuspended(BaseButton, {
      props: {
        content: 'Click me',
      },
    })

    expect(wrapper.html()).toMatchSnapshot()
  })

  it('renders with content', async () => {
    const wrapper = await mountSuspended(BaseButton, {
      props: {
        content: 'Click me',
      },
    })

    expect(wrapper.text()).toContain('Click me')
  })

  it('renders slot content when not loading', async () => {
    const wrapper = await mountSuspended(BaseButton, {
      slots: {
        default: 'Slot Content',
      },
    })

    expect(wrapper.text()).toContain('Slot Content')
  })

  it('renders loading icon when loading is true', async () => {
    const wrapper = await mountSuspended(BaseButton, {
      props: {
        loading: true,
      },
    })

    const icon = wrapper.find('span')
    expect(icon.exists()).toBe(true)
  })

  it('applies custom UI class via props', async () => {
    const wrapper = await mountSuspended(BaseButton, {
      props: {
        ui: {
          base: 'bg-red-500',
        },
      },
    })

    const btn = wrapper.find('button')
    expect(btn.attributes('class')).toContain('bg-red-500')
  })
})
