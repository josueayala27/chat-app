export default defineEventHandler(async () => {
  const supabase = useSupabaseStorage()

  const { data, error } = await supabase.from('messages').createSignedUploadUrl('files/cat.jpg')

  if (error) {
    throw createError({ statusCode: 500, message: error.message })
  }

  return { message: 'hello', data }
})
