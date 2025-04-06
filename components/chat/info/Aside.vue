<template>
  <aside class="w-95 flex flex-col overflow-auto divide-y divide-slate-200">
    <div class="justify-center py-4 flex flex-col items-center gap-2">
      <BaseAvatar size="140" />
      <BaseFlex is="div" align="center" direction="column">
        <BaseFont class="font-semibold" content="Josué Ayala" />
        <BaseFont content=" Online" class="font-medium text-emerald-500 text-xs" />
      </BaseFlex>
    </div>

    <ChatInfoSection :ui="{ content: 'flex flex-col' }" title="Customize Chat">
      <ChatInfoSectionItem title="Theme">
        <button class="py-1 px-2 bg-slate-200/50 hover:bg-slate-200 rounded-lg cursor-pointer duration-200 flex items-center gap-2">
          <BaseFont class="text-sm text-slate-700" content="Light Blue" />
          <Icon name="carbon:chevron-down" size="20px" />
        </button>
      </ChatInfoSectionItem>
      <ChatInfoSectionItem title="Theme">
        <button class="py-1 px-2 bg-slate-200/50 hover:bg-slate-200 rounded-lg cursor-pointer duration-200 flex items-center gap-2">
          <BaseFont class="text-sm text-slate-700" content="Light Blue" />
          <Icon name="carbon:chevron-down" size="20px" />
        </button>
      </ChatInfoSectionItem>
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
        <button class="py-1 px-2 bg-slate-200/50 hover:bg-slate-200 rounded-lg cursor-pointer duration-200 flex items-center gap-2">
          <BaseFont class="text-sm text-slate-700" content="Clap" />
          <Icon name="carbon:chevron-down" size="20px" />
        </button>
      </ChatInfoSectionItem>
      <ChatInfoSectionItem title="Mute Chat">
        <button class="py-1 px-2 bg-slate-200/50 hover:bg-slate-200 rounded-lg cursor-pointer duration-200 flex items-center gap-2">
          <BaseFont class="text-sm text-slate-700" content="8 Hours" />
          <Icon name="carbon:chevron-down" size="20px" />
        </button>
      </ChatInfoSectionItem>
    </ChatInfoSection>
  </aside>
</template>
