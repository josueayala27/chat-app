<script setup lang="ts">
definePageMeta({ layout: 'get-started' })
</script>

<template>
  <AuthContainer
    :ui="{ body: 'grid grid-cols-2 gap-3' }"
    title="Sign In to Chat App"
    description="Sign in to securely access your chats and stay connected with your friends and groups."
  >
    <AuthSignUp />
  </AuthContainer>
</template>
