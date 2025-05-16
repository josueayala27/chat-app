<script setup lang="ts">
const isGroupModalOpen = defineModel<boolean>({ default: false })
const currentStep = ref<number>(1)

function goToStep(step: number) {
  currentStep.value = step
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
      <div class="flex items-center gap-2">
        <div v-if="currentStep === 2" class="h-6 aspect-square rounded-full hover:bg-slate-100 grid place-items-center cursor-pointer" @click="goToStep(1)">
          <Icon size="20px" name="carbon:chevron-left" class="flex shrink-0 duration-300" />
        </div>

        <BaseFont content="Create group chat" />
      </div>
      <BaseFont class="text-sm font-normal text-slate-700" content="Gather your friends in a vibrant chat. Share moments and ideas in one fun conversation." />
    </template>

    <SidebarToolbarNewGroupStepOne v-if="currentStep === 1" />
    <SidebarToolbarNewGroupStepTwo v-else-if="currentStep === 2" />

    <template #footer>
      <button class="bg-slate-100 hover:bg-slate-200 rounded-lg h-9 px-4 flex items-center justify-center text-slate-700 cursor-pointer text-sm duration-200" @click="isGroupModalOpen = false">
        Close
      </button>
      <BaseButton content="Continue" @click="goToStep(2)" />
    </template>
  </BaseModal>
</template>
