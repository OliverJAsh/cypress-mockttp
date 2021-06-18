import {getRemote} from 'mockttp'

export const server = getRemote({ standaloneServerUrl: 'http://localhost:1773' })

console.log('registering before hook')

before(() => server.useConfig({ port: 8080, mockRoot: 'http://localhost:8080' }));
