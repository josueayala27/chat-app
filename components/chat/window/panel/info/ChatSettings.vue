<template>
  <WindowPanelInfoChatSettingsItem title="Read Receipts">
    <BaseToggle />
  </WindowPanelInfoChatSettingsItem>
  <WindowPanelInfoChatSettingsItem title="Last Seen">
    <BaseToggle />
  </WindowPanelInfoChatSettingsItem>
  <WindowPanelInfoChatSettingsItem title="Message Forwarding">
    <BaseToggle />
  </WindowPanelInfoChatSettingsItem>
  <WindowPanelInfoChatSettingsItem title="Preview Media in Chat">
    <BaseToggle />
  </WindowPanelInfoChatSettingsItem>
  <WindowPanelInfoChatSettingsItem title="Message Sounds">
    <button class="py-1 px-2 bg-slate-200/50 hover:bg-slate-200 rounded-lg cursor-pointer duration-200 flex items-center gap-2">
      <BaseFont class="text-sm text-slate-700" content="Clap" />
      <Icon name="carbon:chevron-down" size="20px" />
    </button>
  </WindowPanelInfoChatSettingsItem>
  <WindowPanelInfoChatSettingsItem title="Mute Chat">
    <button class="py-1 px-2 bg-slate-200/50 hover:bg-slate-200 rounded-lg cursor-pointer duration-200 flex items-center gap-2">
      <BaseFont class="text-sm text-slate-700" content="8 Hours" />
      <Icon name="carbon:chevron-down" size="20px" />
    </button>
  </WindowPanelInfoChatSettingsItem>
</template>
