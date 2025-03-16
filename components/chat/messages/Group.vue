<template>
  <div class="flex gap-2">
    <BaseAvatar />
    <div class="flex flex-col gap-1">
      <BaseFont class="text-sm text-slate-900 font-medium" content="Josué Ayala" />
      <div class="flex flex-col gap-0.5">
        <template v-for="_item in 4" :key="_item">
          <ChatMessagesText />
        </template>
      </div>
    </div>
  </div>
</template>
