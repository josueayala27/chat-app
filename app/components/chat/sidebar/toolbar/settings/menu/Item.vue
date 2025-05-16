<script lang="ts" setup>
import type { Option } from '../Modal.vue'

defineProps<{ option: Option, active: boolean }>()
</script>

<template>
  <div
    :class="[{ 'bg-slate-100': active }]"
    class="p-2 hover:bg-slate-100 rounded-lg cursor-pointer flex items-center gap-2 text-slate-900"
  >
    <Icon name="carbon:user-avatar" />
    <BaseFont class="text-sm" :content="option.label" />
  </div>
</template>
