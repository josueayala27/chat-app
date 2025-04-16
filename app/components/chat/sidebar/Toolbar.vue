<script lang="ts" setup>
import type { BasePopover } from '#components'

/**
 * Provides current layout state and a method to update it.
 */
const { updateLayout, layout } = useSidebar()

/**
 * Reference to the first `BasePopover` instance.
 */
const menuPopover = ref<InstanceType<typeof BasePopover> | null>(null)

/**
 * Controls visibility of the "Create group" modal
 */
const isGroupModalOpen = ref<boolean>(false)

/**
 * Closes the popover if it is currently open.
 */
function closePopover(): void {
  if (menuPopover.value) {
    menuPopover.value.isOpen = false
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

function openModal(): void {
  closePopover()
  isGroupModalOpen.value = true
}
</script>

<template>
  <BaseModal
    v-model="isGroupModalOpen"
    title="Create group chat"
    :ui="{
      container: 'w-[442px]',
      header: 'flex flex-col gap-2',
      body: 'items-center justify-center flex flex-col gap-4',
      footer: 'flex justify-end items-center gap-2',
    }"
  >
    <template #header="{ title }">
      <BaseFont :content="title" />
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

  <div class="flex items-center justify-between">
    <BaseAvatar size="40" />

    <div class="flex items-center justify-end">
      <BasePopover ref="menuPopover">
        <div class="p-2 rounded-full hover:bg-slate-100 grid place-items-center cursor-pointer">
          <Icon size="20px" name="carbon:add-large" class="flex shrink-0 duration-300" />
        </div>

        <template #content>
          <BaseMenuContainer>
            <BaseMenuItem
              v-if="layout !== 'new-friend'"
              icon="carbon:user-follow"
              label="New friend"
              @click="setNewFriendLayout"
            />
            <BaseMenuItem
              icon="carbon:user-multiple"
              label="New group"
              @click="openModal"
            />
            <BaseMenuItem
              v-if="layout !== 'new-message'"
              icon="carbon:chat"
              label="New message"
              @click="setNewMessageLayout"
            />
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
              { icon: 'carbon:star', label: 'Starred messages' },
            ]"
          />
        </template>
      </BasePopover>
    </div>
  </div>
</template>
