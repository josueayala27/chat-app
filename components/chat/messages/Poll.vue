<template>
  <div class="p-2 bg-sky-500 text-white rounded-r-lg last:rounded-bl-lg inline-flex flex-col gap-4 w-[20rem]">
    <BaseFont class="text-sm text-inherit font-semibold" content="THIS IS MY POLL" />

    <div v-for="item in 3" :key="item" class="flex flex-col gap-2 cursor-pointer">
      <div class="flex items-center gap-2">
        <div class="size-3 bg-sky-400 rounded-full" />
        <BaseFont class="text-sm text-inherit" :content="`Poll Option ${item + 1}`" />
      </div>

      <div class="h-2 rounded-full bg-sky-400" />
    </div>
  </div>
</template>
