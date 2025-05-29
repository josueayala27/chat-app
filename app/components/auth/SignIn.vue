<script lang="ts">
import { userLoginSchema } from '~/validators/user.validator'
</script>

<script setup lang="ts">
const { signIn, getSignInLoading, getSignInError } = useAuth()
const router = useRouter()

const { validate } = useForm<SignInInput>({
  name: 'sign-in',
  validationSchema: toTypedSchema(userLoginSchema),
})

/**
 * Handles the sign-in process after form validation.
 * - Validates user input using the sign-in schema.
 * - Calls the signIn method if valid.
 * - Redirects to home on success, logs error otherwise.
 */
async function onSubmit() {
  const { valid, values } = await validate()

  if (valid) {
    await signIn(values as Required<SignInInput>)

    if (getSignInError.value) {
      console.log('Do something... Error during sign in:', getSignInError.value)
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
      <NuxtLink tabindex="-1" to="/reset-password" class="text-sm text-sky-500 font-medium">
        Forgot password?
      </NuxtLink>
    </template>
  </BaseFormField>

  <BaseButton :loading="getSignInLoading" type="submit" content="Sign In" @click="onSubmit()" />
</template>
