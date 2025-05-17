<script lang="ts" setup>
// https://www.epidemicsound.com/sound-effects/categories/user-interface/?_us=adwords&_usx=11440412807_notification%20sound

const [DefineTemplate, ReuseTemplate] = createReusableTemplate()

const isGroupModalOpen = ref<boolean>(false)
</script>

<template>
  <DefineTemplate>
    <BasePopover :config="{ placement: 'bottom-end' }">
      <button class="py-1 px-2 bg-slate-200/50 hover:bg-slate-200 rounded-lg cursor-pointer duration-200 flex items-center gap-2">
        <BaseFont class="text-sm text-slate-700" content="Default" />
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

  <div class="flex flex-col w-full p-6">
    <BaseFont class="text-sm font-semibold" content="Private chats" />
    <div class="flex flex-col">
      <div class="flex items-center py-3 justify-between border-b border-slate-200">
        <BaseFont class="text-sm" content="Show notifications" />
        <BaseToggle />
      </div>

      <div class="flex items-center py-3 justify-between">
        <BaseFont class="text-sm" content="Sound" />
        <ReuseTemplate />
      </div>
    </div>

    <BaseFont class="text-sm font-semibold mt-6" content="Groups" />
    <div class="flex flex-col">
      <div class="flex items-center py-3 justify-between border-b border-slate-200">
        <BaseFont class="text-sm" content="Show notifications" />
        <BaseToggle />
      </div>

      <div class="flex items-center py-3 justify-between">
        <BaseFont class="text-sm" content="Sound" />
        <ReuseTemplate />
      </div>
    </div>
  </div>
</template>
