<script setup lang="ts">
import { PiniaColadaDevtools } from '@pinia/colada-devtools'

useHead({
  titleTemplate: '%s • Chat App',
})
</script>

<template>
  <PiniaColadaDevtools />
  <NuxtLoadingIndicator color="var(--color-sky-500)" />
  <NuxtLayout>
    <NuxtPage />
  </NuxtLayout>
</template>
