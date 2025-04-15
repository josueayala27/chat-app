<script setup lang="ts">
const { updateLayout } = useSidebar()
</script>

<template>
  <div class="flex items-center gap-4">
    <div class="p-2 rounded-full bg-slate-100 hover:bg-slate-200 grid place-items-center cursor-pointer" @click="updateLayout('list')">
      <Icon size="20px" name="carbon:arrow-left" class="flex shrink-0 duration-300" />
    </div>

    <div>
      <BaseFont class="font-semibold" content="Add friend" />
      <BaseFont class="text-sm text-neutral-700" content="You can add friends with their Chat App username." />
    </div>
  </div>

  <ChatSidebarListSearch />
</template>
