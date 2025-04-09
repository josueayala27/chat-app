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

    <ChatInfoSection :is-open="true" :ui="{ content: 'flex flex-col pb-2 overflow-hidden' }" title="Customize Chat">
      <ChatInfoSectionItem title="Theme" />
      <div class="flex items-center gap-2 overflow-auto px-2 scrollbar-hidden">
        <div
          v-for="item in ['Avacado Alien', 'Rainbow Candy', 'Honedeydew Punch']"
          :key="item"
          class="aspect-video h-28 flex flex-col divide-y divide-slate-300 border border-slate-300 rounded-lg cursor-pointer"
        >
          <div class="flex-1 p-2 flex flex-col overflow-hidden gap-2">
            <div
              v-for="_class in ['flex-row', 'flex-row-reverse', 'flex-row']"
              :key="_class"
              :class="_class"
              class="flex items-center gap-2"
            >
              <BaseAvatar size="24" />
              <div class="bg-slate-100 h-6 w-full rounded-full" />
            </div>
          </div>
          <div class="p-1">
            <BaseFont class="text-sm" :content="item" />
          </div>
        </div>
      </div>
    </ChatInfoSection>

    <ChatInfoSection :ui="{ content: 'flex flex-col gap-2' }" :is-open="true" title="Shared Media">
      <ChatInfoSharedMedia />
    </ChatInfoSection>

    <ChatInfoSection :ui="{ content: 'flex flex-col pb-2' }" title="Chat Settings">
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
