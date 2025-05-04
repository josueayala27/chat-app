<script setup lang="ts">
definePageMeta({ layout: 'auth' })
useHead({ title: 'Set New Password – Chat App' })
</script>

<template>
  <AuthContainer
    title="Set New Password"
    description="Create and confirm a new password to secure your account."
  >
    <AuthResetPasswordToken />
  </AuthContainer>
</template>
