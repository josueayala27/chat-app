<script lang="ts" setup>
const reference = ref<HTMLDivElement>()
const floating = ref<HTMLDivElement>()

const isOpen = ref<boolean>(false)
onClickOutside(reference, () => isOpen.value = false, { ignore: [floating] })
</script>

<template>
  <aside class="w-95 flex flex-col overflow-auto divide-y divide-slate-200 scrollbar-hidden">
    <div class="justify-center py-4 flex flex-col items-center gap-2">
      <BaseAvatar size="140" />
      <BaseFlex is="div" align="center" direction="column">
        <BaseFont class="font-semibold" content="Josué Ayala" />
        <BaseFont content=" Online" class="font-medium text-emerald-500 text-xs" />
      </BaseFlex>
    </div>

    <ChatInfoSection :ui="{ content: 'flex flex-col pb-2 overflow-hidden' }" title="Customize Chat">
      <ChatInfoCustomizeChat />
    </ChatInfoSection>

    <ChatInfoSection :ui="{ content: 'flex flex-col gap-2' }" :is-open="true" title="Shared Media">
      <ChatInfoSharedMedia />
    </ChatInfoSection>

    <ChatInfoSection :ui="{ content: 'flex flex-col pb-2' }" title="Chat Settings">
      <ChatInfoChatSettings />
    </ChatInfoSection>
  </aside>
</template>
