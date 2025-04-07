<template>
  <div v-for="item in 2" :key="item" class="p-2 flex items-start gap-2 cursor-pointer hover:bg-slate-50 group duration-200">
    <div class="group-hover:bg-slate-300/50 bg-slate-100 size-10 shrink-0 rounded-lg duration-200" />
    <div class="flex flex-col">
      <BaseFont class="text-sm font-semibold" content="Online UUID Generator" />
      <BaseFont class="text-sm text-slate-700 line-clamp-2" content="Quickly and easily generate individual or bulk sets of universally unique identifiers (UUIDs)." />
      <BaseFont class="text-sm text-blue-500 font-medium group-hover:underline" content="https://www.uuidgenerator.net" />
    </div>
  </div>
</template>
