import { Realtime } from 'ably'

export default function useAbly() {
  const ably = useState<Realtime>('ably')

  function init() {
    const _ably = new Realtime({ authUrl: '/api/auth/ably' })
    ably.value = _ably
  }

  return { ably, init }
}
