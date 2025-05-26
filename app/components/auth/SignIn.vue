<script lang="ts">
import { object, string } from 'zod'

export interface SignInForm {
  email: string
  password: string
}
</script>

<script setup lang="ts">
const { signIn, getSignInLoading, getSignInError } = useAuth()
const router = useRouter()

const messages = {
  required: (field: string) => `${field} field is required`,
  email: () => 'Enter a valid email address',
}

const { validate } = useForm<SignInForm>({
  name: 'sign-in',
  validationSchema: toTypedSchema(object({
    email: string({ required_error: messages.required('Email') }).email({ message: messages.email() }),
    password: string({ required_error: messages.required('Password') }).nonempty({ message: messages.required('Password') }),
  })),
})

async function onSubmit() {
  const { valid, values } = await validate()

  if (valid) {
    await signIn(values)

    if (getSignInError.value) {
      // TODO: show a toast message
      console.log('Do something...')
      return
    }

    router.push('/')
  }
}
</script>

<template>
  <BaseFormField name="email" label="Email">
    <BaseInput
      icon="carbon:user-avatar"
      placeholder="Enter email"
    />
  </BaseFormField>

  <BaseFormField name="password" label="Password">
    <BaseInput
      icon="carbon:password"
      type="password"
      placeholder="Enter password"
    />

    <template #hint>
      <NuxtLink to="/reset-password" class="text-sm text-sky-500 font-medium">
        Forgot password?
      </NuxtLink>
    </template>
  </BaseFormField>

  <BaseButton :loading="getSignInLoading" type="submit" content="Sign In" @click="onSubmit()" />
</template>
