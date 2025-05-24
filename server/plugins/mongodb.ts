import mongoose from 'mongoose'

export default defineNitroPlugin(async () => {
  const config = useRuntimeConfig()
  const mongoUri = `mongodb+srv://${config.public.MONGODB_USERNAME}:${config.public.MONGODB_PASSWORD}@${config.public.MONGODB_HOST}/${config.public.MONGODB_DB}?retryWrites=true&w=majority`

  if (!mongoUri) {
    console.warn('⚠️ No mongodbUri found in `runtimeConfig`.')
    return
  }

  try {
    await mongoose.connect(mongoUri)
    console.log('✅ Connected to `MongoDB`')
  }
  catch (error) {
    console.error('❌ Error connecting to MongoDB:', error)
  }
})
