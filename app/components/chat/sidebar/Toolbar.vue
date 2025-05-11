<script lang="ts" setup>
const { reference, closePopover } = usePopover()

/**
 * Provides current layout state and a method to update it.
 */
const { updateLayout, layout } = useSidebar()

/**
 * Controls visibility of the "Create group" modal
 */
const isGroupModalOpen = ref<boolean>(false)

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
</script>

<template>
  <SidebarToolbarNewGroupModal v-model="isGroupModalOpen" />

  <div class="flex items-center justify-between">
    <BasePopover>
      <BaseAvatar :ui="{ base: 'cursor-pointer' }" size="40" />

      <template #content>
        <BaseMenuContainer>
          <BaseMenuItem icon="carbon:settings" label="Settings" />
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

            <BaseMenuItem icon="carbon:user-multiple" label="New group" @click="openModal" />

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
