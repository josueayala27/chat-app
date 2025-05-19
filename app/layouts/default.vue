<template>
  <div class="h-screen overflow-hidden flex divide-x divide-slate-200">
    <Sidebar />

    <main class="flex-1 flex divide-x divide-slate-200">
      <slot />
    </main>
  </div>
</template>
