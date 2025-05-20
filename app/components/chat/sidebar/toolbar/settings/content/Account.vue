<script lang="ts">
interface User { first_name: string, last_name: string, user: string, email: string }
</script>
  
<script lang="ts" setup>
const { user } = useAuth()

console.log(user.value)

useForm<User>({
  initialValues: {
    first_name: user.value.first_name,
    last_name: user.value.last_name,
    email: user.value.email,
    user: user.value.username,
  },
})
</script>

<template>
  <div class="grid grid-cols-2 gap-3">
    <BaseFormField name="first_name" label="First name">
      <BaseInput autocomplete="off" placeholder="Enter email" />
    </BaseFormField>

    <BaseFormField name="last_name" label="Last name">
      <BaseInput autocomplete="off" placeholder="Enter email" />
    </BaseFormField>

    <BaseFormField :ui="{ base: 'col-span-2' }" name="user" label="User">
      <BaseInput autocomplete="off" placeholder="Enter username" />
    </BaseFormField>

    <BaseFormField :ui="{ base: 'col-span-2' }" name="email" label="Email">
      <BaseInput autocomplete="off" placeholder="Enter email" />
    </BaseFormField>

    <div class="col-span-2 flex justify-end">
      <BaseButton content="Save" />
    </div>
  </div>
</template>
