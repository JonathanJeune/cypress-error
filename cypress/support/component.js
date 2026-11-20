import { createMemoryHistory, createRouter } from 'vue-router'
import { routes } from '../../src/router'

//* *******************//
// Add mount command  //
//* *******************//
import { mount } from 'cypress/vue'

Cypress.Commands.add('mount', (component, options = {}) => {
  // Setup options object
  options.global = options.global || {}
  options.global.stubs = options.global.stubs || {}
  options.global.stubs.transition = false
  options.global.components = options.global.components || {}
  options.global.plugins = options.global.plugins || []

  // create router if one is not provided
  if (!options.router) {
    options.router = createRouter({
      routes,
      history: createMemoryHistory()
    })
  }

  // Add router plugin
  options.global.plugins.push({
    install (app) {
      app.use(options.router)
    }
  })

  return mount(component, options)
})
