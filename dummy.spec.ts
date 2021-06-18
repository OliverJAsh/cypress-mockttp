/// <reference types="cypress" />
import {getRemote} from 'mockttp'

const server = getRemote({ standaloneServerUrl: 'http://localhost:1773' })

// @ts-ignore
before(() => server.useConfig({ port: 8080, mockRoot: 'http://localhost:8080' }));

describe('Mockttp serves mocked responses', () => {
  it('to cy.request', () => {
    // This won't work because server has been started but this client instance
    // hasn't been configured with the port.
    cy.wrap(server.get("/mocked-path").thenReply(200, 'this is a mocked response'))

    // We make the request from Cypress' Node.js process, and it receives
    // the mocked response we pre-programmed just before
    const url = 'http://localhost:8080/mocked-path'
    cy.request(url).its('body').should('equal', 'this is a mocked response')
  })
})