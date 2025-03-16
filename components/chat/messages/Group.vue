<template>
  <div class="flex gap-2">
    <BaseAvatar />
    <div class="flex flex-col gap-1">
      <BaseFont class="text-sm text-slate-900 font-medium" content="Josué Ayala" />
      <div class="flex flex-col gap-0.5">
        <template v-for="_item in ['text', 'text', 'media', 'text']" :key="_item">
          <ChatMessagesText v-if="_item.includes('text')" />
        </template>
      </div>
    </div>
  </div>
</template>
