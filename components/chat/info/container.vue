<template>
  <aside class="w-95 flex flex-col overflow-auto divide-y divide-slate-200">
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
      <div class="flex justify-between items-center p-2 cursor-pointer">
        <p class="font-medium text-slate-900 text-sm ">
          Customize Chat
        </p>
        <Icon name="carbon:chevron-down" />
      </div>
    </div>

    <ChatInfoSection title="Media, Files And Links" />
  </aside>
</template>
