<script lang="ts">
import { object, string } from 'zod'

export interface SignInForm {
  email: string
  password: string
}
</script>

<script setup lang="ts">
const messages = {
  required: (field: string) => `${field} field is required`,
  email: () => 'Enter a valid email address',
}

const { validate } = useForm<SignInForm>({
  name: 'reset-password-token',
  validationSchema: toTypedSchema(object({
    email: string({ required_error: messages.required('Email') }).email({ message: messages.email() }),
    password: string({ required_error: messages.required('Password') }).nonempty({ message: messages.required('Password') }),
  })),
})

async function onSubmit() {
  const { valid } = await validate()

  if (valid) {
    console.log('Do something...')
  }
}
</script>

<template>
  <BaseFormField name="new_password" label="New Password">
    <BaseInput
      icon="carbon:password"
      type="password"
      placeholder="Enter new password"
    />
  </BaseFormField>

  <BaseFormField name="confirm_password" label="Confirm Password">
    <BaseInput
      icon="carbon:password"
      type="password"
      placeholder="Repeat new password"
    />
  </BaseFormField>

  <BaseButton type="submit" content="Reset Password" @click="onSubmit()" />
</template>
