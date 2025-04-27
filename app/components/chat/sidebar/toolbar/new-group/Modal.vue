<script setup lang="ts">
const isGroupModalOpen = defineModel<boolean>({ default: false })
const currentStep = ref(1)

function goToStepTwo() {
  currentStep.value++
}
</script>

<template>
  <BaseModal
    v-model="isGroupModalOpen"
    :ui="{
      container: 'w-[442px]',
      header: 'flex flex-col gap-2',
      footer: 'flex justify-end items-center gap-2',
    }"
  >
    <template #header>
      <BaseFont content="Create group chat" />
      <BaseFont class="text-sm font-normal text-neutral-700" content="Gather your friends in a vibrant chat. Share moments and ideas in one fun conversation." />
    </template>

    <SidebarToolbarNewGroupStepOne v-if="currentStep === 1" />
    <SidebarToolbarNewGroupStepTwo v-else-if="currentStep === 2" />

    <template #footer>
      <button class="bg-slate-100 hover:bg-slate-200 rounded-lg h-9 px-4 flex items-center justify-center text-slate-700 cursor-pointer text-sm duration-200" @click="isGroupModalOpen = false">
        Close
      </button>
      <button class="bg-sky-500 hover:bg-sky-600 rounded-lg h-9 px-4 flex items-center justify-center text-white cursor-pointer text-sm duration-200" @click="goToStepTwo">
        Next
      </button>
    </template>
  </BaseModal>
</template>
