<script lang="ts" setup>
import { gsap } from 'gsap'
import { ScrollToPlugin } from 'gsap/ScrollToPlugin'

gsap.registerPlugin(ScrollToPlugin)

const main = ref<HTMLElement>()

onMounted(() => {
  if (main.value) {
    gsap.to(main.value, {
      scrollTo: { y: 'max' },
      duration: 0,
    })
  }
})
</script>

<template>
  <div ref="main" class="p-2 overflow-auto scrollbar-hidden flex-1 flex flex-col gap-2">
    <slot />
  </div>
</template>
