<script setup lang="ts">
import { LazyChatInfoSharedMediaFiles, LazyChatInfoSharedMediaLinks, LazyChatInfoSharedMediaPhotos } from '#components'

interface SharedMediaType {
  id: number
  label: string
  component: Component
}

const sharedMediaOptions = ref<SharedMediaType[]>([
  { id: 1, label: 'Media', component: markRaw(LazyChatInfoSharedMediaPhotos) },
  { id: 2, label: 'Files', component: markRaw(LazyChatInfoSharedMediaFiles) },
  { id: 3, label: 'Links', component: markRaw(LazyChatInfoSharedMediaLinks) },
])

const selectedMediaType = ref<SharedMediaType>(sharedMediaOptions.value[0])
</script>

<template>
  <div class="flex gap-2 items-center text-sm">
    <ChatInfoSharedMediaTag
      v-for="option in sharedMediaOptions"
      :key="option.id"
      :active="selectedMediaType.id === option.id"
      @click="selectedMediaType = option"
    >
      {{ option.label }}
    </ChatInfoSharedMediaTag>
  </div>

  <component :is="selectedMediaType.component" />
</template>
