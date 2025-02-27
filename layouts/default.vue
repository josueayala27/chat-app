<template>
  <div class="h-screen overflow-hidden flex">
    <aside class="w-95 border-r border-slate-200 flex flex-col gap-3 p-2 overflow-auto">
      <div :style="{ '--input-width': '44px' }" class="flex items-center top-0 sticky">
        <div class="absolute top-0 left-0 h-full aspect-square grid place-items-center pointer-events-none">
          <Icon name="carbon:search" />
        </div>
        <input type="text" placeholder="Search..." class="w-full pl-(--input-width) py-3 pr-3 bg-slate-100 border-slate-200 rounded-lg outline-none text-sm">
      </div>

      <ChatList />
    </aside>

    <div class="flex-1">
      <slot />
    </div>

    <aside class="w-95 border-l border-slate-200 flex flex-col overflow-auto">
      <div class="justify-center py-4 flex flex-col items-center gap-2">
        <div class="size-35 shrink-0 bg-slate-100 rounded-full" />
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
  </div>
</template>
