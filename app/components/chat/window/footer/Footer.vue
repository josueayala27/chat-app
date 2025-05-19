<script setup lang="ts">
const route = useRoute()
const isSelectMessagesActive = useState<boolean>(`select-messages-${route.params.chat}`, () => false)
</script>

<template>
  <WindowFooterTypeDefault v-if="!isSelectMessagesActive" />
  <WindowFooterTypeAction v-else />
</template>
