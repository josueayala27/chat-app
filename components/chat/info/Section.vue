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
      <slot />
    </div>
  </div>
</template>
