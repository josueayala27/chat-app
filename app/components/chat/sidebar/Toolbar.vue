<script lang="ts" setup>
const { reference: profilePopoverReference, closePopover: closeProfilePopover } = usePopover()
const { reference, closePopover } = usePopover()

/**
 * Provides current layout state and a method to update it.
 */
const { updateLayout, layout } = useSidebar()

const isGroupModalOpen = ref<boolean>(false)
const isSettingsModalOpen = ref<boolean>(false)

/**
 * Change the layout to the one you specify and close the popover.
 *
 * @param layout – the layout identifier ('new-friend', 'new-message', …)
 */
function setLayout(layout: 'new-friend' | 'new-message'): void {
  closePopover()
  updateLayout(layout)
}

function openModal(): void {
  closePopover()
  isGroupModalOpen.value = true
}

function openSettingsModal() {
  closeProfilePopover()
  isSettingsModalOpen.value = true
}
</script>

<template>
  <BaseModal
    v-model="isGroupModalOpen"
    state="new-group"
    :ui="{
      container: 'w-[442px]',
      header: 'flex flex-col gap-2',
      footer: 'flex justify-end items-center gap-2',
    }"
  >
    <template #header>
      <BaseFont content="Create group chat" />
      <BaseFont class="text-sm font-normal text-slate-700" content="Gather your friends in a vibrant chat. Share moments and ideas in one fun conversation." />
    </template>

    <SidebarToolbarNewGroup />

    <template #footer>
      <!-- <button class="bg-slate-100 hover:bg-slate-200 rounded-lg h-9 px-4 flex items-center justify-center text-slate-700 cursor-pointer text-sm duration-200">
        Close
      </button> -->
      <BaseButton content="Back" />
      <BaseButton content="Continue" />
    </template>
  </BaseModal>

  <BaseModal
    v-model="isSettingsModalOpen"
    title="Settings"
    :ui-attrs="{
      container:
        {
          'aria-label': 'User settings',
        },
    }"
    :ui="{
      container: 'w-[680px]',
      body: 'flex p-0',
    }"
  >
    <SidebarToolbarSettings />
  </BaseModal>

  <div class="flex items-center justify-between">
    <BasePopover ref="profilePopoverReference">
      <BaseAvatar :ui="{ base: 'cursor-pointer' }" size="40" />

      <template #content>
        <BaseMenuContainer>
          <BaseMenuItem icon="carbon:settings" label="Settings" @click="openSettingsModal()" />
          <BaseMenuItem icon="carbon:logout" label="Sign out" />
        </BaseMenuContainer>
      </template>
    </BasePopover>

    <div class="flex items-center justify-end">
      <BasePopover ref="reference">
        <div class="p-2 rounded-full hover:bg-slate-100 grid place-items-center cursor-pointer">
          <Icon size="20px" name="carbon:add-large" class="flex shrink-0 duration-300" />
        </div>

        <template #content>
          <BaseMenuContainer>
            <BaseMenuItem
              v-if="layout !== 'new-friend'"
              icon="carbon:user-follow"
              label="New friend"
              @click="setLayout('new-friend')"
            />

            <BaseMenuItem icon="carbon:user-multiple" label="New group" @click="openModal()" />

            <BaseMenuItem
              v-if="layout !== 'new-message'"
              icon="carbon:chat"
              label="New message"
              @click="setLayout('new-message')"
            />
          </BaseMenuContainer>
        </template>
      </BasePopover>

      <BasePopover>
        <div class="p-2 rounded-full hover:bg-slate-100 grid place-items-center cursor-pointer">
          <Icon size="20px" name="carbon:overflow-menu-vertical" class="flex shrink-0 duration-300" />
        </div>

        <template #content>
          <BaseMenuContainer :items="[{ icon: 'carbon:star', label: 'Starred messages' }]" />
        </template>
      </BasePopover>
    </div>
  </div>
</template>
