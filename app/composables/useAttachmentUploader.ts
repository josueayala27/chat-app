export function useAttachmentUploader(chatId: string) {
  async function getUploadUrl(file: File) {
    const { name, size, type } = file

    /**
     * Request a presigned upload URL from your backend.
     */
    const { upload_url } = await $fetch<{ _id: string, upload_url: string }>(
      `/api/chats/${chatId}/attachments/sign`,
      {
        method: 'POST',
        body: { filename: name, size, content_type: type },
      },
    )

    return upload_url
  }

  async function uploadFile(file: File) {
    const upload_url = await getUploadUrl(file)

    await $fetch(upload_url, {
      method: 'PUT',
      headers: { 'Content-Type': file.type },
      body: file,
    })
  }

  async function uploadAll(files: File[]) {
    return Promise.all(files.map(f => uploadFile(f)))
  }

  return { getUploadUrl, uploadFile, uploadAll }
}
