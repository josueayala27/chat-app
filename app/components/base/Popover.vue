<script lang="ts">
import type { UseFloatingOptions } from '@floating-ui/vue'
</script>

<script setup lang="ts">
const props = defineProps<{ config?: UseFloatingOptions }>()

const { isOpen, reference, floating, floatingStyles } = useFloating({ strategy: 'fixed', ...props.config })
defineExpose({ reference, floating, isOpen })

onClickOutside(reference, () => isOpen.value = false, { ignore: [floating] })
</script>

<template>
  <BasePrimitive ref="reference" @click="isOpen = !isOpen">
    <slot :is-open="isOpen" />
  </BasePrimitive>

  <BasePrimitive v-if="isOpen" ref="floating" :style="floatingStyles">
    <slot name="content" />
  </BasePrimitive>
</template>
