import type { Attachment } from '~/types/attachment'

interface AttachmentResponse {
  key: string
  upload_url?: string
  _id: string
}

type CreateAttachmentInput = Pick<Attachment, 'content_type' | 'file_name' | 'sha256' | 'size' | 'meta'>

export function useAttachment(chatId: string) {
  async function _sha256(file: File) {
    const arrayBuf = await file.arrayBuffer()
    const hashBuf = await crypto.subtle.digest('SHA-256', arrayBuf)
    return [...new Uint8Array(hashBuf)].map(b => b.toString(16).padStart(2, '0')).join('')
  }

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
