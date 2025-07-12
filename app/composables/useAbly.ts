import * as Ably from 'ably'

export default function useAbly() {
  const ably = useState<Ably.Realtime>('ably')

  function init() {
    const _ably = new Ably.Realtime({ authUrl: '/api/auth/ably' })
    ably.value = _ably
  }

  return { ably, init }
}
