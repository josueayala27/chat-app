<script setup lang="ts">
definePageMeta({ layout: 'auth' })
useHead({ title: 'Reset Password' })
</script>

<template>
  <AuthContainer
    title="Reset Password"
    description="Complete the below form to reset your password."
  >
    <AuthResetPassword />
  </AuthContainer>
</template>
