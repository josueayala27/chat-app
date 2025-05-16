<script lang="ts" setup>
import type { Option } from '../Modal.vue'

defineProps<{ option: Option, active: boolean }>()
</script>

<template>
  <div
    :class="[{ 'bg-slate-100': active }]"
    class="px-2 h-9 hover:bg-slate-100 rounded-lg cursor-pointer flex items-center gap-2 text-slate-900"
  >
    <Icon size="20px" :name="option.icon" />
    <BaseFont class="text-sm" :content="option.label" />
  </div>
</template>
