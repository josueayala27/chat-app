<script lang="ts" setup>
import type { UploadFileEntry } from '~/composables/useFileUploader'
import FilePreview from './preview/File.vue'
import MediaPreview from './preview/Media.vue'

defineProps<{ entry: UploadFileEntry }>()
const emit = defineEmits<{ (e: 'remove'): void }>()
</script>

<template>
  {{ entry }}
  <component
    :is="entry.file.type.startsWith('image/') ? MediaPreview : FilePreview"
    :entry="entry"
    @remove="emit('remove')"
  />
</template>
