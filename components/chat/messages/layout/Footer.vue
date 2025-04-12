<script lang="ts" setup>
const { reference, floating, isOpen, floatingStyles } = useFloating()
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

    <BaseMenuContainer
      v-if="isOpen"
      ref="floating"
      :style="floatingStyles"
      :items="[
        { icon: 'carbon:document-add', label: 'Archivo' },
        { icon: 'carbon:image-copy', label: 'Fotos y vídeos' },
        { icon: 'carbon:text-short-paragraph', label: 'Encuesta' },
      ]"
    />

    <input placeholder="Write something" type="text" class="bg-slate-100 w-full py-2 px-4 rounded-lg outline-none text-sm">
  </div>
</template>
