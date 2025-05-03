<script setup lang="ts">
defineProps<{ label: string, hint?: string }>()
const slots = defineSlots<{ default: () => any, hint: () => any }>()
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

    <BaseFont class="text-sm text-red-500" content="This field is required." />
  </div>
</template>
