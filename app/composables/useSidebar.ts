/**
 * List of valid sidebar layout keys.
 */
export const LAYOUT_KEYS = ['list', 'new-friend', 'new-message', 'starred-messages'] as const

/**
 * Type representing the possible sidebar layout values.
 */
export type LayoutKeys = (typeof LAYOUT_KEYS)[number]

/**
 * Manages the current sidebar layout state.
 * @returns layout state and setter function
 */
export default function useSidebar(): { layout: Ref<LayoutKeys>, updateLayout: (key: LayoutKeys) => void } {
  const layout = useState<LayoutKeys>('layout', () => 'list')

  /**
   * Updates the current layout.
   * @param key - layout key to set
   */
  function updateLayout(key: LayoutKeys): void {
    layout.value = key
  }

  return { layout, updateLayout }
}
