import mongoose from 'mongoose'

export default defineNitroPlugin(async () => {
  const config = useRuntimeConfig()
  const mongoUri = 'mongodb://chat-app:chat-app@localhost:27017'

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
