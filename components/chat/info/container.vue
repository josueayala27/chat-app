<template>
  <aside class="w-95 flex flex-col overflow-auto">
    <div class="justify-center py-4 flex flex-col items-center gap-2">
      <BaseAvatar size="140" />
      <div class="flex flex-col items-center">
        <p class="font-semibold">
          Ricky Smith
        </p>
        <p class="font-medium text-emerald-500 text-xs">
          Online
        </p>
      </div>
    </div>

    <div class="flex flex-col">
      <div class="flex justify-between items-center border-t border-slate-200 p-2 cursor-pointer">
        <p class="font-medium text-slate-900 text-sm ">
          Customize Chat
        </p>
        <Icon name="carbon:chevron-down" />
      </div>
    </div>

    <div class="flex flex-col">
      <div class="flex justify-between items-center border-t border-slate-200 p-2 cursor-pointer">
        <p class="font-medium text-slate-900 text-sm ">
          Media, Files And Links
        </p>
        <Icon name="carbon:chevron-down" />
      </div>

      <div class="flex gap-2 items-center px-2 text-sm">
        <span
          v-for="type in ['Media', 'Files', 'Links']"
          :key="type"
          class="px-3 py-1 rounded-full bg-sky-100 text-sky-600 font-medium cursor-pointer"
        >
          {{ type }}
        </span>
      </div>

      <div class="px-2 mt-2 grid grid-cols-3 gap-0.5">
        <div v-for="item in 9" :key="item" role="img" class="bg-slate-100 w-full aspect-square rounded-lg" />
      </div>
    </div>

    <div class="p-4" />
  </aside>
</template>
