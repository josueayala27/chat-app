<script lang="ts" setup>
import { offset, useFloating } from '@floating-ui/vue'

const reference = ref<HTMLDivElement>()
const floating = ref<HTMLDivElement>()
const { floatingStyles } = useFloating(reference, floating, { placement: 'top-start', middleware: [offset(5)] })

const isOpen = ref<boolean>(false)
</script>

<template>
  <div class="flex flex-col divide-y divide-slate-200 flex-1">
    <div class="p-2 flex items-center justify-between">
      <div class="flex rounded-lg gap-2 items-center cursor-pointergroup">
        <BaseAvatar />
        <div class="flex flex-col text-sm">
          <BaseFont content="Josué Ayala" class="font-medium" />
        </div>
      </div>
      <div class="flex items-center">
        <div class="inline-flex p-1 rounded-full hover:bg-slate-100 cursor-pointer">
          <Icon size="20px" name="ic:baseline-search" />
        </div>
        <div class="inline-flex p-1 rounded-full hover:bg-slate-100 cursor-pointer">
          <Icon size="20px" name="ic:round-more-horiz" />
        </div>
      </div>
    </div>

    <div class="p-2 overflow-auto scrollbar-hidden flex-1">
      <div class="flex flex-col gap-2">
        <ChatMessagesGroup v-for="item in 8" :key="item" />
      </div>
    </div>

    <div class="p-2 flex items-center gap-2">
      <div
        ref="reference"
        :class="[{ 'bg-slate-100': isOpen }]"
        class="p-2 rounded-full hover:bg-slate-100 grid place-items-center cursor-pointer" @click="isOpen = !isOpen"
      >
        <Icon size="20px" name="carbon:add-large" :class="[{ 'rotate-135': isOpen }]" class="flex shrink-0 duration-300" />
      </div>

      <div v-if="isOpen" ref="floating" :style="floatingStyles" class="bg-white/90 rounded-lg p-1 flex flex-col backdrop-blur-[10px] border border-slate-200">
        <div class="cursor-pointer hover:bg-slate-200/60 py-2 px-4 rounded-lg text-sm flex items-center gap-2">
          <Icon size="20px" name="carbon:document-add" />
          Archivo
        </div>
        <div class="cursor-pointer hover:bg-slate-200/60 py-2 px-4 rounded-lg text-sm flex items-center gap-2">
          <Icon size="20px" name="carbon:image-copy" />
          Fotos y vídeos
        </div>
        <div class="cursor-pointer hover:bg-slate-200/60 py-2 px-4 rounded-lg text-sm flex items-center gap-2">
          <Icon size="20px" name="carbon:text-short-paragraph" />
          Encuesta
        </div>
      </div>

      <input placeholder="Write something" type="text" class="bg-slate-100 w-full py-2 px-4 rounded-lg outline-none text-sm">
    </div>
  </div>

  <ChatInfoAside />
</template>
