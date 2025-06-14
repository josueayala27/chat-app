<script lang="ts" setup>
const props = defineProps<{ fetchOlder: () => Promise<void> }>()

const { $gsap } = useNuxtApp()
const main = ref<HTMLElement>()

onMounted(() => {
  if (main.value) {
    $gsap.to(main.value, {
      scrollTo: { y: 'max' },
      duration: 0,
    })
  }
})

const { arrivedState } = useScroll(main, { offset: { top: 300 } })

/**
 * Watches scroll position.
 * If at top: triggers parent to load older content and compensates scroll position.
 * If at bottom: logs presence (placeholder for future logic).
 */
watch(() => [arrivedState.top, arrivedState.bottom], async ([top, bottom]) => {
  if (top) {
    if (main.value) {
      const oldScrollHeight = main.value.scrollHeight ?? 0

      await props.fetchOlder()

      await nextTick()

      const newScrollHeight = main.value?.scrollHeight ?? 0
      main.value.scrollTop += newScrollHeight - oldScrollHeight
    }
  }
  else if (bottom) {
    console.log('Bottom Arrived')
  }
})

defineExpose({ main })
</script>

<template>
  <div ref="main" class="p-2 overflow-auto flex-1 flex flex-col gap-2">
    <slot />
  </div>
</template>
