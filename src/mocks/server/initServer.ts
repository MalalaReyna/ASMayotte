import { server } from '../server'

export function initMockServer() {
  if (process.env.NODE_ENV === 'development'/*  && !isInitialized */) {
    server.listen({
      onUnhandledRequest: 'bypass',
    })
    /* isInitialized = true */
  }
}