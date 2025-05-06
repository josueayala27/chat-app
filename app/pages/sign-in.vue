<script setup lang="ts">
useHead({ title: 'Sign In' })
definePageMeta({
  layout: 'auth',
  middleware: ['auth'],
  auth: {
    unauthenticatedOnly: true,
  },
})
</script>

<template>
  <AuthContainer
    title="Sign In to Chat App"
    description="Sign in to securely access your chats and stay connected with your friends and groups."
  >
    <AuthSignIn />
  </AuthContainer>
</template>
