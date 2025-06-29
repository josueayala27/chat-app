// export function useTyping(chatId: string) {
//   const channel = useAblyChannel(chatId)
//   const isTyping = ref(false)
//   const debouncedStop = useDebounceFn(() => {
//     isTyping.value = false
//     channel.publish('event:stop-typing', { is_typing: false })
//   }, 1500)

//   function onInput() {
//     if (!isTyping.value) {
//       isTyping.value = true
//       channel.publish('event:start-typing', { is_typing: true })
//     }
//     debouncedStop()
//   }
//   return { onInput, isTyping }
// }
