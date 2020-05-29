const firebase = require('firebase')
const apiConfig = require('../config/api-config')
const firebaseConfig = require('../config/firebase-config')

/** @type {firebase.firestore.Firestore} */
let firestoreInstance = null

module.exports = {
  /**
   * Inicializa uma App do Firebase e retorna a instancia
   * do Firestore
   *
   * @returns {firebase.firestore.Firestore}
   */
  _createConnection() {
    const app = firebase.initializeApp({
      apiKey: firebaseConfig.apiKey,
      projectId: firebaseConfig.projectId
    })

    const firestore = app.firestore()

    if (apiConfig.isDev) {
      firestore.settings({
        host: firebaseConfig.firestore.host,
        ssl: false
      })
    }

    return firestore
  },
  /**
   * Conecta no Firebase
   * @returns {firebase.firestore.Firestore}
   */
  connect() {
    firestoreInstance = firestoreInstance || this._createConnection()
    return firestoreInstance
  },
  /**
   * Desconecta do Firebase
   */
  disconnect() {
    firestoreInstance.terminate()
    firestoreInstance = null
  }
}
