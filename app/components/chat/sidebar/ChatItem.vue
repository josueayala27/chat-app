<script lang="ts">
import { tv } from 'tailwind-variants'
</script>

<script setup lang="ts">
interface SidebarChatItemBaseProps {
  data?: [string, string]
  is?: Component
  ui?: Partial<typeof ui.slots>
  presence?: 'online' | 'offline'
}

const props = defineProps<SidebarChatItemBaseProps>()

const ui = tv({
  slots: {
    root: 'flex rounded-lg p-2 gap-2 items-center cursor-pointer hover:bg-slate-100 group select-none',
    content: 'flex items-center justify-between flex-1',
    header: 'text-slate-900 font-medium text-sm',
    subheader: 'text-slate-500 text-sm [&>p]:line-clamp-1',
  },
})

const { root, content, header, subheader } = ui()
</script>

<template>
  <component :is="is ?? 'div'" :class="root({ class: props.ui?.root })">
    <BaseAvatar>
      <span v-if="presence === 'online'" class="bottom-1 right-1 size-2 bg-green-500 absolute rounded-full" />
    </BaseAvatar>

    <div :class="content({ class: props.ui?.content })">
      <div class="flex flex-col flex-1">
        <div :class="header({ class: props.ui?.header })">
          <slot name="header" :content="data?.[0]">
            <BaseFont v-if="data?.[0]" :content="data[0]" />
          </slot>
        </div>

        <div :class="subheader({ class: props.ui?.subheader })">
          <slot name="subheader" :content="data?.[1]">
            <BaseFont v-if="data?.[1]" :content="data[1]" />
          </slot>
        </div>
      </div>

      <slot name="extra" />
    </div>
  </component>
</template>
