<script lang="ts" setup>
import BasePopover from '@/components/base/Popover.vue'

const popover = ref<InstanceType<typeof BasePopover> | null>(null)

function openAddFriendModal() {
  if (popover.value) {
    popover.value.isOpen = false
  }
}
</script>

<template>
  <div class="flex items-center justify-between">
    <div class="p-2 rounded-full hover:bg-slate-100 grid place-items-center cursor-pointer">
      <Icon size="20px" name="carbon:user" class="flex shrink-0 duration-300" />
    </div>

    <div class="flex items-center justify-end">
      <BasePopover ref="popover">
        <div class="p-2 rounded-full hover:bg-slate-100 grid place-items-center cursor-pointer">
          <Icon size="20px" name="carbon:add-large" class="flex shrink-0 duration-300" />
        </div>

        <template #content>
          <BaseMenuContainer
            :items="[
              { icon: 'carbon:user-follow', label: 'New friend', onClick: openAddFriendModal },
              { icon: 'carbon:chat', label: 'New Message' }]"
          />
        </template>
      </BasePopover>

      <div class="p-2 rounded-full hover:bg-slate-100 grid place-items-center cursor-pointer">
        <Icon size="20px" name="carbon:overflow-menu-vertical" class="flex shrink-0 duration-300" />
      </div>
    </div>
  </div>
</template>
