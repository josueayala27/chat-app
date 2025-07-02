<script lang="ts" setup>
import type { UploadFileEntry } from '~/composables/useFileUploader'

defineProps<{ entry: UploadFileEntry }>()
const emit = defineEmits<{ (e: 'remove'): void }>()
</script>

<template>
  <div class="size-21 bg-slate-100 rounded-lg overflow-hidden shrink-0 relative group cursor-pointer">
    <img v-if="entry.src" :src="entry.src" class="w-full h-full object-cover">
    <div
      v-if="entry.status === 'uploading'"
      class="absolute top-0 left-0 w-full h-full bg-slate-900/50 grid place-items-center"
    >
      <Icon size="24px" name="svg-spinners:3-dots-fade" class="text-neutral-50" />
    </div>
    <div
      v-else
      class="absolute top-0 left-0 w-full h-full bg-slate-900/50 grid place-items-center invisible group-hover:visible"
      @click="emit('remove')"
    >
      <Icon size="24px" name="carbon:trash-can" class="text-neutral-50" />
    </div>
  </div>
</template>
