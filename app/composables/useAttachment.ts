import type { Attachment } from '~/types/attachment'

interface AttachmentResponse {
  key: string
  upload_url?: string
  _id: string
}

type CreateAttachmentInput = Pick<Attachment, 'content_type' | 'file_name' | 'sha256' | 'size' | 'meta'>

export function useAttachment(chatId: string) {
  const createAsync = useAsync((body: CreateAttachmentInput) => $fetch<AttachmentResponse>(`/api/chats/${chatId}/attachments`, {
    method: 'POST',
    body,
  }))

  async function create(body: CreateAttachmentInput) {
    const data = await createAsync.execute(body)
    return data as AttachmentResponse
  }

  async function uploadFile(url: string, file: File) {
    await $fetch(url, {
      method: 'PUT',
      headers: { 'Content-Type': file.type },
      body: file,
    })
  }

  return { create, uploadFile }
}
