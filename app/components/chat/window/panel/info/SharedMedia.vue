<script setup lang="ts">
import type { ConcreteComponent } from 'vue'

interface SharedMediaType {
  id: number
  label: string
  component: string | ConcreteComponent
}

const sharedMediaOptions = [
  { id: 1, label: 'Media', component: resolveComponent('PanelInfoSharedMediaPhotos') },
  { id: 2, label: 'Files', component: resolveComponent('PanelInfoSharedMediaFiles') },
  { id: 3, label: 'Links', component: resolveComponent('PanelInfoSharedMediaLinks') },
]

const selectedMediaType = shallowRef<SharedMediaType>(sharedMediaOptions[0]!)
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
