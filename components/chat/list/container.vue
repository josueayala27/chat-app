<template>
  <aside class="w-95 flex flex-col gap-3 p-2 overflow-auto">
    <div :style="{ '--input-width': '44px' }" class="flex items-center top-0 sticky">
      <div class="absolute top-0 left-0 h-full aspect-square grid place-items-center pointer-events-none">
        <Icon name="carbon:search" />
      </div>
      <input type="text" placeholder="Search..." class="w-full pl-(--input-width) py-3 pr-3 bg-slate-100 border-slate-200 rounded-lg outline-none text-sm">
    </div>

    <ChatList />
  </aside>
</template>
