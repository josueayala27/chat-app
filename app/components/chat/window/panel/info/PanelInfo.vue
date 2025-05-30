<script lang="ts" setup>
const reference = ref<HTMLDivElement>()
const floating = ref<HTMLDivElement>()

const isOpen = ref<boolean>(false)
onClickOutside(reference, () => isOpen.value = false, { ignore: [floating] })
</script>

<template>
  <aside class="flex flex-col divide-y divide-slate-200">
    <div class="justify-center py-4 flex flex-col items-center gap-2">
      <BaseAvatar size="140" />
      <BaseFlex is="div" align="center" direction="column">
        <BaseFont class="font-semibold" content="Josué Ayala" />
        <BaseFont content=" Online" class="font-medium text-emerald-500 text-xs" />
      </BaseFlex>
    </div>

    <PanelInfoSection :ui="{ content: 'flex flex-col gap-2' }" :is-open="true" title="Shared Media">
      <PanelInfoSharedMedia />
    </PanelInfoSection>

    <PanelInfoSection :ui="{ content: 'flex flex-col pb-2' }" title="Chat Settings">
      <PanelInfoChatSettings />
    </PanelInfoSection>
  </aside>
</template>
