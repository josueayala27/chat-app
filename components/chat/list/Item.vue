<script lang="ts">
interface ItemProps {
  name: string
  message: string
  isPinned?: boolean
  isRead?: boolean
}
</script>

<script lang="ts" setup>
defineProps<ItemProps>()
</script>

<template>
  <NuxtLink class="flex rounded-lg p-2 gap-2 items-center cursor-pointer hover:bg-slate-100 group">
    <BaseAvatar />
    <div class="flex flex-col text-sm w-full">
      <div class="flex justify-between items-center">
        <p class="text-slate-900 font-bold">
          {{ name }}
        </p>
        <span class="text-xs text-slate-500 font-medium">21:35</span>
        <Icon v-if="isRead" name="carbon:checkmark" />
      </div>
      <div class="flex justify-between items-center gap-1">
        <p class="line-clamp-1 text-slate-500">
          {{ message }}
        </p>
        <div class="flex gap-2 items-center ">
          <Icon v-if="isPinned" name="carbon:pin" />
          <div class="overflow-hidden place-items-center hidden group-hover:grid">
            <Icon size="16px" name="carbon:chevron-down" />
          </div>
        </div>
      </div>
    </div>
  </NuxtLink>
</template>
