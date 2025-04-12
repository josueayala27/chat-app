<script lang="ts" setup>
export interface BaseMenuItemProps { icon: string, label: string }

defineProps<BaseMenuItemProps>()
</script>

<template>
  <div class="cursor-pointer hover:bg-slate-200/60 py-2 px-4 rounded-lg text-sm flex items-center gap-2 text-neutral-900">
    <Icon size="20px" class="size-5" :name="icon" />
    <BaseFont :content="label" />
  </div>
</template>
