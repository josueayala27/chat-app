export default defineEventHandler(async () => {
  const value = await useStorage('upstash').getItem('test:bar')

  return { hello: 'retrieve "test:foo" key', value }
})
