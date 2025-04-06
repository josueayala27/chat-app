<script setup lang="ts">
const props = defineProps<{ title: string, isOpen?: boolean }>()

const isOpen = ref(props.isOpen)
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

    <!-- TODO: Make this with tailwind variants -->
    <div v-if="isOpen" class="flex flex-col gap-2 overflow-hidden">
      <slot />
    </div>
  </div>
</template>
