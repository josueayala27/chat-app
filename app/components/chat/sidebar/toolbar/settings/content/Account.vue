<script lang="ts">
interface User { first_name: string, last_name: string, user: string, email: string }
</script>

<script lang="ts" setup>
useForm<User>({
  initialValues: {
    first_name: 'Josué',
    last_name: 'Ayala',
    email: 'dikoliw830@bamsrad.com',
    user: 'josueayala',
  },
})
</script>

<template>
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
</template>
