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
  <div class="grid grid-cols-2 gap-3 p-6 w-full">
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

    <div class="col-span-2 flex justify-end">
      <BaseButton content="Save" />
    </div>
  </div>
</template>
