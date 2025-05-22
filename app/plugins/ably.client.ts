import * as Ably from 'ably'

export default defineNuxtPlugin(() => {
  const ably = new Ably.Realtime({ authUrl: '/api/auth/ably' })

  return {
    provide: {
      ably,
    },
  }
})
