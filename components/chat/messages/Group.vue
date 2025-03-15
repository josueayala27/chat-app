<template>
  <div class="flex gap-2">
    <BaseAvatar />
    <div class="flex flex-col gap-1">
      <BaseFont class="text-sm text-slate-900 font-medium" content="Josué Ayala" />
      <div class="flex flex-col gap-0.5">
        <div v-for="_item in 1" :key="_item" class="p-2 bg-sky-500 text-white rounded-r-lg last:rounded-bl-lg">
          <BaseFont class="text-sm text-inherit" content="Hello there!" />
        </div>
      </div>
    </div>
  </div>
</template>
