<script lang="ts" setup>
defineProps<{ source?: string, type: string, status: 'idle' | 'uploading' | 'done' | 'error' }>()
const emits = defineEmits<{ (e: 'remove'): void }>()

const imageTypes = ['image/jpeg', 'image/png', 'image/gif', 'image/webp', 'image/bmp', 'image/x-icon', 'image/tiff', 'image/heic', 'image/avif']
</script>

<template>
  <div class="size-21 bg-slate-100 text-xs text-slate-400 grid place-items-center  cursor-pointer hover:bg-slate-200/60 shrink-0 group items-center justify-center relative">
    <template v-if="!imageTypes.includes(type)">
      <div class="flex flex-col items-center gap-1 p-2">
        <icon size="24px" name="carbon:document-blank" />
        <BaseFont class="line-clamp-1 break-all" content="file.name" />
      </div>
    </template>

    <div v-else class="overflow-hidden bg-yellow-400 w-full h-full absolute rounded-lg">
      <img class="h-full w-full object-cover" :src="source">

      <div
        :class="[{
          'visible': status === 'uploading',
          'invisible group-hover:visible': status === 'idle' || status === 'error' || status === 'done',
        }]"
        class="absolute top-0 left-0 bg-slate-900/50 w-full h-full grid place-items-center"
        @click="emits('remove')"
      >
        <Icon size="24px" class="text-neutral-50" :name="status === 'uploading' ? 'svg-spinners:3-dots-fade' : 'carbon:trash-can'" />
      </div>
    </div>
  </div>
</template>
