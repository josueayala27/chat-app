<template>
  <div class="flex gap-2 items-center text-sm">
    <ChatInfoSharedMediaTag
      v-for="type in ['Media', 'Files', 'Links']"
      :key="type"
    >
      {{ type }}
    </ChatInfoSharedMediaTag>
  </div>

  <div class="grid grid-cols-3 gap-1">
    <div v-for="item in 9" :key="item" role="img" class="bg-slate-100 w-full aspect-square" />
  </div>
</template>
