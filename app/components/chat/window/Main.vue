<script lang="ts" setup>
const emit = defineEmits<{ (e: 'load:before', callback: () => void): void }>()

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

const { arrivedState } = useScroll(main, { offset: { top: 200 } })

watch(() => [arrivedState.top, arrivedState.bottom], async ([top, bottom]) => {
  if (top) {
    const container = main.value

    if (!container)
      return

    const oldScrollHeight = container.scrollHeight

    emit('load:before', async () => {
      await nextTick()

      const newScrollHeight = main.value?.scrollHeight ?? 0

      if (main.value)
        main.value.scrollTop += newScrollHeight - oldScrollHeight
    })
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
