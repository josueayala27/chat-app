<script setup lang="ts">
useHead({
  titleTemplate: '%s • Chat App',
})
</script>

<template>
  <NuxtLoadingIndicator color="var(--color-sky-500)" />
  <NuxtLayout>
    <NuxtPage />
  </NuxtLayout>
</template>
