<script lang="ts" setup>
const model = defineModel<boolean>()

const computedDataState = computed(() => {
  return model.value ? 'checked' : 'unchecked'
})
</script>

<template>
  <button
    :aria-checked="model"
    :data-state="computedDataState"
    class="inline-flex items-center cursor-pointer border-2 border-transparent shrink-0 rounded-full duration-200 w-9 data-[state=unchecked]:bg-slate-200 data-[state=checked]:bg-(--color-sky-500)"
    @click="model = !model"
  >
    <span
      :data-state="computedDataState"
      class="pointer-events-none rounded-full bg-white shadow-lg ring-0 duration-200 flex items-center justify-center size-4 data-[state=unchecked]:translate-x-0 data-[state=checked]:translate-x-full"
    />
  </button>
</template>
