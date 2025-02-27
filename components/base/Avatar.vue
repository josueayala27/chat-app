<script setup lang="ts">
withDefaults(defineProps<{ size?: number }>(), {
  size: 48,
})
</script>

<template>
  <div :style="{ '--avatar-size': `${size}px` }" class="size-(--avatar-size) bg-slate-100 rounded-full group-hover:bg-slate-200 shrink-0" />
</template>
