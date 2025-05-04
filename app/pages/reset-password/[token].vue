<script setup lang="ts">
definePageMeta({ layout: 'auth' })
useHead({ title: 'Sign In' })
</script>

<template>
  <AuthContainer
    title="Sign In to Chat App"
    description="Sign in to securely access your chats and stay connected with your friends and groups."
  >
    <AuthResetPasswordToken />
  </AuthContainer>
</template>
