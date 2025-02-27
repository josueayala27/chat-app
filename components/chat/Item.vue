<template>
  <div class="flex rounded-lg p-2 gap-2 items-center cursor-pointer hover:bg-slate-100 group">
    <div class="size-12 bg-slate-100 rounded-full group-hover:bg-slate-200 shrink-0" />
    <div class="flex flex-col text-sm w-full">
      <div class="flex justify-between items-center">
        <p class="text-slate-900 font-bold">
          Josué Ayala
        </p>
        <Icon name="carbon:checkmark" />
      </div>
      <div class="flex justify-between items-center gap-1">
        <p class="line-clamp-1 text-slate-600">
          Just finished work, finally some free time!
        </p>
        <div class="flex gap-2 items-center ">
          <Icon name="carbon:pin" />
          <div class="overflow-hidden place-items-center hidden group-hover:grid">
            <Icon size="16px" name="carbon:chevron-down" />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
