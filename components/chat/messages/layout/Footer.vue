<script lang="ts" setup>
import { offset, useFloating } from '@floating-ui/vue'

const reference = ref<HTMLDivElement>()
const floating = ref<HTMLDivElement>()
const { floatingStyles } = useFloating(reference, floating, { placement: 'top-start', middleware: [offset(5)] })

const isOpen = ref<boolean>(false)

onClickOutside(reference, () => isOpen.value = false, { ignore: [floating] })
</script>

<template>
  <div class="p-2 flex items-center gap-2">
    <div
      ref="reference"
      :class="[{ 'bg-slate-100': isOpen }]"
      class="p-2 rounded-full hover:bg-slate-100 grid place-items-center cursor-pointer" @click="isOpen = !isOpen"
    >
      <Icon size="20px" name="carbon:add-large" :class="[{ 'rotate-135': isOpen }]" class="flex shrink-0 duration-300" />
    </div>

    <BasePopoverContainer v-if="isOpen" ref="floating" :style="floatingStyles">
      <BasePopoverItem icon="carbon:document-add" label="Archivo" />
      <BasePopoverItem icon="carbon:image-copy" label="Fotos y vídeos" />
      <BasePopoverItem icon="carbon:text-short-paragraph" label="Encuesta" />
    </BasePopoverContainer>

    <input placeholder="Write something" type="text" class="bg-slate-100 w-full py-2 px-4 rounded-lg outline-none text-sm">
  </div>
</template>
