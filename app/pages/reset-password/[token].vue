<script setup lang="ts">
definePageMeta({ layout: 'auth', middleware: ['guest'] })
useHead({ title: 'Reset Password' })
</script>

<template>
  <AuthContainer
    title="Set New Password"
    description="Create and confirm a new password to secure your account."
  >
    <AuthResetPasswordToken />
  </AuthContainer>
</template>
