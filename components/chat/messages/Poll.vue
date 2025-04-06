<template>
  <div class="bg-sky-500 text-white rounded-lg flex-col inline-flex w-[20rem]">
    <div class="p-2 flex flex-col gap-4">
      <BaseFont class="text-sm text-inherit font-semibold" content="THIS IS MY POLL" />

      <div v-for="item in 3" :key="item" class="flex flex-col gap-2 cursor-pointer">
        <div class="flex items-center gap-2">
          <div class="size-3 bg-sky-400 rounded-full" />
          <BaseFont class="text-sm text-inherit" :content="`Poll Option ${item + 1}`" />
        </div>

        <div class="h-2 rounded-full bg-sky-400" />
      </div>
    </div>

    <button class="w-full cursor-pointer hover:text-white/80 p-2">
      <BaseFont class="text-sm text-inherit" content="View votes" />
    </button>
  </div>
</template>
