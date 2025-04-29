<script lang="ts" setup>
const { friends } = useFriends()
const groupSet = reactive(new Set<FriendItem>())

function removeFriendFromGroupSet(friend: FriendItem) {
  groupSet.delete(friend)
}

function toggleGroup(friend: FriendItem) {
  if (groupSet.has(friend)) {
    removeFriendFromGroupSet(friend)
    return
  }

  groupSet.add(friend)
}
</script>

<template>
  <div class="flex flex-col gap-3">
    <SidebarListSearch />

    <div class="flex gap-2 p-2">
      <BaseAvatar v-for="friend in groupSet" :key="friend.uuid">
        <div
          class="absolute top-0 right-0 bg-slate-500 hover:bg-slate-600 duration-200 aspect-square flex place-items-center rounded-full cursor-pointer"
          @click="removeFriendFromGroupSet(friend)"
        >
          <Icon name="carbon:close" class="text-white" />
        </div>
      </BaseAvatar>
    </div>

    <BaseList>
      <SidebarChatItem
        v-for="friend in friends"
        :key="friend.uuid"
        :data="[friend.name, friend.status]"
        @click="toggleGroup(friend)"
      >
        <template #extra>
          <div
            :class="groupSet.has(friend) ? 'bg-sky-500' : 'bg-slate-100 group-hover:bg-slate-200'"
            class="size-6  rounded-full grid place-items-center"
          >
            <div v-if="groupSet.has(friend)" class="h-[40%] aspect-square rounded-full bg-white" />
          </div>
        </template>
      </SidebarChatItem>
    </BaseList>
  </div>
</template>
