<script setup lang="ts">
const isGroupModalOpen = defineModel<boolean>({ default: false })
</script>

<template>
  <BaseModal
    v-model="isGroupModalOpen"
    :ui="{
      container: 'w-[442px]',
      header: 'flex flex-col gap-2',
      body: 'items-center justify-center flex flex-col gap-4',
      footer: 'flex justify-end items-center gap-2',
    }"
  >
    <template #header>
      <BaseFont content="Create group chat" />
      <BaseFont class="text-sm font-normal text-neutral-700" content="Gather your friends in a vibrant chat. Share moments and ideas in one fun conversation." />
    </template>

    <BaseAvatar class="border-dashed border border-neutral-200 flex items-center justify-center text-neutral-500 cursor-pointer hover:bg-slate-200 duration-200" size="80">
      <Icon size="24px" name="carbon:camera" />
    </BaseAvatar>

    <div class="flex flex-col gap-2 w-full">
      <label class="text-sm text-neutral-700" for="test_uuid">Group name</label>
      <div :style="{ '--input-width': '44px' }" class="flex items-center top-0 stick y w-full relative">
        <input id="test_uuid" type="text" placeholder="Search..." class="w-full px-4 h-11 pr-3 bg-slate-100 border-slate-200 rounded-lg outline-none text-sm">
      </div>
    </div>

    <template #footer>
      <button class="bg-slate-100 hover:bg-slate-200 rounded-lg h-9 px-4 flex items-center justify-center text-slate-700 cursor-pointer text-sm duration-200" @click="isGroupModalOpen = false">
        Close
      </button>
      <button class="bg-sky-500 hover:bg-sky-600 rounded-lg h-9 px-4 flex items-center justify-center text-white cursor-pointer text-sm duration-200">
        Create group
      </button>
    </template>
  </BaseModal>
</template>
