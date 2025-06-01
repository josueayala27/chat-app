export default defineEventHandler(async () => {
  const supabase = useSupabase()

  const { data, error } = await supabase.from('messages').createSignedUploadUrl('files/cat.jpg')

  if (error) {
    console.error(error.message)
    throw createError({ statusCode: 500, message: error.message })
  }

  return { message: 'hello', data }
})
