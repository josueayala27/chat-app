<script setup lang="ts">
import { tv } from 'tailwind-variants'

const props = defineProps<{ title: string, description: string, ui?: Partial<typeof container.slots> }>()

const container = tv({
  slots: {
    body: 'flex flex-col gap-3',
  },
})

const { body } = container()
</script>

<template>
  <div class="w-[390px] flex flex-col gap-5 p-6 rounded-lg shadow-xl shadow-slate-950/7">
    <!-- Default -->
    <div class="flex flex-col">
      <BaseFont class="font-semibold" :content="title" />
      <BaseFont class="text-sm text-slate-700" :content="description" />
    </div>

    <div :class="[body({ class: props.ui?.body })]">
      <slot />
    </div>

    <!-- Footer -->
    <slot name="footer" />
  </div>
</template>
