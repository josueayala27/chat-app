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
  name: 'sign-in',
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
  <div class="w-[390px] flex flex-col gap-5 p-6 rounded-lg shadow-xl shadow-slate-950/7">
    <div class="flex flex-col">
      <BaseFont class="font-semibold" content="Sign In to Chat App" />
      <BaseFont class="text-sm text-slate-700" content="Sign in to securely access your chats and stay connected with your friends and groups." />
    </div>

    <div class="flex flex-col gap-3">
      <BaseFormField name="email" label="Email">
        <BaseInput
          :ui="{ base: 'border border-slate-950/10 focus:border-sky-500' }"
          icon="carbon:user-avatar"
          placeholder="Enter email"
        />
      </BaseFormField>

      <BaseFormField name="password" label="Password">
        <BaseInput
          :ui="{ base: 'border border-slate-950/10 focus:border-sky-500' }"
          icon="carbon:password"
          type="password"
          placeholder="Enter password"
        />

        <template #hint>
          <NuxtLink to="/forgot-password" class="text-sm text-sky-500 font-medium">
            Forgot password?
          </NuxtLink>
        </template>
      </BaseFormField>

      <BaseButton type="submit" content="Sign In" @click="onSubmit()" />
    </div>

    <div class="border-b border-slate-200" />

    <BaseButton type="button" :ui="{ base: 'gap-2' }">
      <Icon size="20px" name="grommet-icons:google" />
      Continue with Google
    </BaseButton>
  </div>
</template>
