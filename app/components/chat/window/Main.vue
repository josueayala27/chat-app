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

function getScrollHeight(): number {
  if (main.value) {
    return main.value.scrollHeight
  }

  return 0
}

/**
 * Watches scroll position.
 * If at top: triggers parent to load older content and compensates scroll position.
 * If at bottom: logs presence (placeholder for future logic).
 */
watch(() => [arrivedState.top, arrivedState.bottom], async ([top, bottom]) => {
  if (top) {
    if (main.value) {
      const oldScrollHeight = getScrollHeight()

      await props.fetchOlder()

      await nextTick()

      const newScrollHeight = getScrollHeight()
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
  <div ref="main" class="p-2 overflow-auto scrollbar-hidden flex-1 flex flex-col gap-2">
    <slot />
  </div>
</template>
