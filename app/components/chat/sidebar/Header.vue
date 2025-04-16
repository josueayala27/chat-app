<script setup lang="ts">
defineProps<{ title: string, description: string, layout: LayoutKeys }>()

const { updateLayout } = useSidebar()
</script>

<template>
  <div class="flex items-center gap-4">
    <div class="p-2 rounded-full bg-slate-100 hover:bg-slate-200 grid place-items-center cursor-pointer" @click="updateLayout(layout)">
      <Icon size="20px" name="carbon:arrow-left" class="flex shrink-0 duration-300" />
    </div>

    <div>
      <BaseFont class="font-semibold" :content="title" />
      <BaseFont class="text-sm text-neutral-700" :content="description" />
    </div>
  </div>
</template>
