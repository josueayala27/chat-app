<script setup lang="ts">
definePageMeta({ layout: 'get-started' })
</script>

<template>
  <div class="h-screen grid place-items-center">
    <div class="w-[340px] flex flex-col gap-3">
      <BaseInput
        icon="carbon:user-avatar"
        :ui="{ base: 'border border-slate-950/10 focus:border-sky-500' }"
        placeholder="Email"
      />

      <BaseInput
        icon="carbon:password"
        :ui="{ base: 'border border-slate-950/10 focus:border-sky-500' }"
        type="password"
        placeholder="Password"
      />

      <BaseButton content="Sign In" />

      <div class="border-b border-slate-200" />

      <BaseButton :ui="{ base: 'gap-2' }">
        <Icon size="20px" name="grommet-icons:google" />
        <BaseFont content="Sign In with Google" />
      </BaseButton>
    </div>
  </div>
</template>
