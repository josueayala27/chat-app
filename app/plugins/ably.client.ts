import { ChatClient } from '@ably/chat'
import * as Ably from 'ably'

export default defineNuxtPlugin(() => {
  const ably = new Ably.Realtime({ authUrl: '/api/auth/ably' })
  const chat = new ChatClient(ably)

  return {
    provide: {
      ably,
      chat,
    },
  }
})
