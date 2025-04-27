<script setup lang="ts">
import { tv } from 'tailwind-variants'

const props = defineProps<{
  title?: string
  ui?: Partial<typeof modal.slots>
}>()

const slots = defineSlots<{ header?: any, footer?: any, default: any }>()
const model = defineModel<boolean>()

const modal = tv({
  slots: {
    base: 'w-full h-full fixed top-0 left-0 bg-black/20 z-[60] grid place-items-center',
    container: 'bg-white w-[522px] rounded-lg shadow-xl divide-y overflow-hidden divide-neutral-200',
    header: 'p-6 font-semibold',
    body: 'p-6',
    footer: 'p-6',
  },
})

const ui = modal()

const reference = ref<HTMLDivElement>()

onClickOutside(reference, () => model.value = false)
</script>

<template>
  <Teleport to="body">
    <div v-if="model" :class="ui.base({ class: props.ui?.base })">
      <div ref="reference" :class="ui.container({ class: props.ui?.container })">
        <!-- Header... -->
        <div v-if="title || slots.header" :class="ui.header({ class: props.ui?.header })">
          <slot name="header" :title>
            <BaseFont :content="title" />
          </slot>
        </div>

        <!-- Body -->
        <div :class="ui.body({ class: props.ui?.body })">
          <slot />
        </div>

        <!-- Footer -->
        <div v-if="slots.footer" :class="ui.footer({ class: props.ui?.footer })">
          <slot name="footer" />
        </div>
      </div>
    </div>
  </Teleport>
</template>
