<script lang="ts">
interface User { first_name: string, last_name: string, user: string, email: string }
</script>

<script lang="ts" setup>
useForm<User>({
  initialValues: {
    first_name: 'Josué',
    last_name: 'Ayala',
    email: 'dikoliw830@bamsrad.com',
    user: 'josueayala',
  },
})
</script>

<template>
  <div class="flex flex-col w-full p-6">
    <BaseFont class="text-sm font-semibold" content="Visibility" />
    <div class="flex flex-col">
      <div class="flex items-center py-3 justify-between border-b border-slate-200">
        <BaseFont class="text-sm" content="Last seen & online" />

        <BasePopover :config="{ placement: 'bottom-end' }">
          <button class="py-1 px-2 bg-slate-200/50 hover:bg-slate-200 rounded-lg cursor-pointer duration-200 flex items-center gap-2">
            <BaseFont class="text-sm text-slate-700" content="Everyone" />
            <Icon name="carbon:chevron-down" size="20px" />
          </button>

          <template #content>
            <BaseMenuContainer>
              <BaseMenuItem label="Everyone" />
              <BaseMenuItem label="My contacts" />
              <BaseMenuItem label="My contacts except..." />
              <BaseMenuItem label="Nobody" />
            </BaseMenuContainer>
          </template>
        </BasePopover>
      </div>

      <div class="flex items-center py-3 justify-between border-b border-slate-200">
        <BaseFont class="text-sm" content="Profile photo" />
        <BaseToggle />
      </div>

      <div class="flex items-center py-3 justify-between border-slate-200">
        <BaseFont class="text-sm" content="Bio" />
        <BaseToggle />
      </div>
    </div>

    <BaseFont class="text-sm font-semibold mt-6" content="Messaging" />
    <div class="flex flex-col">
      <div class="flex items-center py-3 justify-between border-b border-slate-200">
        <BaseFont class="text-sm" content="Receive messages" />
        <BaseToggle />
      </div>

      <div class="flex items-center py-3 justify-between border-slate-200">
        <BaseFont class="text-sm" content="Read receipts" />
        <BaseToggle />
      </div>
    </div>

    <BaseFont class="text-sm font-semibold mt-6" content="Security" />
    <div class="flex flex-col">
      <div class="flex items-center py-3 justify-between border-slate-200">
        <BaseFont class="text-sm" content="Blocked users" />
        <BaseToggle />
      </div>
    </div>
  </div>
</template>
