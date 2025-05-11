<script setup lang="ts">
const isGroupModalOpen = defineModel<boolean>({ default: false })
</script>

<template>
  <BaseModal
    v-model="isGroupModalOpen"
    title="Settings"
    :ui="{
      container: 'w-[442px]',
      header: 'flex flex-col gap-2',
      footer: 'flex justify-end items-center gap-2',
    }"
  >
    Hello...
  </BaseModal>
</template>
