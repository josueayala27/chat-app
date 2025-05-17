<script lang="ts" setup>
// async function cacheImage(url: string) {
//   if ('caches' in window) {
//     const cache = await caches.open('chat-images')
//     const cached = await cache.match(url)
//     if (!cached) {
//       await cache.add(url)
//     }

//     console.log(cache)
//   }
// }

// cacheImage('')
</script>

<template>
  <div class="flex flex-col">
    <BaseFont class="text-sm font-semibold" content="Auto-download photos" />
    <div class="flex flex-col">
      <div v-for="item in ['Private chats', 'Group chats']" :key="item" class="flex items-center py-3 justify-between last:border-b-0 border-b border-slate-200">
        <BaseFont class="text-sm" :content="item" />
        <BaseToggle />
      </div>
    </div>

    <BaseFont class="text-sm font-semibold mt-6" content="Auto-download videos" />
    <div class="flex flex-col">
      <div v-for="item in ['Private chats', 'Group chats']" :key="item" class="flex items-center py-3 justify-between last:border-b-0 border-b border-slate-200">
        <BaseFont class="text-sm" :content="item" />
        <BaseToggle />
      </div>
    </div>
  </div>
</template>
