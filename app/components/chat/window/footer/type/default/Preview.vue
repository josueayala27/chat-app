<script lang="ts" setup>
import type { UploadFileEntry } from '~/composables/useFileUploader'
import FilePreview from './preview/File.vue'
import MediaPreview from './preview/Media.vue'

const props = defineProps<{ entry: UploadFileEntry }>()
const emit = defineEmits<{ (e: 'remove'): void }>()
</script>

<template>
  <component
    :is="props.entry.file.type.startsWith('image/') ? MediaPreview : FilePreview"
    :entry="props.entry"
    @remove="emit('remove')"
  />
</template>
