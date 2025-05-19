import mongoose from 'mongoose'

export default defineNitroPlugin(async () => {
  const config = useRuntimeConfig()
  const mongoUri = `mongodb://${config.MONGODB_USERNAME}:${config.MONGODB_PASSWORD}@${config.MONGODB_HOST}:${config.MONGODB_PORT}/${config.MONGODB_DB}?authSource=${config.MONGODB_DB}`

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
