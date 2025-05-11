<template>
  <div class="p-2 flex items-center justify-between">
    <div class="flex items-center gap-2">
      <div class="p-2 rounded-full hover:bg-slate-100 grid place-items-center cursor-pointer">
        <Icon size="20px" name="carbon:close-large" class="flex shrink-0 duration-300" />
      </div>
      <BaseFont class="text-slate-900 text-sm" content="0 Selected" />
    </div>

    <div class="flex items-center">
      <div class="p-2 rounded-full hover:bg-slate-100 grid place-items-center cursor-pointer">
        <Icon size="20px" name="carbon:star" class="flex shrink-0 duration-300" />
      </div>

      <div class="p-2 rounded-full hover:bg-slate-100 grid place-items-center cursor-pointer">
        <Icon size="20px" name="carbon:trash-can" class="flex shrink-0 duration-300" />
      </div>

      <div class="p-2 rounded-full hover:bg-slate-100 grid place-items-center cursor-pointer">
        <Icon size="20px" name="carbon:text-new-line" class="flex shrink-0 duration-300" />
      </div>
    </div>
  </div>
</template>
