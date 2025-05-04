<script setup lang="ts">
definePageMeta({ layout: 'get-started' })
</script>

<template>
  <AuthContainer
    title="Sign In to Chat App"
    description="Sign in to securely access your chats and stay connected with your friends and groups."
  >
    <AuthSignIn />

    <template #footer>
      <div class="border-b border-slate-200" />

      <BaseButton type="button" :ui="{ base: 'gap-2' }">
        <Icon size="20px" name="grommet-icons:google" />
        Continue with Google
      </BaseButton>
    </template>
  </AuthContainer>
</template>
