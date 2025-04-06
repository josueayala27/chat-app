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
    class="inline-flex items-center cursor-pointer border-2 border-transparent shrink-0 rounded-full data-[state=unchecked]:bg-slate-100 data-[state=checked]:bg-blue-500 duration-200 w-9"
    @click="model = !model"
  >
    <span
      :data-state="computedDataState"
      class="group pointer-events-none rounded-full bg-white shadow-lg ring-0 duration-200 data-[state=unchecked]:translate-x-0 data-[state=unchecked]:rtl:-translate-x-0 flex items-center justify-center size-4 data-[state=checked]:translate-x-4 data-[state=checked]:rtl:-translate-x-4"
    />
  </button>
</template>
