import type { Attachment } from '~/types/attachment'

interface AttachmentResponse {
  key: string
  upload_url?: string
  _id: string
}

type CreateAttachmentInput = Pick<Attachment, 'content_type' | 'file_name' | 'sha256' | 'size' | 'meta'>

interface UploadFileInput {
  file: File
  upload_url: string
}

export function useAttachment(chatId: string) {
  const uploadFileAsync = useAsync((body: UploadFileInput) => $fetch(body.upload_url, { method: 'PUT', body: body.file }))
  const createAsync = useAsync((body: CreateAttachmentInput) => $fetch<AttachmentResponse>(`/api/chats/${chatId}/attachments`, {
    method: 'POST',
    body,
  }))

  async function createAttachment(body: CreateAttachmentInput) {
    const data = await createAsync.execute(body)
    return data as AttachmentResponse
  }

  async function uploadFile(body: UploadFileInput) {
    await uploadFileAsync.execute(body)
  }

  return { createAttachment, uploadFile }
}
