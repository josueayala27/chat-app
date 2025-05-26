<script lang="ts">
import { object, string } from 'zod'

export interface SignInForm {
  email: string
  password: string
}
</script>

<script setup lang="ts">
const { getUser, getUserLoading } = useAuth()
const router = useRouter()

const messages = {
  required: (field: string) => `${field} field is required`,
  email: () => 'Enter a valid email address',
}

const { values, validate } = useForm<SignInForm>({
  name: 'sign-in',
  validationSchema: toTypedSchema(object({
    email: string({ required_error: messages.required('Email') }).email({ message: messages.email() }),
    password: string({ required_error: messages.required('Password') }).nonempty({ message: messages.required('Password') }),
  })),
})

const loading = ref(false)
const errorMessage = ref<string | null>(null)

async function onSubmit() {
  errorMessage.value = null
  loading.value = true
  const { valid } = await validate()

  if (valid) {
    try {
      await $fetch('/api/auth/login', {
        method: 'POST',
        body: {
          email: values.email,
          password: values.password,
        },
      })
      await getUser() // This will set user state and potentially getUserLoading
      // Check if user is loaded (getUser was successful and didn't result in an error state for useAuth)
      // and also ensure that getUserLoading is false before navigating.
      if (useAuth().user.value && !getUserLoading.value) {
        router.push({ name: 'index' })
      } else if (!useAuth().user.value && !getUserLoading.value && !errorMessage.value) {
        // If getUser completed but user is still null and no specific error from login API,
        // it implies getUser itself might have failed silently or user data is invalid.
        errorMessage.value = 'Failed to retrieve user details after login.'
      }
    }
    catch (error: any) {
      errorMessage.value = error.data?.message || 'An unexpected error occurred during login.'
    }
    finally {
      loading.value = false
    }
  } else {
    loading.value = false // Also set loading to false if form validation fails
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

  <div v-if="errorMessage" class="p-2 mb-2 text-sm text-red-700 bg-red-100 rounded-lg" role="alert">
    <span class="font-medium">Error:</span> {{ errorMessage }}
  </div>

  <BaseButton :loading="loading || getUserLoading" type="submit" content="Sign In" @click="onSubmit()" />
</template>
