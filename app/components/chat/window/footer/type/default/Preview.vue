<script lang="ts" setup>
defineProps<{ source: string, type: string }>()
defineEmits<{ (e: 'remove'): void }>()
</script>

<template>
  <div class="size-21 bg-slate-100 text-xs text-slate-400 grid place-items-center  cursor-pointer hover:bg-slate-200/60 shrink-0 group items-center justify-center relative">
    <template v-if="!['image/jpeg', 'image/png', 'image/gif', 'image/webp', 'image/bmp', 'image/x-icon', 'image/tiff', 'image/heic', 'image/avif'].includes(type)">
      <div class="flex flex-col items-center gap-1 p-2">
        <icon size="24px" name="carbon:document-blank" />
        <!-- <BaseFont class="line-clamp-1 break-all" :content="file.name" /> -->
      </div>
    </template>

    <div v-else class="overflow-hidden bg-yellow-400 w-full h-full absolute rounded-lg">
      <img class="h-full w-full object-cover" :src="source">
    </div>

    <div class="bg-neutral-500 hover:bg-neutral-950 absolute -top-2 -right-2 size-4 rounded-full z-50 invisible group-hover:visible grid place-items-center cursor-pointer text-white ring-3 ring-white">
      <Icon size="16px" name="carbon:close" />
    </div>

    <!-- <div class="absolute top-0 left-0 bg-slate-900/70 w-full h-full group-hover:visible invisible grid place-items-center" @click="emit('remove')">
      <Icon size="24px" class="text-neutral-50" name="carbon:trash-can" />
    </div> -->
  </div>
</template>
