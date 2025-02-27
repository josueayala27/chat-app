<template>
  <div class="h-screen overflow-hidden flex">
    <aside class="w-95 border-r border-gray-200 flex flex-col gap-3 p-2">
      <div :style="{ '--input-width': '44px' }" class="relative flex items-center">
        <div class="absolute top-0 left-0 h-full aspect-square grid place-items-center pointer-events-none">
          <Icon name="carbon:search" />
        </div>
        <input type="text" placeholder="Search..." class="w-full pl-(--input-width) py-3 pr-3 bg-gray-100 border-gray-200 rounded-lg outline-none text-sm">
      </div>

      <div class="flex flex-col gap-1">
        <div v-for="item in 5" :key="item" class="flex rounded-lg p-2 gap-2 items-center cursor-pointer hover:bg-gray-100 group">
          <div class="size-12 bg-gray-100 rounded-full group-hover:bg-gray-200" />
          <div class="flex flex-col text-sm">
            <p class="text-slate-900 font-bold">
              Josué Ayala
            </p>
            <p class="line-clamp-1 text-slate-600">
              Just finished work, finally some free time!
            </p>
          </div>
        </div>
      </div>
    </aside>
    <slot />
  </div>
</template>
