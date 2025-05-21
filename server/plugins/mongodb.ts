import mongoose from 'mongoose'

export default defineNitroPlugin(async () => {
  const config = useRuntimeConfig()
  const mongoUri = `mongodb+srv://${process.env.MONGODB_USERNAME}:${process.env.MONGODB_PASSWORD}@${process.env.MONGODB_HOST}/${process.env.MONGODB_DB}?retryWrites=true&w=majority`

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
