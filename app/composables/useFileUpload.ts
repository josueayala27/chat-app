// export function useFileUploads(chatId: string) {
//   const files = ref<UploadItem[]>([])
//   const { enqueue } = useUploadQueue()
//   const { create: createAttachment } = useAttachment(chatId)

//   async function startUpload(file: File) {
//     const { upload_url, key, _id } = await createAttachment(file)
//     try {
//       setStatus(file, 'uploading')
//       upload_url && await $fetch(upload_url, { method: 'PUT', body: file, headers: { 'Content-Type': file.type } })
//       const cdnURL = buildURL(key)
//       await preload(cdnURL).catch(() => console.warn('Prefetch failed', cdnURL))
//       setInfo(file, { status: 'done', source: cdnURL, _id })
//     }
//     catch (e) {
//       setStatus(file, 'error')
//     }
//   }

//   async function handleInput(fileList: FileList | null) {
//     if (!fileList)
//       return
//     for (const file of fileList) {
//       files.value.push({ file, status: 'idle', source: await createThumb(file), _id: '', type: file.type })
//       enqueue(() => startUpload(file))
//     }
//   }

//   function remove(index: number) {
//     $fetch(`/api/attachments/${files.value[index]._id}`, { method: 'DELETE' })
//     files.value.splice(index, 1)
//   }

//   return { files, handleInput, remove, allDone: computed(() => files.value.every(f => f.status === 'done')) }
// }
