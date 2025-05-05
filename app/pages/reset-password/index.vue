<script setup lang="ts">
definePageMeta({ layout: 'auth', middleware: ['guest'] })
useHead({ title: 'Reset Password' })
</script>

<template>
  <AuthContainer
    title="Request Password Reset"
    description="Provide your email address to get a password reset link."
  >
    <AuthResetPassword />
  </AuthContainer>
</template>
