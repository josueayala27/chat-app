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
      <ChatInfoSectionItem title="Read Receipts">
        <BaseToggle />
      </ChatInfoSectionItem>
      <ChatInfoSectionItem title="Last Seen">
        <BaseToggle />
      </ChatInfoSectionItem>
      <ChatInfoSectionItem title="Message Forwarding">
        <BaseToggle />
      </ChatInfoSectionItem>
      <ChatInfoSectionItem title="Preview Media in Chat">
        <BaseToggle />
      </ChatInfoSectionItem>
      <ChatInfoSectionItem title="Message Sounds">
        <BaseToggle />
      </ChatInfoSectionItem>
      <ChatInfoSectionItem title="Mute Chat">
        <BaseToggle />
      </ChatInfoSectionItem>
    </ChatInfoSection>
  </aside>
</template>
