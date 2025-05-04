<script setup lang="ts">
definePageMeta({ layout: 'get-started' })
useHead({ title: 'Sign Up' })
</script>

<template>
  <AuthContainer
    :ui="{ body: 'grid grid-cols-2 gap-3' }"
    title="Sign Up to Chat App"
    description="Create your free account to join the conversation—connect with friends and groups, and start chatting securely."
  >
    <AuthSignUp />
  </AuthContainer>
</template>
