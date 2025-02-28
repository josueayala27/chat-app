<template>
  <div class="flex-1 p-2">
    <div class="flex gap-2">
      <BaseAvatar />
      <div class="flex flex-col gap-1">
        <BaseFont class="text-sm text-slate-900 font-[500]" content="Josué Ayala" />
        <div class="p-2 bg-sky-500 text-white rounded-r-lg rounded-bl-lg">
          <BaseFont class="text-sm text-inherit" content="Hello there!" />
        </div>
      </div>
    </div>
  </div>

  <ChatInfoAside />
</template>
