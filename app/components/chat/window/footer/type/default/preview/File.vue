<script lang="ts" setup>
import type { UploadFileEntry } from '~/composables/useFileUploader'

defineProps<{ entry: UploadFileEntry }>()
const emit = defineEmits<{ (e: 'remove'): void }>()
</script>

<template>
  <div class="h-21 w-[12rem] bg-slate-100 grid place-items-center rounded-lg cursor-pointer hover:bg-slate-200/60 shrink-0 relative overflow-hidden group">
    <div class="flex items-center p-2 h-full gap-2">
      <div class="h-full aspect-square bg-blue-200/50 grid place-items-center text-blue-500 rounded-lg">
        <Icon size="24px" name="carbon:document-blank" class="shrink-0" />
      </div>
      <div class="flex flex-col break-all text-slate-400 text-xs">
        <BaseFont class="line-clamp-1 font-bold text-slate-950" :content="entry.file_name" />
        <BaseFont content="TEMPLATE" />
      </div>
    </div>

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
