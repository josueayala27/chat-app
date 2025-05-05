<script setup lang="ts">
definePageMeta({ layout: 'auth', middleware: ['guest'] })
useHead({ title: 'Sign Up' })
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
