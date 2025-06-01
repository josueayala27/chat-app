import { StorageClient } from '@supabase/storage-js'

export function useSupabase() {
  const config = useRuntimeConfig()

  const storageClient = new StorageClient(`${config}/storage/v1`, {
    apikey: config.SUPABASE_SERVICE_ROLE,
    Authorization: `Bearer ${config.SUPABASE_SERVICE_ROLE}`,
  })

  return storageClient
}
