<script lang="ts">
import { object, string } from 'zod'

export interface SignInForm {
  email: string
  password: string
}
</script>

<script setup lang="ts">
const { signIn, getSignInLoading, getSignInError } = useAuth() // Assumes getUser is not used here directly
const router = useRouter()

const messages = {
  required: (field: string) => `${field} field is required`,
  email: () => 'Enter a valid email address',
}

const { validate } = useForm<SignInForm>({ // Removed 'values' as it's not used in this version's onSubmit
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
      console.log('Do something... Error during sign in:', getSignInError.value)
      return
    }

    // If no error, navigate. `useAuth().getUser()` is not called here.
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
