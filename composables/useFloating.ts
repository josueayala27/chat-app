import type { UseFloatingOptions } from '@floating-ui/vue'
import { autoUpdate, flip, offset, shift, useFloating } from '@floating-ui/vue'

export default function (options?: UseFloatingOptions) {
  const isOpen = ref<boolean>(false)

  const reference = ref<HTMLElement>()
  const floating = ref<HTMLElement>()

  const { floatingStyles } = useFloating(reference, floating, {
    placement: 'top-start',
    middleware: [offset(5), flip(), shift()],
    whileElementsMounted: autoUpdate,
    ...options,
  })

  return { reference, floating, isOpen, floatingStyles }
}
