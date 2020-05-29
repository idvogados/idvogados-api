const envLoader = require('@b2wads/env-o-loader')

/**
 * Configurações do Firebase
 */
module.exports = envLoader({
  defaults: {
    apiKey: 'dummy-api-key',
    projectId: 'dummy-project-id',
    firestore: {
      host: 'localhost:5555'
    }
  },
  test: {
    apiKey: 'env:TEST_FIREBASE_API_KEY',
    projectId: 'env:TEST_FIREBASE_PROJECT_ID',
    firestore: {
      host: 'env:TEST_FIREBASE_FIRESTORE_HOST'
    }
  },
  development: {
    apiKey: 'env:FIREBASE_API_KEY',
    projectId: 'env:FIREBASE_PROJECT_ID',
    firestore: {
      host: 'env:FIREBASE_FIRESTORE_HOST'
    }
  },
  production: {
    apiKey: 'env:FIREBASE_API_KEY',
    projectId: 'env:FIREBASE_PROJECT_ID',
    firestore: {
      host: 'env:FIREBASE_FIRESTORE_HOST'
    }
  }
})
