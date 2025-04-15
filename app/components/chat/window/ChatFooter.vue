<script lang="ts" setup>
const message = ref<string>()
</script>

<template>
  <div class="p-2 flex items-center gap-2">
    <BasePopover>
      <template #default="{ isOpen }">
        <div :class="[{ 'bg-slate-100': isOpen }]" class="p-2 rounded-full hover:bg-slate-100 grid place-items-center cursor-pointer">
          <Icon size="20px" name="carbon:add-large" :class="[{ 'rotate-135': isOpen }]" class="flex shrink-0 duration-300" />
        </div>
      </template>

      <template #content>
        <BaseMenuContainer
          :items="[
            { icon: 'carbon:document-add', label: 'File' },
            { icon: 'carbon:image-copy', label: 'Photos & videos' },
            { icon: 'carbon:text-short-paragraph', label: 'Poll' },
          ]"
        />
      </template>
    </BasePopover>

    <BaseInput
      v-model="message"
      placeholder="Write something"
      type="text"
      class="bg-slate-100 w-full py-2 px-4 rounded-lg outline-none text-sm"
    />

    <div class="p-2 rounded-full hover:bg-slate-100 grid place-items-center cursor-pointer">
      <Icon
        size="20px"
        :name="message ? 'carbon:send-filled' : 'carbon:microphone'"
        :class="{ 'text-sky-500': message }"
        class="flex shrink-0"
      />
    </div>
  </div>
</template>
