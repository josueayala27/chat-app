<script lang="ts" setup>
defineProps<{ icon: string, label: string }>()
</script>

<template>
  <div class="cursor-pointer hover:bg-slate-200/60 py-2 px-4 rounded-lg text-sm flex items-center gap-2">
    <Icon size="20px" :name="icon" />
    {{ label }}
  </div>
</template>
