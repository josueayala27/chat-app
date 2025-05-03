<template>
  <div class="w-[370px] flex flex-col gap-5 p-6 rounded-lg shadow-xl shadow-slate-950/7">
    <div class="flex flex-col">
      <BaseFont class="font-semibold" content="Welcome to Chat App" />
      <BaseFont class="text-sm text-slate-700" content="Sign in to securely access your chats and stay connected with your friends and groups." />
    </div>

    <div class="flex flex-col gap-3">
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

      <BaseButton type="submit" content="Continue with email" />
    </div>

    <div class="border-b border-slate-200" />

    <BaseButton type="button" :ui="{ base: 'gap-2' }">
      <Icon size="20px" name="grommet-icons:google" />
      Sign In with Google
    </BaseButton>
  </div>
</template>
