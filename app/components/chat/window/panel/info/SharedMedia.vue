<script setup lang="ts">
import { PanelInfoSharedMediaFiles, PanelInfoSharedMediaLinks, PanelInfoSharedMediaPhotos } from '#components'

interface SharedMediaType {
  id: number
  label: string
  component: Component
}

const sharedMediaOptions = ref<SharedMediaType[]>([
  { id: 1, label: 'Media', component: markRaw(PanelInfoSharedMediaPhotos) },
  { id: 2, label: 'Files', component: markRaw(PanelInfoSharedMediaFiles) },
  { id: 3, label: 'Links', component: markRaw(PanelInfoSharedMediaLinks) },
])

const selectedMediaType = ref<SharedMediaType>(sharedMediaOptions.value[0])
</script>

<template>
  <div class="flex gap-2 items-center text-sm px-2">
    <PanelInfoSharedMediaTag
      v-for="option in sharedMediaOptions"
      :key="option.id"
      :active="selectedMediaType.id === option.id"
      @click="selectedMediaType = option"
    >
      {{ option.label }}
    </PanelInfoSharedMediaTag>
  </div>

  <component :is="selectedMediaType.component" />
</template>
