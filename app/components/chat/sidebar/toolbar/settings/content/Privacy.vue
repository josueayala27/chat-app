<script lang="ts" setup>
const [DefineTemplate, ReuseTemplate] = createReusableTemplate()

const isGroupModalOpen = ref<boolean>(false)
</script>

<template>
  <DefineTemplate>
    <BasePopover :config="{ placement: 'bottom-end' }">
      <button class="py-1 px-2 bg-slate-200/50 hover:bg-slate-200 rounded-lg cursor-pointer duration-200 flex items-center gap-2">
        <BaseFont class="text-sm text-slate-700" content="Everyone" />
        <Icon name="carbon:chevron-down" size="20px" />
      </button>

      <template #content>
        <BaseMenuContainer>
          <BaseMenuItem label="Everyone" />
          <BaseMenuItem label="My contacts" />
          <BaseMenuItem label="My contacts except..." @click="isGroupModalOpen = true" />
          <BaseMenuItem label="Nobody" />
        </BaseMenuContainer>
      </template>
    </BasePopover>
  </DefineTemplate>

  <BaseModal
    v-model="isGroupModalOpen"
    title="My contacts except..."
    :ui="{
      container: 'w-[442px]',
      header: 'flex flex-col gap-2',
      footer: 'flex justify-end items-center gap-2',
    }"
  >
    <SidebarToolbarNewGroup />

    <template #footer>
      <BaseButton content="Continue" />
    </template>
  </BaseModal>

  <div class="flex flex-col ">
    <BaseFont class="text-sm font-semibold" content="Visibility" />
    <div class="flex flex-col">
      <div class="flex items-center py-3 justify-between border-b border-slate-200">
        <BaseFont class="text-sm" content="Last seen & online" />
        <ReuseTemplate />
      </div>

      <div class="flex items-center py-3 justify-between border-b border-slate-200">
        <BaseFont class="text-sm" content="Profile photo" />
        <ReuseTemplate />
      </div>

      <div class="flex items-center py-3 justify-between border-slate-200">
        <BaseFont class="text-sm" content="Bio" />
        <ReuseTemplate />
      </div>
    </div>

    <BaseFont class="text-sm font-semibold mt-6" content="Messaging" />
    <div class="flex flex-col">
      <div class="flex items-center py-3 justify-between border-b border-slate-200">
        <BaseFont class="text-sm" content="Receive messages" />
        <ReuseTemplate />
      </div>

      <div class="flex items-center py-3 justify-between border-slate-200">
        <BaseFont class="text-sm" content="Read receipts" />
        <BaseToggle />
      </div>
    </div>

    <BaseFont class="text-sm font-semibold mt-6" content="Security" />
    <div class="flex flex-col">
      <div class="flex items-center py-3 justify-between border-slate-200">
        <BaseFont class="text-sm" content="Blocked users" />
        <ReuseTemplate />
      </div>
    </div>
  </div>
</template>
