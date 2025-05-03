<template>
  <div class="w-[390px] flex flex-col gap-5 p-6 rounded-lg shadow-xl shadow-slate-950/7">
    <div class="flex flex-col">
      <BaseFont class="font-semibold" content="Sign In to Chat App" />
      <BaseFont class="text-sm text-slate-700" content="Sign in to securely access your chats and stay connected with your friends and groups." />
    </div>

    <div class="flex flex-col gap-3">
      <BaseFormField label="Email">
        <BaseInput
          :ui="{ base: 'border border-slate-950/10 focus:border-sky-500' }"
          icon="carbon:user-avatar"
          placeholder="Enter email"
        />
      </BaseFormField>

      <BaseFormField label="Password">
        <BaseInput
          :ui="{ base: 'border border-slate-950/10 focus:border-sky-500' }"
          icon="carbon:password"
          type="password"
          placeholder="Enter password"
        />

        <template #hint>
          <NuxtLink to="/forgot-password" class="text-sm text-sky-500 font-medium">
            Forgot password?
          </NuxtLink>
        </template>
      </BaseFormField>

      <BaseButton type="submit" content="Sign In" />
    </div>

    <div class="border-b border-slate-200" />

    <BaseButton type="button" :ui="{ base: 'gap-2' }">
      <Icon size="20px" name="grommet-icons:google" />
      Continue with Google
    </BaseButton>
  </div>
</template>
