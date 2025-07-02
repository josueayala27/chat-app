<script lang="ts" setup>
import type { UploadFileEntry } from '~/composables/useFileUploader'

const props = defineProps<{ entry: UploadFileEntry }>()
const emit = defineEmits<{ (e: 'remove'): void }>()
</script>

<template>
  <div class="size-21 bg-slate-100 text-xs text-slate-400 grid place-items-center rounded-lg cursor-pointer hover:bg-slate-200/60 shrink-0 relative overflow-hidden group">
    <div class="flex flex-col items-center gap-1 p-2">
      <Icon size="24px" name="carbon:document-blank" />
      <BaseFont class="line-clamp-1 break-all" :content="entry.file_name" />
    </div>
    <div
      v-if="entry.status !== 'done'"
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
