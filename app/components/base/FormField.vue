<script lang="ts">
import theme from '@/theme/form-field'

export interface BaseFormFieldProps {
  label: string
  hint?: string
  name?: string
  ui?: Partial<typeof theme.slots>
}
</script>

<script setup lang="ts">
const props = defineProps<BaseFormFieldProps>()

const slots = defineSlots<{ default: () => any, hint: () => any }>()

const uid = useId()
const name = props.name || uid
const error = useFieldError(name)

provide('name', name)

const { base } = theme()
</script>

<template>
  <div :class="[base({ class: props.ui?.base })]">
    <div class="flex justify-between items-center">
      <label :for="name" class="text-sm text-slate-700">{{ label }}</label>

      <slot v-if="slots.hint || hint" name="hint">
        <BaseFont class="text-sm text-slate-400" content="Optional" />
      </slot>
    </div>

    <slot />

    <BaseFont v-if="error" class="text-sm text-red-500" :content="error" />
  </div>
</template>
