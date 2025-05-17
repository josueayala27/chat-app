<script setup lang="ts">
const currentStep = ref<number>(1)
</script>

<template>
  <SidebarToolbarNewGroupStepOne v-if="currentStep === 1" />
  <SidebarToolbarNewGroupStepTwo v-else-if="currentStep === 2" />
</template>
