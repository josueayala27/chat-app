<template>
  <aside class="w-95 flex flex-col overflow-auto divide-y divide-slate-200">
    <div class="justify-center py-4 flex flex-col items-center gap-2">
      <BaseAvatar size="140" />
      <BaseFlex is="div" align="center" direction="column">
        <BaseFont class="font-semibold" content="Josué Ayala" />
        <BaseFont content=" Online" class="font-medium text-emerald-500 text-xs" />
      </BaseFlex>
    </div>

    <ChatInfoSection title="Customize Chat">
      <!-- <div class="bg-red-500">
        <BaseFont content="Notifications" />
      </div> -->
    </ChatInfoSection>

    <ChatInfoSection title="Shared Media">
      <ChatInfoSharedMedia />
    </ChatInfoSection>

    <ChatInfoSection :is-open="true" title="Chat Settings">
      <div>
        <div class="flex justify-between items-center p-2">
          <BaseFont class="text-sm text-slate-700" content="Read Receipts" />
          <BaseToogle />
        </div>
        <div class="flex justify-between items-center p-2">
          <BaseFont class="text-sm text-slate-700" content="Last Seen" />
          <BaseToogle />
        </div>
        <div class="flex justify-between items-center p-2">
          <BaseFont class="text-sm text-slate-700" content="Message Forwarding" />
          <BaseToogle />
        </div>
        <div class="flex justify-between items-center p-2">
          <BaseFont class="text-sm text-slate-700" content="Preview Media in Chat" />
          <BaseToogle />
        </div>
        <div class="flex justify-between items-center p-2">
          <BaseFont class="text-sm text-slate-700" content="Message Sounds" />
          <BaseToogle />
        </div>
        <div class="flex justify-between items-center p-2">
          <BaseFont class="text-sm text-slate-700" content="Mute Chat" />
          <BaseToogle />
        </div>
      </div>
    </ChatInfoSection>
  </aside>
</template>
