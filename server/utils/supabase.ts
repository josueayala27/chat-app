import { StorageClient } from '@supabase/storage-js'

/**
 * Returns a Supabase Storage client, configured with runtime environment settings.
 *
 * @returns {StorageClient} A configured Supabase StorageClient instance.
 *
 * @example
 * const storage = useSupabaseStorage()
 * const buckets = await storage.listBuckets()
 */
export function useSupabaseStorage(): StorageClient {
  const config = useRuntimeConfig()

  const storage = new StorageClient(`${config.SUPABASE_URL}/storage/v1`, {
    apikey: config.SUPABASE_SERVICE_ROLE,
    Authorization: `Bearer ${config.SUPABASE_SERVICE_ROLE}`,
  })

  return storage
}
