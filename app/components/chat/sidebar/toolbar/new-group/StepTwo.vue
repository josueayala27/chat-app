<template>
  <div class="items-center justify-center flex flex-col gap-4">
    <BaseAvatar class="border-dashed border border-slate-200 flex items-center justify-center text-slate-500 cursor-pointer hover:bg-slate-200 duration-200" size="80">
      <Icon size="24px" name="carbon:camera" />
    </BaseAvatar>

    <div class="flex flex-col gap-2 w-full">
      <label class="text-sm text-slate-700" for="test_uuid">Group name</label>
      <div :style="{ '--input-width': '44px' }" class="flex items-center top-0 stick y w-full relative">
        <input id="test_uuid" type="text" placeholder="Search..." class="w-full px-4 h-11 pr-3 bg-slate-100 border-slate-200 rounded-lg outline-none text-sm">
      </div>
    </div>
  </div>
</template>
