export default defineEventHandler(async () => {
  await useStorage('upstash').setItem('test:bar', { hello: 'bar' })

  return { message: 'test:foo saved.' }
})
