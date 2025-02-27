<script setup lang="ts">
defineProps<{ title: string }>()

const isOpen = ref(false)
</script>

<template>
  <div class="flex flex-col">
    <div class="flex justify-between items-center cursor-pointer p-2" @click="isOpen = !isOpen">
      <p class="font-medium text-slate-900 text-sm select-none">
        {{ title }}
      </p>
      <Icon
        class="duration-300"
        :class="{ 'rotate-180': isOpen }"
        name="carbon:chevron-down"
      />
    </div>

    <div v-if="isOpen" class="px-2 flex flex-col gap-2 overflow-hidden">
      <div class="flex gap-2 items-center text-sm">
        <span
          v-for="type in ['Media', 'Files', 'Links']"
          :key="type"
          class="px-3 py-1 rounded-full bg-sky-100 text-sky-600 font-medium cursor-pointer select-none"
        >
          {{ type }}
        </span>
      </div>

      <div class="grid grid-cols-3 gap-0.5">
        <div v-for="item in 9" :key="item" role="img" class="bg-slate-100 w-full aspect-square rounded-lg" />
      </div>
    </div>
  </div>
</template>
