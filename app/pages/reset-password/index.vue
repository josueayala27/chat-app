<script setup lang="ts">
definePageMeta({ layout: 'auth' })
useHead({ title: 'Request Password Reset – Chat App' })
</script>

<template>
  <AuthContainer
    title="Request Password Reset"
    description="Provide your email address to get a password reset link."
  >
    <AuthResetPassword />
  </AuthContainer>
</template>
