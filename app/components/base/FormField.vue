<script setup lang="ts">
const props = defineProps<{ label: string, hint?: string, name?: string }>()
const slots = defineSlots<{ default: () => any, hint: () => any }>()

const uid = useId()

const name = props.name || uid

const error = useFieldError(name)

provide('name', name)
</script>

<template>
  <div class="flex flex-col gap-1">
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
