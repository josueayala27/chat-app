<script setup lang="ts">
defineProps<{ title: string, description: string }>()
</script>

<template>
  <div class="w-[390px] flex flex-col gap-5 p-6 rounded-lg shadow-xl shadow-slate-950/7">
    <div class="flex flex-col">
      <BaseFont class="font-semibold" :content="title" />
      <BaseFont class="text-sm text-slate-700" :content="description" />
    </div>

    <slot />
  </div>
</template>
