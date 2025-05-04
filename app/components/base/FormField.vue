<script setup lang="ts">
import { tv } from 'tailwind-variants'

const props = defineProps<{
  label: string
  hint?: string
  name?: string
  ui?: Partial<typeof formField.slots>
}>()

const slots = defineSlots<{ default: () => any, hint: () => any }>()

const uid = useId()

const name = props.name || uid

const error = useFieldError(name)

provide('name', name)

const formField = tv({
  slots: {
    base: 'flex flex-col gap-1',
  },
})

const { base } = formField()
</script>

<template>
  <div :class="[base({ class: props.ui?.base })]">
    <div class="flex justify-between items-center">
      <label class="text-sm text-slate-700">{{ label }}</label>

      <slot v-if="slots.hint || hint" name="hint">
        <BaseFont class="text-sm text-slate-400" content="Optional" />
      </slot>
    </div>

    <slot />

    <BaseFont v-if="error" class="text-sm text-red-500" :content="error" />
  </div>
</template>
