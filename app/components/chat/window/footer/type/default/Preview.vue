<script lang="ts" setup>
defineProps<{ file: File }>()

function fileToURL(file: File) {
  return URL.createObjectURL(file)
}

onMounted(() => {
  console.log('Upload file...')
})
</script>

<template>
  <div class="size-21 bg-slate-100 text-xs text-slate-400 grid place-items-center rounded-lg cursor-pointer hover:bg-slate-200/60 shrink-0 overflow-hidden relative group">
    <template v-if="!['image/jpeg', 'image/png', 'image/gif', 'image/webp', 'image/bmp', 'image/x-icon', 'image/tiff', 'image/heic', 'image/avif'].includes(file.type)">
      <div class="flex flex-col items-center gap-1 p-2">
        <icon size="24px" name="carbon:document-blank" />
        <BaseFont class="line-clamp-1 break-all" :content="file.name" />
      </div>
    </template>

    <img v-else class="h-full w-full object-cover" :src="fileToURL(file)">

    <div class="absolute top-0 left-0 bg-slate-900/70 w-full h-full group-hover:visible invisible grid place-items-center">
      <Icon size="24px" class="text-neutral-50" name="carbon:trash-can" />
    </div>
  </div>
</template>
