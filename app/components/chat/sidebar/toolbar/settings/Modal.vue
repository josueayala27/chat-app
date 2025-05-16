<script lang="ts">
interface Option { label: string, icon: string, key: string }
</script>

<script setup lang="ts">
const isGroupModalOpen = defineModel<boolean>({ default: false })

const options: Option[] = [
  { label: 'Account', icon: 'carbon:user-avatar', key: 'account' },
  { label: 'Privacy', icon: 'carbon:security', key: 'privacy' },
  { label: 'Notifications', icon: 'carbon:notification-new', key: 'notifications' },
  { label: 'Data and storage', icon: 'carbon:object-storage-alt', key: 'data-and-storage' },
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
    <div class="w-[200px] p-2 border-r border-slate-200 flex flex-col gap-1">
      <div
        v-for="option in options"
        :key="option.key"
        :class="[
          { 'bg-slate-100': selectedOption?.key === option.key },
        ]"
        class="p-2 hover:bg-slate-100 rounded-lg cursor-pointer flex items-center gap-2 text-slate-900"
        @click="selectedOption = option"
      >
        <Icon :name="option.icon" />
        <BaseFont class="text-sm" :content="option.label" />
      </div>
    </div>

    <div class="grid grid-cols-2 gap-3 p-6">
      <BaseFormField name="first_name" label="First name">
        <BaseInput placeholder="Enter email" />
      </BaseFormField>

      <BaseFormField name="last_name" label="Last name">
        <BaseInput placeholder="Enter email" />
      </BaseFormField>

      <BaseFormField :ui="{ base: 'col-span-2' }" name="user" label="User">
        <BaseInput placeholder="Enter username" />
      </BaseFormField>

      <BaseFormField :ui="{ base: 'col-span-2' }" name="email" label="Email">
        <BaseInput placeholder="Enter email" />
      </BaseFormField>

      <div class="border border-red-200 bg-red-50 rounded-lg p-4 flex gap-4 justify-between items-center col-span-2 mt-3">
        <div class="flex flex-col text-sm">
          <BaseFont class="font-semibold" content="Delete account" />
          <BaseFont content="Once you delete your account, there is no going back." />
        </div>

        <BaseButton :ui="{ base: 'bg-red-500 hover:bg-red-600' }" content="Delete" />
      </div>
    </div>

    <template #footer>
      <BaseButton :ui="{ base: 'bg-slate-100 hover:bg-slate-200 text-slate-700' }" content="Cancel" />
      <BaseButton content="Continue" />
    </template>
  </BaseModal>
</template>
