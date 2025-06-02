import type StorageFileApi from '@supabase/storage-js/dist/module/packages/StorageFileApi'
import { createAttachment } from '~~/server/services/attachment.service'
import { attachmentCreateSchema } from '~~/server/validators/attachment.validator'

const BUCKET_NAME: string = 'messages'

export default defineEventHandler(async (event) => {
  const supabase = useSupabaseStorage()
  const body = await readValidatedBody(event, attachmentCreateSchema.parse)

  const FILENAME: string = `files/${body.filename}`

  const storage: StorageFileApi = supabase.from(BUCKET_NAME)

  const { data } = await storage.createSignedUploadUrl(FILENAME)
  const { data: { publicUrl: url } } = storage.getPublicUrl(FILENAME)

  const attachment = await createAttachment({ ...body, url })

  return {
    _id: attachment._id,
    upload_url: data?.signedUrl,
  }
})
