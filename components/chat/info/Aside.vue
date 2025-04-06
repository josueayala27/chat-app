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

    <ChatInfoSection :ui="{ content: 'flex flex-col gap-2' }" title="Shared Media">
      <ChatInfoSharedMedia />
    </ChatInfoSection>

    <ChatInfoSection :ui="{ content: 'flex flex-col' }" :is-open="true" title="Chat Settings">
      <div class="flex justify-between items-center p-2">
        <BaseFont class="text-sm text-slate-700" content="Read Receipts" />
        <BaseToggle />
      </div>
      <div class="flex justify-between items-center p-2">
        <BaseFont class="text-sm text-slate-700" content="Last Seen" />
        <BaseToggle />
      </div>
      <div class="flex justify-between items-center p-2">
        <BaseFont class="text-sm text-slate-700" content="Message Forwarding" />
        <BaseToggle />
      </div>
      <div class="flex justify-between items-center p-2">
        <BaseFont class="text-sm text-slate-700" content="Preview Media in Chat" />
        <BaseToggle />
      </div>
      <div class="flex justify-between items-center p-2">
        <BaseFont class="text-sm text-slate-700" content="Message Sounds" />
        <BaseToggle />
      </div>
      <div class="flex justify-between items-center p-2">
        <BaseFont class="text-sm text-slate-700" content="Mute Chat" />
        <BaseToggle />
      </div>
    </ChatInfoSection>
  </aside>
</template>
