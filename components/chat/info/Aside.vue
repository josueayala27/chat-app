<script lang="ts" setup>
import { offset, useFloating } from '@floating-ui/vue'

const reference = ref<HTMLDivElement>()
const floating = ref<HTMLDivElement>()
const { floatingStyles } = useFloating(reference, floating, { placement: 'bottom-end', middleware: [offset(5)] })

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
      <ChatInfoSectionItem title="Theme">
        <button ref="reference" class="py-1 px-2 bg-slate-200/50 hover:bg-slate-200 rounded-lg cursor-pointer duration-200 flex items-center gap-2" @click="isOpen = !isOpen">
          <BaseFont class="text-sm text-slate-700" content="Light Blue" />
          <Icon name="carbon:chevron-down" size="20px" />
        </button>

        <BasePopoverContainer v-if="isOpen" ref="floating" :ui="{ base: 'grid grid-cols-5 gap-1' }" :style="floatingStyles">
          <div
            v-for="theme in ['--color-emerald-500', '--color-sky-500']"
            :key="theme"
            :style="{ '--bg-color': `var(${theme})` }"
            class="size-6 rounded-lg cursor-pointer bg-(--bg-color)"
          />
        </BasePopoverContainer>
      </ChatInfoSectionItem>
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
