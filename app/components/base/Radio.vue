<script lang="ts" setup>
const model = defineModel<boolean>()

function onClick() {
  model.value = !model.value
}
</script>

<template>
  <div
    :class="model ? 'bg-sky-500' : 'bg-slate-100 group-hover:bg-slate-200'"
    class="size-6  rounded-full grid place-items-center"
    @click="onClick"
  >
    <div v-if="model" class="h-[40%] aspect-square rounded-full bg-white" />
  </div>
</template>
