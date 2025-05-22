export default defineEventHandler({
  handler: () => {
    return 'websocket'
  },
  websocket: {
    open(ws) {
      ws.send(ws)
      console.log(ws.websocket.url)
    },
    message(ws, message) {
      ws.send(`Echo: ${message}`)
    },
    close() {
      console.log('WebSocket closed')
    },
  },
})
