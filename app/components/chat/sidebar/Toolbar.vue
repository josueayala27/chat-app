<script lang="ts" setup>
import type { BasePopover } from '#components'

/**
 * Composable that provides and manages sidebar layout state.
 */
const { updateLayout, layout } = useSidebar()

/**
 * Reference to the first BasePopover instance.
 */
const popover = ref<InstanceType<typeof BasePopover> | null>(null)

/**
 * Closes the popover if it is currently open.
 */
function closePopover(): void {
  if (popover.value) {
    popover.value.isOpen = false
  }
}

/**
 * Sets the sidebar layout to 'new-friend' and closes the popover.
 */
function setNewFriendLayout(): void {
  closePopover()
  updateLayout('new-friend')
}

/**
 * Sets the sidebar layout to 'new-message' and closes the popover.
 */
function setNewMessageLayout(): void {
  closePopover()
  updateLayout('new-message')
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
          <BaseMenuContainer>
            <BaseMenuItem v-if="layout !== 'new-friend'" icon="carbon:user-follow" label="New friend" @click="setNewFriendLayout" />
            <BaseMenuItem v-if="layout !== 'new-message'" icon="carbon:chat" label="New message" @click="setNewMessageLayout" />
          </BaseMenuContainer>
        </template>
      </BasePopover>

      <BasePopover>
        <div class="p-2 rounded-full hover:bg-slate-100 grid place-items-center cursor-pointer">
          <Icon size="20px" name="carbon:overflow-menu-vertical" class="flex shrink-0 duration-300" />
        </div>

        <template #content>
          <BaseMenuContainer
            :items="[
              { icon: 'carbon:user-multiple', label: 'New group', onClick: setNewFriendLayout },
              { icon: 'carbon:star', label: 'Starred messages' },
            ]"
          />
        </template>
      </BasePopover>
    </div>
  </div>
</template>
