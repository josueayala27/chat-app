<script lang="ts">
import { tv } from 'tailwind-variants'

const ui = tv({ slots: { root: 'flex flex-col', content: 'overflow-hidden' } })
</script>

<script setup lang="ts">
interface ChatInfoSectionProps {
  title: string
  isOpen: boolean
  ui?: Partial<typeof ui.slots>
}

const props = defineProps<Partial<ChatInfoSectionProps>>()

const isOpen = ref(props.isOpen)

const { root, content } = ui()
</script>

<template>
  <div :class="root({ class: props.ui?.root })">
    <div class="flex justify-between items-center cursor-pointer p-2" @click="isOpen = !isOpen">
      <BaseFont class="font-medium text-slate-900 text-sm select-none" :content="title" />
      <Icon
        class="duration-300"
        :class="{ 'rotate-180': isOpen }"
        name="carbon:chevron-down"
      />
    </div>

    <div v-if="isOpen" :class="content({ class: props.ui?.content })">
      <slot />
    </div>
  </div>
</template>
