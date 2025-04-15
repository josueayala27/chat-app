<script lang="ts">
import { tv } from 'tailwind-variants'
</script>

<script setup lang="ts">
interface ChatSidebarChatItemBaseProps {
  data: [string, string]
  is?: Component
  ui?: Partial<typeof ui.slots>
}

const props = defineProps<ChatSidebarChatItemBaseProps>()

const ui = tv({
  slots: {
    root: 'flex rounded-lg p-2 gap-2 items-center cursor-pointer hover:bg-slate-100 group',
    content: 'flex items-center justify-between flex-1',
    header: 'text-slate-900 font-bold',
    subheader: 'text-slate-500 text-sm [&>p]:line-clamp-1',
  },
})

const { root, content, header, subheader } = ui()
</script>

<template>
  <component :is="is ?? 'div'" :class="root({ class: props.ui?.root })">
    <BaseAvatar />

    <div :class="content({ class: props.ui?.content })">
      <div class="flex flex-col flex-1">
        <div :class="header({ class: props.ui?.header })">
          <slot name="header" :content="data[0]">
            <BaseFont :content="data[0]" />
          </slot>
        </div>

        <div :class="subheader({ class: props.ui?.subheader })">
          <slot name="subheader" :content="data[1]">
            <BaseFont :content="data[1]" />
          </slot>
        </div>
      </div>

      <slot name="extra" />
    </div>
  </component>
</template>
