<script lang="ts">
import type { Component } from 'vue'
import {
  SidebarToolbarSettingsContentAccount,
  SidebarToolbarSettingsContentDataAndStorage,
  SidebarToolbarSettingsContentNotifications,
  SidebarToolbarSettingsContentPrivacy,
} from '#components'

export interface Option { label: string, icon: string, key: string, component: Component }
</script>

<script setup lang="ts">
const options: Option[] = [
  { label: 'Account', icon: 'carbon:user-avatar', key: 'account', component: SidebarToolbarSettingsContentAccount },
  { label: 'Privacy', icon: 'carbon:security', key: 'privacy', component: SidebarToolbarSettingsContentPrivacy },
  { label: 'Notifications', icon: 'carbon:notification-new', key: 'notifications', component: SidebarToolbarSettingsContentNotifications },
  { label: 'Data and storage', icon: 'carbon:object-storage-alt', key: 'data-and-storage', component: SidebarToolbarSettingsContentDataAndStorage },
]
const selectedOption = shallowRef<Option | undefined>(options[0])
</script>

<template>
  <SidebarToolbarSettingsMenu>
    <SidebarToolbarSettingsMenuItem
      v-for="option in options"
      :key="option.key"
      :option="option"
      :active="selectedOption?.key === option.key"
      @click="selectedOption = option"
    />
  </SidebarToolbarSettingsMenu>

  <div class="h-[463px] w-full p-3">
    <component :is="selectedOption?.component" />
  </div>
</template>
