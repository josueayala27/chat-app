<script setup lang="ts">
const route = useRoute('chat')
const isSelectMessagesActive = useState<boolean>(`select-messages-${route.params.chat}`)
</script>

<template>
  <WindowFooterTypeDefault v-if="!isSelectMessagesActive" />
  <WindowFooterTypeAction v-else />
</template>
