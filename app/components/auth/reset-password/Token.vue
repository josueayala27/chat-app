<script lang="ts">
// For type definitions if needed
export interface ResetPasswordTokenForm {
  newPassword?: string;
  confirmPassword?: string;
}
</script>

<script setup lang="ts">
import { ref } from 'vue'
import { useRoute, useRouter } from '#app' // Or 'nuxt/app'
import { object, string, type ZodIssue } from 'zod'
// Assuming toTypedSchema is available for vee-validate, but we'll do manual Zod validation here
// import { toTypedSchema } from '@vee-validate/zod';

const messages = {
  required: (field: string) => `${field} is required`,
  minlength: (field: string, len: number) => `${field} must be at least ${len} characters`,
  match: () => 'Passwords do not match',
}

const route = useRoute()
const router = useRouter()

const newPassword = ref('')
const confirmPassword = ref('')
const isLoading = ref(false)
const apiMessage = ref('')
const fieldErrors = ref<Record<string, string | undefined>>({})

const passwordResetSchema = object({
  newPassword: string({ required_error: messages.required('New password') })
    .min(8, messages.minlength('Password', 8)),
  confirmPassword: string({ required_error: messages.required('Confirm password') }),
}).refine(data => data.newPassword === data.confirmPassword, {
  message: messages.match(),
  path: ['confirmPassword'], // Set error on confirmPassword field
})

async function validateTokenForm() {
  fieldErrors.value = {}
  try {
    passwordResetSchema.parse({
      newPassword: newPassword.value,
      confirmPassword: confirmPassword.value,
    })
    return true
  } catch (error: any) {
    if (error.errors) {
      error.errors.forEach((err: ZodIssue) => {
        if (err.path.length > 0) {
          fieldErrors.value[err.path[0] as string] = err.message
        }
      })
    }
    return false
  }
}

async function onSubmit() {
  apiMessage.value = ''
  const isValid = await validateTokenForm()

  if (isValid) {
    isLoading.value = true
    const token = route.params.token as string // Get token from route

    if (!token) {
      apiMessage.value = 'No reset token found in URL.'
      isLoading.value = false
      return
    }

    try {
      const response = await $fetch<{ message: string }>('/api/auth/reset-password', {
        method: 'POST',
        body: {
          token,
          newPassword: newPassword.value,
          confirmPassword: confirmPassword.value,
        },
      })
      apiMessage.value = response.message || 'Password successfully reset! You can now log in.'
      // Clear form
      newPassword.value = ''
      confirmPassword.value = ''
      // Navigate to sign-in after a short delay
      setTimeout(() => {
        router.push('/sign-in')
      }, 2000)
    } catch (error: any) {
      console.error('Error resetting password:', error)
      apiMessage.value = error.data?.message || 'An error occurred. Please try again.'
    } finally {
      isLoading.value = false
    }
  }
}
</script>

<template>
  <form class="space-y-6" @submit.prevent="onSubmit">
    <BaseFormField name="newPassword" label="New Password" :error-message="fieldErrors.newPassword">
      <BaseInput
        v-model="newPassword"
        icon="carbon:password"
        type="password"
        placeholder="Enter new password"
        :disabled="isLoading"
      />
    </BaseFormField>

    <BaseFormField name="confirmPassword" label="Confirm Password" :error-message="fieldErrors.confirmPassword">
      <BaseInput
        v-model="confirmPassword"
        icon="carbon:password"
        type="password"
        placeholder="Repeat new password"
        :disabled="isLoading"
      />
    </BaseFormField>

    <BaseButton
      type="submit"
      :content="isLoading ? 'Resetting...' : 'Reset Password'"
      :disabled="isLoading"
      class="w-full"
    />
    <p v-if="apiMessage" class="text-sm text-center mt-4" :class="{'text-red-500': apiMessage.includes('error') || apiMessage.includes('failed') || apiMessage.includes('Invalid')}">
      {{ apiMessage }}
    </p>
  </form>
</template>
