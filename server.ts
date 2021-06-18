import {getStandalone, getLocal, getRemote} from 'mockttp'

const mockServerManager = getStandalone({ debug: true })
const mockServer = mockServerManager.start(1773)

getRemote({ standaloneServerUrl: 'http://localhost:1773' }).start(8080).then(() => {
  // Mockttp does not have a health check endpoint, so I create a separate
  // mock server just for that.
  const local = getLocal()
  local.start(9999)
  local.get("/").thenReply(200, 'Mock server is up')
})

mockServer.then(() => {
  console.log('Mock server manager is started')
})

// Probably not necessary
process.on('SIGINT', function() {
  mockServerManager.stop().then(() => {
    console.info("\nMock server manager was gracefully shut down")
    process.exit()
  })
});