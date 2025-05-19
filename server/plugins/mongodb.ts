import mongoose from 'mongoose'

export default defineNitroPlugin(async () => {
  const config = useRuntimeConfig()
  const mongoUri = 'mongodb://chat-app-core:chat-app-core@mongo:27017/chat-app-core?authSource=chat-app-core'

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
