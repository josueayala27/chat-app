export function useAttachment(chatId: string) {
  async function create(file: File) {
    const { name, size, type } = file

    /**
     * Request a presigned upload URL from your backend.
     */
    const response = await $fetch<{ key: string, upload_url: string }>(
      `/api/chats/${chatId}/attachments`,
      {
        method: 'POST',
        body: { file_name: name, size, content_type: type },
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
