<script setup lang="ts">
const isGroupModalOpen = defineModel<boolean>({ default: false })
</script>

<template>
  <BaseModal
    v-model="isGroupModalOpen"
    title="Settings"
    :ui="{
      container: 'w-[680px]',
      body: 'flex',
      footer: 'flex justify-end items-center gap-2',
    }"
  >
    <div class="w-[200px]">
      Sidebar...
    </div>

    <div class="grid grid-cols-2 gap-3">
      <BaseFormField name="first_name" label="First name">
        <BaseInput placeholder="Enter email" />
      </BaseFormField>

      <BaseFormField name="last_name" label="Last name">
        <BaseInput placeholder="Enter email" />
      </BaseFormField>

      <BaseFormField :ui="{ base: 'col-span-2' }" name="user" label="User">
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
