<template>
  <div class="p-2 flex items-center justify-between">
    <div class="flex rounded-lg gap-2 items-center cursor-pointergroup">
      <BaseAvatar />
      <div class="flex flex-col text-sm">
        <BaseFont content="Josué Ayala" class="font-medium" />
      </div>
    </div>
    <div class="flex items-center">
      <div class="inline-flex p-1 rounded-full hover:bg-slate-100 cursor-pointer">
        <Icon size="20px" name="carbon:search" />
      </div>
      <BasePopover :config="{ placement: 'bottom-end' }">
        <div class="inline-flex p-1 rounded-full hover:bg-slate-100 cursor-pointer">
          <Icon size="20px" name="carbon:overflow-menu-horizontal" />
        </div>

        <template #content>
          <BaseMenuContainer>
            <BaseMenuItem icon="carbon:user-follow" label="Contact info" />
            <BaseMenuItem icon="carbon:user-multiple" label="Select Messages" />
            <BaseMenuItem icon="carbon:user-multiple" label="Mute Notifications" />
            <BaseMenuItem icon="carbon:user-multiple" label="Close Chat" />
            <BaseMenuItem icon="carbon:user-multiple" label="Block" />
            <BaseMenuItem icon="carbon:user-multiple" label="Delete Chat" />
          </BaseMenuContainer>
        </template>
      </BasePopover>
    </div>
  </div>
</template>
