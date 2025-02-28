<script setup lang="ts">
import type { JSX } from 'vue/jsx-runtime'

defineProps<{ content?: string }>()
defineSlots<{ default?: () => JSX.Element | string }>()
</script>

<template>
  <p>
    <slot>
      {{ content }}
    </slot>
  </p>
</template>
