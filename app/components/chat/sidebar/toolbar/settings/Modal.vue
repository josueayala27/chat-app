<script lang="ts">
import type { Component } from 'vue'
import { SidebarToolbarSettingsContentAccount } from '#components'

export interface Option { label: string, icon: string, key: string, component: Component }
</script>

<script setup lang="ts">
const isGroupModalOpen = defineModel<boolean>({ default: false })

const options: Option[] = [
  { label: 'Account', icon: 'carbon:user-avatar', key: 'account', component: SidebarToolbarSettingsContentAccount },
  { label: 'Privacy', icon: 'carbon:security', key: 'privacy', component: SidebarToolbarSettingsContentAccount },
  { label: 'Notifications', icon: 'carbon:notification-new', key: 'notifications', component: SidebarToolbarSettingsContentAccount },
  { label: 'Data and storage', icon: 'carbon:object-storage-alt', key: 'data-and-storage', component: SidebarToolbarSettingsContentAccount },
]
const selectedOption = ref<Option | undefined>(options[0])
</script>

<template>
  <BaseModal
    v-model="isGroupModalOpen"
    title="Settings"
    :ui="{
      container: 'w-[680px]',
      body: 'flex p-0',
      footer: 'flex justify-end items-center gap-2',
    }"
  >
    <SidebarToolbarSettingsMenu>
      <SidebarToolbarSettingsMenuItem
        v-for="option in options"
        :key="option.key"
        :option="option"
        :active="selectedOption?.key === option.key"
        @click="selectedOption = option"
      />
    </SidebarToolbarSettingsMenu>

    <component :is="selectedOption?.component" />

    <template #footer>
      <BaseButton :ui="{ base: 'bg-slate-100 hover:bg-slate-200 text-slate-700' }" content="Cancel" />
      <BaseButton content="Continue" />
    </template>
  </BaseModal>
</template>
