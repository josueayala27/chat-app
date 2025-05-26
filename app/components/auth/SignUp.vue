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

// Define a more specific type for the sign-up form if it differs from SignInForm
// For now, assuming SignInForm might be a placeholder or UserSignUpData is more appropriate
// Let's assume the form fields match the validation schema.
interface SignUpFormFields {
  first_name: string;
  last_name: string;
  username: string;
  email: string;
  password: string;
}

const { validate, values: body } = useForm<SignUpFormFields>({
  name: 'sign-up',
  validationSchema: toTypedSchema(object({
    first_name: string({ required_error: messages.required('First name') }).nonempty({ message: messages.required('First name') }),
    last_name: string({ required_error: messages.required('Last name') }).nonempty({ message: messages.required('Last name') }),
    username: string({ required_error: messages.required('User') }).nonempty({ message: messages.required('User') }),
    email: string({ required_error: messages.required('Email') }).email({ message: messages.email() }),
    password: string({ required_error: messages.required('Password') }).nonempty({ message: messages.required('Password') }),
  })),
})

const isLoading = ref(false);
const errorMessage = ref<string | null>(null);

async function onSubmit() {
  errorMessage.value = null;
  const { valid } = await validate();

  if (valid) {
    isLoading.value = true;
    try {
      const response = await $fetch<{ success: boolean, message: string }>('/api/auth/sign-up', {
        method: 'POST',
        body: body.value, // .value is needed here as body is the 'values' ref from useForm
      });
      if (response && response.success) {
        router.push('/');
      } else {
        errorMessage.value = response.message || 'Sign-up failed.';
      }
    } catch (error: any) {
      errorMessage.value = error.data?.message || error.message || 'An unexpected error occurred during sign-up.';
      console.error("Sign-up error:", error);
    } finally {
      isLoading.value = false;
    }
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

  <div v-if="errorMessage" class="col-span-2 p-2 mb-2 text-sm text-red-700 bg-red-100 rounded-lg" role="alert">
    <span class="font-medium">Error:</span> {{ errorMessage }}
  </div>

  <BaseButton :loading="isLoading" :ui="{ base: 'col-span-2' }" type="submit" content="Sign Up" @click="onSubmit()" />
</template>
