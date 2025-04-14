import type { VNode } from 'vue'
import { cloneVNode, Comment, defineComponent, Fragment, mergeProps } from 'vue'

/**
 * Unwraps a VNode if it is wrapped in a Fragment with exactly one child.
 *
 * @param {VNode} vnode - The VNode to unwrap.
 * @returns {VNode | null} - Returns the single child if the vnode is a Fragment with one child,
 *                           otherwise returns the original vnode.
 */
function unwrapFragment(vnode: VNode): VNode | null {
  if (vnode.type === Fragment && Array.isArray(vnode.children)) {
    return vnode.children.length === 1 ? (vnode.children[0] as VNode) : null
  }
  return vnode
}

/**
 * A Primitive component that renders the content of its default slot.
 *
 * It unwraps fragments if necessary, merges external attributes with the vnode's properties,
 * and clones the vnode with the merged configuration.
 */
export default defineComponent({
  name: 'Primitive',
  inheritAttrs: false,

  setup(_, { attrs, slots }) {
    return () => {
      const defaultSlot = slots.default?.()
      if (!defaultSlot?.[0])
        return null

      const child = unwrapFragment(defaultSlot[0])

      if (!child || child.type === Comment)
        return child

      /**
       * Destructure to remove 'ref' and extract 'class'
       */
      const { ref, class: childClass, ...childProps } = child.props || {}

      /**
       * Merge external attributes with child props, combining class names
       */
      const mergedProps = mergeProps(attrs, {
        ...childProps,
        class: [attrs.class, childClass].filter(Boolean),
      })

      return cloneVNode(child, mergedProps)
    }
  },
})
