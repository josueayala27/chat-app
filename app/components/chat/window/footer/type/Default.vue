<script lang="ts" setup>
const { values } = useForm<{ content: string }>({
  name: 'chat-footer',
})
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
      name="content"
      :ui="{ root: 'w-full' }"
      placeholder="Write something"
      type="text"
    />

    <div class="p-2 rounded-full hover:bg-slate-100 grid place-items-center cursor-pointer">
      <Icon
        size="20px"
        :name="values.content ? 'carbon:send-filled' : 'carbon:microphone'"
        :class="{ 'text-sky-500': values.content }"
        class="flex shrink-0"
      />
    </div>
  </div>
</template>
