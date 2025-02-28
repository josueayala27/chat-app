<template>
  <div class="flex gap-2 items-center text-sm">
    <span
      v-for="type in ['Media', 'Files', 'Links']"
      :key="type"
      class="px-3 py-1 rounded-full bg-sky-100 text-sky-600 font-medium cursor-pointer select-none"
    >
      {{ type }}
    </span>
  </div>

  <div class="grid grid-cols-3 gap-0.5">
    <div v-for="item in 9" :key="item" role="img" class="bg-slate-100 w-full aspect-square rounded-lg" />
  </div>
</template>
