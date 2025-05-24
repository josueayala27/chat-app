<script lang="ts">
// This script block seems to be for type definitions or older options API style.
// Zod schema definition will be in script setup.
export interface ResetPasswordForm { // Renamed for clarity
  email: string
}
</script>

<script setup lang="ts">
import { ref } from 'vue'
import { object, string, type ZodIssue } from 'zod' // Assuming Zod is globally available or imported elsewhere
import { toTypedSchema } from '@vee-validate/zod' // Assuming this is correctly set up
// If useForm is from a library like vee-validate, its import might be needed
// import { useForm } from 'vee-validate';

const messages = {
  required: (field: string) => `${field} is required`,
  email: () => 'Enter a valid email address',
}

const email = ref('')
const isLoading = ref(false)
const apiMessage = ref('')
const fieldErrors = ref<Record<string, string | undefined>>({})

// Corrected Zod schema for requesting password reset (only email)
const resetPasswordSchema = toTypedSchema(object({
  email: string({ required_error: messages.required('Email') }).email({ message: messages.email() }),
}))

// If useForm is available and used for validation, its usage might look like this:
// For this modification, direct Zod validation will be shown for clarity in onSubmit.
// const { handleSubmit, errors } = useForm({
//   validationSchema: resetPasswordSchema,
// });

async function validateForm() {
  fieldErrors.value = {}
  try {
    resetPasswordSchema.parse({ email: email.value });
    return true;
  } catch (error: any) {
    if (error.errors) {
      error.errors.forEach((err: ZodIssue) => {
        if (err.path.length > 0) {
          fieldErrors.value[err.path[0] as string] = err.message;
        }
      });
    }
    return false;
  }
}

async function onSubmit() {
  apiMessage.value = ''
  const isValid = await validateForm() // Manual validation

  if (isValid) {
    isLoading.value = true
    try {
      const response = await $fetch<{ message: string }>('/api/auth/request-password-reset', {
        method: 'POST',
        body: { email: email.value },
      })
      apiMessage.value = response.message || "If an account with that email exists, a password reset link has been sent."
      email.value = '' // Clear email field on success
    } catch (error: any) {
      console.error('Error requesting password reset:', error)
      apiMessage.value = error.data?.message || 'An error occurred. Please try again.'
    } finally {
      isLoading.value = false
    }
  }
}
</script>

<template>
  <form class="space-y-6" @submit.prevent="onSubmit">
    <BaseFormField name="email" label="Email" :error-message="fieldErrors.email">
      <BaseInput
        v-model="email"
        icon="carbon:user-avatar"
        placeholder="Enter email"
        type="email"
        :disabled="isLoading"
      />
    </BaseFormField>

    <BaseButton
      type="submit"
      :content="isLoading ? 'Sending...' : 'Request Reset Link'"
      :disabled="isLoading"
      class="w-full"
    />

    <p v-if="apiMessage" class="text-sm text-center mt-4" :class="{'text-red-500': apiMessage.includes('error') || apiMessage.includes('failed')}">
      {{ apiMessage }}
    </p>
  </form>
</template>
