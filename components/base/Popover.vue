<script setup lang="ts">
import type { UseFloatingOptions } from '@floating-ui/vue'

const props = defineProps<{ config?: UseFloatingOptions }>()

const { isOpen, reference, floating, floatingStyles } = useFloating({ strategy: 'fixed', ...props.config })

onClickOutside(reference, () => isOpen.value = false, { ignore: [floating] })
defineExpose({ reference, floating, isOpen })
</script>

<template>
  <BasePrimitive ref="reference" @click="isOpen = !isOpen">
    <slot :is-open="isOpen" />
  </BasePrimitive>

  <BasePrimitive v-if="isOpen" ref="floating" :style="floatingStyles">
    <slot name="content" />
  </BasePrimitive>
</template>
