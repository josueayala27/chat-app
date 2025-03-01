<template>
  <div class="flex flex-col divide-y divide-slate-200 flex-1">
    <div class="p-2 flex items-center justify-between">
      <div class="flex rounded-lg gap-2 items-center cursor-pointergroup">
        <BaseAvatar />
        <div class="flex flex-col text-sm">
          <BaseFont content="Ricky Smith" class="font-medium" />
        </div>
      </div>
      <div class="flex items-center">
        <div class="inline-flex p-1 rounded-full hover:bg-slate-100 cursor-pointer">
          <Icon size="20px" name="ic:baseline-search" />
        </div>
        <div class="inline-flex p-1 rounded-full hover:bg-slate-100 cursor-pointer">
          <Icon size="20px" name="ic:round-more-horiz" />
        </div>
      </div>
    </div>
    <div class="p-2 overflow-auto scrollbar-hidden">
      <div class="flex flex-col gap-2">
        <div v-for="item in 8" :key="item" class="flex gap-2">
          <BaseAvatar />
          <div class="flex flex-col gap-1">
            <BaseFont class="text-sm text-slate-900 font-medium" content="Josué Ayala" />
            <div class="flex flex-col gap-0.5">
              <div v-for="_item in 3" :key="_item" class="p-2 bg-sky-500 text-white rounded-r-lg last:rounded-bl-lg">
                <BaseFont class="text-sm text-inherit" content="Hello there!" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>

  <ChatInfoAside />
</template>
