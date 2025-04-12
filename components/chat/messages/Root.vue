<script setup lang="ts">
import { tv } from 'tailwind-variants'

const isOwn = inject<boolean>('isOwn')
const { reference, floating, isOpen, floatingStyles } = useFloating({ placement: isOwn ? 'bottom-end' : 'bottom-start' })

const ui = tv({
  slots: { root: 'relative group rounded-lg' },
  variants: {
    isOwn: {
      true: { root: 'bg-sky-500 text-white' },
      false: { root: 'bg-slate-100' },
    },
  },
})

const { root } = ui({ isOwn })
onClickOutside(reference, () => isOpen.value = false, { ignore: [floating] })

const menuItems = computed(() => {
  const baseItems = [
    { icon: 'carbon:reply', label: 'Reply' },
    { icon: 'carbon:copy-file', label: 'Copy' },
    { icon: 'carbon:text-new-line', label: 'Forward' },
    { icon: 'carbon:pin', label: 'Pin' },
    { icon: 'carbon:star', label: 'Star' },
    { icon: 'carbon:trash-can', label: 'Delete' },
  ]
  return isOwn ? [{ icon: 'carbon:information', label: 'Message Info' }, ...baseItems] : baseItems
})
</script>

<template>
  <div :class="root()">
    <div
      ref="reference"
      class="rounded-tr-lg absolute top-0 right-0 h-8 aspect-square flex items-center justify-center invisible group-hover:visible cursor-pointer bg-inherit" @click="isOpen = !isOpen"
    >
      <Icon name="carbon:chevron-down" />
    </div>

    <BaseMenuContainer
      v-if="isOpen"
      ref="floating"
      :style="floatingStyles"
      :items="menuItems"
    />

    <slot />
  </div>
</template>
