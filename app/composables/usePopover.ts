import type { BasePopover } from '#components'

export type PopoverInstance = InstanceType<typeof BasePopover>

export function usePopover() {
  /**
   * Reference to the first `BasePopover` instance.
   */
  const reference = ref<PopoverInstance | null>(null)

  /**
   * Closes the popover if it is currently open.
   */
  function closePopover(): void {
    if (reference.value) {
      reference.value.isOpen = false
    }
  }

  return { reference, closePopover }
}
