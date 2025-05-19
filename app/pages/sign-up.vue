<script setup lang="ts">
useHead({ title: 'Sign Up' })
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
    :ui="{ body: 'grid grid-cols-2' }"
    title="Sign Up to Chat App"
    description="Create your free account to join the conversation—connect with friends and groups, and start chatting securely."
  >
    <AuthSignUp />
  </AuthContainer>
</template>
