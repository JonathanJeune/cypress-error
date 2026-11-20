import { defineConfig } from 'cypress'
import dotenv from 'dotenv'
const env = dotenv.config({ path: ['.env.local', '.env'] }).parsed

export default defineConfig({
  env: {
    ...env
  },
  component: {
    supportFile: 'cypress/support/component.js',
    specPattern: 'src/tests/components/**/*.spec.js',
    devServer: {
      framework: 'vue',
      bundler: 'vite'
    },
    devServerPublicPathRoute: ''
  }
})
