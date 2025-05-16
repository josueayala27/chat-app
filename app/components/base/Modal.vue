<script lang="ts">
import type { HTMLAttributes } from 'vue'
import theme from '@/theme/modal'

interface BaseModalProps {
  title?: string
  ui?: Partial<typeof theme.slots>
  uiAttrs?: Partial<{
    [K in keyof typeof theme.slots]: HTMLAttributes
  }>
}
</script>

<script setup lang="ts">
defineOptions({ inheritAttrs: false })

const props = defineProps<BaseModalProps>()
const slots = defineSlots<{ header?: any, footer?: any, default: any }>()
const model = defineModel<boolean>()

const reference = ref<HTMLDivElement>()
onClickOutside(reference, () => model.value = false)

const { base, body, container, footer, header } = theme()
</script>

<template>
  <div v-if="model" v-bind="uiAttrs?.base" :class="base({ class: props.ui?.base })">
    <div ref="reference" role="dialog" v-bind="uiAttrs?.container" :class="container({ class: props.ui?.container })">
      <!-- Header... -->
      <div v-if="title || slots.header" v-bind="uiAttrs?.header" :class="header({ class: props.ui?.header })">
        <slot name="header" :title>
          <BaseFont :content="title" />
        </slot>
      </div>

      <!-- Body -->
      <div v-bind="uiAttrs?.body" :class="body({ class: props.ui?.body })">
        <slot />
      </div>

      <!-- Footer -->
      <div v-if="slots.footer" v-bind="uiAttrs?.footer" :class="footer({ class: props.ui?.footer })">
        <slot name="footer" />
      </div>
    </div>
  </div>
</template>
