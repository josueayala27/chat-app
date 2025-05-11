<script lang="ts" setup>
const { reference, closePopover } = usePopover()
const route = useRoute()

const isSelectMessagesActive = useState<boolean>(`select-messages-${route.params.chat}`, () => false)

function onSelectMessages() {
  closePopover()
  isSelectMessagesActive.value = true
}
</script>

<template>
  <div class="p-2 flex items-center justify-between">
    <div class="flex rounded-lg gap-2 items-center cursor-pointergroup">
      <BaseAvatar />
      <div class="flex flex-col text-sm">
        <BaseFont content="Josué Ayala" class="font-medium" />
      </div>
    </div>
    <div class="flex items-center">
      <div class="inline-flex p-1 rounded-full hover:bg-slate-100 cursor-pointer">
        <Icon size="20px" name="carbon:search" />
      </div>
      <BasePopover ref="reference" :config="{ placement: 'bottom-end' }">
        <div class="inline-flex p-1 rounded-full hover:bg-slate-100 cursor-pointer">
          <Icon size="20px" name="carbon:overflow-menu-horizontal" />
        </div>

        <template #content>
          <BaseMenuContainer>
            <BaseMenuItem icon="carbon:information" label="Contact info" />
            <BaseMenuItem
              v-if="!isSelectMessagesActive"
              icon="carbon:checkmark-outline"
              label="Select Messages"
              @click="onSelectMessages()"
            />
            <BaseMenuItem icon="carbon:notification-off" label="Mute" />
            <BaseMenuItem icon="carbon:locked" label="Block" />
            <BaseMenuItem :ui="{ root: 'text-red-500' }" icon="carbon:trash-can" label="Delete chat" />
          </BaseMenuContainer>
        </template>
      </BasePopover>
    </div>
  </div>
</template>
