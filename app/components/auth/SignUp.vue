<script lang="ts">
import { object, string } from 'zod'

export interface SignInForm {
  email: string
  password: string
}
</script>

<script setup lang="ts">
const router = useRouter()

const messages = {
  required: (field: string) => `${field} field is required`,
  email: () => 'Enter a valid email address',
}

const { validate, values } = useForm<SignInForm>({
  name: 'sign-up',
  validationSchema: toTypedSchema(object({
    first_name: string({ required_error: messages.required('First name') }),
    last_name: string({ required_error: messages.required('Last name') }),
    username: string({ required_error: messages.required('User') }),
    email: string({ required_error: messages.required('Email') }).email({ message: messages.email() }),
    password: string({ required_error: messages.required('Password') }).nonempty({ message: messages.required('Password') }),
  })),
})

async function onSubmit() {
  const { valid } = await validate()

  if (valid) {
    await $fetch('/api/auth/sign-up', { method: 'POST', body: values })
    router.push('/')
  }
}
</script>

<template>
  <BaseFormField name="first_name" label="First name">
    <BaseInput placeholder="Enter email" />
  </BaseFormField>

  <BaseFormField name="last_name" label="Last name">
    <BaseInput placeholder="Enter email" />
  </BaseFormField>

  <BaseFormField :ui="{ base: 'col-span-2' }" name="username" label="User">
    <BaseInput placeholder="Enter email" />
  </BaseFormField>

  <BaseFormField :ui="{ base: 'col-span-2' }" name="email" label="Email">
    <BaseInput icon="carbon:user-avatar" placeholder="Enter email" />
  </BaseFormField>

  <BaseFormField :ui="{ base: 'col-span-2' }" name="password" label="Password">
    <BaseInput
      icon="carbon:password"
      type="password"
      placeholder="Enter password"
    />
  </BaseFormField>

  <BaseButton :ui="{ base: 'col-span-2' }" type="submit" content="Sign Up" @click="onSubmit()" />
</template>
