export function useAttachment(chatId: string) {
  async function sha256(file: File) {
    const arrayBuf = await file.arrayBuffer()
    const hashBuf = await crypto.subtle.digest('SHA-256', arrayBuf)
    return [...new Uint8Array(hashBuf)].map(b => b.toString(16).padStart(2, '0')).join('')
  }

  async function create(file: File) {
    const { name, size, type } = file
    const _sha256 = await sha256(file)

    /**
     * Request a presigned upload URL from your backend.
     */
    const response = await $fetch<{ _id: string, key: string, upload_url: string }>(
      `/api/chats/${chatId}/attachments`,
      {
        method: 'POST',
        body: {
          file_name: name,
          size,
          content_type: type,
          sha256: _sha256,
        },
      },
    )

    return response
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
