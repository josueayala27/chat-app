<script setup lang="ts">
withDefaults(defineProps<{ gap?: string }>(), {
  gap: '4px',
})
</script>

<template>
  <div :style="{ '--gap': gap }" class="flex flex-col gap-(--gap)">
    <slot />
  </div>
</template>
